---
title: Add /sessions Endpoint at Root Level for askNYC
author: ai
created_at: 2026-04-12T21:57:33.226Z
last_ai_edit: 2026-04-12T21:57:33.226Z
last_human_edit: null
last_embedded_hash: 2a138e31967ca333
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-add-sessions-endpoint-at-root-level-was-only-under-ws-812f60.md]]"
tags:
  - asknyc
  - api
  - bugfix
  - endpoint
  - backend
  - sessions
  - websocket
---


# Add /sessions Endpoint at Root Level for askNYC

This commit for the [[askNYC]] project resolved a bug by making the `/sessions` API endpoint directly accessible at the root level. Previously, it was incorrectly nested under a `/ws` prefix, causing accessibility issues. The fix ensures proper session management for the application.

## Key Concepts

API Endpoint,WebSockets,Bug Fix,Session Management

## Details

The commit `8d8a273`, authored by Rahil Singhi on March 28, 2026, targets the `rahilsinghi/askNYC` repository. Its primary purpose was to correct the accessibility of the `/sessions` API endpoint.

Prior to this fix, the `/sessions` endpoint was inadvertently placed under a `/ws` prefix, meaning it was only reachable via a path like `/ws/sessions`. This incorrect routing prevented proper access to session-related functionalities. The commit modified 1 file, adding 4 lines and deleting 1, to expose the `/sessions` endpoint directly at the root level, thus resolving the routing issue and ensuring the application's session management operates as intended.

## Related

[[askNYC]],[[API Server Factory with Graceful Shutdown]],[[askNYC Backend Hardening (ad6b409)]],[[askNYC: Wire Real Session Data and Fix Navigation]]
