---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:761c5b3
ingested_at: 2026-04-09T01:03:46.916Z
parsed_at: 2026-04-09T01:03:46.916Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
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
