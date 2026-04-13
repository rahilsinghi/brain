---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:eb48f40
ingested_at: 2026-04-12T22:03:50.857Z
parsed_at: 2026-04-12T22:03:50.857Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24oChNDrn8UaHzejkXd"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:30.318Z
---






# fix: CLAP encoder BaseModelOutputWithPooling compat + add lyrics ingestion

- **Repo:** rahilsinghi/raag
- **SHA:** eb48f40
- **Date:** 2026-03-04T01:53:53Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +296
- **Deletions:** -2

- Fix CLAP encoder to handle both tensor and BaseModelOutputWithPooling
  returns from newer transformers versions
- Add fetch_song_lyrics() method to GeniusClient for per-song lookup
- Add cost-optimized ingestion script (no Claude API calls) that runs
  audio features, CLAP, lyrics, embeddings, and topic classification

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
