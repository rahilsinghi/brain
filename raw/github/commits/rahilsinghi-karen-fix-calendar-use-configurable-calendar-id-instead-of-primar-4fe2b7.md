---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:888240c
ingested_at: 2026-04-10T07:03:28.812Z
parsed_at: 2026-04-10T07:03:28.812Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZufSSxL3nGaKccVSupRS"}
compile_progress: null
---



# fix(calendar): use configurable calendar ID instead of 'primary'

- **Repo:** rahilsinghi/karen
- **SHA:** 888240c
- **Date:** 2026-04-04T16:17:03Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +9
- **Deletions:** -2

Service account's 'primary' is its own empty calendar, not the user's.
Now reads GOOGLE_CALENDAR_ID from env (defaults to 'primary' for backwards compat).
Also gitignored service account key files.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
