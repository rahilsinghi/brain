---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:553bbd1
ingested_at: 2026-04-10T10:04:00.847Z
parsed_at: 2026-04-10T10:04:00.847Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3Gs8AHkwsDrjsRCT5H"}
compile_progress: null
---



# chore: set turbopack root for consistent compilation

- **Repo:** rahilsinghi/raag
- **SHA:** 553bbd1
- **Date:** 2026-03-06T22:39:16Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +3
- **Deletions:** -0

Pin turbopack root to the frontend directory to avoid
path resolution issues with the monorepo layout.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
