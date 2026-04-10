---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:04d0e8a
ingested_at: 2026-04-10T00:03:23.757Z
parsed_at: 2026-04-10T00:03:23.757Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM48W78pHMRe6Q125WM"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:32.189Z
---






# feat(telegram): add TelegramConfig type and config defaults

- **Repo:** rahilsinghi/brain
- **SHA:** 04d0e8a
- **Date:** 2026-04-08T18:28:58Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +12
- **Deletions:** -0

Bot is opt-in: null token or empty allowed_user_ids = bot disabled.
Token can come from config YAML or TELEGRAM_BOT_TOKEN env var.
