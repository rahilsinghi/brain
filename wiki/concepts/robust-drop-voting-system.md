---
title: Robust Drop Voting System
author: ai
created_at: 2026-04-10T18:19:00.734Z
last_ai_edit: 2026-04-10T18:19:00.734Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-robust-drop-voting-with-per-user-locking-and-5s-window-840e94.md]]"
tags:
  - drop voting
  - per-user locking
  - real-time
  - asyncio
  - ui component
  - feature
  - coro
---

# Robust Drop Voting System

This commit introduces a robust drop voting mechanism for the Coro project, featuring per-user locking to prevent multiple votes from a single user, and a 5-second window for vote aggregation. It replaces an older timestamp-list approach with a more reliable, state-managed system, including a new `DropButton` UI component.

## Key Concepts

Drop Voting,Per-User Locking,5-Second Voting Window,Asyncio Expiry Task,DropButton Component

## Details

This enhancement to the Coro project significantly refines its drop voting functionality. Previously, the system likely used a timestamp-list, which could be prone to issues with users rapidly clicking multiple times. The new approach replaces this with a per-user vote dictionary. This ensures that even if a user clicks the drop button multiple times, it is registered as only a single vote.

The `record_drop(room_id, user_id)` function is central to this system, returning one of three states: "triggered" (meaning enough votes were cast to initiate a drop), "registered" (the user's vote was successfully counted), or "already_voted" (the user had already cast their vote within the current window).

A crucial aspect is the 5-second voting window. When the first vote is cast in a room, an `asyncio` expiry task is initiated. If a predefined number of votes (e.g., 3) are not received within this 5-second period, the server broadcasts a `drop_reset` signal and clears the current voting state.

On the client-side, a new `DropButton` component is implemented. After a user clicks it, the button visually locks, displaying "VOTED + countdown". This button unlocks and becomes active again upon receiving `drop_triggered` (a drop was successful), `drop_reset` (the 5-second window expired without enough votes), or when its local countdown expires. The `DropButton` is integrated into both Guest and Host pages to ensure consistent functionality. Server-side, `drop_reset` and `drop_already_voted` signals are now explicitly forwarded through the WebSocket manager to update client states.

## Related

[[Coro]],[[Rahil Singhi]]
