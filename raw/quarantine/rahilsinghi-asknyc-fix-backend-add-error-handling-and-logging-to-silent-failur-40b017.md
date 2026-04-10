---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:fa7c5b9
ingested_at: 2026-04-10T02:04:52.499Z
parsed_at: 2026-04-10T02:04:52.499Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM5KD4YL9iF6hUVUsqu"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:48.252Z
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
