---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:486d124
ingested_at: 2026-04-13T17:05:37.837Z
parsed_at: 2026-04-13T17:05:37.837Z
compiled_to: "[[Discography Seeding and Smart Download Scripts for raag]]"
processed_at: 2026-04-13T17:07:08.895Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat: add discography seeding and smart download scripts

- **Repo:** rahilsinghi/raag
- **SHA:** 486d124
- **Date:** 2026-03-04T00:54:32Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +924
- **Deletions:** -0

seed_discography.py pre-populates DB with full Seedhe Maut discography
metadata (9 albums, 135 songs). smart_download.py uses DB metadata to
search YouTube per-track for accurate downloads. reorganize_audio.py
fuzzy-matches existing files to DB entries and moves them correctly.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
