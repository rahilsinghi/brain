---
title: "Fix: Add ngrok-skip-browser-warning Header to All API Calls"
author: ai
created_at: 2026-04-10T02:11:53.188Z
last_ai_edit: 2026-04-10T02:11:53.188Z
last_human_edit: null
last_embedded_hash: 43aeab2540fc88e9
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-frontend-add-ngrok-skip-browser-warning-header-to-all-ap-5b716b.md]]"
tags:
  - ngrok
  - cors
  - frontend
  - fetch
  - api
  - local-development
  - bug-fix
  - http-headers
  - tunneling
  - karen-project
---


# Fix: Add ngrok-skip-browser-warning Header to All API Calls

A frontend fix committed to the rahilsinghi/karen repository that adds the `ngrok-skip-browser-warning` header to all API fetch calls. This was necessary because ngrok's free tier displays an interstitial warning page that strips CORS headers, breaking API communication. The change affected 7 files with 39 additions and 27 deletions.

## Key Concepts

- **ngrok Interstitial Page**: ngrok's free tier injects a browser warning page before proxying requests, which strips CORS headers and breaks frontend API calls
- **ngrok-skip-browser-warning Header**: A custom request header that instructs ngrok to bypass its interstitial warning page and forward requests directly
- **CORS (Cross-Origin Resource Sharing)**: A browser security mechanism that relies on specific HTTP headers; disrupted when ngrok strips headers via its interstitial page
- **Fetch API**: The browser API used to make HTTP requests in the frontend, where the header fix was applied across all call sites

## Details

## Problem

When using ngrok's free tier as a tunneling solution for local development, ngrok injects an interstitial browser warning page before proxying traffic to the local server. This interstitial page strips CORS-related HTTP headers from responses, causing the frontend application to fail when making API calls due to CORS policy violations.

## Solution

The fix adds the `ngrok-skip-browser-warning` header to all `fetch` calls in the frontend codebase. This header signals to ngrok that the browser warning page should be skipped, allowing requests to pass through directly to the backend with CORS headers intact.

## Commit Details

| Field | Value |
|---|---|
| Repository | rahilsinghi/karen |
| SHA | fc99ec2 |
| Date | 2026-04-04 |
| Author | Rahil Singhi |
| Files Changed | 7 |
| Additions | +39 |
| Deletions | -27 |

## Impact

- Restores proper CORS behavior during local development with ngrok
- Affects 7 frontend files containing API fetch calls
- This is a development/tunneling concern and may not be relevant in production environments where ngrok is not used

## Notes

This fix is specific to the ngrok free tier. Paid ngrok plans or alternative tunneling solutions may not require this workaround. Care should be taken to ensure this header does not cause issues when the application is deployed outside of an ngrok-tunneled environment.

## Related

- [[ngrok Local Development Setup]]
- [[CORS Configuration]]
- [[Karen Project Frontend Architecture]]
- [[API Fetch Utility]]
- [[Local Development Tunneling]]
