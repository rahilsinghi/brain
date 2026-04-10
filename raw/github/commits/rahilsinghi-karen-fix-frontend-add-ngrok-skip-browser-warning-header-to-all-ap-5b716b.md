---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:fc99ec2
ingested_at: 2026-04-10T01:03:40.368Z
parsed_at: 2026-04-10T01:03:40.368Z
compiled_to: "[[Fix: Add ngrok-skip-browser-warning Header to API Calls (karen)]]"
processed_at: 2026-04-10T02:12:57.684Z
retry_count: 1
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuHFdgNv1EVTZuaK8ARr\"}"
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
