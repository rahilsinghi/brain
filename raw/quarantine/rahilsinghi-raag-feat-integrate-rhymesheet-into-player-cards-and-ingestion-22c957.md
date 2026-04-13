---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:f900bf2
ingested_at: 2026-04-13T16:05:10.313Z
parsed_at: 2026-04-13T16:05:10.313Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24eF4jujhXYGPTC1svP"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:28.534Z
---






# feat: integrate RhymeSheet into player, cards, and ingestion

- **Repo:** rahilsinghi/raag
- **SHA:** f900bf2
- **Date:** 2026-03-04T19:39:39Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +164
- **Deletions:** -45

- PlayButton accepts songId, stores currentSongDbId in Spotify store
- MiniPlayer lyrics button toggles RhymeSheetPanel
- SongContextCard "View Rhyme Sheet" button
- Strip song- prefix from graph node IDs for DB lookups
- Wire RhymeAnnotator into ingestion pipeline after BarAnnotator
- Include rhyme_words, start_ms, end_ms in song context API response

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
