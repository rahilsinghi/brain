---
title: "Fix: Restore DropButton on /guest Route After Sariya UI Rewrite"
author: ai
created_at: 2026-04-10T02:11:16.008Z
last_ai_edit: 2026-04-10T02:11:16.008Z
last_human_edit: null
last_embedded_hash: eeb9359a8ec8aeec
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-restore-dropbutton-on-guest-route-after-sariya-ui-rewrite-654bdd.md]]"
tags:
  - bug-fix
  - coro
  - dropbutton
  - websocket
  - ui
  - guest-route
  - state-management
  - regression
  - component-reuse
  - rahil-singhi
---


# Fix: Restore DropButton on /guest Route After Sariya UI Rewrite

A bug fix commit (d631b5d) in the Coro repository that restores the shared DropButton component on the /guest route, which had been broken by a UI rewrite. The rewrite had introduced an inline button with incorrect WebSocket message types, missing vote locking, no countdown timer, and invalid store references. The fix replaces the broken inline implementation with the proper shared component.

## Key Concepts

- **DropButton Component**: A shared UI component responsible for drop functionality, including vote locking, countdown timer, and dynamic threshold handling
- **WebSocket Message Types**: The broken inline button sent `'drop_vote'` instead of the correct `'drop'` message type, causing incorrect server communication
- **Vote Locking**: A feature of the original DropButton that was absent in the broken inline replacement
- **Countdown Timer**: A feature of the original DropButton that was absent in the broken inline replacement
- **Dynamic Threshold**: A feature of the original DropButton that was absent in the broken inline replacement
- **useRoomStore**: A state management store used in the Coro app; `dropProgress` was incorrectly read from this store in the broken implementation, as it does not exist there
- **`dropProgress`**: A state value incorrectly destructured from `useRoomStore()` in the broken implementation; removed in this fix
- **`showShock` State**: An unused state variable introduced in the broken implementation; removed in this fix
- **`handleDrop` Handler**: An unused event handler introduced in the broken implementation; removed in this fix

## Details

## Overview

Commit `d631b5d`, authored by Rahil Singhi on 2026-02-28, fixes a regression on the `/guest` route in the [Coro](rahilsinghi/Coro) repository. A prior UI rewrite by Sariya had replaced the shared `<DropButton>` component with a custom inline button that contained multiple bugs.

## Problem

The inline button introduced by the Sariya UI rewrite had the following issues:

- **Wrong WebSocket message type**: Sent `'drop_vote'` instead of the correct `'drop'` message type
- **No vote locking**: The original DropButton's vote locking mechanism was absent
- **No countdown timer**: The original DropButton's countdown timer was absent
- **No dynamic threshold**: The original DropButton's dynamic threshold logic was absent
- **Invalid store access**: `dropProgress` was read from `useRoomStore()`, but this value does not exist in the store

## Changes Made

| Change | Description |
|--------|-------------|
| Restored `<DropButton userId roomId />` | Replaced broken inline button with the correct shared component |
| Removed `dropProgress` from store destructure | Cleaned up invalid reference to non-existent store value |
| Removed `showShock` state | Removed now-unused state variable introduced by the broken implementation |
| Removed `handleDrop` handler | Removed now-unused event handler introduced by the broken implementation |

## Commit Metadata

- **Repository:** rahilsinghi/Coro
- **SHA:** d631b5d
- **Date:** 2026-02-28T20:38:22Z
- **Author:** Rahil Singhi
- **Co-Author:** Claude Sonnet 4.6
- **Files Changed:** 1
- **Additions:** +2
- **Deletions:** -38

## Notes

The net change of -36 lines (2 added, 38 deleted) reflects that the shared `<DropButton>` component encapsulates the logic that was incorrectly reimplemented inline, resulting in a significant reduction in code on the `/guest` route.

## Related

- [[DropButton Component]]
- [[Coro Project]]
- [[useRoomStore]]
- [[Guest Route]]
- [[WebSocket Message Types]]
- [[Sariya UI Rewrite]]
- [[Rahil Singhi]]
