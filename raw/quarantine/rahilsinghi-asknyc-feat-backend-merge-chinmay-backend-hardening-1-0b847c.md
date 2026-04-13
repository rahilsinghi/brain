---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:ad6b409
ingested_at: 2026-04-12T23:04:19.872Z
parsed_at: 2026-04-12T23:04:19.872Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24h1aiSB3Wx97Ky4fea"}
compile_progress: null
quarantined_at: 2026-04-13T16:12:06.080Z
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
