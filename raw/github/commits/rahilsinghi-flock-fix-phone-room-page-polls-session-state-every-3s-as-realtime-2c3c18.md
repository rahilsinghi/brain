---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:a070972
ingested_at: 2026-04-09T04:03:38.420Z
parsed_at: 2026-04-09T04:03:38.420Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix: phone room page polls session state every 3s as Realtime fallback

- **Repo:** rahilsinghi/Flock
- **SHA:** a070972
- **Date:** 2026-03-21T17:09:02Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +26
- **Deletions:** -21

The lobby was stuck showing "Waiting for everyone to join" even after
the session advanced to round 1, because the initial fetch raced with
the join API and Realtime updates may lag. Added 3-second polling
alongside the Realtime subscription to ensure the phone always picks
up round changes.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
