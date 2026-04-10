---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:f2fef8d
ingested_at: 2026-04-10T10:04:00.852Z
parsed_at: 2026-04-10T10:04:00.852Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3HF5kvmcU6shYPKqbi"}
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
