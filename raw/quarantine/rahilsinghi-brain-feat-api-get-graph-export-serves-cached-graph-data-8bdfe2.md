---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:8282572
ingested_at: 2026-04-13T16:05:10.256Z
parsed_at: 2026-04-13T16:05:10.256Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24pPdU99CxX1TqMZL97"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:46.225Z
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
