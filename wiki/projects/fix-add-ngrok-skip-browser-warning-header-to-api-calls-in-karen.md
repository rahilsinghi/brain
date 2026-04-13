---
title: "Fix: Add ngrok-skip-browser-warning Header to API Calls in Karen"
author: ai
created_at: 2026-04-13T17:07:40.128Z
last_ai_edit: 2026-04-13T17:07:40.128Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-frontend-add-ngrok-skip-browser-warning-header-to-all-ap-5b716b.md]]"
tags:
  - ngrok
  - cors
  - http-headers
  - api
  - frontend
  - karen-project
  - bugfix
  - networking
---

# Fix: Add ngrok-skip-browser-warning Header to API Calls in Karen

This commit addresses an issue in the Karen project where ngrok's free tier interstitial page stripped CORS headers, preventing API calls from completing. The fix involves adding the `ngrok-skip-browser-warning` header to all fetch calls, allowing them to bypass the interstitial page.

## Key Concepts

ngrok,CORS (Cross-Origin Resource Sharing),HTTP Headers,API Calls,Frontend Fixes

## Details

When using ngrok's free tier, an interstitial page is displayed before accessing the proxied service. This page unintentionally stripped Cross-Origin Resource Sharing (CORS) headers from API requests made by the frontend to the backend in the Karen project. This commit resolves the issue by explicitly adding the `ngrok-skip-browser-warning` HTTP header to all outgoing API fetch calls. This header instructs ngrok to bypass its interstitial page, ensuring that CORS headers are preserved and API communication functions as expected.

**Repository:** `rahilsinghi/karen`
**Commit SHA:** `fc99ec2`
**Date:** `2026-04-04T18:08:25Z`
**Author:** Rahil Singhi
**Files changed:** 7
**Additions:** +39
**Deletions:** -27

## Related

[[Karen Project]],[[Backend Core Implementation: FastAPI, Pydantic, and Docker (Karen Project)]],[[Frontend Fix: Add Vercel Production URL to CORS Origins (Karen Project)]]
