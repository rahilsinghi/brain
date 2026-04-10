---
title: "fix: lyria reset_context on bpm change (Commit 7a21d9f)"
author: ai
created_at: 2026-04-10T02:16:12.583Z
last_ai_edit: 2026-04-10T02:16:12.583Z
last_human_edit: null
last_embedded_hash: c2e95f127606db00
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-lyria-reset-context-on-bpm-change-5bb18f.md]]"
tags:
  - bugfix
  - lyria
  - coro
  - bpm
  - context-reset
  - session-cleanup
  - receive-loop
  - audio
  - rahil-singhi
---


# fix: lyria reset_context on bpm change (Commit 7a21d9f)

This commit by Rahil Singhi in the Coro repository addresses a bug related to Lyria's context reset behavior when a BPM change occurs. The fix also includes session cleanup handling during receive loop errors. The change is minimal in scope, modifying a single file with 10 additions and 2 deletions.

## Key Concepts

- **BPM Change Handling:** Ensures Lyria's context is properly reset when the tempo (BPM) changes, preventing stale state issues
- **Session Cleanup:** Introduces or improves cleanup logic when the receive loop encounters an error, avoiding resource leaks or inconsistent state
- **Receive Loop Error Handling:** Addresses failure scenarios in the receive loop that previously may have left the Lyria session in a broken state
- **Context Reset (`reset_context`):** A mechanism within Lyria to reinitialize or clear contextual state, likely related to audio generation or sequencing parameters

## Details

## Overview

Commit `7a21d9f` in the [rahilsinghi/Coro](https://github.com/rahilsinghi/Coro) repository introduces a targeted bug fix for the Lyria component, specifically addressing two related issues:

1. **Context reset on BPM change:** When the BPM (beats per minute) is modified during a session, Lyria's internal context is now properly reset via `reset_context`. This prevents residual state from a previous tempo setting from interfering with audio generation or playback under the new BPM.

2. **Session cleanup on receive loop error:** If the receive loop encounters an error, the Lyria session is now properly cleaned up. This ensures that resources are released and the system can recover gracefully rather than remaining in an inconsistent or broken state.

## Change Statistics

| Field | Value |
|---|---|
| Repository | rahilsinghi/Coro |
| Commit SHA | 7a21d9f |
| Date | 2026-02-28 |
| Author | Rahil Singhi |
| Files Changed | 1 |
| Additions | +10 |
| Deletions | -2 |

## Impact

The fix is narrow in scope (single file, net +8 lines) but addresses potentially significant runtime stability issues related to BPM-driven context invalidation and error recovery in the receive loop.

## Related

- [[Lyria]]
- [[Coro Repository]]
- [[BPM Change Handling]]
- [[Session Management]]
- [[Receive Loop Error Handling]]
- [[Rahil Singhi]]
