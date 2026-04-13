---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:8be18ba
ingested_at: 2026-04-13T18:05:31.373Z
parsed_at: 2026-04-13T18:05:31.373Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix(api): address code review findings — type safety, shutdown, response shape

- **Repo:** rahilsinghi/brain
- **SHA:** 8be18ba
- **Date:** 2026-04-08T17:39:51Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +54
- **Deletions:** -41

- Add fastify.d.ts module augmentation to eliminate all `unknown` casts in route files
- Move startTime inside healthRoute scope (module-level was a test isolation issue)
- Fix stopServer to handle close() rejection with .catch equivalent
- Remove score field from synthesise response (WikiChunk has no score property)
- Restructure ingest frontmatter so metadata spreads first, system fields override
- Add lancedb_ready:false health test for null store case
- Remove local SynthesizeFn duplicate in server.ts; import type from fastify.d.ts

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
