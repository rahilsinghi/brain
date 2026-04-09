---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/ouroboros:a560fb2
ingested_at: 2026-04-09T01:03:46.888Z
parsed_at: 2026-04-09T01:03:46.888Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
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
