---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:bb922df
ingested_at: 2026-04-09T03:18:47.669Z
parsed_at: 2026-04-09T03:18:47.669Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# docs: add Session 3 — local training, AR baseline results

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** bb922df
- **Date:** 2026-03-27T16:09:36Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +73
- **Deletions:** -3

Session 3 (2026-03-26/27):
- Local env setup (Python 3.14, PyTorch 2.11, MPS)
- Exp 2: Gaze predictor trained locally (Spearman r=0.241)
- Exp 3: AR baseline lambda sweep (20 samples, GPT-2 small)
  - Lambda=+1 shows slight FKGL increase (correct direction)
  - Lambda=-1 indistinguishable from unguided (predictor too weak)
- 6 bugs found and fixed

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
