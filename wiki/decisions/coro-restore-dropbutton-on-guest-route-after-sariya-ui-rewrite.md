---
title: "Coro: Restore DropButton on Guest Route After Sariya UI Rewrite"
author: ai
created_at: 2026-04-12T17:07:29.346Z
last_ai_edit: 2026-04-12T17:07:29.346Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-restore-dropbutton-on-guest-route-after-sariya-ui-rewrite-654bdd.md]]"
tags:
  - coro
  - bugfix
  - ui
  - dropbutton
  - websocket
  - state management
  - refactor
---

# Coro: Restore DropButton on Guest Route After Sariya UI Rewrite

This commit addresses a critical bug introduced by a UI rewrite in the Coro project, specifically on the `/guest` route. It restores the full functionality of the `DropButton` by replacing a broken inline implementation with the correct, feature-rich component, ensuring proper WebSocket messaging and vote management.

## Key Concepts

[[DropButton]] Component,WebSocket Messaging,Vote Locking,Countdown Timers,Dynamic Thresholds,State Management (specifically, `useRoomStore`),UI Rewrite/Refactoring

## Details

A previous UI rewrite, associated with Sariya's contributions, inadvertently replaced the robust `DropButton` component on the `/guest` route with a faulty inline button. This inline implementation suffered from several critical defects:

*   It sent the incorrect WebSocket message type ('drop_vote' instead of the required 'drop').
*   It lacked essential features such as vote locking.
*   It did not incorporate a countdown timer.
*   It failed to implement a dynamic threshold for the 'drop' action.
*   It attempted to read `dropProgress` from `useRoomStore()`, a state variable that does not exist in that store.

The fix involved replacing this broken inline button with the original, fully functional `<DropButton userId roomId />` component. Additionally, `dropProgress` was removed from the `useRoomStore()` destructure, and the now-unused `showShock` state and `handleDrop` handler were eliminated, cleaning up the codebase.

## Related

[[Coro — Git Activity]],[[Coordinated Drop Button (Coro)]],[[Coro: Sariya's UI Overhaul Merge]],[[WebSocket]],[[State Management]]
