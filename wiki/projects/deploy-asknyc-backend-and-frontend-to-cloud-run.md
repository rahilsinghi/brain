---
title: Deploy askNYC Backend and Frontend to Cloud Run
author: ai
created_at: 2026-04-12T18:02:39.389Z
last_ai_edit: 2026-04-12T18:02:39.389Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-deploy-backend-frontend-to-cloud-run-update-all-docs-d2e07f.md]]"
tags:
  - deployment
  - cloud run
  - next.js
  - asknyc
  - documentation
  - backend
  - frontend
---

# Deploy askNYC Backend and Frontend to Cloud Run

This commit details the successful deployment of both the backend and frontend components of the askNYC project to Google Cloud Run. It includes the necessary configuration changes for a standalone Next.js build and updates all related team documentation.

## Key Concepts

[[Google Cloud Run]],[[Next.js]] Standalone Build,[[Dockerfile]],Project Deployment,Documentation Update

## Details

The askNYC backend and frontend services have been successfully deployed to Google Cloud Run in the `us-central1` region. 

**Deployment URLs:**
*   **Backend:** `https://asknyc-backend-901435891859.us-central1.run.app`
*   **Frontend:** `https://asknyc-frontend-901435891859.us-central1.run.app`

To facilitate the frontend deployment, a standalone Next.js build was configured by adding a dedicated `Dockerfile` for the frontend and updating `next.config.ts` with `output: 'standalone'`. All relevant team documentation, including `BHARATH_TASKS.md`, has been updated to reflect the completion of this deployment.

## Related

[[askNYC]],[[AskNYC Backend and Frontend Deployment to Cloud Run]],[[AskNYC Backend and Frontend Deployment to Google Cloud Run]],[[Cloud Build Auto-Deployment for askNYC]],[[askNYC Project Documentation Update (March 2026)]],[[AskNYC Documentation Suite]]
