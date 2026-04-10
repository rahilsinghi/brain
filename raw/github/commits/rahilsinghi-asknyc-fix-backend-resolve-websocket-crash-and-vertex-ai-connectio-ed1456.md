---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:01aae64
ingested_at: 2026-04-10T15:04:13.429Z
parsed_at: 2026-04-10T15:04:13.429Z
compiled_to: "[[Backend Fix: WebSocket Stability and Vertex AI Integration (01aae64)]]"
processed_at: 2026-04-10T15:05:28.730Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix(backend): resolve WebSocket crash and Vertex AI connection

- **Repo:** rahilsinghi/askNYC
- **SHA:** 01aae64
- **Date:** 2026-03-28T01:32:13Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +11
- **Deletions:** -5

- Fix dashboard_ws() missing Request parameter (use module-level session service)
- Alias GOOGLE_GEMINI_API_KEY to GOOGLE_API_KEY for ADK compatibility
- Add ended_at field to SessionState schema
- Pre-create ADK session before run_live() to prevent "session not found"
- Switch model to gemini-live-2.5-flash-native-audio (available on Vertex AI)
