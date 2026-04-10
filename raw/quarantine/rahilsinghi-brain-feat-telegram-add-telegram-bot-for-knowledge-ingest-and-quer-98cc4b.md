---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:36aca24
ingested_at: 2026-04-10T00:03:23.754Z
parsed_at: 2026-04-10T00:03:23.754Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM29d29XFDAHLiHfgiD"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:05.291Z
---






# feat(telegram): add Telegram bot for knowledge ingest and queries

- **Repo:** rahilsinghi/brain
- **SHA:** 36aca24
- **Date:** 2026-04-08T19:40:58Z
- **Author:** Rahil Singhi
- **Files changed:** 19
- **Additions:** +856
- **Deletions:** -93

grammY-based bot with prefix routing (?query vs ingest), allowed_user_ids
guard, /start /help /status commands, sentence-boundary truncation,
voice note rejection, and error handling. Shared core functions extracted
from HTTP routes (ingest-core, health-core). 223 tests across 40 files.
