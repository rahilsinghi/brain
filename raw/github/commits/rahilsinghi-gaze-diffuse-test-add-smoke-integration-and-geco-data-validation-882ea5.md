---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:3a7a9dd
ingested_at: 2026-04-10T12:03:43.550Z
parsed_at: 2026-04-10T12:03:43.550Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv4LB9a4qUtrKGg76YE4"}
compile_progress: null
---



# test: add smoke, integration, and GECO data validation tests

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 3a7a9dd
- **Date:** 2026-03-15T23:36:56Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +669
- **Deletions:** -0

- test_training_smoke.py (5 tests): training loop loss decrease,
  checkpoint save/load round-trip, score_tokens and score_vocabulary
  after training, validation Spearman correlation
- test_integration.py (11 tests): data pipeline chain, predictor
  forward with gradients, GazeDiffuse with mock MDLM + real predictor,
  guided vs unguided output difference, AR baseline generation,
  metrics on generated output, full E2E pipeline
- test_geco_data.py (5 tests): real GECO loading, fixation ranges,
  example extraction, CV split no-leakage, dataset tokenization
  (auto-skipped when GECO data not present)

Total: 69 tests, all passing, 51% coverage
