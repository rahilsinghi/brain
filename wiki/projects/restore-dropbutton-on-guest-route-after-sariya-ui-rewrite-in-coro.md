---
title: Restore DropButton on /guest route after Sariya UI Rewrite in Coro
author: ai
created_at: 2026-04-13T17:07:27.123Z
last_ai_edit: 2026-04-13T17:07:27.123Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-restore-dropbutton-on-guest-route-after-sariya-ui-rewrite-654bdd.md]]"
tags:
  - bug fix
  - frontend
  - ui
  - component
  - coro
  - sariya
  - websocket
  - javascript
  - react
---

# Restore DropButton on /guest route after Sariya UI Rewrite in Coro

This article details a fix implemented in the Coro project to restore the functionality of the `DropButton` component on the `/guest` route. A UI rewrite by Sariya had inadvertently replaced the robust `DropButton` with a faulty inline implementation, leading to various issues with voting and interaction.

## Key Concepts

DropButton component,Coro Project,UI Rewrite,WebSocket Messaging,Vote Locking,Countdown Timer,Dynamic Threshold,useRoomStore() hook,dropProgress state,showShock state,handleDrop handler

## Details

A critical bug fix was implemented in the [[Coro]] project (SHA: `d631b5d`) to address issues on the `/guest` route following a UI rewrite by [[Sariya]]. The rewrite replaced the original, fully functional `DropButton` component with a new, inline button implementation.

This inline button suffered from several deficiencies:
*   It sent an incorrect WebSocket (WS) message type ('drop_vote' instead of 'drop').
*   It lacked vote locking mechanisms.
*   It did not incorporate a countdown timer.
*   It failed to implement a dynamic threshold for dropping.
*   It erroneously attempted to read `dropProgress` from the `useRoomStore()`, where this state variable did not exist.

The fix involved replacing the problematic inline button with the original `<DropButton userId roomId />` component. Additionally, the non-existent `dropProgress` was removed from the `useRoomStore()` destructuring, and the now-unused `showShock` state and `handleDrop` handler were eliminated from the codebase.

## Related

[[Coro]],[[Sariya]],[[WebSocket]]
