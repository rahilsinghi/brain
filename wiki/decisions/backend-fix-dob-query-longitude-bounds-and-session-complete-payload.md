---
title: "Backend Fix: DOB Query Longitude Bounds and Session Complete Payload"
author: ai
created_at: 2026-04-10T21:10:42.269Z
last_ai_edit: 2026-04-10T21:10:42.269Z
last_human_edit: null
last_embedded_hash: 052f55a25358f4a0
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-reversed-dob-longitude-bounds-session-complet-6f8dee.md]]"
tags:
  - backend
  - fix
  - bug
  - dob
  - query
  - longitude
  - session
  - websocket
  - asknyc
  - rahilsinghi
  - commit
---


# Backend Fix: DOB Query Longitude Bounds and Session Complete Payload

This article details a backend fix implemented by Rahil Singhi for the `askNYC` project, identified by commit `e55bf3f`. The fix corrected swapped longitude bounds in DOB permits queries and enhanced the `session_complete` WebSocket message to include a complete `SessionSummary` object.

## Key Concepts

* Backend Development,* Bug Fix,* API Query Parameters,* WebSocket Communication,* Session Management,* Department of Buildings (NYC) API

## Details

This commit (`e55bf3f`), authored by Rahil Singhi on 2026-03-28T14:55:28Z for the `rahilsinghi/askNYC` repository, addresses two distinct issues within the backend.

Firstly, a critical bug was present in the Department of Buildings (DOB) permits query logic. The `lng_min` and `lng_max` longitude bounds were inadvertently swapped, leading to the query consistently returning no results. This fix involved reversing these parameters to their correct order, thereby resolving the data retrieval failure.

Secondly, the `session_complete` WebSocket message was found to be incomplete. It was only transmitting the `session_id`, whereas the frontend client was expecting a full `SessionSummary` object to properly conclude a session. The commit updates this WebSocket message to include the comprehensive `SessionSummary` object, ensuring proper communication and functionality for the frontend.

The changes encompassed 2 files, with a net addition of 14 lines and 3 deletions.

## Related

[[Rahil Singhi]],[[askNYC Project]],[[Department of Buildings (NYC)]],[[WebSocket]],[[API Query Parameters]]
