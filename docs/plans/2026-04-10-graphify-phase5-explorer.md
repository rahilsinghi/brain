# Graphify Phase 5 — Explorer Integration

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two-layer visualization (wiki + code) to the Brain Explorer frontend with layer toggling, drill-in UX for repo nodes, god-node background rendering, code-node cube geometry, and centrality-capped summon animations.

**Architecture:** The daemon (Phases 1-4) produces a unified `GraphCache` where each `GraphNode` has `layer`, `is_god_node`, `community`, `repo` and each `GraphLink` has `relation`, `confidence`. The explorer parses these, filters/displays by layer mode, renders code nodes as green cubes, and handles drill-in reveals.

**Spec:** `docs/specs/2026-04-10-brain-graphify-fusion-design.md` — Sections 6.2-6.4, 11.1-11.4

**Assumes Phases 1-4 complete.** `public/graph.json` contains unified two-layer data.

**Repo:** `~/Desktop/brain-explorer`

---

### File Structure (changes and additions)

```
brain-explorer/src/
├── lib/
│   ├── types.ts                ← MODIFY: extend with fusion fields
│   ├── categories.ts           ← MODIFY: code-layer colors, community hue shift
│   ├── graph-data.ts           ← MODIFY: layer filtering, god-node z-override
│   └── url-params.ts           ← CREATE: read/write ?layer= and ?focus= URL params
├── hooks/
│   ├── useGraphState.ts        ← MODIFY: add activeLayer, drillInRepo state
│   ├── useGraphData.ts         ← MODIFY: filter nodes/links by activeLayer
│   └── useDrillIn.ts           ← CREATE: drill-in animation orchestrator
├── components/
│   ├── GraphView.tsx           ← MODIFY: wire layer toggle, drill-in, URL params
│   ├── InstancedNodes.tsx      ← MODIFY: dual meshes (wiki spheres + code cubes)
│   ├── Edges.tsx               ← MODIFY: cross-layer edge styling
│   ├── Tooltip.tsx             ← MODIFY: code-node hover content
│   ├── ArticlePanel.tsx        ← MODIFY: add "Drill In" button
│   ├── LayerToggle.tsx         ← CREATE: segmented control UI
│   └── GraphMeta.tsx           ← MODIFY: layer-specific counts
```

---

### Task 1: Extend types for fusion data

**Files:** `src/lib/types.ts`

- [ ] **Step 1: Add fusion fields to `GraphNode`**

All new fields optional: `layer`, `file_type`, `source_file`, `source_location`, `community`, `is_god_node`, `confidential`, `repo`.

- [ ] **Step 2: Add fusion fields to `GraphLink`**

Optional: `relation`, `confidence`, `confidence_score`.

- [ ] **Step 3: Add `LayerMode` type**

```typescript
export type LayerMode = "wiki" | "code" | "combined";
```

- [ ] **Step 4: Run tests, commit**

---

### Task 2: URL parameter utilities

**Files:** Create `src/lib/url-params.ts`

- [ ] **Step 1: Implement `readLayerParam()`, `readFocusParam()`, `updateUrlParams()`**

- `readLayerParam()` — reads `?layer=`, validates against `["wiki", "code", "combined"]`
- `readFocusParam()` — reads `?focus=`, URI-decodes for matching against node IDs
- `updateUrlParams()` — replaces URL params via `history.replaceState`

- [ ] **Step 2: Commit**

---

### Task 3: Extend Zustand store with layer and drill-in state

**Files:** `src/hooks/useGraphState.ts`

- [ ] **Step 1: Add state fields**

```typescript
activeLayer: LayerMode;           // default: "wiki"
drillInRepo: string | null;       // which repo's code subgraph is expanded
drillInNodeIds: Set<string>;      // IDs of revealed code nodes
setActiveLayer: (layer: LayerMode) => void;
setDrillInRepo: (repo: string | null) => void;
setDrillInNodeIds: (ids: Set<string>) => void;
```

`clearFocus()` should also reset `drillInRepo` and `drillInNodeIds`.

- [ ] **Step 2: Run tests, commit**

---

### Task 4: Layer-aware data filtering

**Files:** `src/lib/graph-data.ts`, `src/hooks/useGraphData.ts`

