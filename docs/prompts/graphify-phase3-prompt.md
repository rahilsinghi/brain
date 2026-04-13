Execute Graphify Phase 3 — Graph Cache Merge using subagent-driven development.

Context:
- Brain is a personal knowledge base daemon at ~/Desktop/brain (Bun/TypeScript, 369 tests, 80 source files)
- We're integrating Graphify (AST code analysis) into Brain's graph cache
- Phase 1 COMPLETE: fork at ~/Desktop/graphify with CLI entry point, persistent venv at scripts/graphify/.venv
- Phase 2 COMPLETE: `src/sources/graphify.ts` SyncSource wired into hourly cron. Produces `raw/graphify/{repo}/{repo}-graph.json` (NetworkX format) and architecture reports. Branch `feat/graphify-phase2-brain-source` pushed.

Key files to read first:
1. docs/plans/2026-04-10-graphify-phase3-graph-merge.md — THE PLAN (8 tasks, TDD)
2. docs/specs/2026-04-10-brain-graphify-fusion-design.md — Sections 6.1-6.6 (URI IDs, unified types, god-nodes, cross-layer edges, cache merge)
3. src/types.ts — current GraphNode/GraphLink interfaces (need optional field additions)
4. src/graph/cache.ts — rebuildGraphCache() that needs graphifyOutputDir parameter
5. src/graph/export.ts — generateGraphCache() where god-node detection goes
6. src/graph/scan-wiki.ts — scanWiki() stays path-based, wiki:// prefix applied in cache.ts
7. tests/graph/cache.test.ts — existing cache tests that need URI prefix updates
8. raw/graphify/brain/brain-graph.json — sample NetworkX JSON to understand the format

Critical gotchas (from Phase 2 learnings):
- output_dir is vault-relative: always `join(vaultRoot, config.output_dir)`
- ESM mock pattern: `vi.mock("child_process", async () => ({ ...actual }))` in test file, NOT global setupFiles
- scanWiki() must stay path-based internally — wiki:// prefix applied ONLY at cache.ts merge boundary to preserve wikilink resolution (titleToId, slugToId lookup maps)
- Existing cache tests will need assertion updates for wiki:// prefix (Task 5 Step 4)
- GraphNode/GraphLink extensions are all optional for backward compat

What Phase 3 builds:
- Task 1: Extend GraphNode/GraphLink types with optional fusion fields (layer, community, is_god_node, repo, etc.)
- Task 2: God-node detection in export.ts (mean + 2*sigma threshold, z=-200)
- Task 3: loadGraphifyGraphs() — parse NetworkX JSON into Brain nodes/links with code:// prefix
- Task 4: Cross-layer edge generation (wiki repo articles ↔ code nodes, 20-edge cap by centrality)
- Task 5: URI prefix application in cache.ts (wiki:// at merge boundary)
- Task 6: Merge both layers in rebuildGraphCache() with optional graphifyOutputDir
- Task 7: Wire graphifyOutputDir into daemon cron and API routes
- Task 8: Backward compatibility verification + smoke test

Use superpowers:subagent-driven-development. TDD — failing tests first.
