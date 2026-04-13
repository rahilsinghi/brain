---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:8282572
ingested_at: 2026-04-13T18:05:31.366Z
parsed_at: 2026-04-13T18:05:31.366Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(api): GET /graph-export serves cached graph data

- **Repo:** rahilsinghi/brain
- **SHA:** 8282572
- **Date:** 2026-04-10T16:16:36Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +112
- **Deletions:** -0

- Add src/api/routes/graph-export.ts: reads graph cache from disk and returns it, 404 if missing
- Register graphExportRoute in src/api/server.ts after saveRoute
- Add VectorStore.listAll() for fetching all embedded chunks with vectors
- Add tests/api/routes/graph-export.test.ts: 2 cases (cache hit + 404)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
