---
title: "fix(backend): Reversed DOB Longitude Bounds + session_complete Payload (e55bf3f)"
author: ai
created_at: 2026-04-10T02:55:15.378Z
last_ai_edit: 2026-04-10T02:55:15.378Z
last_human_edit: null
last_embedded_hash: 5feaec32eb116889
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-reversed-dob-longitude-bounds-session-complet-6f8dee.md]]"
tags:
  - bug-fix
  - backend
  - geospatial
  - websocket
  - dob-permits
  - asknyc
  - longitude
  - session-management
  - payload
  - rahil-singhi
---


# fix(backend): Reversed DOB Longitude Bounds + session_complete Payload (e55bf3f)

This commit fixes two backend bugs in the askNYC repository: a swapped longitude bounds issue in the DOB permits query that prevented results from returning, and an incomplete session_complete WebSocket message that was missing the full SessionSummary object expected by the frontend. The changes were authored by Rahil Singhi on 2026-03-28, affecting 2 files with 14 additions and 3 deletions.

## Key Concepts

- **DOB Permits Query:** The lng_min and lng_max values were reversed, causing geographic filtering to fail and return no results
- **Longitude Bounds Bug:** A classic coordinate bounds swap where minimum and maximum longitude values are accidentally transposed
- **session_complete WebSocket Message:** A WebSocket event signaling the end of a user session, previously only sending session_id
- **SessionSummary Object:** The full data payload the frontend expects upon session completion, now correctly included in the WS message
- **Payload Completeness:** Ensuring WebSocket messages carry all required fields to satisfy frontend data contracts

## Details

## Overview

Commit `e55bf3f` in the `rahilsinghi/askNYC` repository addresses two distinct backend bugs that were causing functional failures in geographic querying and WebSocket communication.

## Bug 1: Reversed DOB Longitude Bounds

### Problem
The Department of Buildings (DOB) permits query had its `lng_min` and `lng_max` values swapped. This caused the geographic bounding box filter to be logically inverted, meaning no permits within the intended area would ever be returned — effectively breaking all DOB permit lookups by location.

### Fix
The longitude bound variables were corrected to their proper positions (`lng_min` assigned the lesser value, `lng_max` the greater), restoring accurate spatial filtering of DOB permit data.

## Bug 2: Incomplete session_complete WebSocket Payload

### Problem
The `session_complete` WebSocket message was only transmitting the `session_id` field. The frontend, however, expected the full `SessionSummary` object to be present in the message payload in order to render session completion data correctly.

### Fix
The WebSocket handler was updated to include the complete `SessionSummary` object in the `session_complete` message, aligning the backend response with the frontend's data contract.

## Change Statistics

| Metric | Value |
|---|---|
| Repository | rahilsinghi/askNYC |
| SHA | e55bf3f |
| Date | 2026-03-28 |
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
- [[Backend Bug Fixes]]
