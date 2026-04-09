---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:e20b2f4
ingested_at: 2026-04-09T04:03:38.426Z
parsed_at: 2026-04-09T04:03:38.426Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: all 8 API routes for session lifecycle and agent streaming

- **Repo:** rahilsinghi/Flock
- **SHA:** e20b2f4
- **Date:** 2026-03-21T14:23:44Z
- **Author:** Rahil Singhi
- **Files changed:** 8
- **Additions:** +606
- **Deletions:** -0

POST /api/context/voice — compile voice input into personal_context.md
GET  /api/context/[userId] — fetch user profile + aesthetic tags
POST /api/session/create — generate room code, create session
POST /api/session/join — snapshot context, assign color, join session
POST /api/session/round — validate gate, stream personal agent
POST /api/session/mediate — stream mediator after all agents ready
GET  /api/hotels/match — pgvector hotel similarity search
POST /api/output/reveal — trip decision + narration texts

Round and mediate routes use AI SDK streaming responses.
Round auto-triggers mediator when all participants complete Round 3.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
