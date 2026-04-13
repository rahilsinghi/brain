---
title: askNYC Application Deployment to Google Cloud Run
author: ai
created_at: 2026-04-10T21:33:35.161Z
last_ai_edit: 2026-04-10T21:33:35.161Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-deploy-backend-frontend-to-cloud-run-update-all-docs-d2e07f.md]]"
tags:
  - cloud run
  - deployment
  - next.js
  - docker
  - asknyc
  - frontend
  - backend
  - google cloud
  - documentation
---

# askNYC Application Deployment to Google Cloud Run

This article details the successful deployment of both the askNYC backend and frontend services to Google Cloud Run. The deployment involved specific configuration changes, including a new Dockerfile for the frontend, and comprehensive updates to all relevant documentation.

## Key Concepts

Cloud Run,Docker,Next.js (standalone build),Backend Deployment,Frontend Deployment,Google Cloud

## Details

On March 28, 2026, the askNYC application, including both its backend and frontend components, was successfully deployed to Google Cloud Run in the `us-central1` region. This deployment was captured in commit `9f11b1a` by Rahil Singhi within the `rahilsinghi/askNYC` repository.

### Deployed Services:
*   **Backend:** [https://asknyc-backend-901435891859.us-central1.run.app](https://asknyc-backend-901435891859.us-central1.run.app)
*   **Frontend:** [https://asknyc-frontend-901435891859.us-central1.run.app](https://asknyc-frontend-901435891859.us-central1.run.app)

### Technical Changes:
To facilitate the Cloud Run deployment for the frontend, a new Dockerfile was introduced to support a standalone Next.js build. Additionally, the `next.config.ts` file was updated to include `output: 'standalone'`.

### Documentation Updates:
Following the deployment, all relevant team documentation, including `BHARATH_TASKS.md`, was updated to reflect the new deployment status and architecture.

### Commit Details:
*   **SHA:** `9f11b1a`
*   **Author:** Rahil Singhi
*   **Date:** `2026-03-28T03:47:14Z`
*   **Files changed:** 10
*   **Additions:** +149
*   **Deletions:** -193

## Related

[[askNYC]],[[Cloud Run]],[[Next.js]],[[Docker]],[[Deployment]],[[Rahil Singhi]]
