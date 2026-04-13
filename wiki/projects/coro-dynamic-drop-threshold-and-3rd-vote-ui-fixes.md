---
title: "Coro: Dynamic Drop Threshold and 3rd-Vote UI Fixes"
author: ai
created_at: 2026-04-13T17:46:57.156Z
last_ai_edit: 2026-04-13T17:46:57.156Z
last_human_edit: null
last_embedded_hash: dbd565526e3e1139
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-dynamic-drop-threshold-50-of-room-fix-3rd-vote-ui-bugs-dee944.md]]"
tags:
  - coro
  - backend
  - frontend
  - websocket
  - drop threshold
  - ui fix
  - bug fix
  - real-time
  - collaboration
---


# Coro: Dynamic Drop Threshold and 3rd-Vote UI Fixes

This commit implements a dynamic drop threshold for rooms in the Coro project, setting it to 50% of participants with a minimum of one. It also addresses several UI bugs related to the '3rd-vote' drop mechanism, ensuring the frontend accurately reflects server-side `needed` vote counts and improves listener stability.

## Key Concepts

Dynamic Drop Threshold,Room Service,WebSocket Communication,Frontend UI State Management,Event Listener Stability,Coro Project

## Details

This update to the [[Coro]] project introduces a dynamic drop threshold and resolves several UI-related issues concerning the '3rd-vote' mechanism.

### Backend Changes
*   **`room_service`**: A new `get_drop_threshold()` function was added, calculating the threshold as `ceil(participants/2)` with a minimum of 1. The `record_drop` function now utilizes this dynamic threshold and keys drops by `connection_id`.
*   **`ws.py`**: The `drop_incoming` broadcast is now unconditional. `drop_triggered` consistently fires after a delay, and any Lyria errors are treated as non-fatal. A 10-second expiry window was implemented, and all drop messages now include the dynamic `needed` field.

### Frontend Changes
*   **`DropButton`**: The `neededVotes` state for the DropButton is now driven by the `msg.needed` field received from the server. The progress bar is displayed during the countdown, removing the `!dropIncoming` guard. The bar width and X/Y labels are dynamically calculated using `neededVotes` instead of a hardcoded value of 3.
*   **`useWebSocket`**: An issue with listener stability on re-renders was resolved by using `useCallback` for `addListener`.

## Related

[[Coro]],[[Backend Applause Handling in Coro]],[[WebSocket]],[[Dynamic Drop Threshold]],[[User Interface]],[[Claude Sonnet 4.6]]
