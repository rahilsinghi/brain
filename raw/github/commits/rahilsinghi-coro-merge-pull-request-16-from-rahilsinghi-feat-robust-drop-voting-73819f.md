---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Coro:50c8178
ingested_at: 2026-04-10T11:03:33.646Z
parsed_at: 2026-04-10T11:03:33.646Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3HkgzLKALTpCf57NB3"}
compile_progress: null
---



# Merge pull request #16 from rahilsinghi/feat/robust-drop-voting

- **Repo:** rahilsinghi/Coro
- **SHA:** 50c8178
- **Date:** 2026-02-28T19:36:30Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +228
- **Deletions:** -74

feat: robust drop voting with per-user locking and 5s window
