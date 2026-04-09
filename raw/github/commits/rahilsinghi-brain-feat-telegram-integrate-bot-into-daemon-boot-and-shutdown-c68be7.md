---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:e2cbaeb
ingested_at: 2026-04-09T06:03:35.980Z
parsed_at: 2026-04-09T06:03:35.980Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(telegram): integrate bot into daemon boot and shutdown

- **Repo:** rahilsinghi/brain
- **SHA:** e2cbaeb
- **Date:** 2026-04-08T18:37:27Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +33
- **Deletions:** -2

Bot is opt-in: requires bot_token + non-empty allowed_user_ids.
startTime captured at boot for consistent uptime reporting.
Parallel shutdown: server drain + bot stop run concurrently.
