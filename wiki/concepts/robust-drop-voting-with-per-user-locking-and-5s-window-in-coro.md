---
title: Robust Drop Voting with Per-User Locking and 5s Window in Coro
author: ai
created_at: 2026-04-11T01:31:18.002Z
last_ai_edit: 2026-04-11T01:31:18.002Z
last_human_edit: null
last_embedded_hash: 2aaca877d4f82c8a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-robust-drop-voting-with-per-user-locking-and-5s-window-840e94.md]]"
tags:
  - coro
  - voting system
  - websocket
  - per-user locking
  - asyncio
  - frontend
  - backend
  - feature
---


# Robust Drop Voting with Per-User Locking and 5s Window in Coro

This update to the [[Coro]] project implements a robust drop voting mechanism, replacing a timestamp-based approach with per-user vote locking. It introduces a 5-second asynchronous expiry window for votes and a new `DropButton` component to manage user interactions and feedback.

## Key Concepts

Robust drop voting,Per-user locking,Asyncio expiry task,5-second voting window,DropButton component,WebSocket management

## Details

This feature enhancement for the [[Coro]] project, committed by Rahil Singhi on 2026-02-28 (SHA: `f93906a`), significantly refactors the 'drop' voting system. The previous timestamp-list approach, which allowed multiple votes from the same user, has been replaced by a `per-user vote dict`. This ensures that each user's vote is counted only once, even if they click the button multiple times within a voting round.

The `record_drop(room_id, user_id)` function now provides more granular feedback, returning 'triggered', 'registered', or 'already_voted' based on the vote's status. A critical addition is the 5-second `asyncio` expiry task: the first vote initiates this timer, and if three votes are not registered within this window, the server broadcasts a `drop_reset` signal and clears the voting state.

User interface improvements include a new `DropButton` component. This button visually locks to a 'VOTED + countdown' state after a user clicks it, providing clear feedback. It unlocks automatically upon a `drop_triggered` event, a `drop_reset` signal from the server, or when its local countdown expires. The `DropButton` has been integrated into both Guest and Host pages of the application, ensuring consistent behavior across user roles.

To facilitate real-time updates and synchronization, `drop_reset` and `drop_already_voted` messages are now forwarded efficiently through the WebSocket manager.

**Commit Details:**
- **Repo:** [[rahilsinghi/Coro]]
- **SHA:** `f93906a`
- **Date:** 2026-02-28T19:36:09Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +228
- **Deletions:** -74

## Related

[[Coro]],[[Coro Project: Dynamic Drop Threshold and UI Fixes (Commit 8bc7494)]],[[Coordinated Drop Button]],[[Coro: Fix Drop Vote Keying and Server-Sourced Countdown]]
