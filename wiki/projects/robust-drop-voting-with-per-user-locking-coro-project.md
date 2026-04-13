---
title: Robust Drop Voting with Per-User Locking (Coro Project)
author: ai
created_at: 2026-04-11T01:28:23.509Z
last_ai_edit: 2026-04-11T01:28:23.509Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-robust-drop-voting-with-per-user-locking-and-5s-window-840e94.md]]"
tags:
  - coro
  - feature
  - voting
  - real-time
  - ui
  - backend
  - websocket
  - asynchronous
  - deduplication
  - user experience
---

# Robust Drop Voting with Per-User Locking (Coro Project)

This feature introduces a robust drop voting system within the Coro Project, implementing per-user locking and a 5-second voting window to ensure fair and controlled participation. It prevents individual users from casting multiple votes within a session and manages the voting lifecycle with asynchronous expiry tasks.


## Key Concepts

Per-user locking,5-second voting window,Asynchronous expiry task,DropButton component,WebSocket communication,Vote deduplication

## Details

This update to the [[Coro Project]] refactors the drop voting mechanism from a simple timestamp list to a more robust per-user vote dictionary. This change ensures that multiple clicks from the same user are only counted as a single vote, enhancing the fairness and accuracy of the voting process.

The `record_drop(room_id, user_id)` function is central to this new system, returning one of three states: "triggered" (if the drop condition is met), "registered" (if the vote is successfully recorded), or "already_voted" (if the user has already cast a vote within the current window).

A critical component is the introduction of a 5-second asynchronous expiry task. When the first vote in a window is registered, this task begins. If the required number of votes (e.g., 3) is not reached within this 5-second period, the server broadcasts a `drop_reset` event and resets the voting state, preventing stale votes from lingering.

On the frontend, a new `DropButton` component manages user interaction. After a user clicks it, the button locks into a "VOTED + countdown" state. It unlocks automatically upon receiving `drop_triggered` or `drop_reset` events from the server, or if its local countdown expires. This `DropButton` has been integrated into both Guest and Host pages to provide consistent functionality.

WebSocket communication has been enhanced to forward `drop_reset` and `drop_already_voted` messages through the WebSocket manager, ensuring that all connected clients receive timely updates on the voting state.

## Related

[[Coro Project]],[[Coordinated Drop Button]],[[Coordinated Drop Button (Coro)]]
