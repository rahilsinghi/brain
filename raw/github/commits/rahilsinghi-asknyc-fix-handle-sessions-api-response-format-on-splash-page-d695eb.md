---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:15caf15
ingested_at: 2026-04-10T08:03:40.141Z
parsed_at: 2026-04-10T08:03:40.141Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk38y2zMqYjdmJkGpGB"}
compile_progress: null
---



# fix: handle sessions API response format on splash page

- **Repo:** rahilsinghi/askNYC
- **SHA:** 15caf15
- **Date:** 2026-03-28T13:49:19Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +3
- **Deletions:** -2

Backend returns {sessions: [...]} not a raw array. Extract the
array before calling .slice() to prevent runtime TypeError.
