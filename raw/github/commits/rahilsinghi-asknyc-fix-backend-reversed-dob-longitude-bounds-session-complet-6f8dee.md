---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:e55bf3f
ingested_at: 2026-04-09T01:03:46.914Z
parsed_at: 2026-04-09T01:03:46.914Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
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
