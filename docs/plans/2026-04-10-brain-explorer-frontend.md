# Brain Explorer Frontend — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 3D knowledge graph explorer that renders 315+ wiki articles as glowing nodes in a nebula/deep-space scene, deployed at brain.rahilsinghi.com.

**Architecture:** Static Next.js app fetches precomputed `graph.json` (315 nodes with UMAP 3D positions, links). All nodes rendered via a single `InstancedMesh` draw call with bloom postprocessing. Interaction: hover tooltips, click-to-focus with camera arc fly-in, command palette search, glassmorphic article panel with wikilink navigation. d3-force-3d runs collide-only (no link forces) to prevent overlap without distorting UMAP semantic positions.

**Tech Stack:** Next.js 15 App Router, TypeScript strict, Tailwind CSS, react-three-fiber, @react-three/drei, @react-three/postprocessing, d3-force-3d, cmdk, react-markdown, maath, pnpm

**Spec:** `docs/specs/2026-04-10-brain-explorer-design.md`

**Data source:** Brain daemon `GET /graph-export` on port 3577. Graph cache written to `public/graph.json` via `POST /graph-push`. Current data: 315 nodes, 7 categories (projects: 194, companies: 63, decisions: 36, people: 9, concepts: 7, experience: 4, tracking: 2). UMAP positions range X:[3,10] Y:[1.4,5.5] Z:[-0.5,3.5] — must center and scale for scene.

---

## File Structure

```
brain-explorer/
├── public/
│   └── graph.json                  ← static graph data (updated via /graph-push)
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← root layout: dark bg, Inter font, no chrome
│   │   ├── page.tsx                ← mount GraphCanvas + all overlay UI
│   │   └── globals.css             ← Tailwind imports + glassmorphism utilities
│   ├── components/
│   │   ├── GraphCanvas.tsx         ← r3f Canvas + bloom postprocessing setup
│   │   ├── InstancedNodes.tsx      ← InstancedMesh: all nodes in one draw call + pointer events (hover/click raycasting via instanceId)
│   │   ├── Edges.tsx               ← LineSegments between linked nodes (single geometry, color attribute mutation on focus — no rebuild)
│   │   ├── CameraController.tsx    ← OrbitControls + arc fly-to-focus (trajectory-relative arc via cross product, not global Y)
│   │   ├── Tooltip.tsx             ← drei <Html> tooltip on hovered node
│   │   ├── CommandPalette.tsx      ← cmdk overlay (/ to open)
│   │   ├── ArticlePanel.tsx        ← glassmorphic slide-in markdown viewer (wikilink click via CustomEvent)
│   │   ├── AdminRefresh.tsx        ← Cmd+Shift+R keyboard shortcut (local dev only — HTTPS mixed content blocks localhost fetch)
│   │   └── GraphMeta.tsx           ← "last updated" + node count (bottom-left)
│   ├── lib/
│   │   ├── types.ts                ← GraphNode, GraphLink, GraphCache, GraphState
│   │   ├── graph-data.ts           ← fetch graph.json, normalize positions
│   │   ├── categories.ts           ← color map, size scaling, category utils
│   │   ├── force-layout.ts         ← d3-force-3d collide-only simulation
│   │   └── wikilink-plugin.ts      ← remark plugin: [[slug]] → clickable span
│   └── hooks/
│       ├── useGraphData.ts         ← SWR/fetch hook for graph.json
│       ├── useGraphState.ts        ← Zustand store: focus, hover, filter
│       └── useCameraAnimation.ts   ← fly-to interpolation state
│   └── types/
│       └── d3-force-3d.d.ts        ← local type declaration (no @types/ package exists)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── vercel.json
├── vitest.config.ts
└── .gitignore
```

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `brain-explorer/` (entire scaffold)
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `vercel.json`, `vitest.config.ts`, `.gitignore`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Create project with create-next-app**

```bash
cd ~/Desktop
pnpm create next-app@latest brain-explorer --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-pnpm
```

Accept defaults. This creates the scaffold with App Router, TypeScript, Tailwind.

- [ ] **Step 2: Install dependencies**

```bash
cd ~/Desktop/brain-explorer
pnpm add three @react-three/fiber @react-three/drei @react-three/postprocessing d3-force-3d cmdk react-markdown remark-gfm remark-breaks maath zustand
pnpm add -D @types/three vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 3: Configure vitest**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
    include: ["src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
});
```

- [ ] **Step 4: Create d3-force-3d type declaration**

d3-force-3d has no `@types/` package. Create `src/types/d3-force-3d.d.ts`:

```typescript
declare module "d3-force-3d" {
  export interface SimulationNode {
    index?: number;
    x?: number;
    y?: number;
    z?: number;
    vx?: number;
    vy?: number;
    vz?: number;
    fx?: number | null;
    fy?: number | null;
    fz?: number | null;
  }

  export interface Force<NodeDatum extends SimulationNode> {
    (alpha: number): void;
  }

  export interface Simulation<NodeDatum extends SimulationNode> {
    tick(): void;
    stop(): Simulation<NodeDatum>;
    force(name: string, force?: Force<NodeDatum> | null): Simulation<NodeDatum>;
    velocityDecay(decay: number): Simulation<NodeDatum>;
    nodes(): NodeDatum[];
  }

  export function forceSimulation<NodeDatum extends SimulationNode>(
    nodes?: NodeDatum[],
    numDimensions?: number
  ): Simulation<NodeDatum>;

  export function forceCollide<NodeDatum extends SimulationNode>(
    radius?: number | ((node: NodeDatum) => number)
  ): Force<NodeDatum> & {
    iterations(iterations: number): ReturnType<typeof forceCollide>;
  };
}
```

- [ ] **Step 5: Add test script to package.json**

