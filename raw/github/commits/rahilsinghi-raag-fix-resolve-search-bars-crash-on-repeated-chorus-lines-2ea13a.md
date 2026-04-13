---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:f2fef8d
ingested_at: 2026-04-13T17:05:37.837Z
parsed_at: 2026-04-13T17:05:37.837Z
compiled_to: "[[Fix: Search Bars Crash on Repeated Chorus Lines in raag]]"
processed_at: 2026-04-13T17:21:36.335Z
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
