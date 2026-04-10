---
title: "Fix: Lyria reset_context on BPM Change (Coro, SHA 7a21d9f)"
author: ai
created_at: 2026-04-10T02:15:03.971Z
last_ai_edit: 2026-04-10T02:15:03.971Z
last_human_edit: null
last_embedded_hash: b868791b307fa1ec
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-lyria-reset-context-on-bpm-change-5bb18f.md]]"
tags:
  - bugfix
  - lyria
  - coro
  - bpm
  - session-cleanup
  - reset-context
  - receive-loop
  - audio
  - rahil-singhi
  - "2026"
---


# Fix: Lyria reset_context on BPM Change (Coro, SHA 7a21d9f)

This commit by Rahil Singhi addresses a bug in the Lyria component of the Coro repository, specifically fixing the reset_context behavior triggered by BPM changes. The fix also includes session cleanup logic applied when a receive loop error occurs. The change is minimal in scope, modifying a single file with 10 additions and 2 deletions.

## Key Concepts

- **reset_context**: A function or method in Lyria responsible for resetting stateful context, now properly invoked on BPM changes
- **BPM Change Handling**: The trigger condition that previously failed to reset Lyria's context, now corrected
- **Session Cleanup**: Logic added to properly clean up a Lyria session when a receive loop error is encountered
- **Receive Loop Error**: An error condition in the receive loop that necessitates graceful session teardown
- **Lyria**: A component within the Coro project that manages some form of audio or generative context tied to BPM

## Details

## Overview

Commit `7a21d9f`, authored by Rahil Singhi on 2026-02-28, introduces a targeted bug fix to the Coro repository focused on the Lyria component.

## Problem

Prior to this fix, when a BPM change occurred within Lyria, the `reset_context` function was not being called correctly (or at all), leaving stale state that could cause inconsistent behavior. Additionally, receive loop errors did not trigger proper session cleanup, potentially causing resource leaks or undefined states.

## Changes Made

- **File modified:** 1 file changed
- **Additions:** +10 lines
- **Deletions:** -2 lines

### Specific Fixes
1. **reset_context on BPM change**: Ensured that when the BPM changes, Lyria's context is properly reset to reflect the new tempo state.
2. **Session cleanup on receive loop error**: Added handling so that if the receive loop encounters an error, the Lyria session is gracefully cleaned up, preventing resource leaks or corrupted state.

## Impact

This is a low-risk, surgical fix affecting a single file. It improves the stability and correctness of Lyria's stateful management, particularly in dynamic musical contexts where BPM may change at runtime.

## Related

- [[Coro Repository]]
- [[Lyria Component]]
- [[BPM Change Handling]]
- [[Session Management]]
- [[Receive Loop Error Handling]]
- [[Rahil Singhi]]
