---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:77d3859
ingested_at: 2026-04-10T00:03:23.756Z
parsed_at: 2026-04-10T00:03:23.756Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM2cFQUCdCPCTF25Lfi"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:11.542Z
---






# feat(telegram): implement createTelegramBot() with message handlers

- **Repo:** rahilsinghi/brain
- **SHA:** 77d3859
- **Date:** 2026-04-08T18:34:23Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +355
- **Deletions:** -0

grammY bot with prefix-based routing (?query vs ingest), allowed_user_ids
guard, /start /help /status commands, voice note rejection, and error
handling for both synthesis and ingest failures.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
