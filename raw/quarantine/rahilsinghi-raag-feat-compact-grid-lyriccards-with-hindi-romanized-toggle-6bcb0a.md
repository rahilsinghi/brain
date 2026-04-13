---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:746b05e
ingested_at: 2026-04-12T22:03:50.857Z
parsed_at: 2026-04-12T22:03:50.857Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24dwUKurXPP1JzW7fjX"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:24.397Z
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
