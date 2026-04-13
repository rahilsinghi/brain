---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:9501087
ingested_at: 2026-04-13T16:05:10.238Z
parsed_at: 2026-04-13T16:05:10.238Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24eB4PZ1W3pvk7BZnUC"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:27.599Z
---






# feat(graph): wire graphify output dir into cache rebuild pipeline

- **Repo:** rahilsinghi/brain
- **SHA:** 9501087
- **Date:** 2026-04-12T17:14:49Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +8
- **Deletions:** -1

Pass graphifyOutputDir as 5th arg to rebuildGraphCache at both call sites
(lint/heal cron in index.ts and graph-push route). Computed from config
when graphify.repos is non-empty, falls back to raw/graphify.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
