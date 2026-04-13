---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:eb48f40
ingested_at: 2026-04-13T17:05:37.836Z
parsed_at: 2026-04-13T17:05:37.836Z
compiled_to: "[[CLAP Encoder Compatibility Fix and Lyrics Ingestion for raag]]"
processed_at: 2026-04-13T17:32:52.353Z
retry_count: 0
last_error: null
compile_progress: null
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
