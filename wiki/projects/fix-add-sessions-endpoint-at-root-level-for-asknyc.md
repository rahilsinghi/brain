---
title: "Fix: Add /sessions Endpoint at Root Level for askNYC"
author: ai
created_at: 2026-04-11T01:26:46.805Z
last_ai_edit: 2026-04-11T01:26:46.805Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-add-sessions-endpoint-at-root-level-was-only-under-ws-812f60.md]]"
tags:
  - bug fix
  - api
  - endpoint
  - sessions
  - backend
  - asknyc
  - websocket
---

# Fix: Add /sessions Endpoint at Root Level for askNYC

This commit addresses a bug in the `rahilsinghi/askNYC` project by moving the `/sessions` API endpoint from being exclusively under the `/ws` (WebSocket) prefix to also being accessible directly at the root level. This ensures proper session management and accessibility for the application's backend services.

## Key Concepts

API Endpoint,WebSocket,Session Management,Backend Development

## Details

This commit (SHA: `8d8a273`) by Rahil Singhi, made on 2026-03-28, resolves an issue in the [[askNYC]] project where the `/sessions` endpoint was only available via the `/ws` WebSocket prefix. The fix involved modifying 1 file, adding 4 lines and deleting 1 line, to make the `/sessions` endpoint directly accessible at the root level. This change improves the accessibility and proper functioning of session-related operations for the backend.

## Related

[[askNYC]],[[Add /sessions Endpoint at Root Level for askNYC]],[[API Endpoint]]
