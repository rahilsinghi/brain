---
title: "Fix: Derive Current Level from SSE Events in Frontend (Karen)"
author: ai
created_at: 2026-04-10T02:40:49.141Z
last_ai_edit: 2026-04-10T02:40:49.141Z
last_human_edit: null
last_embedded_hash: 7379b969299654ac
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-frontend-derive-current-level-from-sse-events-not-just-ec024f.md]]"
tags:
  - bug-fix
  - frontend
  - sse
  - real-time
  - karen
  - escalation
  - level-counter
  - javascript
  - events
---


# Fix: Derive Current Level from SSE Events in Frontend (Karen)

A bug fix in the Karen repository where the frontend level counter was stuck at 3/10 due to relying solely on a fetch roundtrip for `escalation.current_level`. The fix derives the current level from real-time SSE events (`level_start`/`level_complete`) and adds `level_start` to `REFRESH_EVENTS` for earlier escalation object refreshes.

## Key Concepts

- **SSE (Server-Sent Events):** Real-time event stream used to derive up-to-date level state without fetch roundtrips
- **escalation.current_level:** The previously relied-upon field that required a network fetch, causing stale level data
- **level_start / level_complete events:** SSE event types now used to compute the current level on the frontend
- **REFRESH_EVENTS:** A set or list of event types that trigger a refresh of the escalation object; now includes `level_start`
- **Level Counter Bug:** The UI displayed a stuck value (3/10) because the fetch-based approach did not reflect the latest state in real time

## Details

## Overview

This commit addresses a frontend bug in the [Karen](https://github.com/rahilsinghi/karen) project where the level counter displayed an incorrect, stuck value of `3/10`.

## Root Cause

The level counter was derived exclusively from `escalation.current_level`, which is only updated after a full fetch roundtrip to the backend. This meant that between fetches, the displayed level would lag behind or remain stuck, failing to reflect real-time progression.

## Fix Applied

- The frontend now computes the maximum current level by listening to `level_start` and `level_complete` SSE events, which are always up-to-date.
- `level_start` was added to the `REFRESH_EVENTS` collection so that the escalation object is re-fetched sooner when a new level begins, keeping the full escalation state synchronized.

## Change Summary

| Property | Value |
|---|---|
| Repo | rahilsinghi/karen |
| SHA | 310abac |
| Date | 2026-04-04T20:47:14Z |
| Author | Rahil Singhi |
| Files Changed | 4 |
| Additions | +27 |
| Deletions | -2 |

## Impact

- Level counter now accurately reflects real-time game/escalation state.
- Reduced dependency on polling/fetch for UI state that can be derived from the SSE stream.
- Escalation object refreshes sooner after level transitions.

## Related

- [[Karen Project]]
- [[Server-Sent Events (SSE)]]
- [[Escalation System]]
- [[Frontend State Management]]
- [[Real-Time Event Handling]]
- [[REFRESH_EVENTS Configuration]]
