---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:cfa6d45
ingested_at: 2026-04-13T16:05:10.313Z
parsed_at: 2026-04-13T16:05:10.313Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24eDeuyXK7PzRtSgiUV"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:28.235Z
---






# feat: frontend types, API helpers, and rhyme color palette

- **Repo:** rahilsinghi/raag
- **SHA:** cfa6d45
- **Date:** 2026-03-04T19:38:46Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +67
- **Deletions:** -6

- Add RhymeWord, BarTiming types, update BarResult with rhyme fields
- Add fetchSongTiming, computeSongTiming API helpers, fix duplicate fetchSongDetail
- 16-color palette for rhyme groups A-P with getRhymeColor helper

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
