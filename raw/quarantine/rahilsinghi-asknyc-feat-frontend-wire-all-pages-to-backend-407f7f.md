---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:422fc57
ingested_at: 2026-04-10T02:04:52.500Z
parsed_at: 2026-04-10T02:04:52.500Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM4A66zaqMZRDc9Fmww"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:32.561Z
---






# feat(frontend): wire all pages to backend

- **Repo:** rahilsinghi/askNYC
- **SHA:** 422fc57
- **Date:** 2026-03-28T04:01:52Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +710
- **Deletions:** -279

- /remote: full rewrite with useRemoteWs hook, real camera via
  getUserMedia, MicButton push-to-talk, connection status
- /archive: fetches from GET /sessions, search + time filters,
  loading/empty states
- /insights: computes real aggregates from sessions data
- / splash: auto-redirects to /dashboard after boot animation
- /sessions: redirects to /archive
- useWebSocket: add session_complete + pong handlers
- globals.css: remove duplicate color declaration
