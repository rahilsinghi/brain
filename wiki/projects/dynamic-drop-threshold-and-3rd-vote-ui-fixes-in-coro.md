---
title: Dynamic Drop Threshold and 3rd-Vote UI Fixes in Coro
author: ai
created_at: 2026-04-12T22:19:26.342Z
last_ai_edit: 2026-04-12T22:19:26.342Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-dynamic-drop-threshold-50-of-room-fix-3rd-vote-ui-bugs-dee944.md]]"
tags:
  - coro
  - backend
  - frontend
  - bug fix
  - websocket
  - dynamic threshold
  - ui
---

# Dynamic Drop Threshold and 3rd-Vote UI Fixes in Coro

This update to the [[Coro]] project implements a dynamic drop threshold based on 50% of room participants, replacing a hardcoded value. It also addresses several UI bugs related to the '3rd-vote' mechanism, ensuring the frontend accurately reflects the backend's dynamic threshold.

## Key Concepts

Dynamic Drop Threshold,WebSocket Communication,Frontend UI State Management,Backend Room Logic

## Details

This commit (`8bc7494`) in the [[Coro]] repository introduces a dynamic drop threshold and resolves related UI issues for the '3rd-vote' functionality. The changes span both backend and frontend components.

**Backend Changes:**
*   **`room_service`:** A new `get_drop_threshold()` function was added, calculating the threshold as `ceil(participants/2)`, with a minimum of 1. The `record_drop` function now utilizes this dynamic threshold and uses `connection_id` for keying.
*   **`ws.py`:** The `drop_incoming` broadcast is now unconditional. `drop_triggered` consistently fires after a delay, and `Lyria` errors are made non-fatal. All drop messages sent to the frontend now include the dynamic `needed` field, along with a 10-second expiry window.

**Frontend Changes:**
*   **`DropButton`:** The `neededVotes` state is now driven by `msg.needed` received from the server, replacing static values.
*   The progress bar for the countdown is always shown, removing a `!dropIncoming` guard.
*   The width of the progress bar and the 'X/Y' labels dynamically adjust based on the `neededVotes` from the server.
*   **`useWebSocket`:** The `addListener` function was made stable using `useCallback`, preventing listener drops on re-renders.

These changes ensure a more robust and responsive 'drop' mechanism within the [[Coro]] application.

## Related

[[Coro]],[[Rahil Singhi]],[[Claude Sonnet 4.6]],[[WebSocket]]
