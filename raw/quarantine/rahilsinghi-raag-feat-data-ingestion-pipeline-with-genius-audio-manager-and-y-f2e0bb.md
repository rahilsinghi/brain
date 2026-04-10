---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:dfd3f36
ingested_at: 2026-04-09T23:03:16.570Z
parsed_at: 2026-04-09T23:03:16.570Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM44MKvpiDsgYLogbyL"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:31.194Z
---






# feat: data ingestion pipeline with Genius, audio manager, and YouTube

- **Repo:** rahilsinghi/raag
- **SHA:** dfd3f36
- **Date:** 2026-03-04T00:16:01Z
- **Author:** Rahil Singhi
- **Files changed:** 8
- **Additions:** +1033
- **Deletions:** -0

- GeniusClient for fetching album lyrics with section-aware parsing
- AudioManager for matching local audio files to songs
- IngestionPipeline orchestrating full flow: artist/album creation,
  lyrics fetch, audio matching, ML processing (audio + lyrics + NLP)
- YouTube downloader (yt-dlp) with search, auto-download, title cleaning
- Celery task wrapper and REST API endpoints for ingestion

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
