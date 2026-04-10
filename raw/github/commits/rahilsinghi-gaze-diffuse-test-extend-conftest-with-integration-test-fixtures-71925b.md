---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:7f4edbd
ingested_at: 2026-04-10T07:03:28.779Z
parsed_at: 2026-04-10T07:03:28.779Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZufT1NDmexkXHk5VJowh"}
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
