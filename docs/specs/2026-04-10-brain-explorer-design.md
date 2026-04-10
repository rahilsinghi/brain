# Brain Explorer — Design Spec

> Visual knowledge graph explorer for brain's 375+ wiki articles.
> Deployed at **brain.rahilsinghi.com**, powered by react-three-fiber.

## 1. Overview

A standalone web app that renders brain's wiki as an interactive 3D graph. Nodes are positioned by semantic embedding distance (not just explicit links), revealing hidden knowledge structure. Dual purpose: daily personal navigation tool and impressive portfolio demo.

## 2. Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 15 App Router, TypeScript strict, Tailwind | Matches global stack, Vercel-native |
| 3D Rendering | react-three-fiber + @react-three/drei | Full Three.js control with React component model |
| Postprocessing | @react-three/postprocessing | Bloom/glow on nodes |
| Layout Physics | d3-force-3d | Force simulation decoupled from renderer |
| Command Palette | cmdk | VS Code-style search/filter |
| Markdown | react-markdown + custom remark plugin | Wiki article rendering with wikilink support |
| Package Manager | pnpm | Per global CLAUDE.md |
| Deploy | Vercel, brain.rahilsinghi.com | Separate repo: brain-explorer |

## 3. Data Pipeline

### 3.1 Position Precomputation (offline)

UMAP runs **once** during `pnpm seed`, nightly cron, or on-demand via `/graph-push`. Never at request time. This solves three problems:
- No Python/UMAP runtime dependency in the daemon's request path
- Deterministic positions — nodes don't jump between refreshes, preserving spatial memory
- Fast `/graph-export` — just reads a cached file

**Process:**
1. Read all wiki articles (frontmatter + content metadata)
2. Read embedding vectors from LanceDB (768-dim per chunk). Per article: average all chunk vectors into a single 768-dim centroid vector. Articles with no embeddings yet are excluded from the graph.
3. Run UMAP (768 → 3 dims) with fixed `random_state` seed for reproducibility
4. Extract explicit `[[wiki links]]` from article content for edge data
5. Write result to `wiki/.graph-cache.json`

**Implementation:** Use `umap-js` (pure JS UMAP port, no Python dependency). Runs in ~2s for 500 nodes. Invoked from a new `src/graph/export.ts` module, called by the nightly cron and the `/graph-push` endpoint.

### 3.2 Graph Cache Schema

```typescript
interface GraphCache {
  generated_at: string;           // ISO timestamp
  node_count: number;
  nodes: GraphNode[];
  links: GraphLink[];
}

interface GraphNode {
  id: string;                     // relative path: "projects/karen.md"
  title: string;
  tags: string[];
  category: string;               // derived from wiki/ subdirectory
  source_type: string;            // ai | human
  created_at: string;
  connection_count: number;       // explicit wiki links in + out
  x: number;                      // UMAP position
  y: number;
  z: number;
}

interface GraphLink {
  source: string;                 // node id
  target: string;                 // node id
}
```

Node `id` uses the relative wiki path (e.g., `projects/karen.md`). This enables deep-linking: `brain.rahilsinghi.com?focus=projects/karen`. Keep this scheme stable — external tools (MCP brain_query responses, Claude Code) can link into specific nodes.

### 3.3 Daemon Endpoints

**`GET /graph-export`** — Returns the cached graph JSON. Reads `wiki/.graph-cache.json` and serves it. If cache is missing or stale (>24h), regenerates first. Response: the `GraphCache` object.

**`POST /graph-push`** — Full refresh cycle:
1. Regenerate `wiki/.graph-cache.json` (UMAP + metadata)
2. Copy the JSON to the explorer repo: `{explorer_repo_path}/public/graph.json`
3. Git add + commit + push from the explorer repo
4. Return `{ status: "pushed", commit_sha: "...", node_count: N }`

Config: `explorer_repo_path` added to `.brain/config.yaml`.

### 3.4 Deploy Flow

```
Brain Daemon                    Explorer Repo              Vercel
     │                               │                       │
     │  POST /graph-push             │                       │
     ├──► regenerate cache           │                       │
     ├──► write public/graph.json ──►│                       │
     ├──► git commit + push ────────►│                       │
     │                               ├──► auto-deploy ──────►│
     │                               │                       ├──► live at
     │                               │                       │    brain.rahilsinghi.com
```

