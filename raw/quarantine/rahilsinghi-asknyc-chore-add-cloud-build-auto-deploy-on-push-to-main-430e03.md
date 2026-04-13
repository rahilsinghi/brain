---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:761c5b3
ingested_at: 2026-04-12T23:04:19.870Z
parsed_at: 2026-04-12T23:04:19.870Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24ibTwmpAiZVNJtCdfk"}
compile_progress: null
quarantined_at: 2026-04-13T16:12:27.656Z
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
