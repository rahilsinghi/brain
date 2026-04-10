---
title: "Fix: Restore room_id on WebSocket Reconnect (Coro)"
author: ai
created_at: 2026-04-10T02:17:53.834Z
last_ai_edit: 2026-04-10T02:17:53.834Z
last_human_edit: null
last_embedded_hash: 343b3d63afdb833a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-restore-room-id-on-websocket-reconnect-9c8e23.md]]"
tags:
  - websocket
  - bug-fix
  - reconnection
  - room-management
  - broadcast
  - coro
  - real-time
  - state-management
  - rahilsinghi
---


# Fix: Restore room_id on WebSocket Reconnect (Coro)

This fix addresses a bug in the Coro project where the `room_id` was lost upon WebSocket reconnection due to it being stored as a local variable. The patch reads `room_id` from the incoming message payload and re-registers the connection in the room's broadcast set. The change was committed by Rahil Singhi on 2026-02-28.

## Key Concepts

- **WebSocket Reconnection**: The process by which a dropped or closed WebSocket connection is re-established, requiring state to be restored.
- **room_id**: An identifier used to associate a WebSocket connection with a specific room's broadcast group.
- **Local Variable Scope Issue**: The root cause of the bug — `room_id` was stored as a local variable and therefore lost when the connection was re-established.
- **Broadcast Set**: A collection of active WebSocket connections registered to receive messages for a given room.
- **Re-registration**: The act of adding a reconnected WebSocket client back into the room's broadcast set using the restored `room_id`.

## Details

## Overview

This commit (`82cdae8`) fixes a bug in the [Coro](https://github.com/rahilsinghi/Coro) project where WebSocket clients that reconnect lose their association with the room they were previously connected to.

## Problem

When a WebSocket connection drops and reconnects, the `room_id` — which determines which room's broadcast set the client belongs to — was stored only as a local variable. Upon reconnection, this value was no longer available, effectively orphaning the client from the room and preventing it from receiving broadcasted messages.

## Solution

The fix introduces logic to:
1. **Read `room_id` from the message payload** sent during the reconnect handshake.
2. **Re-register the connection** in the appropriate room's broadcast set using the recovered `room_id`.

## Change Summary

| Field         | Value                        |
|---------------|------------------------------|
| Repository    | rahilsinghi/Coro             |
| Commit SHA    | 82cdae8                      |
| Date          | 2026-02-28                   |
| Author        | Rahil Singhi                 |
| Files Changed | 1                            |
| Additions     | +9                           |
| Deletions     | -0                           |

## Impact

This is a purely additive fix (9 lines added, none removed). It ensures connection continuity for clients after a WebSocket reconnect, maintaining room membership and uninterrupted message delivery.

## Related

- [[WebSocket Connection Management]]
- [[Broadcast Set Architecture]]
- [[Room-Based Messaging]]
- [[Coro Project]]
- [[Rahil Singhi]]
- [[State Persistence in WebSockets]]
- [[Real-Time Communication Patterns]]
