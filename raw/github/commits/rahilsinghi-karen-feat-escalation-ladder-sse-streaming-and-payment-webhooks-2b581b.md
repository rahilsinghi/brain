---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:b9ff0f8
ingested_at: 2026-04-09T01:03:46.911Z
parsed_at: 2026-04-09T01:03:46.911Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# feat: escalation ladder, SSE streaming, and payment webhooks

- **Repo:** rahilsinghi/karen
- **SHA:** b9ff0f8
- **Date:** 2026-04-04T13:30:41Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +622
- **Deletions:** -0

Karen orchestration service runs the 10-level escalation ladder with
configurable intervals (5s demo to 1d patient). SSE stream with event
history replay and last_seq filtering for reliable reconnects. Trigger,
resolve, continue-anyway, and payment detection endpoints. Venmo webhook
and manual payment confirmation.
