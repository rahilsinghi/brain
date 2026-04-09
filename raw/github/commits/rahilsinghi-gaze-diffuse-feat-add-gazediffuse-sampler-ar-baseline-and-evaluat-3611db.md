---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:9bc0330
ingested_at: 2026-04-09T03:18:47.678Z
parsed_at: 2026-04-09T03:18:47.678Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: add GazeDiffuse sampler, AR baseline, and evaluation metrics

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 9bc0330
- **Date:** 2026-03-12T18:38:56Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +939
- **Deletions:** -0

- src/gaze_guidance.py: Core novel contribution — gaze-guided parallel
  denoising for masked diffusion LMs. Implements confidence-based
  unmasking with gaze scoring: score = log P_LM(token) + λ · gaze(token).
  Includes both generic and native MDLM API variants.
- src/ar_baseline.py: Sauberli et al. (EACL 2026) replication on
  GPT-2-medium. Sequential token-by-token gaze guidance baseline.
- src/metrics.py: Full evaluation pipeline — FKGL, ARI, sentence-level
  FK variance (key paper claim: parallel < sequential), MAUVE for
  distributional similarity, and self-perplexity for coherence.
