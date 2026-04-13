---
title: Robust Drop Voting System in Coro
author: ai
created_at: 2026-04-12T22:06:26.952Z
last_ai_edit: 2026-04-12T22:06:26.952Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-robust-drop-voting-with-per-user-locking-and-5s-window-840e94.md]]"
tags:
  - coro
  - voting
  - feature
  - websocket
  - frontend
  - backend
  - ui
  - asynchronous
---

# Robust Drop Voting System in Coro

This commit introduces a robust drop voting system in the Coro project, featuring per-user locking to ensure each user's vote is counted only once within a 5-second window. The system uses an asynchronous expiry task to manage voting windows and provides clear UI feedback on the client-side.

## Key Concepts

Per-user vote locking,5-second voting window,Asynchronous expiry task,WebSocket communication for vote state,Client-side UI feedback for voting

## Details

This commit refactors the drop voting mechanism within the [[Coro]] project to enhance robustness and user experience. Previously, a timestamp-list approach might have allowed multiple votes from the same user if clicked rapidly. The new system replaces this with a per-user vote dictionary, ensuring that each user's click within a voting window counts as a single vote.

The `record_drop(room_id, user_id)` function is updated to return specific states: `"triggered"` if a drop event is initiated, `"registered"` if the vote is successfully recorded, or `"already_voted"` if the user has already voted within the current window. The first vote received within a window triggers a 5-second `asyncio` expiry task. If the required number of votes (implied to be 3, though not explicitly stated as a number, but `"if 3 votes don't land in time"` suggests this) are not met within this timeframe, the server broadcasts a `drop_reset` event and clears the voting state.

A new `DropButton` component has been implemented to provide clear feedback to users. Upon clicking, it locks into a `"VOTED + countdown"` state. It unlocks and resets its state when a `drop_triggered` or `drop_reset` event is received from the server, or when its local countdown expires. This `DropButton` is integrated into both the Guest and Host pages of the application. WebSocket manager is configured to forward `drop_reset` and `drop_already_voted` messages to ensure client-side UI synchronization.

## Related

[[Coro]],[[Applause Handling Enhancement in Coro]],[[Applause Handling in Coro Backend]],[[Backend Applause Handling in Coro (PR #12)]],[[WebSocket]],[[asyncio]],[[DropButton]]
