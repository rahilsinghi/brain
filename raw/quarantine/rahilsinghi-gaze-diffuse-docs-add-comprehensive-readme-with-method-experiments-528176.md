---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:7c47372
ingested_at: 2026-04-10T01:03:40.348Z
parsed_at: 2026-04-10T01:03:40.348Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM2hatBaxPXtKqfXzqf"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:12.784Z
---






# docs: add comprehensive README with method, experiments, and setup

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 7c47372
- **Date:** 2026-03-12T18:39:26Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +182
- **Deletions:** -0

- TL;DR: first gaze-guided generation for masked diffusion LMs
- Core algorithm: parallel denoising with λ-controlled readability
- Results table template for FKGL, MAUVE, self-PPL, FK variance
- Installation for both local dev and NYU Torch HPC
- Project structure, experiment plan (5 experiments), timeline
- Related work positioning vs Sauberli, MDLM, LLaDA, Diffusion-LM
- Citation (EMNLP 2026 target)
