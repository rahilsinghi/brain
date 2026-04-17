---
title: "Coro: Dynamic Drop Threshold and UI Fixes (Commit 8bc7494)"
author: ai
created_at: 2026-04-10T18:22:06.313Z
last_ai_edit: 2026-04-10T18:22:06.313Z
last_human_edit: null
last_embedded_hash: 39a1f16e51da39d4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-dynamic-drop-threshold-50-of-room-fix-3rd-vote-ui-bugs-dee944.md]]"
tags:
  - coro
  - fix
  - drop mechanism
  - threshold
  - websocket
  - frontend
  - backend
  - ui
  - bugfix
  - refactor
  - dynamic
  - commit
---


# Coro: Dynamic Drop Threshold and UI Fixes (Commit 8bc7494)

This commit introduces a dynamic drop threshold for rooms in the Coro application, calculated as 50% of participants, and addresses several UI bugs related to the third-vote drop mechanism. It enhances the robustness and user experience of the drop feature through both backend logic adjustments and frontend component improvements.

## Key Concepts

Dynamic Drop Threshold,Coro Application,WebSocket Communication,Frontend UI,Backend Services (`room_service`),Concurrency/Participant Management,Commit 8bc7494

## Details

This commit, identified by SHA `8bc7494` in the `rahilsinghi/Coro` repository, implemented significant improvements to the drop mechanism and related user interface. Authored by Rahil Singhi on 2026-02-28, it involved changes across 4 files, with 54 additions and 33 deletions. Co-authored by Claude Sonnet 4.6.

### Backend Changes (Affecting `room_service` and `ws.py`)

*   **Dynamic Drop Threshold**: A new `get_drop_threshold()` function was added to `room_service`, calculating the threshold as `ceil(participants/2)` with a minimum value of 1. The `record_drop` function now utilizes this dynamic threshold and keys records by `connection_id`.
*   **WebSocket Handling Improvements (`ws.py`)**:
    *   The `drop_incoming` broadcast is now unconditional, removing a previously existing `if room:` guard.
    *   `drop_triggered` is configured to always fire after a delay, ensuring that Lyria errors are non-fatal.
    *   A 10-second expiry window for drops was introduced.
    *   All drop messages transmitted via WebSocket now include a dynamic `needed` field, reflecting the current threshold.

### Frontend Changes (Affecting `DropButton` and `useWebSocket`)

*   **`DropButton` Component Updates**:
    *   The `neededVotes` state within the `DropButton` component is now dynamically driven by the `msg.needed` value received from the server.
    *   A progress bar is now consistently shown during the countdown, removing a `!dropIncoming` guard that previously prevented its display.
    *   The progress bar's width and its X/Y labels now correctly utilize the `neededVotes` value instead of a hardcoded '3'.
*   **`useWebSocket` Hook Refinement**: The `addListener` function was made stable via `useCallback`, resolving issues where listeners might drop on component re-renders.

## Related

[[Coro Application]],[[Rahil Singhi]],[[Issue #18]],[[WebSocket]]
