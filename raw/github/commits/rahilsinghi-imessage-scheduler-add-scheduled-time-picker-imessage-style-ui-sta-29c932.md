---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/imessage-scheduler:f477fe4
ingested_at: 2026-04-09T05:03:49.986Z
parsed_at: 2026-04-09T05:03:49.986Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
