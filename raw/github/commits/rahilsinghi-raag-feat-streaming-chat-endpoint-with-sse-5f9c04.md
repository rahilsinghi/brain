---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:ae9ec14
ingested_at: 2026-04-09T05:03:49.970Z
parsed_at: 2026-04-09T05:03:49.970Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: streaming chat endpoint with SSE

- **Repo:** rahilsinghi/raag
- **SHA:** ae9ec14
- **Date:** 2026-03-06T22:42:08Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +108
- **Deletions:** -0

Add POST /api/chat/stream that streams responses as Server-Sent Events.
Uses AsyncAnthropic with messages.stream() to forward text deltas in
real-time. Agentic tool loop emits tool_start/tool_result events as
tools execute, then resumes streaming Claude's follow-up response.
Retains the existing non-streaming POST /api/chat/ as fallback.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
