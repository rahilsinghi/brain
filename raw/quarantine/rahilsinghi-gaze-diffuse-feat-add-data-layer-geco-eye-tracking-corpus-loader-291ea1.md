---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:2327001
ingested_at: 2026-04-10T01:03:40.350Z
parsed_at: 2026-04-10T01:03:40.350Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM2PqY67PD4Jz3JXKDc"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:08.671Z
---






# feat: add data layer — GECO eye-tracking corpus loader and prompt seeds

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 2327001
- **Date:** 2026-03-12T18:38:31Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +331
- **Deletions:** -0

- src/data/geco.py: GECO corpus loader with subject-level CV splits,
  GazeExample and GazeDataConfig dataclasses, GazeDataset for PyTorch
  DataLoader integration. Extracts fixation duration per word-in-context
  with configurable context window (default 5 tokens each side).
- src/data/prompts.py: 50 diverse prompt seeds shared across all
  experiments for fair cross-method comparison
