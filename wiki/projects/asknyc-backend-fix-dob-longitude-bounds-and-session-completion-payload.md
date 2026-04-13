---
title: "askNYC Backend Fix: DOB Longitude Bounds and Session Completion Payload"
author: ai
created_at: 2026-04-13T17:12:15.074Z
last_ai_edit: 2026-04-13T17:12:15.074Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-reversed-dob-longitude-bounds-session-complet-6f8dee.md]]"
tags:
  - asknyc
  - backend
  - bugfix
  - websocket
  - dob permits
  - session management
  - api
---

# askNYC Backend Fix: DOB Longitude Bounds and Session Completion Payload

This commit resolves two critical backend issues within the askNYC project. It corrects an error where `lng_min` and `lng_max` were swapped in DOB permit queries, which had prevented any results from being returned. Additionally, it updates the `session_complete` WebSocket message to transmit the complete `SessionSummary` object, aligning with the frontend's expectations.

## Key Concepts

DOB Permits Query,Longitude Bounds,WebSocket Communication,Session Management,SessionSummary Object,Backend Bugfix

## Details

This commit, identified by `e55bf3f` in the `rahilsinghi/askNYC` repository, addresses a pair of significant bugs impacting the askNYC backend functionality. The changes, implemented on 2026-03-28, involve modifications across two files, with 14 additions and 3 deletions.

**1. Reversed DOB Longitude Bounds:**
Previously, the query logic for fetching Department of Buildings (DOB) permits contained a subtle but critical error: the `lng_min` and `lng_max` parameters were inadvertently swapped. This inversion meant that the query was consistently asking for longitude ranges that were impossible to satisfy, resulting in no DOB permits being returned to the user, regardless of valid geographic input.

**2. Incomplete Session Completion Payload:**
The `session_complete` WebSocket message, intended to inform the frontend about the conclusion of a user session, was only sending the `session_id`. The frontend, however, was designed to expect a full `SessionSummary` object containing comprehensive details about the completed session. This discrepancy led to partial or incorrect session status displays on the client side.

Both issues have been rectified with this commit, ensuring accurate DOB permit retrieval and complete session state communication to the frontend.

## Related

[[askNYC]],[[Backend Fix: Reversed DOB Longitude Bounds and Session Complete Payload (askNYC)]],[[askNYC Backend: WebSocket and Vertex AI Connection Fixes]],[[askNYC Backend Hardening (ad6b409)]],[[askNYC: Next.js 15 Dashboard with Real-time WebSocket UI]]
