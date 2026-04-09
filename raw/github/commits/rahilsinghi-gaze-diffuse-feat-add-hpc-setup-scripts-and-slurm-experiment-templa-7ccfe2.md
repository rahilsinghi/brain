---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:612fa5f
ingested_at: 2026-04-09T03:18:47.676Z
parsed_at: 2026-04-09T03:18:47.676Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: add HPC setup scripts and SLURM experiment templates

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 612fa5f
- **Date:** 2026-03-12T18:39:17Z
- **Author:** Rahil Singhi
- **Files changed:** 8
- **Additions:** +535
- **Deletions:** -0

- scripts/setup_hpc.sh: One-time NYU Torch HPC environment setup —
  conda env in $SCRATCH, PyTorch 2.2 CUDA 12.1, all deps, flash-attn
- scripts/download_data.sh: GECO eye-tracking corpus download
- scripts/download_checkpoints.sh: MDLM-OWT (~1.2GB) from HuggingFace,
  optional LLaDA-8B (~16GB) with --llada flag
- scripts/slurm/exp{1-5}: SLURM batch templates for all 5 experiments
  on torch_pr_111_general account:
  - Exp1: MDLM baseline PPL (RTX8000, 4h)
  - Exp2: Gaze predictor BERT training (RTX8000, 2h)
  - Exp3: AR gaze baseline full λ sweep (RTX8000, 8h)
  - Exp4: GazeDiffuse MDLM λ×steps grid (RTX8000, 12h)
  - Exp5: GazeDiffuse LLaDA 8B subset (A100, 12h)
