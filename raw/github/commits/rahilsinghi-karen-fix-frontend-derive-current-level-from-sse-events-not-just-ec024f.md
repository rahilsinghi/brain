---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:310abac
ingested_at: 2026-04-10T01:03:40.366Z
parsed_at: 2026-04-10T01:03:40.366Z
compiled_to: "[[Fix: Derive Current Level from SSE Events in Frontend (karen)]]"
processed_at: 2026-04-10T02:42:15.047Z
retry_count: 0
last_error: null
compile_progress: null
---













# fix(frontend): derive current level from SSE events, not just escalation fetch

- **Repo:** rahilsinghi/karen
- **SHA:** 310abac
- **Date:** 2026-04-04T20:47:14Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +27
- **Deletions:** -2

Level counter was stuck at 3/10 because it relied solely on
escalation.current_level which requires a fetch roundtrip. Now
derives the max level from level_start/level_complete events
(always up-to-date via SSE). Also added level_start to
REFRESH_EVENTS so the escalation object refreshes sooner.
