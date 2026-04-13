---
title: "Backend Fix: DOB Longitude Bounds and Session Complete Payload"
author: ai
created_at: 2026-04-11T00:12:24.577Z
last_ai_edit: 2026-04-11T00:12:24.577Z
last_human_edit: null
last_embedded_hash: 1acc72502aa59b7b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-reversed-dob-longitude-bounds-session-complet-6f8dee.md]]"
tags:
  - backend
  - bug fix
  - asknyc
  - websocket
  - api
  - data
---


# Backend Fix: DOB Longitude Bounds and Session Complete Payload

This commit addresses two critical backend issues in the `askNYC` project: a logical error in the DOB permits query where `lng_min`/`lng_max` were swapped, preventing results, and an incomplete `session_complete` WebSocket message that only sent the session ID instead of the full `SessionSummary` object.

## Key Concepts

Backend Bug Fix,DOB Permits Query,Longitude Bounds,WebSocket Messaging,Session Management,Data Structure Correction

## Details

This commit (SHA `e55bf3f`) by Rahil Singhi on March 28, 2026, resolves two significant backend issues within the `rahilsinghi/askNYC` repository:

1.  **DOB Permits Query Error**: The `lng_min` and `lng_max` parameters in the Department of Buildings (DOB) permits query were inadvertently swapped. This logical inversion prevented the query from returning any results, impacting the accuracy or availability of DOB-related information within the `askNYC` platform.
2.  **Incomplete Session Completion Payload**: The WebSocket message sent upon `session_complete` was only transmitting the `session_id`. The frontend, however, expected a comprehensive `SessionSummary` object. This fix ensures that the full `SessionSummary` object is now included, providing the necessary data for the frontend to process session completion correctly.

The commit involved changes to 2 files, adding 14 lines and deleting 3, indicating precise modifications to address these specific bugs.

## Related

[[askNYC — Git Activity]],[[askNYC Backend Hardening]],[[Backend Fix: DOB Query Longitude Bounds and Session Complete Payload]],[[Backend Fix: WebSocket and Vertex AI Connection Issues]],[[askNYC]]
