---
title: "Coro: Fix Vote Keying and Add Server-Sourced Drop Countdown"
author: ai
created_at: 2026-04-12T22:16:55.490Z
last_ai_edit: 2026-04-12T22:16:55.490Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-key-drop-votes-on-connection-id-add-server-sourced-count-012452.md]]"
tags:
  - coro
  - backend
  - websocket
  - voting
  - bug fix
  - frontend
  - ui
  - countdown
  - connection_id
  - user_id
---

# Coro: Fix Vote Keying and Add Server-Sourced Drop Countdown

This commit for the Coro project addresses a critical bug where votes were incorrectly keyed by `user_id`, allowing multiple votes from the same user across different browser tabs. It implements a fix by keying votes to a unique `connection_id` per WebSocket connection and introduces a server-sourced countdown UI for 'drop incoming' events.

## Key Concepts

[[connection_id]],[[user_id]],[[WebSocket]],Voting Mechanism,UI Countdown,Server-Side Events

## Details

This commit, identified by SHA `1192c5f` in the `rahilsinghi/Coro` repository, resolves a fundamental issue in the voting system. Previously, votes were attributed using `user_id`, which remains consistent across multiple browser tabs or sessions for the same user (due to shared `localStorage`). This design flaw allowed a single user to cast multiple votes by simply opening additional browser tabs.

The fix re-keys the voting mechanism to use a unique `connection_id`. This `connection_id` is a `uuid4` generated at the time a WebSocket connection is accepted, ensuring that each physical connection, regardless of the user, can cast only one vote. This significantly improves the integrity of the voting system.

In addition to the vote keying fix, the commit introduces a new user interface feature: a server-sourced 'drop countdown'. The workflow for this feature is as follows:

1.  When a certain threshold (e.g., 3 votes) is reached, the backend broadcasts a `drop_incoming` message, including `in_seconds: 3` (or similar delay).
2.  After the specified delay, a `Lyria` update is triggered, and the `drop_triggered` event is broadcast by the backend.
3.  The frontend client receives the `in_seconds` value from the `drop_incoming` message (avoiding hardcoded values) and displays a large, interactive countdown timer. During this countdown, the associated button visually pulses red to indicate the imminent event.

## Related

[[Coro]],[[Applause Handling Enhancement in Coro]],[[Applause Handling in Coro Backend]],[[Backend Applause Handling in Coro (PR #12)]],[[Chore: Add SKILLS.md, Task Files, and .gitignore Update (Coro Project)]],[[Chore: Add SKILLS.md, Task Files, and .gitignore Update (Coro)]],[[Chore: Removal of Task Files from Coro Repository Root]],[[Chore: Remove Non-README Markdown Files from Coro Root]],[[Chore: Remove Task Files from Coro Repository Root]]
