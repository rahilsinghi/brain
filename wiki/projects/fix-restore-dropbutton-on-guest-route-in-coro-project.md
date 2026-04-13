---
title: "Fix: Restore DropButton on /guest Route in Coro Project"
author: ai
created_at: 2026-04-12T21:08:16.318Z
last_ai_edit: 2026-04-12T21:08:16.318Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-restore-dropbutton-on-guest-route-after-sariya-ui-rewrite-654bdd.md]]"
tags:
  - fix
  - ui
  - coro
  - dropbutton
  - websocket
  - regression
  - guest-route
---

# Fix: Restore DropButton on /guest Route in Coro Project

This commit addresses a critical UI regression in the `Coro` project's `/guest` route, where [[Sariya's Task|Sariya's]] UI rewrite inadvertently replaced the functional `DropButton` component with a broken inline button. The fix involves reinstating the original `DropButton` and removing redundant state, ensuring correct WebSocket message handling, vote locking, and other essential functionalities.

## Key Concepts

[[DropButton]] component,UI Regression,WebSocket Messaging,Vote Locking,Countdown Timer,Dynamic Threshold,[[useRoomStore]],Guest Route

## Details

This commit (`d631b5d`) in the `rahilsinghi/Coro` repository, authored by [[Rahil Singhi]] on 2026-02-28, resolves a significant UI issue introduced by a recent rewrite (attributed to [[Sariya's Task]]). The problem manifested on the `/guest` route where the shared `DropButton` component was replaced by a custom, inline button.

The inline button was found to be severely broken, lacking several critical functionalities:

*   **Incorrect WebSocket Message Type:** It sent a `drop_vote` message instead of the required `drop` message.
*   **Missing Vote Locking:** The functionality to prevent multiple votes or ensure proper voting states was absent.
*   **No Countdown Timer:** The visual countdown for voting actions was no longer present.
*   **No Dynamic Threshold:** The mechanism for dynamically adjusting vote thresholds was not implemented.
*   **Incorrect State Access:** It attempted to read `dropProgress` from the `useRoomStore`, where this state variable does not exist.

The fix, involving 1 file change with 2 additions and 38 deletions, restored the intended functionality by:

1.  Replacing the problematic inline drop button with the `<DropButton userId roomId />` component.
2.  Removing the non-existent `dropProgress` from the `useRoomStore()` destructuring.
3.  Eliminating the now-unused `showShock` state and the associated `handleDrop` handler, streamlining the code.

This change ensures the `/guest` route's interactive elements function as designed, maintaining a consistent and robust user experience. The commit was co-authored by Claude Sonnet 4.6.

## Related

[[Coro Backend]],[[Sariya's Task]],[[DropButton]],[[WebSocket]],[[useRoomStore]],[[Rahil Singhi]]
