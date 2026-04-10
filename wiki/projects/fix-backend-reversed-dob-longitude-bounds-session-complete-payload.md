---
title: "fix(backend): Reversed DOB Longitude Bounds + session_complete Payload"
author: ai
created_at: 2026-04-10T02:55:12.133Z
last_ai_edit: 2026-04-10T02:55:12.133Z
last_human_edit: null
last_embedded_hash: 890bdc23c415251f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-reversed-dob-longitude-bounds-session-complet-6f8dee.md]]"
tags:
  - bug-fix
  - backend
  - websocket
  - geospatial
  - dob-permits
  - asknyc
  - session-management
  - payload
  - longitude
  - new-york-city
---


# fix(backend): Reversed DOB Longitude Bounds + session_complete Payload

A bug fix commit in the rahilsinghi/askNYC repository addressing two backend issues: swapped longitude bounds in the DOB permits query that prevented results from being returned, and an incomplete WebSocket session_complete message payload missing the full SessionSummary object.

## Key Concepts

- **DOB Permits Query**: A query to the Department of Buildings (DOB) permits data that uses geographic bounding box parameters (lng_min/lng_max) to filter results by longitude range
- **Longitude Bounds (lng_min/lng_max)**: Minimum and maximum longitude values used to define a geographic boundary; when swapped, the query returns no valid results
- **session_complete WebSocket Message**: A WebSocket event sent to notify the frontend that a session has ended, expected to carry a full SessionSummary object
- **SessionSummary Object**: A structured data payload containing comprehensive session information that the frontend requires upon session completion
- **Payload Mismatch**: A bug pattern where the server sends an incomplete or incorrect data structure that does not match the frontend's expected schema

## Details

## Overview

Commit `e55bf3f` by Rahil Singhi on 2026-03-28 introduces two targeted bug fixes to the backend of the askNYC project.

## Bug Fix 1: Reversed DOB Longitude Bounds

The DOB permits query was constructed with `lng_min` and `lng_max` values swapped. Because geographic bounding box queries require `lng_min < lng_max`, the reversed values caused the query to never match any valid records, effectively returning empty results for all permit lookups. This fix corrects the parameter order so that the bounding box is valid and results are properly returned.

## Bug Fix 2: Incomplete session_complete WebSocket Payload

The WebSocket `session_complete` message was only transmitting the `session_id` field, whereas the frontend expected the full `SessionSummary` object. This mismatch would cause the frontend to fail when attempting to access summary fields not present in the payload. The fix updates the message to include the complete `SessionSummary` object.

## Change Stats

| Metric | Value |
|---|---|
| Repository | rahilsinghi/askNYC |
| Commit SHA | e55bf3f |
| Date | 2026-03-28T14:55:28Z |
| Author | Rahil Singhi |
| Files Changed | 2 |
| Additions | +14 |
| Deletions | -3 |

## Related

- [[askNYC Project]]
- [[DOB Permits API Integration]]
- [[WebSocket Session Management]]
- [[SessionSummary Data Model]]
- [[Geographic Bounding Box Queries]]
- [[Rahil Singhi]]
