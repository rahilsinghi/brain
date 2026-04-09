---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:422fc57
ingested_at: 2026-04-09T01:03:46.916Z
parsed_at: 2026-04-09T01:03:46.916Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
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
