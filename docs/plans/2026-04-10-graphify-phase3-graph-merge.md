# Graphify Phase 3 — Graph Cache Merge

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merge Graphify's code-layer graph into Brain's existing wiki-layer graph, producing a unified two-layer `GraphCache` with URI node IDs, cross-layer edges, and god-node detection.

**Architecture:** Types in `src/types.ts` gain optional fields (`layer`, `community`, `is_god_node`, etc.). `cache.ts` applies `wiki://` prefixes at the merge boundary — `scanWiki()` stays path-based internally to preserve wikilink resolution. New `src/graph/cross-layer.ts` generates edges between wiki repo articles and code nodes. `export.ts` gains god-node detection (mean + 2*sigma, z=-200).

**Spec:** `docs/specs/2026-04-10-brain-graphify-fusion-design.md` — Sections 6.1-6.6

**Assumes Phases 1-2 complete.** Graphify produces `raw/graphify/{repo}/{repo}-graph.json` files in NetworkX `node_link_data` format.

---

### Task 1: Extend `GraphNode` and `GraphLink` types

**Files:**
- Modify: `src/types.ts`

- [ ] **Step 1: Add optional fields to `GraphNode`**

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
  // --- fusion fields (all optional for backward compat) ---
  layer?: "wiki" | "code";
  file_type?: "code" | "document" | "rationale";
  source_file?: string;
  source_location?: string;
  community?: number;
  is_god_node?: boolean;
  confidential?: boolean;
  repo?: string;
}
```

- [ ] **Step 2: Add optional fields to `GraphLink`**

```typescript
export interface GraphLink {
  source: string;
  target: string;
  relation?: string;
  confidence?: "EXTRACTED" | "INFERRED" | "AMBIGUOUS";
  confidence_score?: number;
}
```

- [ ] **Step 3: Run existing tests**

```bash
pnpm vitest run
```

Expected: All 346 tests pass — new fields are optional.

- [ ] **Step 4: Commit**

```bash
git add src/types.ts
git commit -m "feat(graph): extend GraphNode/GraphLink with optional layer, community, god-node fields"
```

---

### Task 2: God-node detection in `export.ts`

**Files:**
- Modify: `tests/graph/export.test.ts`
- Modify: `src/graph/export.ts`

- [ ] **Step 1: Write failing tests**

Two tests:
1. Detects god nodes using mean + 2*sigma on `connection_count` — node with extreme degree gets `is_god_node: true` and `z = -200`
2. Does not mark god nodes when all connection counts are similar

- [ ] **Step 2: Run test to verify failure**

```bash
pnpm vitest run tests/graph/export.test.ts
```

- [ ] **Step 3: Add god-node detection to `generateGraphCache`**

After building the `nodes` array (after UMAP positions):

```typescript
if (nodes.length > 0) {
  const counts = nodes.map(n => n.connection_count);
  const mean = counts.reduce((a, b) => a + b, 0) / counts.length;
  const variance = counts.reduce((a, b) => a + (b - mean) ** 2, 0) / counts.length;
  const std = Math.sqrt(variance);
  const threshold = mean + 2 * std;

  for (const node of nodes) {
    if (node.connection_count > threshold) {
      node.is_god_node = true;
      node.z = -200;
    }
  }
}
```

- [ ] **Step 4: Run tests**

```bash
pnpm vitest run tests/graph/export.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/graph/export.ts tests/graph/export.test.ts
git commit -m "feat(graph): god-node detection with mean+2sigma threshold, z=-200 background"
```

---

### Task 3: `loadGraphifyGraphs()` function

**Files:**
- Create: `tests/graph/load-graphify.test.ts`
- Create: `src/graph/load-graphify.ts`

Parses Graphify's NetworkX `node_link_data` JSON into Brain's `GraphNode[]` + `GraphLink[]`. Applies `code://` URI prefix.

- [ ] **Step 1: Write failing tests**

Five tests:
1. Parses NetworkX JSON into nodes/links with `code://{repo}/` prefix
2. Loads multiple repos
3. Returns empty for nonexistent directory
4. Skips repos with malformed JSON
5. Preserves symbol-level node IDs with `#` fragment

- [ ] **Step 2: Run test to verify failure**

```bash
pnpm vitest run tests/graph/load-graphify.test.ts
```

