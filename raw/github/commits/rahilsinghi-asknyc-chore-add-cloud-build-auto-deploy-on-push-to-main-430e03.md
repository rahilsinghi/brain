---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:761c5b3
ingested_at: 2026-04-13T17:05:37.823Z
parsed_at: 2026-04-13T17:05:37.823Z
compiled_to: "[[Automated Cloud Build Deployment for askNYC]]"
processed_at: 2026-04-13T17:43:31.420Z
retry_count: 0
last_error: null
compile_progress: null
---



# chore: add Cloud Build auto-deploy on push to main

- **Repo:** rahilsinghi/askNYC
- **SHA:** 761c5b3
- **Date:** 2026-03-28T04:34:36Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +80
- **Deletions:** -0

Builds and deploys both backend + frontend to Cloud Run
automatically on every push to main. Trigger: deploy-on-push
in us-central1.
