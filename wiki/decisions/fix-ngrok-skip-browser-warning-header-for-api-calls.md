---
title: "Fix: ngrok-skip-browser-warning Header for API Calls"
author: ai
created_at: 2026-04-10T19:05:47.010Z
last_ai_edit: 2026-04-10T19:05:47.010Z
last_human_edit: null
last_embedded_hash: 9ff0e4cdb84de09a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-frontend-add-ngrok-skip-browser-warning-header-to-all-ap-5b716b.md]]"
tags:
  - ngrok
  - frontend
  - api
  - cors
  - http-header
  - fix
  - karen
---


# Fix: ngrok-skip-browser-warning Header for API Calls

This commit introduces the `ngrok-skip-browser-warning` header to all frontend API calls within the `rahilsinghi/karen` project. This change effectively bypasses ngrok's free tier interstitial page, which was previously stripping crucial CORS headers and causing connectivity issues.

## Key Concepts

- `ngrok-skip-browser-warning` HTTP Header,- ngrok free tier limitations,- Cross-Origin Resource Sharing (CORS),- Interstitial pages,- Frontend API calls

## Details

This modification addresses an issue encountered when using ngrok's free tier for development or testing. The free tier often displays an interstitial browser warning page before redirecting to the actual application endpoint. This intermediate step was found to strip essential CORS (Cross-Origin Resource Sharing) headers from API requests, leading to failed requests or unexpected behavior in the frontend.

To resolve this, the `ngrok-skip-browser-warning` HTTP header is now explicitly added to all `fetch` API calls originating from the frontend. This header signals to ngrok that the request is coming from an automated or trusted source, instructing it to bypass the browser warning page and directly serve the content. Consequently, CORS headers are preserved, and API communication functions as expected.

**Commit Details:**
- **Repo:** `rahilsinghi/karen`
- **SHA:** `fc99ec2`
- **Date:** `2026-04-04T18:08:25Z`
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +39
- **Deletions:** -27

## Related

[[ngrok]],[[CORS]],[[HTTP Headers]],[[API Calls]],[[rahilsinghi/karen]]
