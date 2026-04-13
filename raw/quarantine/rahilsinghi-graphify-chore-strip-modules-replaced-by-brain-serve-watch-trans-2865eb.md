---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/graphify:9a3b2b2
ingested_at: 2026-04-13T00:04:31.035Z
parsed_at: 2026-04-13T00:04:31.035Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24nYBrZkwmT7t2MDQaD"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:21.052Z
---






# chore: strip modules replaced by Brain (serve, watch, transcribe, __main__, skill)

- **Repo:** rahilsinghi/graphify
- **SHA:** 9a3b2b2
- **Date:** 2026-04-10T23:19:19Z
- **Author:** Rahil Singhi
- **Files changed:** 15
- **Additions:** +1
- **Deletions:** -13594

Remove serve.py, watch.py, transcribe.py, __main__.py, and all skill-*.md files.
Strip export.py to keep only to_json() and attach_hyperedges().
Update __init__.py to remove references to stripped exports.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
