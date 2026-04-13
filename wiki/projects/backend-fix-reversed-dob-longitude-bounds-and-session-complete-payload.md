---
title: "Backend Fix: Reversed DOB Longitude Bounds and Session Complete Payload"
author: ai
created_at: 2026-04-11T00:12:43.898Z
last_ai_edit: 2026-04-11T00:12:43.898Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-reversed-dob-longitude-bounds-session-complet-6f8dee.md]]"
tags:
  - backend
  - bugfix
  - asknyc
  - websocket
  - data query
  - api
  - geolocation
---

# Backend Fix: Reversed DOB Longitude Bounds and Session Complete Payload

This commit addresses two critical backend issues within the askNYC project: correcting swapped longitude bounds in the DOB permits query which prevented results, and enhancing the `session_complete` WebSocket message to include a full `SessionSummary` object for the frontend. These fixes ensure accurate data retrieval and comprehensive session reporting.

## Key Concepts

DOB permits query,Longitude bounds,WebSocket (WS) message,SessionSummary object,Frontend-Backend integration,API payload

## Details

This backend fix for the [[askNYC]] project resolves two distinct issues:

1.  **DOB Longitude Bounds Correction**: The `DOB permits query` was failing to return any results due to an incorrect swap of `lng_min` and `lng_max` values. This commit rectifies the order of these longitude bounds, allowing the query to function as intended and retrieve relevant permit data.
2.  **`session_complete` WebSocket Payload Enhancement**: Previously, the `session_complete` WebSocket message was only transmitting a `session_id`. The frontend, however, requires a complete `SessionSummary` object for proper processing and display. This fix updates the WebSocket message to include the full `SessionSummary` payload, ensuring the frontend receives all necessary information upon session completion.

**Technical Details:**
*   **Repository:** `rahilsinghi/askNYC`
*   **Commit SHA:** `e55bf3f`
*   **Date:** `2026-03-28T14:55:28Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 2
*   **Additions:** +14 lines
*   **Deletions:** -3 lines

These adjustments improve the reliability of data queries and the completeness of inter-service communication.

## Related

[[askNYC]],[[Backend Fix: DOB Query Longitude Bounds and Session Complete Payload]],[[askNYC Frontend Backend Integration Update (2026-03-28)]],[[Backend Fix: WebSocket and Vertex AI Connection Issues]],[[Backend Fix: Socrata Timeout and Transcription Object Handling]]