Add to `scripts`:
```json
{
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 6: Configure vercel.json**

Create `vercel.json`:
```json
{
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

- [ ] **Step 7: Update next.config.ts for static export**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

Note: static export since this is a fully client-side app. `graph.json` is in `public/`.

- [ ] **Step 8: Create minimal layout.tsx**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brain Explorer",
  description: "3D knowledge graph — Rahil Singhi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-[#050510] text-white overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 9: Create placeholder page.tsx**

Replace `src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <p className="text-slate-500 text-sm">Brain Explorer loading...</p>
    </main>
  );
}
```

- [ ] **Step 10: Update globals.css**

Replace `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: #050510;
}

@layer utilities {
  .glass {
    background: rgba(5, 5, 16, 0.75);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
}
```

- [ ] **Step 11: Seed graph.json from daemon**

```bash
curl -s http://localhost:3577/graph-export > ~/Desktop/brain-explorer/public/graph.json
```

- [ ] **Step 12: Verify dev server starts**

```bash
cd ~/Desktop/brain-explorer && pnpm dev
```

Visit `http://localhost:3000` — should show "Brain Explorer loading..." on dark background.

- [ ] **Step 13: Init git and commit**

```bash
cd ~/Desktop/brain-explorer
git init
git add -A
git commit -m "chore: scaffold Next.js 15 project with r3f dependencies"
```

---

## Task 2: Types + Graph Data Layer

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/graph-data.ts`
- Create: `src/lib/graph-data.test.ts`

- [ ] **Step 1: Write types**

Create `src/lib/types.ts`:

```typescript
export interface GraphNode {
  id: string;
  title: string;
  tags: string[];
  category: string;
  source_type: string;
  created_at: string;
  connection_count: number;
  x: number;
  y: number;
  z: number;
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface GraphCache {
  generated_at: string;
  node_count: number;
  nodes: GraphNode[];
  links: GraphLink[];
}

export type FocusState = {
  focusedNodeId: string | null;
  hoveredNodeId: string | null;
  filterCategory: string | null;
  filterQuery: string;
};
```

- [ ] **Step 2: Write failing tests for normalizePositions**

Create `src/lib/graph-data.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { normalizePositions, buildNeighborMap } from "./graph-data";
import type { GraphNode, GraphLink } from "./types";

function makeNode(overrides: Partial<GraphNode> = {}): GraphNode {
  return {
    id: "test.md",
    title: "Test",
    tags: [],
    category: "projects",
    source_type: "ai",
    created_at: "2026-01-01T00:00:00Z",
    connection_count: 0,
    x: 5,
    y: 3,
    z: 1,
    ...overrides,
  };
}

describe("normalizePositions", () => {
  it("centers positions around origin", () => {
    const nodes: GraphNode[] = [
      makeNode({ id: "a.md", x: 4, y: 2, z: 0 }),
      makeNode({ id: "b.md", x: 8, y: 6, z: 4 }),
    ];
    const result = normalizePositions(nodes, 50);
    const avgX = (result[0].x + result[1].x) / 2;
    const avgY = (result[0].y + result[1].y) / 2;
    const avgZ = (result[0].z + result[1].z) / 2;
    expect(Math.abs(avgX)).toBeLessThan(0.01);
    expect(Math.abs(avgY)).toBeLessThan(0.01);
    expect(Math.abs(avgZ)).toBeLessThan(0.01);
  });

  it("scales positions to fit within target radius", () => {
    const nodes: GraphNode[] = [
      makeNode({ id: "a.md", x: 0, y: 0, z: 0 }),
      makeNode({ id: "b.md", x: 100, y: 0, z: 0 }),
    ];
    const result = normalizePositions(nodes, 50);
    const maxDist = Math.max(
      ...result.map((n) => Math.sqrt(n.x ** 2 + n.y ** 2 + n.z ** 2))
    );
    expect(maxDist).toBeLessThanOrEqual(50.01);
  });

  it("returns empty array for empty input", () => {
    expect(normalizePositions([], 50)).toEqual([]);
  });
});

describe("buildNeighborMap", () => {
  it("builds bidirectional neighbor sets", () => {
    const links: GraphLink[] = [
      { source: "a.md", target: "b.md" },
      { source: "a.md", target: "c.md" },
    ];
    const map = buildNeighborMap(links);
    expect(map.get("a.md")).toEqual(new Set(["b.md", "c.md"]));
    expect(map.get("b.md")).toEqual(new Set(["a.md"]));
    expect(map.get("c.md")).toEqual(new Set(["a.md"]));
  });

  it("returns empty map for no links", () => {
    const map = buildNeighborMap([]);
    expect(map.size).toBe(0);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
cd ~/Desktop/brain-explorer && pnpm test
```

Expected: FAIL — `normalizePositions` and `buildNeighborMap` not defined.

- [ ] **Step 4: Implement graph-data.ts**

Create `src/lib/graph-data.ts`:

```typescript
import type { GraphNode, GraphLink, GraphCache } from "./types";

export async function fetchGraphData(): Promise<GraphCache> {
  const res = await fetch("/graph.json");
  if (!res.ok) throw new Error(`Failed to fetch graph: ${res.status}`);
  return res.json();
}

export function normalizePositions(
  nodes: GraphNode[],
  targetRadius: number
): GraphNode[] {
  if (nodes.length === 0) return [];

  // Compute centroid
  let cx = 0,
    cy = 0,
    cz = 0;
  for (const n of nodes) {
    cx += n.x;
    cy += n.y;
    cz += n.z;
  }
  cx /= nodes.length;
  cy /= nodes.length;
  cz /= nodes.length;

  // Center
  const centered = nodes.map((n) => ({
    ...n,
    x: n.x - cx,
    y: n.y - cy,
    z: n.z - cz,
  }));

  // Find max distance from origin
  let maxDist = 0;
  for (const n of centered) {
    const d = Math.sqrt(n.x ** 2 + n.y ** 2 + n.z ** 2);
    if (d > maxDist) maxDist = d;
  }

  if (maxDist === 0) return centered;

  // Scale to fit target radius
  const scale = targetRadius / maxDist;
  return centered.map((n) => ({
    ...n,
    x: n.x * scale,
    y: n.y * scale,
    z: n.z * scale,
  }));
}

export function buildNeighborMap(
  links: GraphLink[]
): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();

  for (const link of links) {
    if (!map.has(link.source)) map.set(link.source, new Set());
    if (!map.has(link.target)) map.set(link.target, new Set());
    map.get(link.source)!.add(link.target);
    map.get(link.target)!.add(link.source);
  }

  return map;
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
cd ~/Desktop/brain-explorer && pnpm test
```

Expected: all 5 tests PASS.

- [ ] **Step 6: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/lib/types.ts src/lib/graph-data.ts src/lib/graph-data.test.ts
git commit -m "feat: graph data types, position normalization, neighbor map"
```

---

## Task 3: Category Colors + Size Scaling

**Files:**
- Create: `src/lib/categories.ts`
- Create: `src/lib/categories.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/lib/categories.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import {
  getCategoryColor,
  getNodeRadius,
  CATEGORY_COLORS,
} from "./categories";

describe("getCategoryColor", () => {
  it("returns correct hex for known categories", () => {
    expect(getCategoryColor("projects")).toBe("#8b5cf6");
    expect(getCategoryColor("skills")).toBe("#06b6d4");
    expect(getCategoryColor("companies")).toBe("#ec4899");
    expect(getCategoryColor("experience")).toBe("#f59e0b");
    expect(getCategoryColor("decisions")).toBe("#22c55e");
    expect(getCategoryColor("people")).toBe("#f4723b");
    expect(getCategoryColor("concepts")).toBe("#e2e8f0");
    expect(getCategoryColor("synthesis")).toBe("#14b8a6");
  });

  it("returns default white for unknown category", () => {
    expect(getCategoryColor("unknown")).toBe("#e2e8f0");
  });
});

describe("getNodeRadius", () => {
  it("returns min radius for 0 connections", () => {
    expect(getNodeRadius(0)).toBe(0.3);
  });

  it("returns max radius for high connections", () => {
    expect(getNodeRadius(40)).toBe(1.5);
  });

  it("scales linearly between min and max", () => {
    const r = getNodeRadius(20);
    expect(r).toBeGreaterThan(0.3);
    expect(r).toBeLessThan(1.5);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd ~/Desktop/brain-explorer && pnpm test
```

- [ ] **Step 3: Implement categories.ts**

Create `src/lib/categories.ts`:

```typescript
export const CATEGORY_COLORS: Record<string, string> = {
  projects: "#8b5cf6",
  skills: "#06b6d4",
  companies: "#ec4899",
  experience: "#f59e0b",
  decisions: "#22c55e",
  people: "#f4723b",
  concepts: "#e2e8f0",
  synthesis: "#14b8a6",
  tracking: "#06b6d4",
};

const DEFAULT_COLOR = "#e2e8f0";

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? DEFAULT_COLOR;
}

const MIN_RADIUS = 0.3;
const MAX_RADIUS = 1.5;
const MAX_CONNECTIONS = 40;

export function getNodeRadius(connectionCount: number): number {
  const t = Math.min(connectionCount / MAX_CONNECTIONS, 1);
  return MIN_RADIUS + t * (MAX_RADIUS - MIN_RADIUS);
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd ~/Desktop/brain-explorer && pnpm test
```

- [ ] **Step 5: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/lib/categories.ts src/lib/categories.test.ts
git commit -m "feat: category color map and node radius scaling"
```

---

## Task 4: Zustand Graph State Store

**Files:**
- Create: `src/hooks/useGraphState.ts`
- Create: `src/hooks/useGraphState.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/hooks/useGraphState.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from "vitest";
import { useGraphState } from "./useGraphState";

describe("useGraphState", () => {
  beforeEach(() => {
    useGraphState.setState({
      focusedNodeId: null,
      hoveredNodeId: null,
      filterCategory: null,
      filterQuery: "",
    });
  });

  it("starts with null focus", () => {
    expect(useGraphState.getState().focusedNodeId).toBeNull();
  });

  it("sets focused node", () => {
    useGraphState.getState().setFocusedNode("projects/karen.md");
    expect(useGraphState.getState().focusedNodeId).toBe("projects/karen.md");
  });

  it("clears focus", () => {
    useGraphState.getState().setFocusedNode("projects/karen.md");
    useGraphState.getState().clearFocus();
    expect(useGraphState.getState().focusedNodeId).toBeNull();
  });

  it("sets hovered node", () => {
    useGraphState.getState().setHoveredNode("companies/maison.md");
    expect(useGraphState.getState().hoveredNodeId).toBe("companies/maison.md");
  });

  it("sets filter category", () => {
    useGraphState.getState().setFilterCategory("projects");
    expect(useGraphState.getState().filterCategory).toBe("projects");
  });

  it("sets filter query", () => {
    useGraphState.getState().setFilterQuery("karen");
    expect(useGraphState.getState().filterQuery).toBe("karen");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd ~/Desktop/brain-explorer && pnpm test
```

- [ ] **Step 3: Implement useGraphState**

Create `src/hooks/useGraphState.ts`:

```typescript
import { create } from "zustand";

interface GraphState {
  focusedNodeId: string | null;
  hoveredNodeId: string | null;
  filterCategory: string | null;
  filterQuery: string;
  setFocusedNode: (id: string | null) => void;
  clearFocus: () => void;
  setHoveredNode: (id: string | null) => void;
  setFilterCategory: (category: string | null) => void;
  setFilterQuery: (query: string) => void;
}

export const useGraphState = create<GraphState>((set) => ({
  focusedNodeId: null,
  hoveredNodeId: null,
  filterCategory: null,
  filterQuery: "",
  setFocusedNode: (id) => set({ focusedNodeId: id }),
  clearFocus: () => set({ focusedNodeId: null }),
  setHoveredNode: (id) => set({ hoveredNodeId: id }),
  setFilterCategory: (category) => set({ filterCategory: category }),
  setFilterQuery: (query) => set({ filterQuery: query }),
}));
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd ~/Desktop/brain-explorer && pnpm test
```

- [ ] **Step 5: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/hooks/useGraphState.ts src/hooks/useGraphState.test.ts
git commit -m "feat: Zustand graph state store (focus, hover, filter)"
```

---

## Task 5: Force Layout (d3-force-3d Collide Only)

**Files:**
- Create: `src/lib/force-layout.ts`
- Create: `src/lib/force-layout.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/lib/force-layout.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { applyCollisionLayout } from "./force-layout";
import type { GraphNode } from "./types";

function makeNode(id: string, x: number, y: number, z: number): GraphNode {
  return {
    id,
    title: id,
    tags: [],
    category: "projects",
    source_type: "ai",
    created_at: "2026-01-01T00:00:00Z",
    connection_count: 0,
    x,
    y,
    z,
  };
}

describe("applyCollisionLayout", () => {
  it("separates overlapping nodes", () => {
    const nodes = [
      makeNode("a.md", 0, 0, 0),
      makeNode("b.md", 0, 0, 0),
    ];
    const result = applyCollisionLayout(nodes, 2.0);
    const dist = Math.sqrt(
      (result[0].x - result[1].x) ** 2 +
        (result[0].y - result[1].y) ** 2 +
        (result[0].z - result[1].z) ** 2
    );
    expect(dist).toBeGreaterThan(0.5);
  });

  it("does not significantly move already-separated nodes", () => {
    const nodes = [
      makeNode("a.md", 0, 0, 0),
      makeNode("b.md", 50, 50, 50),
    ];
    const result = applyCollisionLayout(nodes, 2.0);
    // Should stay close to original positions
    expect(Math.abs(result[0].x)).toBeLessThan(3);
    expect(Math.abs(result[1].x - 50)).toBeLessThan(3);
  });

  it("returns empty array for empty input", () => {
    expect(applyCollisionLayout([], 2.0)).toEqual([]);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd ~/Desktop/brain-explorer && pnpm test
```

- [ ] **Step 3: Implement force-layout.ts**

Create `src/lib/force-layout.ts`:

```typescript
import {
  forceSimulation,
  forceCollide,
} from "d3-force-3d";
import type { GraphNode } from "./types";

interface SimNode {
  index: number;
  x: number;
  y: number;
  z: number;
}

export function applyCollisionLayout(
  nodes: GraphNode[],
  collideRadius: number
): GraphNode[] {
  if (nodes.length === 0) return [];

  const simNodes: SimNode[] = nodes.map((n, i) => ({
    index: i,
    x: n.x,
    y: n.y,
    z: n.z,
  }));

  const simulation = forceSimulation(simNodes, 3)
    .force("collide", forceCollide(collideRadius).iterations(3))
    .velocityDecay(0.6)
    .stop();

  // Run 50 ticks synchronously
  for (let i = 0; i < 50; i++) {
    simulation.tick();
  }

  return nodes.map((n, i) => ({
    ...n,
    x: simNodes[i].x,
    y: simNodes[i].y,
    z: simNodes[i].z,
  }));
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd ~/Desktop/brain-explorer && pnpm test
```

- [ ] **Step 5: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/lib/force-layout.ts src/lib/force-layout.test.ts
git commit -m "feat: d3-force-3d collide-only layout to prevent node overlap"
```

---

## Task 6: Wikilink Remark Plugin

**Files:**
- Create: `src/lib/wikilink-plugin.ts`
- Create: `src/lib/wikilink-plugin.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/lib/wikilink-plugin.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { extractWikilinks, wikilinkToSlug } from "./wikilink-plugin";

describe("extractWikilinks", () => {
  it("extracts wikilinks from markdown text", () => {
    const text = "See [[projects/karen]] and [[companies/maison]] for details.";
    expect(extractWikilinks(text)).toEqual([
      "projects/karen",
      "companies/maison",
    ]);
  });

  it("returns empty array for no links", () => {
    expect(extractWikilinks("No links here.")).toEqual([]);
  });

  it("handles links with display text", () => {
    const text = "Check [[projects/karen|Karen App]] out.";
    expect(extractWikilinks(text)).toEqual(["projects/karen"]);
  });
});

describe("wikilinkToSlug", () => {
  it("converts wikilink to .md path", () => {
    expect(wikilinkToSlug("projects/karen")).toBe("projects/karen.md");
  });

  it("does not double-add .md", () => {
    expect(wikilinkToSlug("projects/karen.md")).toBe("projects/karen.md");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd ~/Desktop/brain-explorer && pnpm test
```

- [ ] **Step 3: Implement wikilink-plugin.ts**

Create `src/lib/wikilink-plugin.ts`:

```typescript
import type { Plugin } from "unified";
import type { Root, Text, PhrasingContent } from "mdast";
import { visit } from "unist-util-visit";

const WIKILINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

export function extractWikilinks(text: string): string[] {
  const links: string[] = [];
  let match: RegExpExecArray | null;
  const re = new RegExp(WIKILINK_RE.source, "g");
  while ((match = re.exec(text)) !== null) {
    links.push(match[1]);
  }
  return links;
}

export function wikilinkToSlug(link: string): string {
  return link.endsWith(".md") ? link : `${link}.md`;
}

export const remarkWikilinks: Plugin<
  [{ onWikilinkClick?: (slug: string) => void }],
  Root
> =
  (options = {}) =>
  (tree) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index === undefined) return;

      const value = node.value;
      const re = new RegExp(WIKILINK_RE.source, "g");
      let match: RegExpExecArray | null;
      let lastIndex = 0;
      const children: PhrasingContent[] = [];

      while ((match = re.exec(value)) !== null) {
        // Text before the match
        if (match.index > lastIndex) {
          children.push({
            type: "text",
            value: value.slice(lastIndex, match.index),
          });
        }

        const slug = match[1];
        const displayText = match[2] || slug.split("/").pop() || slug;

        // Create an HTML node that will render as a clickable span
        children.push({
          type: "html",
          value: `<span class="wikilink" data-slug="${wikilinkToSlug(slug)}">${displayText}</span>`,
        } as unknown as PhrasingContent);

        lastIndex = re.lastIndex;
      }

      if (children.length > 0) {
        if (lastIndex < value.length) {
          children.push({ type: "text", value: value.slice(lastIndex) });
        }
        parent.children.splice(index, 1, ...children);
      }
    });
  };
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd ~/Desktop/brain-explorer && pnpm test
```

Note: Install `unist-util-visit` if not already a dep:
```bash
pnpm add unist-util-visit unified
```

- [ ] **Step 5: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/lib/wikilink-plugin.ts src/lib/wikilink-plugin.test.ts
git commit -m "feat: remark wikilink plugin for article panel rendering"
```

---

## Task 7: useGraphData Hook + Graph Data Fetch

**Files:**
- Create: `src/hooks/useGraphData.ts`

- [ ] **Step 1: Implement useGraphData hook**

Create `src/hooks/useGraphData.ts`:

```typescript
"use client";

import { useEffect, useState } from "react";
import type { GraphCache, GraphNode } from "@/lib/types";
import { normalizePositions, buildNeighborMap } from "@/lib/graph-data";
import { applyCollisionLayout } from "@/lib/force-layout";

interface GraphDataResult {
  nodes: GraphNode[];
  neighborMap: Map<string, Set<string>>;
  generatedAt: string;
  loading: boolean;
  error: string | null;
}

const SCENE_RADIUS = 50;
const COLLIDE_RADIUS = 2.0;

export function useGraphData(): GraphDataResult {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [neighborMap, setNeighborMap] = useState<Map<string, Set<string>>>(
    new Map()
  );
  const [generatedAt, setGeneratedAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/graph.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: GraphCache = await res.json();

        const normalized = normalizePositions(data.nodes, SCENE_RADIUS);
        const positioned = applyCollisionLayout(normalized, COLLIDE_RADIUS);

        setNodes(positioned);
        setNeighborMap(buildNeighborMap(data.links));
        setGeneratedAt(data.generated_at);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load graph");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { nodes, neighborMap, generatedAt, loading, error };
}
```

- [ ] **Step 2: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/hooks/useGraphData.ts
git commit -m "feat: useGraphData hook with normalization and collision layout"
```

---

## Task 8: GraphCanvas + Bloom Postprocessing

**Files:**
- Create: `src/components/GraphCanvas.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create GraphCanvas component**

Create `src/components/GraphCanvas.tsx`:

```tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

interface GraphCanvasProps {
  children: React.ReactNode;
}

export function GraphCanvas({ children }: GraphCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 120], fov: 60, near: 0.1, far: 1000 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => {
        gl.setClearColor("#050510");
      }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[50, 50, 50]} intensity={0.5} />

      {children}

      <EffectComposer>
        <Bloom
          intensity={2.2}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
```

- [ ] **Step 2: Update page.tsx to mount canvas**

Replace `src/app/page.tsx`:

```tsx
"use client";

import { GraphCanvas } from "@/components/GraphCanvas";
import { useGraphData } from "@/hooks/useGraphData";

export default function Home() {
  const { nodes, loading, error } = useGraphData();

  if (loading) {
    return (
      <main className="h-screen w-screen flex items-center justify-center">
        <p className="text-slate-500 text-sm animate-pulse">Loading graph...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="h-screen w-screen flex items-center justify-center">
        <p className="text-red-400 text-sm">{error}</p>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen relative">
      <GraphCanvas>
        {/* InstancedNodes, Edges, CameraController will be added in subsequent tasks */}
        <mesh>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} />
        </mesh>
      </GraphCanvas>
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

```bash
cd ~/Desktop/brain-explorer && pnpm dev
```

Visit `http://localhost:3000` — should see a dark scene with a single glowing violet sphere (bloom active). If sphere doesn't glow, adjust bloom threshold.

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/components/GraphCanvas.tsx src/app/page.tsx
git commit -m "feat: r3f Canvas with bloom postprocessing"
```

---

## Task 9: InstancedNodes — All Nodes in One Draw Call

**Files:**
- Create: `src/components/InstancedNodes.tsx`
- Modify: `src/app/page.tsx`

This is the core rendering component. All 315+ nodes are rendered with a **single `InstancedMesh`** — no per-node React components.

- [ ] **Step 1: Create InstancedNodes component**

Create `src/components/InstancedNodes.tsx`:

```tsx
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { GraphNode } from "@/lib/types";
import { getCategoryColor, getNodeRadius } from "@/lib/categories";
import { useGraphState } from "@/hooks/useGraphState";

interface InstancedNodesProps {
  nodes: GraphNode[];
  neighborMap: Map<string, Set<string>>;
}

const tempObject = new THREE.Object3D();
const tempColor = new THREE.Color();

export function InstancedNodes({ nodes, neighborMap }: InstancedNodesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const focusedNodeId = useGraphState((s) => s.focusedNodeId);

  // Build node index map for raycasting
  const nodeIndexMap = useMemo(() => {
    const map = new Map<number, string>();
    nodes.forEach((n, i) => map.set(i, n.id));
    return map;
  }, [nodes]);

  // Precompute base radii
  const radii = useMemo(
    () => nodes.map((n) => getNodeRadius(n.connection_count)),
    [nodes]
  );

  // Precompute base colors as THREE.Color instances
  const baseColors = useMemo(
    () => nodes.map((n) => new THREE.Color(getCategoryColor(n.category))),
    [nodes]
  );

  // Neighbor set for focused node
  const focusNeighbors = useMemo(() => {
    if (!focusedNodeId) return null;
    return neighborMap.get(focusedNodeId) ?? new Set<string>();
  }, [focusedNodeId, neighborMap]);

  // Initial setup — set colors on first render
  useMemo(() => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    for (let i = 0; i < nodes.length; i++) {
      mesh.setColorAt(i, baseColors[i]);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [nodes, baseColors]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    const time = clock.getElapsedTime();

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const baseRadius = radii[i];

      // Pulse: ±5%, 3s period, offset per node
      const pulse = 1 + 0.05 * Math.sin(time * ((2 * Math.PI) / 3) + i * 0.7);
      const scale = baseRadius * pulse;

      tempObject.position.set(node.x, node.y, node.z);
      tempObject.scale.set(scale, scale, scale);
      tempObject.updateMatrix();
      mesh.setMatrixAt(i, tempObject.matrix);

      // Focus dimming
      if (focusNeighbors) {
        const isFocused = node.id === focusedNodeId;
        const isNeighbor = focusNeighbors.has(node.id);
        const opacity = isFocused || isNeighbor ? 1.0 : 0.1;
        tempColor
          .copy(baseColors[i])
          .multiplyScalar(opacity);
        mesh.setColorAt(i, tempColor);
      } else {
        mesh.setColorAt(i, baseColors[i]);
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, nodes.length]}
      userData={{ nodeIndexMap }}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        emissive="white"
        emissiveIntensity={1.5}
        toneMapped={false}
      />
    </instancedMesh>
  );
}
```

Key details:
- Single `InstancedMesh` — one draw call for all 315 nodes
- Per-instance color via `setColorAt` (overrides emissive with category color)
- Per-instance scale via matrix transforms (pulse animation in `useFrame`)
- Focus dimming: non-neighbor nodes dim to 10% color intensity
- `toneMapped={false}` ensures bloom picks up the emissive color correctly
- `userData.nodeIndexMap` stored for raycasting in NodeInteraction component

- [ ] **Step 2: Update page.tsx to render InstancedNodes**

In `src/app/page.tsx`, replace the placeholder `<mesh>` with the real component:

```tsx
"use client";

import { GraphCanvas } from "@/components/GraphCanvas";
import { InstancedNodes } from "@/components/InstancedNodes";
import { useGraphData } from "@/hooks/useGraphData";

export default function Home() {
  const { nodes, neighborMap, loading, error } = useGraphData();

  if (loading) {
    return (
      <main className="h-screen w-screen flex items-center justify-center">
        <p className="text-slate-500 text-sm animate-pulse">Loading graph...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="h-screen w-screen flex items-center justify-center">
        <p className="text-red-400 text-sm">{error}</p>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen relative">
      <GraphCanvas>
        <InstancedNodes nodes={nodes} neighborMap={neighborMap} />
      </GraphCanvas>
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Visit `http://localhost:3000`. Should see 315 glowing spheres of various colors and sizes spread across the scene. Spheres should gently pulse. Dark background with bloom glow.

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/components/InstancedNodes.tsx src/app/page.tsx
git commit -m "feat: InstancedMesh rendering for all nodes (single draw call)"
```

---

## Task 10: Edges Rendering

**Files:**
- Create: `src/components/Edges.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Edges component**

Create `src/components/Edges.tsx`:

**CRITICAL:** Do NOT rebuild geometry on focus change. Build a single `BufferGeometry` once with position + color attributes. On focus change, mutate only the color/alpha values in the existing buffer and flag `needsUpdate = true`. Rebuilding geometry on every click causes GPU upload stutter that ruins the camera fly-in.

```tsx
"use client";

import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import type { GraphNode, GraphLink } from "@/lib/types";
import { useGraphState } from "@/hooks/useGraphState";

interface EdgesProps {
  nodes: GraphNode[];
  links: GraphLink[];
}

const DEFAULT_ALPHA = 0.15;
const FOCUS_ALPHA = 0.75;
const DIMMED_ALPHA = 0.03;

export function Edges({ nodes, links }: EdgesProps) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const focusedNodeId = useGraphState((s) => s.focusedNodeId);

  const nodeMap = useMemo(() => {
    const m = new Map<string, GraphNode>();
    for (const n of nodes) m.set(n.id, n);
    return m;
  }, [nodes]);

  // Build geometry ONCE with position + color attributes
  const { geometry, linkSourceTargets } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    if (links.length === 0) return { geometry: geo, linkSourceTargets: [] };

    const positions: number[] = [];
    const colors: number[] = [];
    const sourceTargets: Array<{ source: string; target: string }> = [];

    for (const link of links) {
      const source = nodeMap.get(link.source);
      const target = nodeMap.get(link.target);
      if (!source || !target) continue;

      positions.push(source.x, source.y, source.z);
      positions.push(target.x, target.y, target.z);
      // Default: white at DEFAULT_ALPHA
      colors.push(1, 1, 1, DEFAULT_ALPHA);
      colors.push(1, 1, 1, DEFAULT_ALPHA);
      sourceTargets.push({ source: link.source, target: link.target });
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 4));

    return { geometry: geo, linkSourceTargets: sourceTargets };
  }, [links, nodes, nodeMap]);

  // Mutate color attribute on focus change — no geometry rebuild
  useEffect(() => {
    const colorAttr = geometry.getAttribute("color") as THREE.BufferAttribute;
    if (!colorAttr || linkSourceTargets.length === 0) return;

    for (let i = 0; i < linkSourceTargets.length; i++) {
      const { source, target } = linkSourceTargets[i];
      let alpha: number;

      if (focusedNodeId) {
        const isFocusEdge = source === focusedNodeId || target === focusedNodeId;
        alpha = isFocusEdge ? FOCUS_ALPHA : DIMMED_ALPHA;
      } else {
        alpha = DEFAULT_ALPHA;
      }

      // Each link has 2 vertices, each with 4 color components (RGBA)
      const idx = i * 2;
      colorAttr.setW(idx, alpha);
      colorAttr.setW(idx + 1, alpha);
    }

    colorAttr.needsUpdate = true;
  }, [focusedNodeId, geometry, linkSourceTargets]);

  if (links.length === 0) return null;

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial vertexColors transparent />
    </lineSegments>
  );
}
```

- [ ] **Step 2: Update page.tsx — add links to data flow and render Edges**

In `src/hooks/useGraphData.ts`, add `links` to the return value. Add to the interface:

```typescript
// Add to GraphDataResult interface:
links: GraphLink[];

// Add to state:
const [links, setLinks] = useState<GraphLink[]>([]);

// In load(), after setNeighborMap:
setLinks(data.links);

// In return:
return { nodes, links, neighborMap, generatedAt, loading, error };
```

Then update `src/app/page.tsx` — add `links` destructuring and `<Edges>`:

```tsx
"use client";

import { GraphCanvas } from "@/components/GraphCanvas";
import { InstancedNodes } from "@/components/InstancedNodes";
import { Edges } from "@/components/Edges";
import { useGraphData } from "@/hooks/useGraphData";

export default function Home() {
  const { nodes, links, neighborMap, loading, error } = useGraphData();

  if (loading) {
    return (
      <main className="h-screen w-screen flex items-center justify-center">
        <p className="text-slate-500 text-sm animate-pulse">Loading graph...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="h-screen w-screen flex items-center justify-center">
        <p className="text-red-400 text-sm">{error}</p>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen relative">
      <GraphCanvas>
        <Edges nodes={nodes} links={links} />
        <InstancedNodes nodes={nodes} neighborMap={neighborMap} />
      </GraphCanvas>
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Edges currently won't be visible (0 links in data). Verify no errors. When links are populated later, they'll render as faint white lines.

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/components/Edges.tsx src/hooks/useGraphData.ts src/app/page.tsx
git commit -m "feat: edge rendering with focus-state opacity transitions"
```

---

## Task 11: CameraController — OrbitControls + Fly-to-Focus

**Files:**
- Create: `src/components/CameraController.tsx`
- Create: `src/hooks/useCameraAnimation.ts`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create useCameraAnimation hook**

Create `src/hooks/useCameraAnimation.ts`:

```typescript
"use client";

import { useRef, useCallback } from "react";
import * as THREE from "three";

interface CameraAnimationState {
  active: boolean;
  startPosition: THREE.Vector3;
  startTarget: THREE.Vector3;
  endPosition: THREE.Vector3;
  endTarget: THREE.Vector3;
  progress: number;
}

const ANIMATION_SPEED = 1.8; // units per second (0→1 in ~0.55s)
const ARC_HEIGHT = 15; // how high the camera arcs above the direct path

export function useCameraAnimation() {
  const stateRef = useRef<CameraAnimationState>({
    active: false,
    startPosition: new THREE.Vector3(),
    startTarget: new THREE.Vector3(),
    endPosition: new THREE.Vector3(),
    endTarget: new THREE.Vector3(),
    progress: 0,
  });

  const flyTo = useCallback(
    (
      targetPos: THREE.Vector3,
      currentCameraPos: THREE.Vector3,
      currentTarget: THREE.Vector3
    ) => {
      const state = stateRef.current;
      state.active = true;
      state.startPosition.copy(currentCameraPos);
      state.startTarget.copy(currentTarget);

      // Camera end position: offset from node so we're looking at it
      const direction = new THREE.Vector3()
        .subVectors(currentCameraPos, targetPos)
        .normalize();
      state.endPosition.copy(targetPos).addScaledVector(direction, 25);
      state.endTarget.copy(targetPos);
      state.progress = 0;
    },
    []
  );

  const resetTo = useCallback(
    (position: THREE.Vector3, target: THREE.Vector3) => {
      const state = stateRef.current;
      state.active = true;
      state.startPosition.copy(
        state.active ? state.endPosition : position
      );
      state.startTarget.copy(state.active ? state.endTarget : target);
      // Pull back to overview
      state.endPosition.copy(position);
      state.endTarget.copy(target);
      state.progress = 0;
    },
    []
  );

  const update = useCallback(
    (
      delta: number,
      camera: THREE.Camera,
      controls: { target: THREE.Vector3 } | null
    ): boolean => {
      const state = stateRef.current;
      if (!state.active) return false;

      state.progress = Math.min(state.progress + delta * ANIMATION_SPEED, 1);
      // Smooth ease-in-out
      const t =
        state.progress < 0.5
          ? 4 * state.progress ** 3
          : 1 - (-2 * state.progress + 2) ** 3 / 2;

      // Arc relative to flight trajectory (not global Y) to avoid gimbal trap
      const arcT = Math.sin(t * Math.PI) * ARC_HEIGHT;
      const flightPath = new THREE.Vector3().subVectors(
        state.endPosition,
        state.startPosition
      );
      const arcDirection = new THREE.Vector3()
        .crossVectors(flightPath, new THREE.Vector3(0, 1, 0))
        .normalize();
      // Fallback for vertical flights (cross product would be zero)
      if (arcDirection.lengthSq() < 0.001) arcDirection.set(1, 0, 0);

      camera.position.lerpVectors(
        state.startPosition,
        state.endPosition,
        t
      );
      camera.position.addScaledVector(arcDirection, arcT * (1 - t));

      if (controls) {
        controls.target.lerpVectors(
          state.startTarget,
          state.endTarget,
          t
        );
      }

      if (state.progress >= 1) {
        state.active = false;
      }

      return state.active;
    },
    []
  );

  return { flyTo, resetTo, update, stateRef };
}
```

- [ ] **Step 2: Create CameraController component**

Create `src/components/CameraController.tsx`:

```tsx
"use client";

import { useRef, useEffect, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { GraphNode } from "@/lib/types";
import { useGraphState } from "@/hooks/useGraphState";
import { useCameraAnimation } from "@/hooks/useCameraAnimation";

interface CameraControllerProps {
  nodes: GraphNode[];
}

const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 0, 120);
const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0);

export function CameraController({ nodes }: CameraControllerProps) {
  const controlsRef = useRef<any>(null);
  const focusedNodeId = useGraphState((s) => s.focusedNodeId);
  const { flyTo, resetTo, update } = useCameraAnimation();
  const { camera } = useThree();

  const nodeMap = useMemo(() => {
    const m = new Map<string, GraphNode>();
    for (const n of nodes) m.set(n.id, n);
    return m;
  }, [nodes]);

  // Saved orbit position for reset
  const savedOrbitRef = useRef({
    position: DEFAULT_CAMERA_POS.clone(),
    target: DEFAULT_TARGET.clone(),
  });

  useEffect(() => {
    if (focusedNodeId) {
      const node = nodeMap.get(focusedNodeId);
      if (!node) return;
      // Save current orbit state before flying
      savedOrbitRef.current.position.copy(camera.position);
      if (controlsRef.current) {
        savedOrbitRef.current.target.copy(controlsRef.current.target);
      }
      flyTo(
        new THREE.Vector3(node.x, node.y, node.z),
        camera.position.clone(),
        controlsRef.current?.target.clone() ?? DEFAULT_TARGET.clone()
      );
    } else {
      resetTo(
        savedOrbitRef.current.position,
        savedOrbitRef.current.target
      );
    }
  }, [focusedNodeId, nodeMap, camera, flyTo, resetTo]);

  useFrame((_, delta) => {
    const animating = update(delta, camera, controlsRef.current);
    if (controlsRef.current) {
      controlsRef.current.enabled = !animating;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      minDistance={10}
      maxDistance={200}
      makeDefault
    />
  );
}
```

- [ ] **Step 3: Update page.tsx to include CameraController**

Add to page.tsx inside `<GraphCanvas>`:

```tsx
import { CameraController } from "@/components/CameraController";

// Inside <GraphCanvas>, after <InstancedNodes>:
<CameraController nodes={nodes} />
```

- [ ] **Step 4: Verify in browser**

Should be able to orbit (drag), zoom (scroll), pan (right-drag) around the node cloud. Focus fly-to will be tested after NodeInteraction is added.

- [ ] **Step 5: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/components/CameraController.tsx src/hooks/useCameraAnimation.ts src/app/page.tsx
git commit -m "feat: camera controller with orbit controls and arc fly-to animation"
```

---

## Task 12: Node Interaction — Raycasting + Hover + Click

**Files:**
- Create: `src/components/NodeInteraction.tsx`
- Create: `src/components/Tooltip.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create NodeInteraction component**

This component handles raycasting against the InstancedMesh. It needs to be a sibling to InstancedNodes and read the mesh from a shared ref. We'll use a React context pattern via the parent.

Actually, simpler approach — attach pointer events directly to the `<instancedMesh>`. But r3f pointer events on InstancedMesh provide `instanceId` in the intersection. Let's move the event handling into InstancedNodes.

Update `src/components/InstancedNodes.tsx` — add `onPointerMove` and `onPointerDown`:

At the end of the component, before the return, add:

```tsx
const setHoveredNode = useGraphState((s) => s.setHoveredNode);
const setFocusedNode = useGraphState((s) => s.setFocusedNode);

const handlePointerMove = useCallback(
  (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    // Clear any pending pointer-out debounce
    if (pointerOutTimer.current) clearTimeout(pointerOutTimer.current);
    const instanceId = e.instanceId;
    if (instanceId !== undefined) {
      const nodeId = nodeIndexMap.get(instanceId) ?? null;
      setHoveredNode(nodeId);
      document.body.style.cursor = "pointer";
    }
  },
  [nodeIndexMap, setHoveredNode]
);

// Debounce pointer out by 50ms to prevent cursor flicker in dense clusters
const pointerOutTimer = useRef<ReturnType<typeof setTimeout>>(null);
const handlePointerOut = useCallback(() => {
  pointerOutTimer.current = setTimeout(() => {
    setHoveredNode(null);
    document.body.style.cursor = "default";
  }, 50);
  return () => {
    if (pointerOutTimer.current) clearTimeout(pointerOutTimer.current);
  };
}, [setHoveredNode]);

const handleClick = useCallback(
  (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const instanceId = e.instanceId;
    if (instanceId !== undefined) {
      const nodeId = nodeIndexMap.get(instanceId) ?? null;
      setFocusedNode(nodeId);
    }
  },
  [nodeIndexMap, setFocusedNode]
);
```

Add these imports at the top:

```tsx
import { useCallback } from "react";
import type { ThreeEvent } from "@react-three/fiber";
```

Update the `<instancedMesh>` JSX to include handlers:

```tsx
return (
  <instancedMesh
    ref={meshRef}
    args={[undefined, undefined, nodes.length]}
    onPointerMove={handlePointerMove}
    onPointerOut={handlePointerOut}
    onClick={handleClick}
  >
    <sphereGeometry args={[1, 16, 16]} />
    <meshStandardMaterial
      emissive="white"
      emissiveIntensity={1.5}
      toneMapped={false}
    />
  </instancedMesh>
);
```

- [ ] **Step 2: Handle Esc and background click to clear focus**

Add to `src/app/page.tsx`, inside the `Home` component before the return:

```tsx
const clearFocus = useGraphState((s) => s.clearFocus);

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      clearFocus();
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [clearFocus]);
```

Also add `onPointerMissed` to the `<Canvas>` in GraphCanvas.tsx to clear focus on background click:

In `GraphCanvas.tsx`, accept and pass through an `onPointerMissed` prop:

```tsx
interface GraphCanvasProps {
  children: React.ReactNode;
  onPointerMissed?: () => void;
}

// On the <Canvas>:
onPointerMissed={onPointerMissed}
```

In `page.tsx`:
```tsx
<GraphCanvas onPointerMissed={clearFocus}>
```

- [ ] **Step 3: Create Tooltip component**

Create `src/components/Tooltip.tsx`:

```tsx
"use client";

import { useMemo } from "react";
import { Html } from "@react-three/drei";
import type { GraphNode } from "@/lib/types";
import { getCategoryColor } from "@/lib/categories";
import { useGraphState } from "@/hooks/useGraphState";

interface TooltipProps {
  nodes: GraphNode[];
}

export function Tooltip({ nodes }: TooltipProps) {
  const hoveredNodeId = useGraphState((s) => s.hoveredNodeId);
  const focusedNodeId = useGraphState((s) => s.focusedNodeId);

  const nodeMap = useMemo(() => {
    const m = new Map<string, GraphNode>();
    for (const n of nodes) m.set(n.id, n);
    return m;
  }, [nodes]);

  // Don't show tooltip when article panel is open (focused)
  if (focusedNodeId || !hoveredNodeId) return null;

  const node = nodeMap.get(hoveredNodeId);
  if (!node) return null;

  const color = getCategoryColor(node.category);

  return (
    <Html
      position={[node.x, node.y + 2, node.z]}
      center
      style={{ pointerEvents: "none" }}
    >
      <div className="glass rounded-lg px-3 py-2 max-w-[240px] shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <span className="text-white text-sm font-medium truncate">
            {node.title}
          </span>
        </div>
        {node.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {node.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Html>
  );
}
```

- [ ] **Step 4: Add Tooltip to page.tsx**

```tsx
import { Tooltip } from "@/components/Tooltip";

// Inside <GraphCanvas>, after <InstancedNodes>:
<Tooltip nodes={nodes} />
```

- [ ] **Step 5: Verify in browser**

- Hover over a node → tooltip appears with title, category dot, tags
- Click a node → camera flies to it, other nodes dim
- Press Esc → camera returns, all nodes restore
- Click empty space → same as Esc

- [ ] **Step 6: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/components/InstancedNodes.tsx src/components/Tooltip.tsx src/components/GraphCanvas.tsx src/app/page.tsx
git commit -m "feat: node hover tooltips and click-to-focus interaction"
```

---

## Task 13: Command Palette (cmdk)

**Files:**
- Create: `src/components/CommandPalette.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create CommandPalette component**

Create `src/components/CommandPalette.tsx`:

```tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { Command } from "cmdk";
import type { GraphNode } from "@/lib/types";
import { getCategoryColor, CATEGORY_COLORS } from "@/lib/categories";
import { useGraphState } from "@/hooks/useGraphState";

interface CommandPaletteProps {
  nodes: GraphNode[];
}

export function CommandPalette({ nodes }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const setFocusedNode = useGraphState((s) => s.setFocusedNode);
  const setFilterCategory = useGraphState((s) => s.setFilterCategory);

  // Open on "/" keypress (unless already typing in an input)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !open &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Parse category filter from search (e.g., "cat:projects")
  const { filterCategory, cleanSearch } = useMemo(() => {
    const catMatch = search.match(/^cat:(\w+)\s*(.*)/);
    if (catMatch) {
      return { filterCategory: catMatch[1], cleanSearch: catMatch[2] };
    }
    const fromMatch = search.match(/^from:(\w+)\s*(.*)/);
    if (fromMatch) {
      return { filterCategory: null, cleanSearch: fromMatch[2] };
    }
    return { filterCategory: null, cleanSearch: search };
  }, [search]);

  const filteredNodes = useMemo(() => {
    let filtered = nodes;
    if (filterCategory) {
      filtered = filtered.filter((n) => n.category === filterCategory);
    }
    return filtered;
  }, [nodes, filterCategory]);

  const handleSelect = (nodeId: string) => {
    setFocusedNode(nodeId);
    setOpen(false);
    setSearch("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => {
          setOpen(false);
          setSearch("");
        }}
      />
      <Command
        className="glass rounded-xl w-[560px] max-h-[400px] overflow-hidden shadow-2xl relative z-10"
        shouldFilter={true}
      >
        <Command.Input
          value={search}
          onValueChange={setSearch}
          placeholder="Search nodes... (cat:projects, from:github)"
          className="w-full px-4 py-3 bg-transparent text-white text-sm outline-none border-b border-white/10 placeholder:text-slate-500"
          autoFocus
        />
        <Command.List className="max-h-[320px] overflow-y-auto p-2">
          <Command.Empty className="px-4 py-8 text-center text-slate-500 text-sm">
            No nodes found.
          </Command.Empty>

          {/* Category groups */}
          {Object.keys(CATEGORY_COLORS).map((category) => {
            const categoryNodes = filteredNodes.filter(
              (n) => n.category === category
            );
            if (categoryNodes.length === 0) return null;

            return (
              <Command.Group
                key={category}
                heading={category}
                className="[&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-slate-500 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1"
              >
                {categoryNodes.map((node) => (
                  <Command.Item
                    key={node.id}
                    value={`${node.title} ${node.tags.join(" ")}`}
                    onSelect={() => handleSelect(node.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm text-slate-300 data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: getCategoryColor(node.category),
                      }}
                    />
                    <span className="truncate">{node.title}</span>
                    <span className="ml-auto text-[10px] text-slate-600">
                      {node.category}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            );
          })}
        </Command.List>
      </Command>
    </div>
  );
}
```

- [ ] **Step 2: Add CommandPalette to page.tsx**

Add outside the `<GraphCanvas>` (it's a DOM overlay, not a 3D element):

```tsx
import { CommandPalette } from "@/components/CommandPalette";

// After </GraphCanvas>, still inside <main>:
<CommandPalette nodes={nodes} />
```

- [ ] **Step 3: Verify in browser**

- Press `/` → command palette opens
- Type a node name → fuzzy search filters results
- Type `cat:projects` → only project nodes shown
- Select a result → camera flies to that node
- `Esc` → palette closes

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/components/CommandPalette.tsx src/app/page.tsx
git commit -m "feat: cmdk command palette with category/source filtering"
```

---

## Task 14: Article Panel (Glassmorphic + Wikilink Navigation)

**Files:**
- Create: `src/components/ArticlePanel.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create ArticlePanel component**

Create `src/components/ArticlePanel.tsx`:

```tsx
"use client";

import { useMemo, useEffect, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import type { GraphNode } from "@/lib/types";
import { getCategoryColor } from "@/lib/categories";
import { useGraphState } from "@/hooks/useGraphState";

interface ArticlePanelProps {
  nodes: GraphNode[];
}

export function ArticlePanel({ nodes }: ArticlePanelProps) {
  const focusedNodeId = useGraphState((s) => s.focusedNodeId);
  const setFocusedNode = useGraphState((s) => s.setFocusedNode);
  const [articleContent, setArticleContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const nodeMap = useMemo(() => {
    const m = new Map<string, GraphNode>();
    for (const n of nodes) m.set(n.id, n);
    return m;
  }, [nodes]);

  const focusedNode = focusedNodeId ? nodeMap.get(focusedNodeId) : null;

  // Fetch article content from the daemon
  useEffect(() => {
    if (!focusedNodeId) {
      setArticleContent(null);
      return;
    }

    setLoading(true);
    // Try fetching from daemon's wiki endpoint
    fetch(`http://localhost:3577/wiki/${focusedNodeId}`)
      .then((res) => {
        if (!res.ok) return null;
        return res.text();
      })
      .then((text) => {
        setArticleContent(text);
        setLoading(false);
      })
      .catch(() => {
        setArticleContent(null);
        setLoading(false);
      });
  }, [focusedNodeId]);

  // Wikilink clicks use CustomEvent dispatched from DOM event delegation.
  // This avoids coupling the remark plugin to React state.
  // page.tsx listens for 'brain:focus' and calls setFocusedNode.
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("wikilink")) {
        const slug = target.dataset.slug;
        if (slug) {
          window.dispatchEvent(
            new CustomEvent("brain:focus", { detail: slug })
          );
        }
      }
    },
    []
  );

  if (!focusedNode) return null;

  const color = getCategoryColor(focusedNode.category);

  return (
    <div className="fixed right-0 top-0 h-full w-[400px] z-40 animate-slide-in">
      <div className="h-full glass rounded-l-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-[10px] uppercase tracking-wider text-slate-400">
              {focusedNode.category}
            </span>
          </div>
          <h2 className="text-white text-lg font-semibold leading-tight">
            {focusedNode.title}
          </h2>
          <div className="mt-2 text-[11px] text-slate-500">
            {new Date(focusedNode.created_at).toLocaleDateString()}
          </div>
          {focusedNode.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {focusedNode.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto px-5 py-4"
          onClick={handleClick}
        >
          {loading ? (
            <p className="text-slate-500 text-sm animate-pulse">
              Loading article...
            </p>
          ) : articleContent ? (
            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-slate-200 prose-p:text-slate-400 prose-a:text-cyan-400 prose-strong:text-slate-300 prose-code:text-cyan-300">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  // Render wikilinks as clickable spans
                  p: ({ children }) => {
                    return <p>{children}</p>;
                  },
                }}
              >
                {articleContent}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-slate-500 text-sm">
              <p className="mb-2">Article preview unavailable.</p>
              <p className="text-[11px]">
                Start the brain daemon locally to view full articles.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add slide-in animation to globals.css**

Append to `src/app/globals.css`:

```css
@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}

/* Wikilink styling */
.wikilink {
  color: #06b6d4;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
}
.wikilink:hover {
  color: #22d3ee;
}
```

- [ ] **Step 3: Add ArticlePanel to page.tsx**

```tsx
import { ArticlePanel } from "@/components/ArticlePanel";

// After <CommandPalette>, still inside <main>:
<ArticlePanel nodes={nodes} />
```

- [ ] **Step 4: Note — Article content endpoint**

The article panel fetches from `http://localhost:3577/wiki/:id`. This endpoint doesn't exist yet in the brain daemon. For v1, the panel will show the node metadata (title, tags, category, date) which is already available from graph.json. The "Article preview unavailable" fallback is fine for the deployed version — full content viewing requires the daemon running locally.

**Future task (not in this plan):** Add `GET /wiki/:path` to the brain daemon that reads and returns wiki article markdown content.

- [ ] **Step 5: Verify in browser**

Click a node → panel slides in from right with glassmorphic styling. Shows title, category, tags, date. Article content shows "preview unavailable" (expected — no wiki endpoint yet).

- [ ] **Step 6: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/components/ArticlePanel.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: glassmorphic article panel with slide-in animation"
```

---

## Task 15: Admin Refresh + Graph Metadata

**Files:**
- Create: `src/components/AdminRefresh.tsx`
- Create: `src/components/GraphMeta.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create AdminRefresh component**

Create `src/components/AdminRefresh.tsx`:

**IMPORTANT:** This is a keyboard-shortcut-only feature (Cmd+Shift+R / Ctrl+Shift+R). No visible button. The HTTPS production site cannot fetch HTTP localhost (mixed content policy). This only works when running the dev server locally with the daemon also running.

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";

type Status = "idle" | "checking" | "pushing" | "success" | "unreachable";

const STATUS_CONFIG: Record<Status, { label: string; color: string }> = {
  idle: { label: "", color: "" },
  checking: { label: "Checking daemon...", color: "#e2e8f0" },
  pushing: { label: "Deploying... graph will update in ~60s", color: "#00D1FF" },
  success: { label: "Graph pushed successfully", color: "#00FF41" },
  unreachable: { label: "Daemon unreachable (local dev only)", color: "#f87171" },
};

export function AdminRefresh() {
  const [status, setStatus] = useState<Status>("idle");

  const handleRefresh = useCallback(async () => {
    setStatus("checking");
    try {
      const healthRes = await fetch("http://localhost:3577/health", {
        signal: AbortSignal.timeout(3000),
      });
      if (!healthRes.ok) throw new Error("unhealthy");

      setStatus("pushing");
      const pushRes = await fetch("http://localhost:3577/graph-push", {
        method: "POST",
        signal: AbortSignal.timeout(30000),
      });
      if (!pushRes.ok) throw new Error("push failed");

      setStatus("success");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("unreachable");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }, []);

  // Cmd+Shift+R (Mac) / Ctrl+Shift+R (other) triggers refresh
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "R" && e.shiftKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleRefresh();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRefresh]);

  if (status === "idle") return null;

  const { label, color } = STATUS_CONFIG[status];

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <span
        className="text-[11px] font-mono animate-fade-in"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Create GraphMeta component**

Create `src/components/GraphMeta.tsx`:

```tsx
"use client";

import { useMemo } from "react";

interface GraphMetaProps {
  nodeCount: number;
  generatedAt: string;
}

export function GraphMeta({ nodeCount, generatedAt }: GraphMetaProps) {
  const timeAgo = useMemo(() => {
    if (!generatedAt) return "";
    const ms = Date.now() - new Date(generatedAt).getTime();
    const minutes = Math.floor(ms / 60000);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }, [generatedAt]);

  return (
    <div className="fixed bottom-4 left-4 z-30 opacity-20 hover:opacity-60 transition-opacity">
      <div className="text-[11px] text-slate-500 space-y-0.5">
        <div>{nodeCount} nodes</div>
        {timeAgo && <div>Updated {timeAgo}</div>}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add both to page.tsx**

```tsx
import { AdminRefresh } from "@/components/AdminRefresh";
import { GraphMeta } from "@/components/GraphMeta";

// After <ArticlePanel>, still inside <main>:
<GraphMeta nodeCount={nodes.length} generatedAt={generatedAt} />
<AdminRefresh />
```

- [ ] **Step 4: Verify in browser**

- Bottom-left: "315 nodes" + "Updated Xh ago" at low opacity
- Bottom-right: no visible button (keyboard shortcut only)
- Press Cmd+Shift+R: if daemon running → pushes graph (cyan status text); if not → "Daemon unreachable" (red, fades)
- On production HTTPS site: Cmd+Shift+R will show "Daemon unreachable" (expected — mixed content)

- [ ] **Step 5: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/components/AdminRefresh.tsx src/components/GraphMeta.tsx src/app/page.tsx
git commit -m "feat: admin refresh button and graph metadata display"
```

---

## Task 16: URL Deep-linking

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add URL parameter handling**

In `src/app/page.tsx`, add deep-linking logic:

```tsx
import { useEffect } from "react";
import { useGraphState } from "@/hooks/useGraphState";

// Inside the Home component, after hooks:

const setFocusedNode = useGraphState((s) => s.setFocusedNode);
const focusedNodeId = useGraphState((s) => s.focusedNodeId);

// Read ?focus= on initial load
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const focusParam = params.get("focus");
  if (focusParam && nodes.length > 0) {
    // Find matching node
    const match = nodes.find((n) => n.id === focusParam);
    if (match) {
      setFocusedNode(match.id);
    }
  }
}, [nodes, setFocusedNode]);

// Update URL when focus changes
useEffect(() => {
  const url = new URL(window.location.href);
  if (focusedNodeId) {
    url.searchParams.set("focus", focusedNodeId);
  } else {
    url.searchParams.delete("focus");
  }
  window.history.replaceState({}, "", url.toString());
}, [focusedNodeId]);
```

- [ ] **Step 2: Verify**

- Visit `http://localhost:3000?focus=projects/karen.md` → should auto-focus that node
- Click a node → URL updates to include `?focus=...`
- Press Esc → `?focus=` removed from URL

- [ ] **Step 3: Commit**

```bash
cd ~/Desktop/brain-explorer
git add src/app/page.tsx
git commit -m "feat: URL deep-linking with ?focus= parameter"
```

---

## Task 17: Final Assembly — Complete page.tsx

**Files:**
- Modify: `src/app/page.tsx` (final version, all components wired)

- [ ] **Step 1: Write final page.tsx**

This assembles all components. Full file:

```tsx
"use client";

import { useEffect } from "react";
import { GraphCanvas } from "@/components/GraphCanvas";
import { InstancedNodes } from "@/components/InstancedNodes";
import { Edges } from "@/components/Edges";
import { CameraController } from "@/components/CameraController";
import { Tooltip } from "@/components/Tooltip";
import { CommandPalette } from "@/components/CommandPalette";
import { ArticlePanel } from "@/components/ArticlePanel";
import { AdminRefresh } from "@/components/AdminRefresh";
import { GraphMeta } from "@/components/GraphMeta";
import { useGraphData } from "@/hooks/useGraphData";
import { useGraphState } from "@/hooks/useGraphState";

export default function Home() {
  const { nodes, links, neighborMap, generatedAt, loading, error } =
    useGraphData();
  const clearFocus = useGraphState((s) => s.clearFocus);
  const setFocusedNode = useGraphState((s) => s.setFocusedNode);
  const focusedNodeId = useGraphState((s) => s.focusedNodeId);

  // Esc to clear focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") clearFocus();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clearFocus]);

  // Listen for wikilink CustomEvent from ArticlePanel
  useEffect(() => {
    const handler = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail;
      if (slug) setFocusedNode(slug);
    };
    window.addEventListener("brain:focus", handler);
    return () => window.removeEventListener("brain:focus", handler);
  }, [setFocusedNode]);

  // Deep-link: read ?focus= on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const focusParam = params.get("focus");
    if (focusParam && nodes.length > 0) {
      const match = nodes.find((n) => n.id === focusParam);
      if (match) setFocusedNode(match.id);
    }
  }, [nodes, setFocusedNode]);

  // Deep-link: update URL on focus change
  useEffect(() => {
    const url = new URL(window.location.href);
    if (focusedNodeId) {
      url.searchParams.set("focus", focusedNodeId);
    } else {
      url.searchParams.delete("focus");
    }
    window.history.replaceState({}, "", url.toString());
  }, [focusedNodeId]);

  if (loading) {
    return (
      <main className="h-screen w-screen flex items-center justify-center">
        <p className="text-slate-500 text-sm animate-pulse">Loading graph...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="h-screen w-screen flex items-center justify-center">
        <p className="text-red-400 text-sm">{error}</p>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen relative">
      <GraphCanvas onPointerMissed={clearFocus}>
        <Edges nodes={nodes} links={links} />
        <InstancedNodes nodes={nodes} neighborMap={neighborMap} />
        <CameraController nodes={nodes} />
        <Tooltip nodes={nodes} />
      </GraphCanvas>

      <CommandPalette nodes={nodes} />
      <ArticlePanel nodes={nodes} />
      <GraphMeta nodeCount={nodes.length} generatedAt={generatedAt} />
      <AdminRefresh />
    </main>
  );
}
```

- [ ] **Step 2: Run tests**

```bash
cd ~/Desktop/brain-explorer && pnpm test
```

All unit tests should pass (graph-data, categories, force-layout, wikilink-plugin, useGraphState).

- [ ] **Step 3: Run build**

```bash
cd ~/Desktop/brain-explorer && pnpm build
```

Should produce a static export in `out/`. Fix any TypeScript errors.

- [ ] **Step 4: Commit**

```bash
cd ~/Desktop/brain-explorer
git add -A
git commit -m "feat: complete brain explorer assembly — all components integrated"
```

---

## Task 18: Deploy to Vercel

**Files:**
- No new files (repo setup and Vercel config already done)

- [ ] **Step 1: Create GitHub repo**

```bash
cd ~/Desktop/brain-explorer
gh repo create rahilsinghi/brain-explorer --public --source=. --push
```

- [ ] **Step 2: Connect Vercel**

```bash
cd ~/Desktop/brain-explorer
pnpm add -g vercel
vercel link --yes
vercel domains add brain.rahilsinghi.com
```

Or connect via Vercel dashboard: import `rahilsinghi/brain-explorer`, assign `brain.rahilsinghi.com`.

- [ ] **Step 3: Configure brain daemon explorer_repo_path**

In the brain repo, update `.brain/config.yaml`:

```yaml
graph:
  explorer_repo_path: ~/Desktop/brain-explorer
```

- [ ] **Step 4: Push initial graph data**

```bash
curl -X POST http://localhost:3577/graph-push
```

This writes `graph.json` to the explorer repo, commits, and pushes — triggering a Vercel deploy.

- [ ] **Step 5: Verify deployment**

Visit `https://brain.rahilsinghi.com` — should show the full 3D knowledge graph.

- [ ] **Step 6: Commit any deploy config changes**

```bash
cd ~/Desktop/brain-explorer
git add -A
git commit -m "chore: vercel deployment configuration"
git push
```

---

## Spec Coverage Verification

| Spec Section | Task(s) | Status |
|---|---|---|
| 2. Tech Stack | Task 1 | All deps installed |
| 3. Data Pipeline | Tasks 2, 5, 7 | Fetch, normalize, collision layout |
| 4.1 Color Palette | Task 3 | All 8 categories mapped |
| 4.2 Node Rendering (InstancedMesh) | Task 9 | Single draw call, per-instance color/scale |
| 4.3 Edge Rendering | Task 10 | Default 15%, focus 75% |
| 4.4 Bloom Tuning | Task 8 | intensity 2.2, threshold 0.6 |
| 4.5 v1 Scope | Tasks 8-10 | Nodes, edges, bloom, pulse |
| 5.1 Default State | Task 8, 11 | Full-screen canvas, OrbitControls |
| 5.2 Hover Tooltip | Task 12 | drei Html, single tooltip |
| 5.3 Command Palette | Task 13 | cmdk, cat: filter, from: filter |
| 5.4 Focus Mode | Tasks 11, 12 | Arc fly-in, dimming, panel |
| 5.5 Article Panel | Task 14 | Glassmorphic, react-markdown, wikilinks |
| 5.6 Admin Refresh | Task 15 | Cmd+Shift+R keyboard shortcut, local dev only (HTTPS mixed content) |
| 5.7 Graph Metadata | Task 15 | Node count, time ago |
| 5.8 URL Deep-linking | Task 16 | ?focus= read/write |
| 6. Project Structure | All | Matches spec layout |
| 8. Deployment | Task 18 | Vercel + brain.rahilsinghi.com |
