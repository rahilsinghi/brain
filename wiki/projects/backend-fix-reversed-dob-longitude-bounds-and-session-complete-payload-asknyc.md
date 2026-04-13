---
title: "Backend Fix: Reversed DOB Longitude Bounds and Session Complete Payload (askNYC)"
author: ai
created_at: 2026-04-13T15:31:28.246Z
last_ai_edit: 2026-04-13T15:31:28.246Z
last_human_edit: null
last_embedded_hash: bc98dc5b1434fca3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-reversed-dob-longitude-bounds-session-complet-6f8dee.md]]"
tags:
  - asknyc
  - backend
  - fix
  - dob
  - websocket
  - payload
  - bugfix
  - api
---


# Backend Fix: Reversed DOB Longitude Bounds and Session Complete Payload (askNYC)

This commit addresses two critical backend issues within the [[askNYC]] project: correcting swapped longitude bounds in the DOB permits query which prevented results, and ensuring the `session_complete` WebSocket message sends the full `SessionSummary` object as expected by the frontend.

## Key Concepts

Backend Fixes,DOB Permits Query,Longitude Bounds,WebSocket Communication,Session Management,API Payload Structure,Frontend-Backend Integration

## Details

This backend fix, identified by commit `e55bf3f` in the `rahilsinghi/askNYC` repository, resolved two distinct issues:

1.  **DOB Permits Query Correction**: The query for Department of Buildings (DOB) permits was failing to return any results due to an incorrect configuration where `lng_min` and `lng_max` (longitude minimum and maximum) parameters were inadvertently swapped. This commit rectified the order, allowing the query to function as intended and retrieve relevant permit data.
2.  **`session_complete` WebSocket Payload Enhancement**: Previously, the WebSocket message signaling session completion (`session_complete`) was only transmitting the `session_id`. The frontend, however, was designed to expect a comprehensive `SessionSummary` object for proper state management and display. This fix updated the backend to include the full `SessionSummary` object in the `session_complete` message, ensuring correct data flow and frontend functionality.

These changes involved modifications across 2 files, resulting in 14 additions and 3 deletions.

## Related

[[askNYC]],[[Backend Fix: Reversed DOB Longitude Bounds and Session Complete Payload (askNYC)]],[[askNYC Backend Hardening (ad6b409)]],[[askNYC Backend: Error Handling and Logging for Silent Failures]],[[askNYC Backend: WebSocket and Vertex AI Connection Fixes]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]],[[SessionSummary]]
