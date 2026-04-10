---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:486d124
ingested_at: 2026-04-10T04:04:34.941Z
parsed_at: 2026-04-10T04:04:34.941Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuRnqfk45ivbbURo42H1"}
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
