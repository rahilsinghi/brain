---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:e4b3971
ingested_at: 2026-04-09T01:03:46.898Z
parsed_at: 2026-04-09T01:03:46.898Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
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
