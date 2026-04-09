---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:fc99ec2
ingested_at: 2026-04-09T01:03:46.902Z
parsed_at: 2026-04-09T01:03:46.902Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
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
