---
title: "Fix: Add Vercel Production URL to Default CORS Origins"
author: ai
created_at: 2026-04-10T19:17:39.545Z
last_ai_edit: 2026-04-10T19:17:39.545Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-backend-add-vercel-production-url-to-default-cors-origin-b67ffb.md]]"
tags:
  - cors
  - vercel
  - backend
  - fix
  - production
  - api
  - security
---

# Fix: Add Vercel Production URL to Default CORS Origins

This article details a fix implemented in the `rahilsinghi/karen` backend to address Cross-Origin Resource Sharing (CORS) issues. It involved adding the Vercel production URL to the list of allowed origins, ensuring the frontend application can successfully communicate with the backend.

## Key Concepts

CORS (Cross-Origin Resource Sharing),Vercel,Backend Development,Production Environment,API Security

## Details

This entry documents a crucial backend fix within the `rahilsinghi/karen` repository, identified by commit `2794fac`. On 2026-04-04, Rahil Singhi implemented a change to the default CORS origins. The modification specifically added the Vercel production URL to the backend's allowed origins list. This action resolves potential issues where a frontend application hosted on Vercel might be blocked from making requests to the backend due to same-origin policy restrictions. The change involved a single file modification, resulting in one addition and one deletion, indicating a precise adjustment to the CORS configuration.

## Related

[[CORS]],[[Vercel]],[[Backend Development]],[[API Security]],[[rahilsinghi/karen Project]]
