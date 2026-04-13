---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:cedfafc
ingested_at: 2026-04-13T17:05:37.807Z
parsed_at: 2026-04-13T17:05:37.807Z
compiled_to: "[[De-escalation Feature Enhancements in Karen Project]]"
processed_at: 2026-04-13T17:13:53.687Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat(deescalation): add Slack/Calendar delete, remove LinkedIn step

- **Repo:** rahilsinghi/karen
- **SHA:** cedfafc
- **Date:** 2026-04-04T15:24:31Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +38
- **Deletions:** -15

- Added _delete_slack using stored message_ts
- Added _delete_calendar using stored event_id
- Removed _delete_linkedin (no longer in ladder v2)
- CC apology threshold changed from Level 4 to Level 5

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
