---
title: "fix: lyria reset_context on bpm change (SHA: 7a21d9f)"
author: ai
created_at: 2026-04-10T02:14:34.204Z
last_ai_edit: 2026-04-10T02:14:34.204Z
last_human_edit: null
last_embedded_hash: 770d59a915ee56e3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-lyria-reset-context-on-bpm-change-5bb18f.md]]"
tags:
  - bugfix
  - lyria
  - coro
  - bpm
  - session-management
  - error-handling
  - receive-loop
  - context-reset
  - audio
  - rahilsinghi
---


# fix: lyria reset_context on bpm change (SHA: 7a21d9f)

This commit by Rahil Singhi addresses a bug in the Coro project related to Lyria's context reset behavior when a BPM change occurs. The fix also includes session cleanup handling for errors encountered in the receive loop. The change is minimal, modifying a single file with 10 additions and 2 deletions.

## Key Concepts

- **BPM Change Handling:** Lyria's context (`reset_context`) was not being properly reset when the BPM (beats per minute) changed, leading to potential state inconsistencies
- **Session Cleanup:** Improved cleanup logic for Lyria sessions when an error occurs during the receive loop
- **Receive Loop Error Handling:** The receive loop is a core component that processes incoming data; errors here required graceful session teardown
- **Lyria:** A component or module within the Coro project responsible for audio/music session management

## Details

## Overview

Commit `7a21d9f` in the `rahilsinghi/Coro` repository, authored by Rahil Singhi on 2026-02-28, introduces a bug fix targeting two related issues in the Lyria subsystem:

1. **reset_context on BPM Change:** When the BPM (tempo) changes during a session, Lyria's internal context was not being reset appropriately. This fix ensures that `reset_context` is called at the correct point in the BPM change flow, preventing stale or inconsistent state from persisting across tempo changes.

2. **Session Cleanup on Receive Loop Error:** The commit also addresses a secondary issue where a Lyria session was not being properly cleaned up if an error was encountered within the receive loop. This could cause resource leaks or undefined behavior in subsequent sessions.

## Change Summary

| Property       | Value                        |
|----------------|------------------------------|
| Repository     | rahilsinghi/Coro             |
| Commit SHA     | 7a21d9f                      |
| Date           | 2026-02-28                   |
| Author         | Rahil Singhi                 |
| Files Changed  | 1                            |
| Additions      | +10                          |
| Deletions      | -2                           |

## Impact

This is a targeted bug fix with a small footprint (net +8 lines). The change improves the reliability of Lyria sessions under dynamic tempo conditions and error scenarios, contributing to overall stability of the Coro application.

## Related

- [[Coro Project]]
- [[Lyria Module]]
- [[BPM Change Handling]]
- [[Session Lifecycle Management]]
- [[Receive Loop Error Handling]]
- [[Rahil Singhi]]
