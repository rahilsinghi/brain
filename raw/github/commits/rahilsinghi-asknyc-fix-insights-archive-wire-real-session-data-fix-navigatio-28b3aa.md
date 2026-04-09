---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:b56fbf4
ingested_at: 2026-04-09T01:03:46.913Z
parsed_at: 2026-04-09T01:03:46.913Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# fix(insights+archive): wire real session data + fix navigation

- **Repo:** rahilsinghi/askNYC
- **SHA:** b56fbf4
- **Date:** 2026-03-28T17:00:43Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +37
- **Deletions:** -12

Backend: add location_address to SessionState, persist cards and
datasets_queried from _do_investigate() via module-level state ref,
save location_address in session_service and ws session_complete.

Frontend: change "Back to Atlas" → "Back" linking to /dashboard on
both insights and archive pages. Add overflow-y-auto to insights
page for scrollability.
