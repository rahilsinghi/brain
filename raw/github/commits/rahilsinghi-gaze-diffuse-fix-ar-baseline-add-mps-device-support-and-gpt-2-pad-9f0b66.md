---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:7b36d65
ingested_at: 2026-04-13T17:05:37.793Z
parsed_at: 2026-04-13T17:05:37.793Z
compiled_to: "[[AR Baseline Fix: MPS Support and GPT-2 Pad Token in Gaze-Diffuse]]"
processed_at: 2026-04-13T17:43:36.224Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix(ar-baseline): add MPS device support and GPT-2 pad token

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 7b36d65
- **Date:** 2026-03-27T16:09:27Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +8
- **Deletions:** -1

- Added MPS fallback for Apple Silicon local runs
- Set pad_token = eos_token for GPT-2 (has no pad token by default),
  fixing ValueError in score_vocabulary during guided generation

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