- [ ] **Step 3: Implement `src/graph/load-graphify.ts`**

Key logic:
- Walk `graphifyOutputDir`, find `{repo}-graph.json` per repo subdirectory
- Parse `nodes` and `links` from NetworkX JSON
- Prefix all node IDs with `code://{repoName}/`
- Set `layer: "code"`, `repo: repoName`, `category: repoName`
- Count connections per node from edge data
- Try-catch per repo (malformed JSON → log + skip)

- [ ] **Step 4: Run tests**

```bash
pnpm vitest run tests/graph/load-graphify.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/graph/load-graphify.ts tests/graph/load-graphify.test.ts
git commit -m "feat(graph): loadGraphifyGraphs parses NetworkX JSON into Brain node/link format"
```

---

### Task 4: Cross-layer edge generation

**Files:**
- Create: `tests/graph/cross-layer.test.ts`
- Create: `src/graph/cross-layer.ts`

Generates edges between wiki repo articles and code nodes. Caps at 20 per wiki node, sorted by centrality. Only file-level code nodes (no `#` fragment).

- [ ] **Step 1: Write failing tests**

Six tests:
1. Connects wiki repo article to code nodes from same repo
2. Caps at 20 edges per wiki node, sorted by centrality
3. Skips symbol-level nodes (IDs with `#`)
4. Matches `code-architecture` wiki articles too
5. Returns empty when no repos match
6. Returns empty when code scan is empty

- [ ] **Step 2: Run test to verify failure**

```bash
pnpm vitest run tests/graph/cross-layer.test.ts
```

- [ ] **Step 3: Implement `src/graph/cross-layer.ts`**

Key logic:
- `extractRepoName(wikiId)` — handles `wiki://projects/karen.md` and `wiki://code-architecture/karen-architecture.md`
- Index code nodes by `repo` field
- For each repo wiki node, find matching code nodes, sort by `connection_count` desc, take top 20
- Each edge: `{ relation: "cross_layer", confidence: "EXTRACTED", confidence_score: 1.0 }`

- [ ] **Step 4: Run tests**

```bash
pnpm vitest run tests/graph/cross-layer.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/graph/cross-layer.ts tests/graph/cross-layer.test.ts
git commit -m "feat(graph): cross-layer edge generation with 20-edge centrality cap"
```

---

### Task 5: URI prefix application in `cache.ts`

**Files:**
- Modify: `tests/graph/cache.test.ts`
- Modify: `src/graph/cache.ts`

`scanWiki()` stays path-based internally. The `wiki://` prefix is applied only at the `cache.ts` merge boundary. This preserves wikilink resolution (titleToId, slugToId lookup maps).

- [ ] **Step 1: Write failing tests**

Two tests:
1. Applies `wiki://` prefix to all node IDs and link endpoints
2. Sets `layer: "wiki"` on all wiki nodes

- [ ] **Step 2: Run test to verify failure**

```bash
pnpm vitest run tests/graph/cache.test.ts
```

- [ ] **Step 3: Update `rebuildGraphCache` to apply URI prefixes and set layer**

After `generateGraphCache()`:

```typescript
for (const node of cache.nodes) {
  node.id = `wiki://${node.id}`;
  node.layer = "wiki";
}
for (const link of cache.links) {
  link.source = `wiki://${link.source}`;
  link.target = `wiki://${link.target}`;
  link.relation = link.relation ?? "wiki_link";
  link.confidence = link.confidence ?? "EXTRACTED";
  link.confidence_score = link.confidence_score ?? 1.0;
}
```

- [ ] **Step 4: Update existing test assertions for URI prefix**

If existing cache tests check node IDs, update to expect `wiki://` prefix.

- [ ] **Step 5: Run tests**

```bash
pnpm vitest run tests/graph/cache.test.ts
```

- [ ] **Step 6: Commit**

```bash
git add src/graph/cache.ts tests/graph/cache.test.ts
git commit -m "feat(graph): apply wiki:// URI prefix and layer field at cache boundary"
```

---

### Task 6: Merge both layers in `rebuildGraphCache()`

**Files:**
- Modify: `src/graph/cache.ts`
- Modify: `tests/graph/cache.test.ts`

Add optional `graphifyOutputDir` parameter. When provided, loads code nodes, generates cross-layer edges, merges into unified cache.

