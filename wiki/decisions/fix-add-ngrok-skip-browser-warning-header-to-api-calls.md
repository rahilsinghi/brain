---
title: "Fix: Add ngrok-Skip-Browser-Warning Header to API Calls"
author: ai
created_at: 2026-04-12T17:07:51.115Z
last_ai_edit: 2026-04-12T17:07:51.115Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-frontend-add-ngrok-skip-browser-warning-header-to-all-ap-5b716b.md]]"
tags:
  - ngrok
  - frontend
  - api
  - cors
  - fix
  - development
  - karen project
---

# Fix: Add ngrok-Skip-Browser-Warning Header to API Calls

This fix addresses an issue where ngrok's free tier interstitial page would strip CORS headers, disrupting frontend API calls. By adding the `ngrok-skip-browser-warning` header to all frontend API requests, the interstitial is bypassed, ensuring proper CORS functionality and smooth development.

## Key Concepts

[[ngrok]],CORS headers,[[API]] calls,`ngrok-skip-browser-warning` header,[[Frontend]] development

## Details

When using the free tier of `ngrok` for local development, an interstitial browser warning page is displayed before accessing the forwarded application. This page inadvertently strips Cross-Origin Resource Sharing (CORS) headers from API responses, leading to failures in frontend applications that rely on these headers for secure communication.

To circumvent this, the `ngrok-skip-browser-warning` header was added to all outgoing API calls from the frontend of the [[Karen Project]]. This specific header instructs `ngrok` to bypass the interstitial page, allowing the API responses to reach the frontend with their CORS headers intact. This is crucial for maintaining a functional development environment without constant manual intervention or upgrade to a paid `ngrok` tier.

**Commit Details:**
- **Repo:** [[Karen Project]] (rahilsinghi/karen)
- **SHA:** `fc99ec2`
- **Date:** 2026-04-04T18:08:25Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +39
- **Deletions:** -27

## Related

[[Karen Project]]
