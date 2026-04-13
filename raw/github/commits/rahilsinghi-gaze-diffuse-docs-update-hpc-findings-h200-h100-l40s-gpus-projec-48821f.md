---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:dde3257
ingested_at: 2026-04-13T17:05:37.792Z
parsed_at: 2026-04-13T17:05:37.792Z
compiled_to: "[[NYU HPC Hardware and Access Updates for Gaze-Diffuse Project]]"
processed_at: 2026-04-13T17:26:54.805Z
retry_count: 0
last_error: null
compile_progress: null
---



# docs: update HPC findings — H200/H100/L40S GPUs, project account needed

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** dde3257
- **Date:** 2026-03-27T20:15:23Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +21
- **Deletions:** -9

Torch cluster has different hardware than assumed:
- No RTX8000 or A100 — has H200, H100, L40S
- Need torch_pr_xxx project account to submit jobs
- Portal URL: projects.hpc.nyu.edu (not projects.rit.nyu.edu)
- Conda module: anaconda3/2025.06

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
