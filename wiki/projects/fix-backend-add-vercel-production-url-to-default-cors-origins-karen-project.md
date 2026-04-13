---
title: "fix(backend): Add Vercel Production URL to Default CORS Origins (Karen Project)"
author: ai
created_at: 2026-04-12T17:51:21.279Z
last_ai_edit: 2026-04-12T17:51:21.279Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-backend-add-vercel-production-url-to-default-cors-origin-b67ffb.md]]"
tags:
  - backend
  - cors
  - vercel
  - karen project
  - api
  - fix
---

# fix(backend): Add Vercel Production URL to Default CORS Origins (Karen Project)

This commit addresses a backend issue in the [[Karen Project]] by adding the Vercel production URL to the list of default Cross-Origin Resource Sharing (CORS) origins. This ensures that the frontend, when deployed on Vercel, can successfully interact with the backend API without CORS errors.

## Key Concepts

[[CORS]] (Cross-Origin Resource Sharing),[[Vercel]],[[Backend Development]],[[API Security]]

## Details

This commit, identified by SHA `2794fac`, was authored by [[Rahil Singhi]] on 2026-04-04T17:59:17Z. It specifically targets the `rahilsinghi/karen` repository, modifying one file. The change involves adding the Vercel production URL to the backend's default CORS origins configuration, which facilitates proper communication between the Vercel-hosted frontend and the backend API.

## Related

[[Karen Project]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]],[[API Security]],[[Vercel]]
