---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:3ee52cb
ingested_at: 2026-04-10T01:03:40.349Z
parsed_at: 2026-04-10T01:03:40.349Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM4FYGyFk2LzYwDac3N"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:33.839Z
---






# test: add 38 unit tests covering all modules

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 3ee52cb
- **Date:** 2026-03-12T18:39:04Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +625
- **Deletions:** -0

- tests/conftest.py: MockMDLM fixture, shared test utilities
- tests/test_data.py: prompt seeds validation, GazeExample/GazeDataConfig
- tests/test_gaze_predictor.py: config, forward pass, dataset integration
- tests/test_gaze_guidance.py: confidence schedule, config, sampling flow
- tests/test_ar_baseline.py: ARGazeConfig validation
- tests/test_metrics.py: FKGL, ARI, FK sentence variance, full pipeline

All 38 tests pass locally (pytest -m unit).