Vercel deploy takes 30-90 seconds. The UI refresh button shows: "Deploying... graph will update in ~60s" rather than a spinner that appears broken.

## 4. Visual Design — Nebula / Deep Space

### 4.1 Color Palette

| Category | Color | Hex |
|----------|-------|-----|
| Projects | Violet | `#8b5cf6` |
| Skills | Cyan | `#06b6d4` |
| Companies | Pink | `#ec4899` |
| Experience | Amber | `#f59e0b` |
| Decisions | Green | `#22c55e` |
| People | Orange | `#f4723b` |
| Concepts | White | `#e2e8f0` |
| Synthesis | Teal | `#14b8a6` |
| Background | Near-black | `#050510` |

### 4.2 Node Rendering

- **Single draw call via `THREE.InstancedMesh`** (or drei `<Instances>`) — NOT individual React components per node. 375 separate draw calls will shatter frame rate during camera fly-in. One instanced mesh, one draw call, per-instance transforms via instance matrix.
- Sphere geometry with emissive material in category color (per-instance color via `instanceColor` attribute)
- Size proportional to `connection_count` (min 0.3, max 1.5 radius, set via per-instance scale in the matrix)
- Gentle pulse animation (scale oscillation, ±5%, 3s period, offset per node — computed in `useFrame` and applied to instance matrices)
- Bloom postprocessing makes nodes glow against the dark background

### 4.3 Edge Rendering

- Thin lines (`LineBasicMaterial`) between linked nodes
- **Default state:** white at 15% opacity — barely visible whispers that hint at structure without creating link spaghetti. The empty space between clusters does the visual work, not the edges.
- **Focus state:** edges to neighbors jump to 75% opacity — the 15→75% delta creates a dramatic "pop" that isolates the focused cluster
- No particle effects on edges in v1

### 4.4 Bloom Tuning

- Bloom intensity: ~2.0-2.5 (not higher — >3.0 blows out node centers to pure white, destroying category color)
- Luminance threshold: 0.6 (only nodes glow, not edges)
- Tune after category colors are implemented — bloom behavior changes with emissive color intensity

### 4.5 v1 Scope vs v1.1

**v1 (ship this):**
- Glowing nodes with bloom postprocessing
- Faint edge lines
- Category colors + size encoding
- Node pulse animation

**v1.1 (defer):**
- Nebula halo clouds behind clusters (custom shader)
- Particle dust drifting between clusters
- Traveling light particles along edges
- Depth of field effect

## 5. Interaction Design

### 5.1 Default State

Full-screen 3D canvas, no UI chrome. `OrbitControls` for rotate/zoom/pan. Nodes pulse gently. This is what an interviewer sees on first load.

### 5.2 Hover — Tooltip

On pointer intersection with a node:
- drei `<Html>` component renders a DOM tooltip anchored to the node
- Shows: title (bold), tags (pills), category indicator (colored dot)
- Only one tooltip mounted at a time (performance — no 375 `<Html>` elements)
- Tooltip appears instantly, no delay

### 5.3 Search — Command Palette

Press `/` to open cmdk palette (centered, overlays the canvas):
- Fuzzy search across node titles
- Filter by category (typed prefix: `cat:projects`, `cat:skills`)
- Filter by source type: `from:github`, `from:gmail`, `from:voice`
- Select result → camera flies to that node (same as click-to-focus)
- `Esc` closes palette

### 5.4 Focus Mode — Camera Fly-in

On node click:
1. Camera arcs toward target node using spherical interpolation (`maath/easing` for damping + bezier curve for the path). The camera follows a curved arc above the graph plane, never a straight line — this prevents clipping through intermediate node clusters. Interpolate both `camera.position` and `OrbitControls.target` simultaneously.
2. Non-neighbor nodes dim to 10% opacity
3. Neighbor nodes brighten, edges to neighbors jump to 75% opacity (from 15% default)
4. Article panel slides in from right edge

On `Esc` or clicking empty space:
1. Camera pulls back to previous orbit position
2. All nodes restore full opacity
3. Panel dismisses

### 5.5 Article Panel

