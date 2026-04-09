---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:36aca24
ingested_at: 2026-04-09T06:03:35.980Z
parsed_at: 2026-04-09T06:03:35.980Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
