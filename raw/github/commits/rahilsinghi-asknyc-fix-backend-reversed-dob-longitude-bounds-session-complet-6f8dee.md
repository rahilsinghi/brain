---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:e55bf3f
ingested_at: 2026-04-10T08:03:40.140Z
parsed_at: 2026-04-10T08:03:40.140Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2QxBsfXZDEDtKcQCB"}
compile_progress: null
---



# fix(backend): reversed DOB longitude bounds + session_complete payload

- **Repo:** rahilsinghi/askNYC
- **SHA:** e55bf3f
- **Date:** 2026-03-28T14:55:28Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +14
- **Deletions:** -3

DOB permits query had lng_min/lng_max swapped so it never returned
results. Also fixed session_complete WS message to include the full
SessionSummary object the frontend expects (was only sending session_id).
