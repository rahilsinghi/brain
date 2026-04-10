---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:f95d8fa
ingested_at: 2026-04-10T02:04:52.481Z
parsed_at: 2026-04-10T02:04:52.481Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM2X5rgeVRNpSDiTkQm"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:10.643Z
---






# chore: initialize project scaffolding with build config and AI context

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** f95d8fa
- **Date:** 2026-03-12T18:37:51Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +277
- **Deletions:** -0

- .gitignore: Python, data, checkpoints, experiment outputs, secrets
- pyproject.toml: project metadata, dependencies (torch, transformers,
  lightning, hydra, textstat, mauve-text, wandb), dev tools, pytest markers
- CLAUDE.md: comprehensive project context for AI-assisted development
  including architecture, MDLM/LLaDA API references, HPC setup, and
  experiment status tracking
