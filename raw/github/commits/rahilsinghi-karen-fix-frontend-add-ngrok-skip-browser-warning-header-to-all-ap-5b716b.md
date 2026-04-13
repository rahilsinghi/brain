---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:fc99ec2
ingested_at: 2026-04-13T17:05:37.803Z
parsed_at: 2026-04-13T17:05:37.803Z
compiled_to: "[[Fix: Add ngrok-skip-browser-warning Header to API Calls in Karen]]"
processed_at: 2026-04-13T17:07:40.128Z
retry_count: 0
last_error: null
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