- [ ] **Step 1: Add `filterByLayer()` function**

```typescript
function filterByLayer(nodes, links, layer, drillInNodeIds) {
  // wiki mode: layer === "wiki" OR undefined (backward compat) OR in drillInNodeIds
  // code mode: layer === "code" only
  // combined mode: all nodes
  // Then filter links to only include visible node IDs
}
```

- [ ] **Step 2: Add `applyGodNodePositions()` function**

God nodes with `is_god_node === true` get `z = -200`.

- [ ] **Step 3: Wire filtering into `useGraphData`**

Store full unfiltered dataset in a ref. Derive filtered nodes/links reactively from `activeLayer` and `drillInNodeIds`.

- [ ] **Step 4: Run tests, commit**

---

### Task 5: Code node colors and community hue shift

**Files:** `src/lib/categories.ts`

- [ ] **Step 1: Add `getCodeNodeColor(community)`**

Base: `#00FF41` (terminal green). Hue shift: `(120 + community * 37) % 360` on HSL wheel.

- [ ] **Step 2: Add `getNodeColor(node)` dispatcher**

Returns category color for wiki, community hue for code.

- [ ] **Step 3: Add `getNodeLabel(node)` — file basename for code, title for wiki**

- [ ] **Step 4: Run tests, commit**

---

### Task 6: Dual InstancedMesh — wiki spheres + code cubes

**Files:** `src/components/InstancedNodes.tsx`

This is the largest task.

- [ ] **Step 1: Partition nodes into `wikiNodes` and `codeNodes`**

- [ ] **Step 2: Add second InstancedMesh with `boxGeometry` for code cubes**

Alongside existing sphere mesh. Separate refs: `codeMeshRef`, `codeGlowRef`.

- [ ] **Step 3: Update `useFrame` loop for dual meshes**

Colors via `getNodeColor(node)`. Both meshes update in the same frame loop.

- [ ] **Step 4: God-node opacity logic**

```typescript
if (node.is_god_node) {
  opacity = isNeighborFocused ? 1.0 : 0.3;
  // Slow pulse: 5s period (background), 2s period (neighbor focused)
}
```

- [ ] **Step 5: Wire pointer handlers for code mesh**

Separate `handleCodePointerMove` and `handleCodeClick` using `codeIndexMap`.

- [ ] **Step 6: Dev test — verify dual meshes render**

```bash
cd ~/Desktop/brain-explorer && pnpm dev
```

- [ ] **Step 7: Commit**

---

### Task 7: Layer toggle UI component

**Files:** Create `src/components/LayerToggle.tsx`

- [ ] **Step 1: Build segmented control**

Three segments: Wiki / Code / Combined. Top-center of viewport. Dark glassmorphic style.

Uses `useGraphState` for `activeLayer` / `setActiveLayer`. Calls `updateUrlParams` on change.

- [ ] **Step 2: Only show when code nodes exist in data**

- [ ] **Step 3: Commit**

---

### Task 8: Drill-in hook and animation

**Files:** Create `src/hooks/useDrillIn.ts`

- [ ] **Step 1: Implement drill-in orchestrator**

```typescript
function useDrillIn(allNodes: GraphNode[]) {
  const drillIn = (repoName: string) => {
    // 1. Find code nodes where node.repo === repoName
    // 2. Sort by connection_count desc
    // 3. Top 20 → animatedIds (fly in with arc)
    // 4. Rest → staticIds (fade in after 1.2s via setTimeout)
    // 5. Update drillInNodeIds in Zustand
  };

  const exitDrillIn = () => {
    // Clear drillInRepo and drillInNodeIds
  };

  return { drillIn, exitDrillIn };
}
```

- [ ] **Step 2: Commit**

---

### Task 9: "Drill In" button in ArticlePanel

**Files:** `src/components/ArticlePanel.tsx`

- [ ] **Step 1: Detect if focused node is a repo wiki node**

Extract repo name from ID: `wiki://projects/karen.md` → `"karen"`. Check if code nodes exist for that repo.

- [ ] **Step 2: Add "Drill In" button**

Terminal green accent (`#00FF41`). Only shown when repo has code nodes.