- [ ] **Step 1: Write failing tests**

Two tests:
1. Merges wiki + code layers with cross-layer edges (mock Graphify JSON in test fixture)
2. Works without `graphifyOutputDir` (wiki-only, backward compat)

- [ ] **Step 2: Run test to verify failure**

```bash
pnpm vitest run tests/graph/cache.test.ts
```

- [ ] **Step 3: Update `rebuildGraphCache` signature and implementation**

```typescript
export async function rebuildGraphCache(
  vaultRoot: string,
  cachePath: string,
  embeddings: Map<string, number[]>,
  seed: number,
  graphifyOutputDir?: string,
): Promise<GraphCache> {
  // 1. Scan wiki + UMAP (existing)
  // 2. Apply wiki:// prefix (from Task 5)
  // 3. Load Graphify graphs (new)
  const codeScan = graphifyOutputDir
    ? loadGraphifyGraphs(graphifyOutputDir)
    : { nodes: [], links: [] };
  // 4. Cross-layer edges (new)
  const crossLinks = generateCrossLayerEdges(wikiData, codeScan);
  // 5. Merge all nodes + links
  // 6. Write cache
}
```

- [ ] **Step 4: Run tests**

```bash
pnpm vitest run tests/graph/cache.test.ts
```

- [ ] **Step 5: Run full test suite**

```bash
pnpm vitest run
```

- [ ] **Step 6: Commit**

```bash
git add src/graph/cache.ts tests/graph/cache.test.ts
git commit -m "feat(graph): merge wiki + code layers in rebuildGraphCache with cross-layer edges"
```

---

### Task 7: Wire `graphifyOutputDir` into daemon and routes

**Files:**
- Modify: `src/index.ts`
- Modify: `src/api/routes/graph-push.ts` (if it calls `rebuildGraphCache`)

- [ ] **Step 1: Find all call sites of `rebuildGraphCache`**

```bash
grep -rn "rebuildGraphCache" src/
```

- [ ] **Step 2: Update each call site to pass `graphifyOutputDir`**

```typescript
const graphifyDir = config.graphify?.repos?.length
  ? join(vaultRoot, config.graphify.output_dir ?? "raw/graphify")
  : undefined;

await rebuildGraphCache(vaultRoot, cachePath, embeddings, seed, graphifyDir);
```

- [ ] **Step 3: Run full test suite**

```bash
pnpm vitest run
```

- [ ] **Step 4: Commit**

```bash
git add src/index.ts src/api/routes/graph-push.ts
git commit -m "feat(graph): wire graphify output dir into cache rebuild pipeline"
```

---

### Task 8: Backward compatibility verification

- [ ] **Step 1: Run full test suite**

```bash
pnpm vitest run
```

- [ ] **Step 2: Smoke test — rebuild cache via API**

```bash
curl -X POST http://localhost:3577/graph-push
```

Verify `wiki/.graph-cache.json`:
- All node IDs have `wiki://` prefix
- All nodes have `layer: "wiki"`
- All links have `wiki://` prefixed source/target
- Explorer still renders correctly

- [ ] **Step 3: Fix any breaking assertions**

```bash
git add -A
git commit -m "fix(graph): backward compatibility adjustments for URI node IDs"
```

---

## Summary

| Task | Files Created | Files Modified | Tests | Time Est. |
|------|--------------|----------------|-------|-----------|
| 1. Types | — | `src/types.ts` | Existing | 2 min |
| 2. God-nodes | — | `src/graph/export.ts` | 2 new | 4 min |
| 3. Load Graphify | `src/graph/load-graphify.ts` | — | 5 new | 5 min |
| 4. Cross-layer edges | `src/graph/cross-layer.ts` | — | 6 new | 5 min |
| 5. URI prefix | — | `src/graph/cache.ts` | 2 new | 4 min |
| 6. Merge layers | — | `src/graph/cache.ts` | 2 new | 5 min |
| 7. Wire daemon | — | `src/index.ts`, routes | — | 3 min |
| 8. Compat verify | — | — | Manual | 3 min |
| **Total** | **2 created** | **5 modified** | **17 new** | **~31 min** |

**Next:** Phase 4 — File-level embeddings, confidentiality filter, two synthesis modes.
