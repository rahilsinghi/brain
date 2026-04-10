---
title: "fix: restore DropButton on /guest route after Sariya UI rewrite"
author: ai
created_at: 2026-04-10T02:09:58.659Z
last_ai_edit: 2026-04-10T02:09:58.659Z
last_human_edit: null
last_embedded_hash: 17c7365d9799da62
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-restore-dropbutton-on-guest-route-after-sariya-ui-rewrite-654bdd.md]]"
tags:
  - bug-fix
  - regression
  - ui
  - websocket
  - coro
  - guest-route
  - dropbutton
  - state-management
  - refactor
  - component-restoration
---


# fix: restore DropButton on /guest route after Sariya UI rewrite

This commit restores the shared DropButton component on the /guest route in the Coro repository after a UI rewrite by Sariya introduced a broken inline button implementation. The inline replacement had multiple critical issues including incorrect WebSocket message types, missing vote locking, no countdown timer, no dynamic threshold, and an invalid store reference. The fix replaces the broken inline button with the proper DropButton component and cleans up related unused state and handlers.

## Key Concepts

- **DropButton Component:** A shared UI component handling drop vote functionality with built-in vote locking, countdown timer, and dynamic threshold support
- **WebSocket Message Types:** The correct message type for drop actions is `'drop'`; the broken implementation incorrectly used `'drop_vote'`
- **Vote Locking:** A mechanism preventing duplicate or invalid drop votes, which was absent in the inline replacement
- **Countdown Timer:** A UI feature within DropButton that was lost in the inline implementation
- **Dynamic Threshold:** A configurable drop threshold managed by DropButton but missing from the inline version
- **useRoomStore:** A state management store for room data; `dropProgress` is not a valid field in this store and was incorrectly referenced
- **Regression Bug:** A bug introduced by a refactor (Sariya's UI rewrite) that removed previously working functionality

## Details

## Problem

During a UI rewrite by Sariya, the shared `<DropButton>` component on the `/guest` route was replaced with a custom inline button. This inline implementation introduced several bugs:

- **Wrong WebSocket message type:** Sent `'drop_vote'` instead of the correct `'drop'` message type
- **No vote locking:** The inline button lacked the vote locking mechanism present in `DropButton`
- **No countdown timer:** The countdown timer functionality was not replicated
- **No dynamic threshold:** The drop threshold was hardcoded or missing rather than dynamic
- **Invalid store reference:** `dropProgress` was destructured from `useRoomStore()`, but this field does not exist in the store

## Solution

The fix applied in commit `d631b5d` restores correct behavior with minimal changes (+2 additions, -38 deletions):

1. **Replace inline drop button** with the proper `<DropButton userId roomId />` component
2. **Remove invalid store reference:** `dropProgress` removed from `useRoomStore()` destructure
3. **Remove unused code:** `showShock` state and `handleDrop` handler are deleted as they are no longer needed

## Commit Details

| Field | Value |
|---|---|
| Repository | rahilsinghi/Coro |
| SHA | d631b5d |
| Date | 2026-02-28 |
| Author | Rahil Singhi |
| Co-Author | Claude Sonnet 4.6 |
| Files Changed | 1 |
| Additions | +2 |
| Deletions | -38 |

## Impact

This is a net reduction of 36 lines of code, replacing a large broken inline implementation with a two-prop component invocation. The fix restores all previously working drop functionality on the `/guest` route.

## Related

- [[DropButton Component]]
- [[Coro Project]]
- [[Guest Route]]
- [[useRoomStore]]
- [[WebSocket Message Types]]
- [[Sariya UI Rewrite]]
- [[Vote Locking Mechanism]]
