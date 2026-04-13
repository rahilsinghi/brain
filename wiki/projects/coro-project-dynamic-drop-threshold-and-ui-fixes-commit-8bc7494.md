---
title: "Coro Project: Dynamic Drop Threshold and UI Fixes (Commit 8bc7494)"
author: ai
created_at: 2026-04-11T01:40:01.996Z
last_ai_edit: 2026-04-11T01:40:01.996Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-dynamic-drop-threshold-50-of-room-fix-3rd-vote-ui-bugs-dee944.md]]"
tags:
  - coro
  - backend
  - frontend
  - websocket
  - voting
  - ui
  - bugfix
  - dynamic threshold
  - real-time
  - commit
---

# Coro Project: Dynamic Drop Threshold and UI Fixes (Commit 8bc7494)

This commit introduces a dynamic drop threshold for the Coro project, calculating it as 50% of room participants with a minimum of one, enhancing the responsiveness of the 'drop' feature. It also addresses several UI bugs related to the third-vote display and overall drop functionality, improving frontend accuracy and user experience. Backend logic was refined to ensure robust handling of drop events and Lyria errors.

## Key Concepts

[[Dynamic Drop Threshold]],[[Real-time Voting System]],[[WebSocket Communication]],[[Frontend UI Development]],[[Backend Service Logic]],[[Error Handling]]

## Details

This commit, with SHA `8bc794`, implemented critical fixes and enhancements for the [[Coro Project]]'s 'drop' functionality.

**Backend Changes (Files changed: 4, Additions: +54, Deletions: -33)**
*   `room_service.py`:
    *   Added `get_drop_threshold()` function to dynamically calculate the required votes as `ceil(participants/2)` with a minimum of 1.
    *   Modified `record_drop` to use this dynamic threshold, keying votes by `connection_id`.
*   `ws.py`:
    *   Ensured `drop_incoming` broadcast is unconditional.
    *   Made `drop_triggered` always fire after a delay, marking Lyria errors as non-fatal.
    *   Introduced a 10-second expiry window for votes.
    *   All drop messages now include the dynamic `needed` field.

**Frontend Changes**
*   `DropButton` component:
    *   The `neededVotes` state is now driven by `msg.needed` received from the server.
    *   The progress bar is displayed during the countdown, removing the `!dropIncoming` guard.
    *   Bar width and X/Y labels dynamically use `neededVotes` instead of hardcoded values (previously 3).
*   `useWebSocket` hook:
    *   Implemented `stable addListener` via `useCallback` to prevent listener drops on re-renders, improving WebSocket stability.

This work was co-authored by [[Claude Sonnet 4.6]].

## Related

[[Coro — Git Activity]],[[Coordinated Drop Button (Coro)]],[[Coro Project: Lyria Context Reset and Session Cleanup Fix]],[[Coro: Dynamic Drop Threshold and UI Fixes (Commit 8bc7494)]],[[Coro: Fix Drop Vote Keying and Server-Sourced Countdown]],[[Coro: Fix Drop Vote Keying and Server-Sourced Countdown (PR #17)]],[[Coro: Sariya's UI Overhaul Merge]],[[Coro: WebSocket Reconnection Fix (PR #6)]],[[Coordinated Drop Button Feature (Coro Project)]],[[Dynamic Drop Threshold]]
