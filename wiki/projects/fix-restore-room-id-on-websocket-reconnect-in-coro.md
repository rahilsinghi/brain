---
title: "Fix: Restore room_id on WebSocket Reconnect in Coro"
author: ai
created_at: 2026-04-13T17:08:59.775Z
last_ai_edit: 2026-04-13T17:08:59.775Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-restore-room-id-on-websocket-reconnect-9c8e23.md]]"
tags:
  - bugfix
  - websocket
  - coro
  - backend
  - room_id
  - reconnect
---

# Fix: Restore room_id on WebSocket Reconnect in Coro

This commit addresses a bug in the Coro project where the `room_id` was lost upon WebSocket reconnection. The fix ensures that the `room_id` is correctly read from the message payload and the connection is re-registered in the room's broadcast set, maintaining session context.

## Key Concepts

WebSocket,room_id,Connection Reconnection,Broadcast Set

## Details

When a WebSocket connection in the [[Coro Backend]] would reconnect, the `room_id` variable, being local, was lost, leading to incorrect state management. The implemented fix (SHA `82cdae8`) modifies the system to explicitly read the `room_id` from the incoming message payload upon a reconnect event. Subsequently, the connection is re-registered within the appropriate room's broadcast set, preventing loss of context and ensuring continued functionality. This change, authored by Rahil Singhi on 2026-02-28, involved modifications to a single file with 9 additions.

## Related

[[Coro Backend]],[[Backend Applause Handling in Coro]],[[Applause Handling Enhancement in Coro]]
