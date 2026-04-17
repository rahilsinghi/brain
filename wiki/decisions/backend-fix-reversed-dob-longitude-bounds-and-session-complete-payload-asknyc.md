---
title: "Backend Fix: Reversed DOB Longitude Bounds and Session Complete Payload (askNYC)"
author: ai
created_at: 2026-04-12T17:18:29.645Z
last_ai_edit: 2026-04-12T17:18:29.645Z
last_human_edit: null
last_embedded_hash: 64255d91ea269f1a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-reversed-dob-longitude-bounds-session-complet-6f8dee.md]]"
tags:
  - backend
  - bugfix
  - asknyc
  - websocket
  - dob
  - sessionmanagement
---


# Backend Fix: Reversed DOB Longitude Bounds and Session Complete Payload (askNYC)

This commit addresses a critical bug in the askNYC backend where the longitude bounds for DOB permit queries were swapped, leading to no results. Additionally, it rectifies the `session_complete` WebSocket message to include the full `SessionSummary` object expected by the frontend, instead of just the session ID.

## Key Concepts

[[DOB Permits Query]],[[Longitude Bounds]],[[WebSocket]] (WS),[[SessionSummary]],[[Frontend-Backend Communication]]

## Details

The commit `e55bf3f` for the `rahilsinghi/askNYC` repository resolves two key issues in the backend:

1.  **DOB Permits Query Longitude Bounds:** The `lng_min` and `lng_max` parameters for the DOB (Department of Buildings) permits query were inadvertently swapped. This logical error prevented any results from being returned for DOB permit queries. The fix corrects the order of these parameters.
2.  **Incomplete `session_complete` WebSocket Payload:** The WebSocket message sent upon session completion was only transmitting the `session_id`. The frontend, however, expects a comprehensive `SessionSummary` object. This commit updates the `session_complete` WebSocket message to include the full `SessionSummary` object, ensuring proper frontend functionality and data display.

## Related

[[askNYC]],[[Backend Fix: DOB Longitude Bounds and Session Complete Payload]]
