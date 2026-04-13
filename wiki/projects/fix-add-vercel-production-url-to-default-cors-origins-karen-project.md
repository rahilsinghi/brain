---
title: "Fix: Add Vercel Production URL to Default CORS Origins (Karen Project)"
author: ai
created_at: 2026-04-11T00:35:11.927Z
last_ai_edit: 2026-04-11T00:35:11.927Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-backend-add-vercel-production-url-to-default-cors-origin-b67ffb.md]]"
tags:
  - backend
  - cors
  - vercel
  - production
  - fix
  - karen
  - api
---

# Fix: Add Vercel Production URL to Default CORS Origins (Karen Project)

This commit addresses a backend issue in the [[Karen Project]] by adding the Vercel production URL to the default CORS (Cross-Origin Resource Sharing) origins. This ensures that the frontend application hosted on Vercel can properly communicate with the backend API without security restrictions.

## Key Concepts

[[CORS]] (Cross-Origin Resource Sharing),[[Vercel]],Backend Development,Production Environment,API Security

## Details

This commit, identified by SHA `2794fac`, was made on `2026-04-04T17:59:17Z` by Rahil Singhi within the `rahilsinghi/karen` repository. The change involved modifying one file, resulting in one addition and one deletion.

The primary purpose of this fix was to resolve connectivity issues between the [[Karen Project]]'s frontend, deployed on [[Vercel]], and its backend. By explicitly whitelisting the Vercel production URL in the backend's default [[CORS]] configuration, the application overcomes common security measures that prevent web pages from making requests to a different domain than the one from which the first resource was served. This is crucial for enabling the deployed application to function correctly in a [[Production Environment]].

## Related

[[Karen Project]],[[CORS]],[[Vercel]],[[Backend Core Implementation: FastAPI, Pydantic, and Docker]],[[API Server Factory with Graceful Shutdown]]
