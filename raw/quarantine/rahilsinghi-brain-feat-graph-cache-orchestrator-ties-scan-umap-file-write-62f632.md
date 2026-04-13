---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:b6a2ed1
ingested_at: 2026-04-13T16:05:10.257Z
parsed_at: 2026-04-13T16:05:10.257Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24e5EeZ2L6zYJZp5m51"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:26.238Z
---






# feat(graph): cache orchestrator ties scan + UMAP + file write

- **Repo:** rahilsinghi/brain
- **SHA:** b6a2ed1
- **Date:** 2026-04-10T16:15:19Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +91
- **Deletions:** -0

Adds rebuildGraphCache (scan → UMAP → JSON write) and readGraphCache
(disk read with null-on-missing/parse-error) with full test coverage.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
