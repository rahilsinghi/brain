---
title: "Coro: Drop Vote System Fix and Server-Sourced Countdown"
author: ai
created_at: 2026-04-13T17:45:01.981Z
last_ai_edit: 2026-04-13T17:45:01.981Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-key-drop-votes-on-connection-id-add-server-sourced-count-012452.md]]"
tags:
  - coro
  - bugfix
  - feature
  - websocket
  - vote system
  - countdown
  - backend
  - frontend
  - connection_id
  - user_id
  - uuid4
---

# Coro: Drop Vote System Fix and Server-Sourced Countdown

This update to the Coro project addresses a critical bug where drop votes were incorrectly keyed by `user_id`, leading to shared votes across browser tabs. The fix introduces `connection_id` for unique vote tracking per WebSocket connection and adds a new server-sourced countdown UI for upcoming drops, enhancing user experience and system accuracy.

## Key Concepts

Drop Vote System,Connection ID,User ID,Server-Sourced Countdown,WebSocket Connections,UUID4,Backend Broadcasts (`drop_incoming`, `drop_triggered`)

## Details

This commit to the [[Coro]] repository, authored by Rahil Singhi with co-authorship from [[Claude Sonnet 4.6]], implements a crucial fix for the drop vote system and introduces a new server-sourced countdown feature.

**Root Cause and Fix:**
The primary issue was that votes were keyed by `user_id`. This meant that if a user had multiple browser tabs open (sharing the same `localStorage`), their vote would be counted across all tabs, leading to inaccurate vote tallies. The fix involves changing the keying mechanism to use a `connection_id`. A `uuid4` is generated at the WebSocket connection's `accept` time, ensuring that each physical connection has a unique ID, thus allowing for one vote per connection regardless of shared browser profiles.

**Server-Sourced Countdown UI:**
In addition to the vote keying fix, the update introduces a dynamic countdown UI for drops. The new workflow is as follows:

1.  When 3 votes are registered, the backend broadcasts a `drop_incoming` message containing an `in_seconds` parameter (e.g., `drop_incoming {in_seconds: 3}`).
2.  After the specified delay, a Lyria update fires.
3.  Subsequently, a `drop_triggered` message is broadcast by the backend.
4.  The frontend reads the `in_seconds` value from the `drop_incoming` message (rather than relying on hardcoded values) and displays a large, prominent timer. During this countdown, a button associated with the drop pulses red, providing a clear visual cue to the user.

## Related

[[Coro]],[[Claude Sonnet 4.6]],[[User ID]],[[Connection ID]]
