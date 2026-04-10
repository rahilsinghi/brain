---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:15caf15
ingested_at: 2026-04-10T02:04:52.500Z
parsed_at: 2026-04-10T02:04:52.500Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM55NsEW6gAzPNZu9sb"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:45.110Z
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
