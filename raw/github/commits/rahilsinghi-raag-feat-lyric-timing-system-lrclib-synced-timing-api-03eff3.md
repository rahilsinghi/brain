---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:7618ef9
ingested_at: 2026-04-09T05:03:49.975Z
parsed_at: 2026-04-09T05:03:49.975Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: lyric timing system — LRCLIB synced + timing API

- **Repo:** rahilsinghi/raag
- **SHA:** 7618ef9
- **Date:** 2026-03-04T19:37:33Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +295
- **Deletions:** -0

- Estimated bar timing from song duration + section structure
- LRCLIB integration for fetching synced lyrics timestamps
- GET /api/songs/{id}/timing and POST /api/songs/{id}/compute-timing
- Register lyrics_sync router in main app

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
