---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:7b36d65
ingested_at: 2026-04-09T03:18:47.669Z
parsed_at: 2026-04-09T03:18:47.669Z
compiled_to: null
processed_at: null
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
