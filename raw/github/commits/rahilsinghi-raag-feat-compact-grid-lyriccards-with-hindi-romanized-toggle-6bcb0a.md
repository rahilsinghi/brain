---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:746b05e
ingested_at: 2026-04-09T05:03:49.979Z
parsed_at: 2026-04-09T05:03:49.979Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: compact grid LyricCards with Hindi/romanized toggle

- **Repo:** rahilsinghi/raag
- **SHA:** 746b05e
- **Date:** 2026-03-04T01:58:20Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +105
- **Deletions:** -56

- Make LyricCards compact (smaller padding, 3-line truncation, tiny album art)
- Render lyric results in 2-column grid instead of full-width list
- Add Devanagari-to-romanized toggle button (Languages icon) per card
- Skip orphaned Qdrant entries that show "Unknown" song title
- Basic Devanagari transliteration map for romanized display

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
