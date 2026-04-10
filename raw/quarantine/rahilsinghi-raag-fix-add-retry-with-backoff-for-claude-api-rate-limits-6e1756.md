---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:664bfc2
ingested_at: 2026-04-09T22:03:19.564Z
parsed_at: 2026-04-09T22:03:19.564Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3SXnZeNVSjRBeWvXQ"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:22.821Z
---






# fix: add retry with backoff for Claude API rate limits

- **Repo:** rahilsinghi/raag
- **SHA:** 664bfc2
- **Date:** 2026-03-04T19:39:46Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +19
- **Deletions:** -7

Retry up to 3 times with 5s/10s backoff on 429 RateLimitError
instead of immediately failing the chat request.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
