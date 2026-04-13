---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:888240c
ingested_at: 2026-04-13T17:05:37.806Z
parsed_at: 2026-04-13T17:05:37.806Z
compiled_to: "[[Fix: Configurable Google Calendar ID for Service Accounts in Karen Project]]"
processed_at: 2026-04-13T17:20:36.276Z
retry_count: 0
last_error: null
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
