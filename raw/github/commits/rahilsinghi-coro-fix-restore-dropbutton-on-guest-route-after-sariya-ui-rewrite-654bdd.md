---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/Coro:d631b5d
ingested_at: 2026-04-13T17:05:37.842Z
parsed_at: 2026-04-13T17:05:37.842Z
compiled_to: "[[Restore DropButton on /guest route after Sariya UI Rewrite in Coro]]"
processed_at: 2026-04-13T17:07:27.123Z
retry_count: 0
last_error: null
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
