---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:e4b3971
ingested_at: 2026-04-10T07:03:28.811Z
parsed_at: 2026-04-10T07:03:28.811Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZufSpJDeoDCJeRM2tT2Z"}
compile_progress: null
---



# fix(frontend): replace EventSource with fetch-based SSE for ngrok compatibility

- **Repo:** rahilsinghi/karen
- **SHA:** e4b3971
- **Date:** 2026-04-04T19:14:37Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +69
- **Deletions:** -46

EventSource cannot send custom headers, so ngrok's browser interstitial
blocks SSE connections. Replaced with fetch + ReadableStream reader that
sends the ngrok-skip-browser-warning header.
