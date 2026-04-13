---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:e4b3971
ingested_at: 2026-04-13T16:05:10.297Z
parsed_at: 2026-04-13T16:05:10.297Z
compiled_to: "[[Fix: Replace EventSource with Fetch-based SSE for Ngrok Compatibility in Karen Frontend]]"
processed_at: 2026-04-13T16:10:34.555Z
retry_count: 0
last_error: null
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
