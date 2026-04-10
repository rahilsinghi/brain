---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/imessage-scheduler:f477fe4
ingested_at: 2026-04-09T23:03:16.571Z
parsed_at: 2026-04-09T23:03:16.571Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM39y8m2DMxa48ZFHmz"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:18.943Z
---






# Add scheduled time picker, iMessage-style UI, status timeline

- **Repo:** rahilsinghi/imessage-scheduler
- **SHA:** f477fe4
- **Date:** 2026-03-10T18:21:45Z
- **Author:** Rahil Singhi
- **Files changed:** 14
- **Additions:** +760
- **Deletions:** -103

- Backend: scheduledFor column with migration, queue worker respects future timestamps
- Frontend: datetime picker with toggle, iMessage blue bubbles, live countdown
- Status timeline on each card (QUEUED > ACCEPTED > SENT > DELIVERED)
- Messages grouped by section: Upcoming, Queued, In Progress, Sent, Failed
- Staggered card animations and tab transitions