- Glassmorphic dark panel, 400px width, slides from right
- Renders full wiki article markdown via `react-markdown`
- Custom remark plugin converts `[[wiki-slug]]` links to clickable elements
- Clicking a wikilink in the panel triggers focus-mode on that linked node (camera flies to it)
- Panel header: title, category pill, created date, tag pills
- Scroll for long articles, panel has its own scroll context

### 5.6 Admin Refresh Button

- Small icon button, bottom-right corner, low opacity (20%), brightens on hover
- On click: `fetch("http://localhost:3577/health")`
  - If reachable → calls `POST /graph-push` → shows "Deploying... ~60s"
  - If unreachable → shows "Refresh available from admin machine only" (fades after 3s)
- Not visible to casual viewers unless they hover near it

### 5.7 Graph Metadata

- "Last updated: 2h ago" subtle text, bottom-left corner, low opacity
- Node count indicator nearby: "376 nodes"
- Both at ~20% opacity, not distracting

### 5.8 URL Deep-linking

- `brain.rahilsinghi.com?focus=projects/karen` → loads graph, auto-focuses that node
- Clicking a node updates the URL via `history.replaceState` (no page reload)
- Enables linking from external tools (MCP brain_query sources, Claude Code, Telegram)

## 6. Project Structure

```
brain-explorer/
├── public/
│   └── graph.json              ← static graph data, updated via /graph-push
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← root layout, dark bg, no chrome
│   │   └── page.tsx            ← mounts GraphCanvas + overlay components
│   ├── components/
│   │   ├── GraphCanvas.tsx     ← r3f Canvas, lights, postprocessing
│   │   ├── InstancedNodes.tsx   ← ALL nodes via THREE.InstancedMesh (single draw call, not per-node components)
│   │   ├── Edges.tsx           ← line segments between linked nodes
│   │   ├── CameraController.tsx ← orbit controls + fly-to-focus animation
│   │   ├── Tooltip.tsx         ← drei Html tooltip on hover
│   │   ├── CommandPalette.tsx  ← cmdk search/filter overlay
│   │   ├── ArticlePanel.tsx    ← slide-in markdown article viewer
│   │   ├── AdminRefresh.tsx    ← refresh button + deploy status
│   │   └── GraphMeta.tsx       ← "last updated" + node count
│   ├── lib/
│   │   ├── graph-data.ts       ← fetch/parse graph.json, type definitions
│   │   ├── force-layout.ts     ← d3-force-3d setup, STRICTLY d3.forceCollide() only — prevents node overlap at identical UMAP coords, must NOT use link attraction forces that would tear nodes from their semantic UMAP positions
│   │   ├── categories.ts       ← color map, category detection from path
│   │   └── wikilink-plugin.ts  ← remark plugin: [[slug]] → click handler
│   └── hooks/
│       ├── useGraphState.ts    ← focused node, hovered node, filter state
│       └── useCameraAnimation.ts ← fly-to-focus interpolation logic
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── vercel.json
```

## 7. Daemon Changes (brain repo)

New files:
- `src/graph/export.ts` — UMAP reduction, graph cache generation, wiki metadata extraction
- `src/graph/push.ts` — write to explorer repo, git commit+push
- `src/api/routes/graph-export.ts` — GET /graph-export
- `src/api/routes/graph-push.ts` — POST /graph-push

Config addition (`.brain/config.yaml`):
```yaml
graph:
  explorer_repo_path: ~/Desktop/brain-explorer
  umap_seed: 42
  cache_path: wiki/.graph-cache.json
```

Nightly cron update: regenerate graph cache after lint/heal/connect cycle.

Dependencies: `umap-js` (pure JS, no Python).

## 8. Deployment

1. Create `brain-explorer` repo on GitHub (private or public — portfolio piece, so public is fine)
2. Connect to Vercel, assign `brain.rahilsinghi.com` subdomain
3. First deploy: run `pnpm graph:push` locally to populate `graph.json`
4. Subsequent updates: admin refresh button in UI or nightly cron

## 9. Non-Goals for v1

- Mobile-optimized layout (desktop-first, mobile can orbit but no command palette)
- Real-time live data (graph updates on push, not live)
- Authentication (public read-only site, admin refresh is localhost-gated)
- Full-text search of article content (search is title/tag only in v1)
- Nebula halos, particle dust, edge particles (v1.1)
- Time slider / temporal evolution (v2)
