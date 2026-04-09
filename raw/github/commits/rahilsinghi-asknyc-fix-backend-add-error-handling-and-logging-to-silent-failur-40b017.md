---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:fa7c5b9
ingested_at: 2026-04-09T01:03:46.914Z
parsed_at: 2026-04-09T01:03:46.914Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# fix(backend): add error handling and logging to silent failure paths

- **Repo:** rahilsinghi/askNYC
- **SHA:** fa7c5b9
- **Date:** 2026-03-28T14:58:17Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +32
- **Deletions:** -12

- geocoding_service: add raise_for_status() + try/catch with fallback
- socrata_service: add logger, log _get_nearby_zip failures
- gemini_service: log DataCard creation errors and live queue close errors
- ws.py: distinguish CancelledError from unexpected heartbeat errors
