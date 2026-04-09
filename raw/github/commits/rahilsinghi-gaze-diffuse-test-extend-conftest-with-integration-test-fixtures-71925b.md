---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:7f4edbd
ingested_at: 2026-04-09T03:18:47.674Z
parsed_at: 2026-04-09T03:18:47.674Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# test: extend conftest with integration test fixtures

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 7f4edbd
- **Date:** 2026-03-15T23:36:44Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +108
- **Deletions:** -0

- MockCausalLM class for AR baseline testing without GPT-2
- synthetic_gaze_examples fixture (20 examples, 4 participants)
- synthetic_gaze_dataframe fixture matching load_geco_corpus format
- tiny_gaze_predictor_config for fast convergence in smoke tests
- Session-scoped bert_tokenizer to avoid repeated HF downloads
- _make_synthetic_examples helper for reuse across test files
