---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Coro:f93906a
ingested_at: 2026-04-09T23:03:16.575Z
parsed_at: 2026-04-09T23:03:16.575Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM5AVwQfdfJrKzmfFLJ"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:46.201Z
---






# feat: robust drop voting with per-user locking and 5s window

- **Repo:** rahilsinghi/Coro
- **SHA:** f93906a
- **Date:** 2026-02-28T19:36:09Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +228
- **Deletions:** -74

- Replace timestamp-list approach with per-user vote dict so the same
  user clicking multiple times only counts as one vote
- record_drop(room_id, user_id) returns "triggered"/"registered"/"already_voted"
- First vote in a window starts a 5s asyncio expiry task; if 3 votes
  don't land in time, server broadcasts drop_reset and resets state
- New DropButton component: locks to "VOTED + countdown" after clicking,
  unlocks on drop_triggered, drop_reset, or local countdown expiry
- Add DropButton to both Guest and Host pages
- Forward drop_reset and drop_already_voted through WS manager

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
