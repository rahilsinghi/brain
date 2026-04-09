---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Coro:1192c5f
ingested_at: 2026-04-09T05:03:49.989Z
parsed_at: 2026-04-09T05:03:49.989Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix: key drop votes on connection_id + add server-sourced countdown

- **Repo:** rahilsinghi/Coro
- **SHA:** 1192c5f
- **Date:** 2026-02-28T19:55:24Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +158
- **Deletions:** -66

Root cause: votes were keyed by user_id, which is shared across browser
tabs (same localStorage). Using a per-WS connection_id (uuid4 generated
at accept time) ensures one vote per physical connection regardless of
shared browser profiles.

Also adds drop countdown UI:
- On 3 votes, backend broadcasts drop_incoming {in_seconds: 3} first
- Lyria update fires after the delay, then drop_triggered is broadcast
- Frontend reads in_seconds from the message (not hardcoded) and counts
  down with a large timer; button pulses red during countdown

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
