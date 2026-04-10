---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:310abac
ingested_at: 2026-04-10T12:03:43.579Z
parsed_at: 2026-04-10T12:03:43.579Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv4L8RrzycAFYppCiAaf"}
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
