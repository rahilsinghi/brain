---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:b56fbf4
ingested_at: 2026-04-10T02:04:52.498Z
parsed_at: 2026-04-10T02:04:52.498Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM6Bor5yyzq7jPyabr6"}
compile_progress: null
quarantined_at: 2026-04-10T03:03:00.109Z
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
