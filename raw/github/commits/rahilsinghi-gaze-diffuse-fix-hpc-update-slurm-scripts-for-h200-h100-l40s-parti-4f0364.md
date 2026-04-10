---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:5ce0a85
ingested_at: 2026-04-10T04:04:34.772Z
parsed_at: 2026-04-10T04:04:34.772Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuRnypdbi2bTxoDSRs2S"}
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
