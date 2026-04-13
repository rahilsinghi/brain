Execute Graphify Phase 4 — Embeddings + Query using subagent-driven development.

Context:
- Brain is a personal knowledge base daemon at ~/Desktop/brain (Bun/TypeScript, 386 tests, 82 source files)
- We're integrating Graphify (AST code analysis) into Brain's knowledge graph
- Phase 1 COMPLETE: fork at ~/Desktop/graphify with CLI entry point, persistent venv at scripts/graphify/.venv
- Phase 2 COMPLETE: `src/sources/graphify.ts` SyncSource wired into hourly cron. Produces `raw/graphify/{repo}/{repo}-graph.json`
- Phase 3 COMPLETE: Two-layer graph cache with `wiki://` and `code://` URI prefixes, god-node detection, cross-layer edges, unified rebuildGraphCache. 386 tests, merged to master.

Key files to read first:
1. docs/plans/2026-04-10-graphify-phase4-embeddings-query.md — THE PLAN (8 tasks, TDD)
2. docs/specs/2026-04-10-brain-graphify-fusion-design.md — Sections 8, 9 (file-level embeddings, confidentiality filter)
3. src/types.ts — WikiChunk interface (needs optional `confidential` field)
4. src/embedder/vector-store.ts — VectorStore class (needs confidential in records)
5. src/embedder/sync.ts — syncFile() where frontmatter is read during embedding
6. src/query/synthesize.ts — synthesize() function (needs mode parameter + filter)
7. src/telegram/bot.ts — handleTextMessage (needs to pass mode: "remote")
8. src/api/routes/synthesise.ts — POST /synthesise (needs mode parameter)
9. ~/.claude/mcp/brain/index.ts — MCP server brain_query tool (needs mode: "local")

Critical gotchas (from Phase 2-3 learnings):
- ESM mock pattern: `vi.mock("child_process", async () => ({ ...actual }))` in test file, NOT global setupFiles
- WikiChunk.confidential is optional for backward compat — default to false when missing
- The `confidential` flag is read from wiki frontmatter and stored as LanceDB metadata
- Telegram always passes mode: "remote" (external channel, no confidential data)
- HTTP API defaults to mode: "local" but accepts it from request body
- MCP server uses mode: "local" (Claude Code sessions are local)
- File-summary markdown from Graphify CLI flows through existing raw/ → wiki/ → LanceDB pipeline unchanged
- The MCP server lives in a separate repo (dotfiles), commit there separately

What Phase 4 builds:
- Task 1: Add `confidential` field to WikiChunk and VectorStore schema
- Task 2: Read `confidential` from wiki frontmatter during embedding sync
- Task 3: Add SynthesisMode ("local"/"remote") with confidentiality filter to synthesize()
- Task 4: Telegram bot passes mode: "remote"
- Task 5: HTTP API accepts mode parameter on /synthesise
- Task 6: MCP server passes mode: "local"
- Task 7: File-summary embed pipeline validation tests
- Task 8: End-to-end verification + smoke test

Use superpowers:subagent-driven-development. TDD — failing tests first.
