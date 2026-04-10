---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/ouroboros:a560fb2
ingested_at: 2026-04-10T01:03:40.363Z
parsed_at: 2026-04-10T01:03:40.363Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM2CWefkCAvbH9ZvA5B"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:07.447Z
---






# feat(budget): add cost tracking with per-model pricing and budget enforcement

- **Repo:** rahilsinghi/ouroboros
- **SHA:** a560fb2
- **Date:** 2026-04-03T15:02:05Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +93
- **Deletions:** -0

Tracks input/output tokens and USD cost across all agent calls.
Checks against max_usd_per_run budget before each iteration.
Supports Opus, Sonnet, and Haiku pricing.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
