---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:eb74594
ingested_at: 2026-04-10T11:03:33.624Z
parsed_at: 2026-04-10T11:03:33.624Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3HLYvJCXWPgYwwsEvu"}
compile_progress: null
---



# feat(telegram): add truncateAtSentence() helper

- **Repo:** rahilsinghi/brain
- **SHA:** eb74594
- **Date:** 2026-04-08T18:31:39Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +59
- **Deletions:** -0

Truncates long synthesis answers at sentence boundaries (. ! ?) before
Telegram's 4096-char message limit. Falls back to hard cut if no
sentence boundary found.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
