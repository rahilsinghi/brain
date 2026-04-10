---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:422fc57
ingested_at: 2026-04-10T15:04:13.423Z
parsed_at: 2026-04-10T15:04:13.423Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
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
