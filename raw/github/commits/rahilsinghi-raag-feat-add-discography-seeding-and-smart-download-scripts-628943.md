---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:486d124
ingested_at: 2026-04-09T05:03:49.983Z
parsed_at: 2026-04-09T05:03:49.983Z
compiled_to: null
processed_at: null
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