```tsx
<button onClick={() => drillIn(repoName)}>
  Drill into code
</button>
```

- [ ] **Step 3: Commit**

---

### Task 10: Cross-layer edge styling

**Files:** `src/components/Edges.tsx`

- [ ] **Step 1: Color edges by relation type**

- `cross_layer` → white at 30% opacity
- Code edges → community hue color
- Wiki edges → category color (existing)

- [ ] **Step 2: Commit**

---

### Task 11: Code-node tooltip

**Files:** `src/components/Tooltip.tsx`

- [ ] **Step 1: Differentiate by layer**

Code nodes show: file basename (bold), full path (monospace), community number, connection count, repo name.

- [ ] **Step 2: Commit**

---

### Task 12: Layer-specific counts in GraphMeta

**Files:** `src/components/GraphMeta.tsx`

- [ ] **Step 1: Show "X wiki + Y code nodes" in combined mode**

- [ ] **Step 2: Commit**

---

### Task 13: Wire everything in GraphView

**Files:** `src/components/GraphView.tsx`

- [ ] **Step 1: Read `?layer=` from URL on mount, set initial layer**

Default to `wiki` if no code nodes, `combined` if code nodes exist.

- [ ] **Step 2: Render `<LayerToggle />` (conditional on code nodes existing)**

- [ ] **Step 3: Instantiate `useDrillIn`, pass to `ArticlePanel`**

- [ ] **Step 4: Update URL on layer change**

- [ ] **Step 5: Handle URI-style deep links for `?focus=`**

URI-decode the focus param for matching against `wiki://` and `code://` IDs.

- [ ] **Step 6: Wire `GraphMeta` with layer counts**

- [ ] **Step 7: Dev test all interactions**

```bash
cd ~/Desktop/brain-explorer && pnpm dev
```

Test:
- Layer toggle switches views
- URL updates with `?layer=`
- Drill-in button appears on repo wiki nodes
- Top 20 code nodes fly in, rest fade after 1.2s
- God nodes at 30% opacity, pulse on neighbor focus
- Code nodes are green cubes

- [ ] **Step 8: Commit**

---

### Task 14: Integration test with two-layer data

- [ ] **Step 1: Generate two-layer graph.json**

```bash
curl -X POST http://localhost:3577/graph-push
```

Or create a test fixture with a few code nodes appended to existing graph.json.

- [ ] **Step 2: Verify all five features end-to-end**

1. Layer toggle filters correctly
2. Drill-in reveals code subgraph with animation
3. Centrality cap: top 20 animated, rest after 1.2s
4. God nodes: background plane, opacity, pulse
5. Code cubes: green, community hue, basename labels

- [ ] **Step 3: Build for production**

```bash
pnpm build
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: Phase 5 complete — two-layer explorer with layer toggle, drill-in, god-nodes"
```

---

## Summary

| Task | Estimated | Key File |
|------|-----------|----------|
| 1. Types | 2 min | `src/lib/types.ts` |
| 2. URL params | 3 min | `src/lib/url-params.ts` |
| 3. Zustand store | 3 min | `src/hooks/useGraphState.ts` |
| 4. Layer filtering | 5 min | `src/lib/graph-data.ts` |
| 5. Code colors | 4 min | `src/lib/categories.ts` |
| 6. Dual InstancedMesh | 8 min | `src/components/InstancedNodes.tsx` |
| 7. LayerToggle UI | 4 min | `src/components/LayerToggle.tsx` |
| 8. Drill-in hook | 4 min | `src/hooks/useDrillIn.ts` |
| 9. Drill-in button | 3 min | `src/components/ArticlePanel.tsx` |
| 10. Edge styling | 3 min | `src/components/Edges.tsx` |
| 11. Code tooltip | 3 min | `src/components/Tooltip.tsx` |
| 12. GraphMeta counts | 2 min | `src/components/GraphMeta.tsx` |
| 13. GraphView wiring | 5 min | `src/components/GraphView.tsx` |
| 14. Integration test | 5 min | — |
| **Total** | **~54 min** | |

**This completes the Brain + Graphify Fusion.** Five phases, four backend sessions + one frontend session. The knowledge graph now has semantic (wiki), structural (code AST), and temporal (git commits) dimensions.
