---
title: Robust Drop Voting with Per-User Locking and 5s Window in Coro
author: ai
created_at: 2026-04-13T17:39:20.140Z
last_ai_edit: 2026-04-13T17:39:20.140Z
last_human_edit: null
last_embedded_hash: 359b754ed9be893b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-robust-drop-voting-with-per-user-locking-and-5s-window-840e94.md]]"
tags:
  - drop voting
  - coro
  - real-time
  - websocket
  - asyncio
  - ui component
  - feature
  - backend
  - frontend
  - state management
---


# Robust Drop Voting with Per-User Locking and 5s Window in Coro

This feature introduces a robust drop voting mechanism within the [[Coro]] project, implementing per-user locking to ensure each user's vote counts only once within a 5-second window. It includes a new `DropButton` UI component that provides real-time feedback and integrates with a server-side `asyncio` expiry task for vote processing and state management.

## Key Concepts

Drop Voting,Per-User Locking,Asyncio Expiry Task,DropButton Component,WebSocket Communication

## Details

This commit (`f93906a`) by [[Rahil Singhi]] for the `rahilsinghi/Coro` repository on 2026-02-28 introduces a significant enhancement to the drop voting system. The update replaces a previous timestamp-list approach with a more reliable per-user vote dictionary, ensuring that multiple clicks from the same user are registered as a single vote.

**Key functionalities include:**

*   **Per-User Locking**: The `record_drop(room_id, user_id)` function now accurately tracks votes, returning 'triggered', 'registered', or 'already_voted' based on the user's current voting status within a session.
*   **5-Second Voting Window**: The first vote received initiates a 5-second `[[asyncio]]` expiry task. If the required number of votes (e.g., 3) are not cast within this window, the server broadcasts a `drop_reset` signal, and the voting state is reset.
*   **New `DropButton` Component**: A dedicated `DropButton` UI component has been developed to provide immediate user feedback. Upon clicking, the button locks to a 'VOTED + countdown' state. It dynamically unlocks when a 'drop_triggered' event occurs, a 'drop_reset' is broadcast, or its local countdown expires. This button is integrated into both Guest and Host pages for a consistent user experience.
*   **WebSocket Integration**: The system leverages the `[[WebSocket]]` manager to forward `drop_reset` and `drop_already_voted` events, ensuring that all connected clients receive timely updates on the voting status.

This enhancement (co-authored by Claude Sonnet 4.6) involves changes across 6 files, with 228 additions and 74 deletions.

## Related

[[Coro]],[[Rahil Singhi]],[[Applause Handling Enhancement in Coro]],[[Applause Handling in Coro Backend]],[[WebSocket]],[[asyncio]]
