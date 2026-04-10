---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:dfd3f36
ingested_at: 2026-04-10T04:04:34.948Z
parsed_at: 2026-04-10T04:04:34.948Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuRoU6jxZt1nT7SL2M8M"}
compile_progress: null
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
