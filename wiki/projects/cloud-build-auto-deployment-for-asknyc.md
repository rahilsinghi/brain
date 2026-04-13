---
title: Cloud Build Auto-Deployment for askNYC
author: ai
created_at: 2026-04-11T01:37:39.628Z
last_ai_edit: 2026-04-11T01:37:39.628Z
last_human_edit: null
last_embedded_hash: b5bf4059f29d9ea0
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-chore-add-cloud-build-auto-deploy-on-push-to-main-430e03.md]]"
tags:
  - deployment
  - automation
  - cloud
  - asknyc
  - google cloud run
  - google cloud build
  - ci/cd
---


# Cloud Build Auto-Deployment for askNYC

This commit implements an automated continuous deployment pipeline for the askNYC project. It configures Google Cloud Build to automatically build and deploy both the backend and frontend components to Google Cloud Run upon every push to the `main` branch.

## Key Concepts

Continuous Deployment,Google Cloud Build,Google Cloud Run,Automated Deployment

## Details

The `761c5b3` commit to the `rahilsinghi/askNYC` repository establishes a continuous deployment (CD) workflow using Google Cloud Build. Specifically, a Cloud Build trigger named `deploy-on-push` in the `us-central1` region is configured to monitor the `main` branch. Whenever changes are pushed to this branch, Cloud Build automatically executes a process that builds both the backend and frontend services of the askNYC application and subsequently deploys them to their respective Google Cloud Run services. This automation streamlines the deployment process, ensuring that the live application is always up-to-date with the latest `main` branch changes.

## Related

[[askNYC]],[[Automated Cloud Build Deployment for askNYC]],[[askNYC Application Deployment to Google Cloud Run]],[[AskNYC Backend and Frontend Deployment to Google Cloud Run]],[[Google Cloud Build]],[[Google Cloud Run]],[[Continuous Deployment]],[[Main Branch]]
