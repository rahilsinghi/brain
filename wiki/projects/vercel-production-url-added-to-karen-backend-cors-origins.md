---
title: Vercel Production URL Added to Karen Backend CORS Origins
author: ai
created_at: 2026-04-11T00:32:01.767Z
last_ai_edit: 2026-04-11T00:32:01.767Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-backend-add-vercel-production-url-to-default-cors-origin-b67ffb.md]]"
tags:
  - backend
  - fix
  - cors
  - vercel
  - karen
  - deployment
  - api
---

# Vercel Production URL Added to Karen Backend CORS Origins

This commit addresses a backend issue in the [[Karen Project]] by incorporating the Vercel production URL into the default CORS origins. This ensures proper cross-origin resource sharing for the Vercel-deployed frontend.

## Key Concepts

[[CORS]] (Cross-Origin Resource Sharing),[[Vercel]],[[API Backend]],[[Deployment]]

## Details

This commit, identified by SHA `2794fac`, was made on `2026-04-04T17:59:17Z` by Rahil Singhi in the `rahilsinghi/karen` repository. It involves a minor code change (+1 addition, -1 deletion) to address a backend configuration issue. Specifically, it adds the Vercel production URL to the list of allowed CORS origins for the [[Karen Project]] backend. This modification is crucial for enabling the frontend, likely hosted on [[Vercel]], to make successful API requests to the backend without encountering cross-origin policy restrictions. This is a common requirement in web development when the frontend and backend are hosted on different domains or subdomains.

## Related

[[Karen Project]],[[API]],[[Deployment]],[[CORS]],[[Vercel]]
