---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:045f4c9
ingested_at: 2026-04-10T15:04:13.381Z
parsed_at: 2026-04-10T15:04:13.381Z
compiled_to: "[[parseVoice Function]]"
processed_at: 2026-04-10T15:04:47.649Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat(voice): add parseVoice — transcription + classification + markdown drop + sidecar

- **Repo:** rahilsinghi/brain
- **SHA:** 045f4c9
- **Date:** 2026-04-09T00:50:01Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +150
- **Deletions:** -0

Implements parseVoice with idempotent .processed sidecar guard, frontmatter drop
to raw/{cluster}/, daily log entry via appendDailyEntry, and full TDD coverage (5 tests).

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
