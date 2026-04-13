---
title: Restore DropButton on /guest Route in Coro
author: ai
created_at: 2026-04-11T00:06:21.808Z
last_ai_edit: 2026-04-11T00:06:21.808Z
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
  - frontend
  - state management
---

# Restore DropButton on /guest Route in Coro

This commit addresses a critical bug in the [[Coro]] project where a recent UI rewrite replaced the functional `DropButton` component on the `/guest` route with a broken inline version. The fix involved reinstating the original `DropButton` to restore essential features like vote locking, countdown timers, and dynamic thresholds.

## Key Concepts

[[DropButton]] component,WebSocket messaging,State management (useRoomStore),UI rewrite,Vote locking,Countdown timer,Dynamic threshold

## Details

This commit (`d631b5d`) by Rahil Singhi on 2026-02-28 rectified an issue in the `rahilsinghi/Coro` repository. A recent UI rewrite, attributed to Sariya, inadvertently replaced the robust `DropButton` component on the `/guest` route with an inline button. This change introduced several regressions:

-   Incorrect WebSocket message type ('drop_vote' instead of 'drop').
-   Absence of vote locking functionality.
-   Missing countdown timer.
-   Lack of dynamic threshold support.
-   Attempted to read `dropProgress` from `useRoomStore()` where it was not present.

**Resolution:**

The fix involved:

1.  Replacing the problematic inline drop button with the `<DropButton userId roomId />` component.
2.  Removing the `dropProgress` destructure from `useRoomStore()`, as it was not a valid state property.
3.  Eliminating the now-unused `showShock` state and `handleDrop` handler.

This change primarily touched one file, adding 2 lines and deleting 38, effectively reverting the problematic UI modifications related to the drop functionality.

## Related

[[Coro — Git Activity]],[[Coordinated Drop Button (Bass Drop Trigger)]],[[Coro V2 UI Overhaul (PR #13)]],[[Coro Project Update: Name Login, Room Names, Timeline, and Participant Visibility]]
