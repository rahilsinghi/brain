---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:f2fef8d
ingested_at: 2026-04-09T05:03:49.983Z
parsed_at: 2026-04-09T05:03:49.983Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix: resolve search_bars crash on repeated chorus lines

- **Repo:** rahilsinghi/raag
- **SHA:** f2fef8d
- **Date:** 2026-03-04T00:56:30Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +3
- **Deletions:** -3

Changed scalar_one_or_none() to scalars().first() with limit(1) so
repeated lyric lines (choruses/hooks) no longer trigger
MultipleResultsFound. Also fixed _enrich_song for safety.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
