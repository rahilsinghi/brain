---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:9f11b1a
ingested_at: 2026-04-10T02:04:52.501Z
parsed_at: 2026-04-10T02:04:52.501Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM4x55FsnYRnJmWAVXH"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:43.318Z
---






# feat: deploy backend + frontend to Cloud Run, update all docs

- **Repo:** rahilsinghi/askNYC
- **SHA:** 9f11b1a
- **Date:** 2026-03-28T03:47:14Z
- **Author:** Rahil Singhi
- **Files changed:** 10
- **Additions:** +149
- **Deletions:** -193

Both services live on Cloud Run (us-central1):
- Backend: https://asknyc-backend-901435891859.us-central1.run.app
- Frontend: https://asknyc-frontend-901435891859.us-central1.run.app

Added frontend Dockerfile (standalone Next.js build), updated
next.config.ts with output: 'standalone', and updated all team
docs + BHARATH_TASKS.md to reflect deployment is complete.
