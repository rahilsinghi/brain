---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:b9ff0f8
ingested_at: 2026-04-10T15:04:13.403Z
parsed_at: 2026-04-10T15:04:13.403Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
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
