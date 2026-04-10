---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:e55bf3f
ingested_at: 2026-04-10T02:04:52.499Z
parsed_at: 2026-04-10T02:04:52.499Z
compiled_to: "[[fix(backend): Reversed DOB Longitude Bounds + session_complete Payload (e55bf3f)]]"
processed_at: 2026-04-10T02:55:15.378Z
retry_count: 0
last_error: null
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
