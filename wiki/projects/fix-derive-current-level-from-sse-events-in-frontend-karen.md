---
title: "Fix: Derive Current Level from SSE Events in Frontend (karen)"
author: ai
created_at: 2026-04-10T02:42:15.047Z
last_ai_edit: 2026-04-10T02:42:15.047Z
last_human_edit: null
last_embedded_hash: c3cd0813ee178a70
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-frontend-derive-current-level-from-sse-events-not-just-ec024f.md]]"
tags:
  - bug-fix
  - frontend
  - sse
  - real-time
  - escalation
  - level-counter
  - event-driven
  - karen
  - javascript
  - state-management
---



# Fix: Derive Current Level from SSE Events in Frontend (karen)

A bug fix in the rahilsinghi/karen repository corrected a stuck level counter that was frozen at 3/10 due to over-reliance on a fetch-based escalation endpoint. The fix derives the current level from real-time SSE (Server-Sent Events) level_start and level_complete events, and also adds level_start to the REFRESH_EVENTS set to trigger earlier escalation object refreshes.

## Key Concepts

- **SSE (Server-Sent Events):** A server-push mechanism used to stream real-time updates to the frontend without requiring repeated fetch roundtrips.
- **Escalation Object:** A data structure (`escalation.current_level`) previously used as the sole source of truth for the current level, requiring a network fetch to update.
- **Level Counter Bug:** The UI displayed a stuck value (3/10) because `escalation.current_level` was not updated until a fetch completed, lagging behind actual progress.
- **REFRESH_EVENTS:** A set of event types that trigger a refresh of the escalation object; extended to include `level_start` for more timely updates.
- **Event-Driven State Derivation:** The new approach derives the max/current level by listening to `level_start` and `level_complete` SSE events, keeping the UI in sync without waiting for a roundtrip.

## Details

## Overview

This commit (`310abac`) addresses a frontend bug in the **rahilsinghi/karen** project where the level counter was stuck displaying `3/10` despite actual progress having advanced beyond that point.

## Root Cause

The frontend was deriving the current level exclusively from `escalation.current_level`, a value that is only updated after a successful fetch roundtrip to the backend. Because the fetch was not always triggered at the right time, the displayed level lagged behind or froze entirely.

## Fix Applied

- **Event-based level derivation:** The frontend now listens to `level_start` and `level_complete` SSE events to compute the current level in real time. These events are always up-to-date because they are pushed by the server as they occur.
- **REFRESH_EVENTS expansion:** `level_start` was added to the `REFRESH_EVENTS` collection, ensuring that the escalation object is re-fetched sooner when a new level begins, keeping the fetched state from falling too far behind.

## Change Details

| Property | Value |
|---|---|
| Repository | rahilsinghi/karen |
| Commit SHA | 310abac |
| Date | 2026-04-04 |
| Author | Rahil Singhi |
| Files Changed | 4 |
| Additions | +27 |
| Deletions | -2 |

## Impact

The level counter now accurately reflects the real-time state of the escalation process by combining live SSE event data with periodic fetch-based refreshes, eliminating the stale display issue.

## Related

- [[Server-Sent Events (SSE)]]
- [[Escalation System]]
- [[Frontend State Management]]
- [[Event-Driven UI Updates]]
- [[karen Project]]
- [[REFRESH_EVENTS Configuration]]
