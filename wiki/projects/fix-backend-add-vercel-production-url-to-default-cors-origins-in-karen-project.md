---
title: "fix(backend): Add Vercel Production URL to Default CORS Origins in Karen Project"
author: ai
created_at: 2026-04-12T21:52:31.922Z
last_ai_edit: 2026-04-12T21:52:31.922Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-backend-add-vercel-production-url-to-default-cors-origin-b67ffb.md]]"
tags:
  - backend
  - cors
  - vercel
  - karen
  - bugfix
  - configuration
  - api
---

# fix(backend): Add Vercel Production URL to Default CORS Origins in Karen Project

This commit resolves a Cross-Origin Resource Sharing (CORS) issue in the [[Karen Project]]'s backend by including the Vercel production URL in the list of allowed origins. This ensures proper communication between the Vercel-hosted frontend and the Karen backend API, preventing access-related errors.

## Key Concepts

CORS (Cross-Origin Resource Sharing),Vercel,Production URL,Backend API,Configuration management

## Details

This backend fix, identified by commit `2794fac` and authored by [[Rahil Singhi]] on April 4, 2026, specifically addresses a CORS configuration problem within the `rahilsinghi/karen` repository. The change involves a minimal modification to one file, adding the Vercel production URL to the default list of allowed origins. This ensures that any frontend application deployed on Vercel can securely interact with the [[Karen Project]]'s backend API without encountering cross-origin policy restrictions.

## Related

[[Karen Project]],[[Rahil Singhi]],[[Backend Core Implementation: FastAPI, Pydantic, and Docker (Karen Project)]],[[API Server Factory with Graceful Shutdown]],[[API Refinements Post Code Review]]
