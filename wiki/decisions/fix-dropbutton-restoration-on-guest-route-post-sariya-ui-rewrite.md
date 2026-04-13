---
title: "Fix: DropButton Restoration on Guest Route Post-Sariya UI Rewrite"
author: ai
created_at: 2026-04-10T18:05:29.986Z
last_ai_edit: 2026-04-10T18:05:29.986Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-restore-dropbutton-on-guest-route-after-sariya-ui-rewrite-654bdd.md]]"
tags:
  - fix
  - ui
  - component
  - dropbutton
  - sariya
  - guest-route
  - websocket
  - statemanagement
  - coro
  - regression
---

# Fix: DropButton Restoration on Guest Route Post-Sariya UI Rewrite

This commit addresses a regression introduced by the Sariya UI rewrite, where the `DropButton` component on the `/guest` route was replaced by a broken inline implementation. The fix reinstates the correct `DropButton`, resolving issues with incorrect WebSocket messages, missing UI features, and faulty state management. It also cleans up unused state and handlers related to the flawed implementation.

## Key Concepts

- [[DropButton Component]],- [[Sariya UI]],- [[WebSocket Messages]],- [[State Management]] (specifically `useRoomStore()`),- [[UI Components]],- [[Guest Route]]

## Details

Prior to this fix (commit `d631b5d` in `rahilsinghi/Coro`), a UI rewrite under the 'Sariya UI' initiative inadvertently replaced the standard `DropButton` component on the `/guest` route. The replacement was an inline button implementation that suffered from several critical defects:

*   It sent an incorrect WebSocket message type ('drop_vote' instead of the expected 'drop').
*   It lacked essential features such as vote locking, a countdown timer, and dynamic thresholding, which are integral to the `DropButton`'s functionality.
*   It incorrectly attempted to read `dropProgress` from the application's state via `useRoomStore()`, where this state property did not exist.

To rectify these issues and restore the intended behavior, the following modifications were implemented:

*   The faulty inline button implementation was replaced with the correct and shared `<DropButton userId roomId />` component.
*   The erroneous destructuring of `dropProgress` from `useRoomStore()` was removed, as it was not part of the store's state.
*   The now-unused `showShock` state and `handleDrop` handler, which were specific to the flawed inline implementation, were also removed, cleaning up the codebase.

## Related

[[Coro Project]],[[Sariya UI]],[[DropButton Component]],[[WebSocket]],[[State Management]],[[Rahil Singhi]]
