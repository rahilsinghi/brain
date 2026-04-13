---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:5ce0a85
ingested_at: 2026-04-13T18:05:31.389Z
parsed_at: 2026-04-13T18:05:31.389Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix(hpc): update SLURM scripts for H200/H100/L40S partitions

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 5ce0a85
- **Date:** 2026-04-09T17:38:39Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +26
- **Deletions:** -21

Update all 5 SLURM experiment scripts and setup_hpc.sh for correct
Torch cluster GPU partitions and conda module version (anaconda3/2025.06).

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
