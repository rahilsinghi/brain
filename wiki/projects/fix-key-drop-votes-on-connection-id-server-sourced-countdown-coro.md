---
title: "Fix: Key Drop Votes on connection_id + Server-Sourced Countdown (Coro)"
author: ai
created_at: 2026-04-12T18:17:22.892Z
last_ai_edit: 2026-04-12T18:17:22.892Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-key-drop-votes-on-connection-id-add-server-sourced-count-012452.md]]"
tags:
  - coro
  - fix
  - voting
  - websocket
  - countdown
  - backend
  - frontend
  - ui
---

# Fix: Key Drop Votes on connection_id + Server-Sourced Countdown (Coro)

This commit addresses a critical voting system bug in the [[Coro]] project by switching vote keying from `user_id` to a unique `connection_id`, preventing duplicate votes from the same user across multiple browser tabs. It also introduces a new server-sourced countdown UI for 'drops', where the backend broadcasts timing information to the frontend for a synchronized visual countdown.

## Key Concepts

[[connection_id]],[[user_id]],[[WebSocket]],[[UUID]],Server-Sourced Countdown,Vote Deduplication,[[Client-Side Storage]] (localStorage)

## Details

This commit (SHA: 1192c5f) for the `rahilsinghi/Coro` repository, dated 2026-02-28, introduces a fix for an issue where votes were inadvertently duplicated if a user had multiple browser tabs open. The root cause was that votes were keyed by `user_id`, which is shared across browser tabs (e.g., via `localStorage`). To resolve this, the system now uses a per-WebSocket `connection_id` (a `uuid4` generated at connection acceptance) to key votes, ensuring that each physical connection can cast only one vote.

In addition to the voting fix, the commit also implements a server-sourced countdown mechanism for 'drops'. When a drop is imminent (e.g., after 3 votes), the backend broadcasts a `drop_incoming` event, including `in_seconds: 3`. This informs the frontend about the countdown duration. Following this initial broadcast and the specified delay, a `drop_triggered` event is broadcast. The frontend reads the `in_seconds` value directly from the `drop_incoming` message (rather than relying on hardcoded values) and displays a large, synchronized timer, with the associated button pulsing red during the countdown phase. This ensures a consistent and server-driven user experience for drop events.

Co-Authored-By: [[Claude Sonnet 4.6]]

## Related

[[Coro]],[[WebSocket]],[[UUID]],[[Client-Side Storage]],[[Backend Broadcasting]],[[User Interface (UI)]],[[Claude Sonnet 4.6]]
