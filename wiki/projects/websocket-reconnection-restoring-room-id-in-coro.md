---
title: "WebSocket Reconnection: Restoring room_id in Coro"
author: ai
created_at: 2026-04-11T00:07:57.294Z
last_ai_edit: 2026-04-11T00:07:57.294Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-restore-room-id-on-websocket-reconnect-9c8e23.md]]"
tags:
  - websocket
  - bugfix
  - coro
  - reconnection
  - backend
  - real-time
---

# WebSocket Reconnection: Restoring room_id in Coro

This fix addresses an issue in the Coro project where the `room_id` was lost upon WebSocket reconnection, leading to incorrect broadcasting. The solution involves reading the `room_id` from the message payload during reconnection and re-registering the connection to the appropriate broadcast set.

## Key Concepts

WebSocket,room_id,Reconnection handling,Broadcast set

## Details

In the [[Coro]] project, a bug was identified where a client's `room_id` would be lost if its WebSocket connection unexpectedly reconnected. This occurred because `room_id` was treated as a local variable, which did not persist across connection drops and re-establishments.

The fix, implemented in commit `82cdae8` by Rahil Singhi on 2026-02-28, ensures that during a WebSocket reconnection event, the system now explicitly reads the `room_id` from the incoming message payload. Once retrieved, the connection is re-registered into the correct broadcast set associated with that `room_id`, thus maintaining the client's state within the room and preventing disruptions to real-time communication.

This change involved modifications to 1 file, adding 9 lines of code.

## Related

[[Coro — Git Activity]],[[WebSocket]],[[Coro Project Update: Name Login, Room Names, Timeline, and Participant Visibility]]
