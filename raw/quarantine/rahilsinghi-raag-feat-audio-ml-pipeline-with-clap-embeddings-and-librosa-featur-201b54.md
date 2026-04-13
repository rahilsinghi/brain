---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:4c1f836
ingested_at: 2026-04-12T22:03:50.859Z
parsed_at: 2026-04-12T22:03:50.859Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24pcHiYKjvM3dRaHiNw"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:49.131Z
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
