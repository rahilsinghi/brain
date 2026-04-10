---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Coro:d631b5d
ingested_at: 2026-04-10T11:03:33.645Z
parsed_at: 2026-04-10T11:03:33.645Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3GGMsvtiNEpb7wnda2"}
compile_progress: null
---



# fix: restore DropButton on /guest route after Sariya UI rewrite

- **Repo:** rahilsinghi/Coro
- **SHA:** d631b5d
- **Date:** 2026-02-28T20:38:22Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +2
- **Deletions:** -38

Sariya's UI changes replaced the shared DropButton component with a broken
inline button that sent the wrong WS message type ('drop_vote' instead of
'drop'), had no vote locking, no countdown timer, no dynamic threshold, and
read dropProgress from the store (where it doesn't exist).

- Replace inline drop button with <DropButton userId roomId />
- Remove dropProgress from useRoomStore() destructure (not in store)
- Remove now-unused showShock state and handleDrop handler

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
