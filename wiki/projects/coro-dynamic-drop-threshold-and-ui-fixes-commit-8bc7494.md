---
title: "Coro: Dynamic Drop Threshold and UI Fixes (Commit 8bc7494)"
author: ai
created_at: 2026-04-11T01:36:01.502Z
last_ai_edit: 2026-04-11T01:36:01.502Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-dynamic-drop-threshold-50-of-room-fix-3rd-vote-ui-bugs-dee944.md]]"
tags:
  - coro
  - backend
  - frontend
  - websocket
  - ui
  - bugfix
  - dynamic threshold
  - collaboration
  - commit
---

# Coro: Dynamic Drop Threshold and UI Fixes (Commit 8bc7494)

This commit for the Coro project introduces a dynamic drop threshold, calculated as 50% of room participants, replacing a previously hardcoded value. It also resolves several UI bugs related to the voting mechanism and enhances WebSocket listener stability.

## Key Concepts

Dynamic Drop Threshold,WebSocket Stability,Real-time Collaboration,UI Bug Fixing

## Details

This commit addresses key functionalities and bug fixes within the Coro project, focusing on the "drop" feature and overall UI responsiveness.

### Backend Changes
-   **`room_service`**: Implemented `get_drop_threshold()` which calculates the required votes as `ceil(participants/2)`, with a minimum of 1 vote. The `record_drop` function now utilizes this dynamic threshold and uses `connection_id` for keying.
-   **`ws.py`**: The `drop_incoming` broadcast is now unconditional, ensuring it fires outside the `if room:` guard. `drop_triggered` is configured to always fire after a delay, and `Lyria` errors are now non-fatal. A 10-second expiry window is introduced for drop messages, which now consistently include a dynamic `needed` field.

### Frontend Changes
-   **`DropButton`**: The `neededVotes` state is now driven by the `msg.needed` field received from the server, eliminating hardcoded values. A progress bar is displayed during the countdown, and its width and label text (`X/Y`) dynamically update based on `neededVotes`.
-   **`useWebSocket`**: A stable `addListener` implementation via `useCallback` resolves issues where the listener would drop on re-render, ensuring more robust WebSocket communication.

## Related

[[Coro — Git Activity]],[[Coro: Backend Fix for Lyria Context Reset and Session Cleanup]],[[Coro V2 UI Overhaul (PR #13)]],[[Coro: Fix Drop Vote Keying and Server-Sourced Countdown (PR #17)]],[[Coro: Dynamic Drop Threshold and UI Fixes (Commit 8bc7494)]]
