---
title: askNYC Backend and Frontend Deployment to Cloud Run
author: ai
created_at: 2026-04-12T22:03:23.763Z
last_ai_edit: 2026-04-12T22:03:23.763Z
last_human_edit: null
last_embedded_hash: ae377aa698679761
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-deploy-backend-frontend-to-cloud-run-update-all-docs-d2e07f.md]]"
tags:
  - asknyc
  - deployment
  - cloud run
  - next.js
  - backend
  - frontend
  - documentation
---


# askNYC Backend and Frontend Deployment to Cloud Run

This article details the successful deployment of both the askNYC backend and frontend services to Google Cloud Run. The update involved creating a standalone Next.js build for the frontend and updating project documentation to reflect the new deployment status.

## Key Concepts

[[Google Cloud Run]],[[Next.js]],[[Dockerfile]],[[CI/CD]],Deployment

## Details

The `rahilsinghi/askNYC` project's backend and frontend services have been successfully deployed to Google Cloud Run in the `us-central1` region. 

**Deployment Details:**
*   **Backend URL:** `https://asknyc-backend-901435891859.us-central1.run.app`
*   **Frontend URL:** `https://asknyc-frontend-901435891859.us-central1.run.app`

**Technical Changes:**
*   A new `Dockerfile` was added for the frontend to enable a standalone Next.js build.
*   `next.config.ts` was updated to include `output: 'standalone'` for optimized deployment.

**Documentation Updates:**
*   All relevant team documentation, including `BHARATH_TASKS.md`, was updated to reflect the completion of the deployment.

## Related

[[askNYC — Git Activity]],[[AskNYC Backend and Frontend Deployment to Cloud Run]],[[AskNYC Frontend Backend Integration (March 2026)]],[[AskNYC Documentation Suite]],[[Bharath's askNYC Deployment & Live Camera Testing Task Specification]],[[askNYC: Next.js 16 Configuration Update]]
