---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:2327001
ingested_at: 2026-04-13T17:05:37.800Z
parsed_at: 2026-04-13T17:05:37.800Z
compiled_to: "[[GECO Corpus Loader and Prompt Seeds for Gaze-Diffuse]]"
processed_at: 2026-04-13T17:14:20.353Z
retry_count: 0
last_error: null
compile_progress: null
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
