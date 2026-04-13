---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:fa7c5b9
ingested_at: 2026-04-13T17:05:37.820Z
parsed_at: 2026-04-13T17:05:37.820Z
compiled_to: "[[askNYC Backend: Error Handling and Logging for Silent Failures]]"
processed_at: 2026-04-13T17:40:39.707Z
retry_count: 0
last_error: null
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
