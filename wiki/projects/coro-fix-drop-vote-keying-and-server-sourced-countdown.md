---
title: "Coro: Fix Drop Vote Keying and Server-Sourced Countdown"
author: ai
created_at: 2026-04-11T01:38:33.827Z
last_ai_edit: 2026-04-11T01:38:33.827Z
last_human_edit: null
last_embedded_hash: 45fcdcabd1fffa49
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-key-drop-votes-on-connection-id-add-server-sourced-count-012452.md]]"
tags:
  - coro
  - bugfix
  - websocket
  - countdown
  - multiplayer
  - frontend
  - backend
---


# Coro: Fix Drop Vote Keying and Server-Sourced Countdown

This commit addresses a critical bug in the Coro project where drop votes were incorrectly keyed by `user_id`, leading to multiple votes from a single user across different browser tabs. The fix involves using a unique `connection_id` for each WebSocket connection and introduces a server-sourced countdown for the "drop" event with corresponding frontend UI updates.

## Key Concepts

[[Coro Project]],[[WebSocket]],`connection_id` (UUIDv4),`user_id`,`localStorage`,Server-sourced Countdown,Drop Vote Mechanism

## Details

This change in the `rahilsinghi/Coro` repository (SHA: `1192c5f`) resolves a fundamental issue where drop votes were being keyed by `user_id`. Since the `user_id` is often shared across multiple browser tabs (e.g., via `localStorage`), a single user could effectively cast multiple votes, circumventing the intended one-vote-per-physical-connection limit.

The solution implemented involves keying votes by a `connection_id`. This `connection_id` is a UUIDv4 generated at the time a WebSocket connection is accepted, ensuring that each physical connection, regardless of the user or browser profile, can cast only one vote.

In addition to the bug fix, a new feature has been introduced: a server-sourced countdown for the "drop" event. The mechanism is as follows:

*   When 3 votes are accumulated, the backend broadcasts a `drop_incoming` message containing a `in_seconds` parameter (e.g., `{in_seconds: 3}`).
*   After the specified delay, a [[Lyria]] update is triggered, followed by a `drop_triggered` broadcast.
*   The frontend is designed to read the `in_seconds` value from the incoming message, rather than using a hardcoded delay. It then displays a large timer counting down and makes the [[Coordinated Drop Button]] pulse red during this countdown period, providing clear visual feedback to users.

## Related

[[Coro — Git Activity]],[[Coordinated Drop Button (Coro)]],[[Coro Project: Lyria Context Reset and Session Cleanup Fix]],[[Coro: Dynamic Drop Threshold and UI Fixes (Commit 8bc7494)]],[[Coro: Fix Drop Vote Keying and Server-Sourced Countdown]]
