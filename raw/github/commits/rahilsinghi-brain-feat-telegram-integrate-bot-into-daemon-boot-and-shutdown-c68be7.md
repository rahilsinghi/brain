---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:e2cbaeb
ingested_at: 2026-04-10T06:04:07.585Z
parsed_at: 2026-04-10T06:04:07.585Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuavy8EXyze3wmHorVJj"}
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
