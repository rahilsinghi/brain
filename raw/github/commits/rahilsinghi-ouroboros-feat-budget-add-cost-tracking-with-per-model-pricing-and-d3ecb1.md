---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/ouroboros:a560fb2
ingested_at: 2026-04-13T16:05:10.292Z
parsed_at: 2026-04-13T16:05:10.292Z
compiled_to: "[[Cost Tracking and Budget Enforcement in Ouroboros]]"
processed_at: 2026-04-13T16:08:45.719Z
retry_count: 0
last_error: null
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
