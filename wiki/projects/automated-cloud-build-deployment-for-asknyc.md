---
title: Automated Cloud Build Deployment for askNYC
author: ai
created_at: 2026-04-13T17:43:31.420Z
last_ai_edit: 2026-04-13T17:43:31.420Z
last_human_edit: null
last_embedded_hash: 6c221b4347016d36
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-chore-add-cloud-build-auto-deploy-on-push-to-main-430e03.md]]"
tags:
  - asknyc
  - cloud build
  - cloud run
  - continuous deployment
  - automation
  - deployment
  - infrastructure
---


# Automated Cloud Build Deployment for askNYC

This update implements an automated continuous deployment pipeline for the askNYC project. It configures Google Cloud Build to automatically build and deploy both the backend and frontend components to Cloud Run. This process is triggered by every push to the `main` branch.

## Key Concepts

[[Google Cloud Build]],[[Continuous Deployment]],[[Google Cloud Run]],[[Backend Deployment]],[[Frontend Deployment]],[[Git Push Trigger]]

## Details

This chore commit (SHA: `761c5b3`) for the `rahilsinghi/askNYC` repository, authored by Rahil Singhi on 2026-03-28T04:34:36Z, introduces a significant infrastructure enhancement. It sets up an automated continuous deployment process using Google Cloud Build.

Upon every push to the `main` branch of the `askNYC` repository, a Cloud Build trigger (named `deploy-on-push` in `us-central1`) is activated. This trigger orchestrates the build and deployment of both the project's backend and frontend services directly to Google Cloud Run, ensuring that the live application is always up-to-date with the latest codebase on `main`.

## Related

[[askNYC]],[[askNYC Application Deployment to Google Cloud Run]],[[askNYC Backend and Frontend Deployment to Cloud Run]]
