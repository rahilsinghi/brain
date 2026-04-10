---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:ad6b409
ingested_at: 2026-04-10T15:04:13.425Z
parsed_at: 2026-04-10T15:04:13.425Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(backend): merge chinmay/backend-hardening (#1)

- **Repo:** rahilsinghi/askNYC
- **SHA:** ad6b409
- **Date:** 2026-03-28T02:49:43Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +505
- **Deletions:** -16

Adds WebSocket hardening, session persistence, enhanced health endpoint.
- Structured logging (replaces print statements)
- Server-side heartbeat (25s) for Cloud Run/proxy keep-alive
- Session persistence to /tmp/asknyc_sessions.json
- /health returns version, model, datasets, vertex_ai status, active sessions
