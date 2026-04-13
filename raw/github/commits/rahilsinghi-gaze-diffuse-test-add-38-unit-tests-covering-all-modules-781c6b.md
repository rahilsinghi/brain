---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:3ee52cb
ingested_at: 2026-04-13T17:05:37.799Z
parsed_at: 2026-04-13T17:05:37.799Z
compiled_to: "[[Unit Test Implementation in Gaze-Diffuse (38 New Tests)]]"
processed_at: 2026-04-13T17:27:40.037Z
retry_count: 0
last_error: null
compile_progress: null
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
