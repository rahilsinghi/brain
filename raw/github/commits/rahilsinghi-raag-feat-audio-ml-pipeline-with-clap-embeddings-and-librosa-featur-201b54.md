---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:4c1f836
ingested_at: 2026-04-13T17:05:37.839Z
parsed_at: 2026-04-13T17:05:37.839Z
compiled_to: "[[Audio ML Pipeline with CLAP Embeddings and Librosa Features]]"
processed_at: 2026-04-13T17:50:06.288Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat: audio ML pipeline with CLAP embeddings and librosa features

- **Repo:** rahilsinghi/raag
- **SHA:** 4c1f836
- **Date:** 2026-03-04T00:16:13Z
- **Author:** Rahil Singhi
- **Files changed:** 5
- **Additions:** +250
- **Deletions:** -0

- CLAPEncoder singleton using laion/larger_clap_music_and_speech model
  for 512-dim audio/text embeddings with chunked encoding for long audio
- LibrosaFeatureExtractor for tempo, key, energy, spectral centroid,
  onset density, and mood energy extraction
- Segment detector stub for Phase 2

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
