---
title: askNYC Backend and Frontend Deployment to Google Cloud Run
author: ai
created_at: 2026-04-13T17:38:17.019Z
last_ai_edit: 2026-04-13T17:38:17.019Z
last_human_edit: null
last_embedded_hash: e46ac4a40893bb48
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-deploy-backend-frontend-to-cloud-run-update-all-docs-d2e07f.md]]"
tags:
  - asknyc
  - deployment
  - google cloud run
  - frontend
  - backend
  - next.js
  - docker
  - documentation
---


# askNYC Backend and Frontend Deployment to Google Cloud Run

The askNYC backend and frontend services were successfully deployed to Google Cloud Run in the `us-central1` region. This deployment involved creating a standalone Next.js build using a Dockerfile for the frontend and updating `next.config.ts`. All team documentation and task lists were consequently updated to reflect the completed deployment.

## Key Concepts

Google Cloud Run deployment,Next.js standalone build,Dockerfile for frontend applications,`next.config.ts` configuration,Documentation updates

## Details

The askNYC application's backend and frontend components are now hosted on Google Cloud Run in the `us-central1` region. This deployment was recorded under `rahilsinghi/askNYC` with SHA `9f11b1a`.

- **Backend URL:** `https://asknyc-backend-901435891859.us-central1.run.app`
- **Frontend URL:** `https://asknyc-frontend-901435891859.us-central1.run.app`

For the frontend deployment, a dedicated `Dockerfile` was created to containerize the Next.js application for a standalone build. This required modifying the `next.config.ts` file to include the `output: 'standalone'` configuration. Following the successful deployment, all relevant team documentation and the `BHARATH_TASKS.md` file were updated to reflect the completion of this task.

## Related

[[askNYC — Git Activity]],[[askNYC Application Deployment to Google Cloud Run]],[[askNYC Backend and Frontend Deployment to Cloud Run]],[[askNYC Documentation Update (March 2026)]],[[Bharath's askNYC Deployment & Live Camera Testing Task Specification]],[[Google Cloud Run]],[[Next.js]],[[Dockerfile]]
