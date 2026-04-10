---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:3a7a9dd
ingested_at: 2026-04-10T01:03:40.348Z
parsed_at: 2026-04-10T01:03:40.348Z
compiled_to: "[[Test Suite: Smoke, Integration, and GECO Data Validation Tests for gaze-diffuse]]"
processed_at: 2026-04-10T02:49:22.380Z
retry_count: 1
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuL49HNSj7FF4YG8C4QX\"}"
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
