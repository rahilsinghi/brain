---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:fc99ec2
ingested_at: 2026-04-10T12:03:43.580Z
parsed_at: 2026-04-10T12:03:43.580Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv4KzmjbZrKfC1UQYuU1"}
compile_progress: null
---



# fix(frontend): add ngrok-skip-browser-warning header to all API calls

- **Repo:** rahilsinghi/karen
- **SHA:** fc99ec2
- **Date:** 2026-04-04T18:08:25Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +39
- **Deletions:** -27

ngrok free tier shows an interstitial page that strips CORS headers.
Adding the header to all fetch calls bypasses this.
