---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:9f11b1a
ingested_at: 2026-04-13T17:05:37.824Z
parsed_at: 2026-04-13T17:05:37.824Z
compiled_to: "[[askNYC Backend and Frontend Deployment to Google Cloud Run]]"
processed_at: 2026-04-13T17:38:17.019Z
retry_count: 0
last_error: null
compile_progress: null
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
