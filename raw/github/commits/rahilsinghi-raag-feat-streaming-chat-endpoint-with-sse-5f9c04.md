---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:ae9ec14
ingested_at: 2026-04-10T04:04:34.857Z
parsed_at: 2026-04-10T04:04:34.857Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuRo4H2K56CnVgutjimp"}
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
