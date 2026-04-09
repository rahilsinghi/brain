---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:eb74594
ingested_at: 2026-04-09T06:03:35.981Z
parsed_at: 2026-04-09T06:03:35.981Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
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
