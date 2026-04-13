---
title: "WebSocket Reconnect: Restore room_id in Coro"
author: ai
created_at: 2026-04-12T21:10:51.756Z
last_ai_edit: 2026-04-12T21:10:51.756Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-restore-room-id-on-websocket-reconnect-9c8e23.md]]"
tags:
  - websocket
  - coro
  - bugfix
  - reconnection
  - backend
  - broadcast
---

# WebSocket Reconnect: Restore room_id in Coro

This fix addresses a critical issue in the Coro project where the `room_id` was lost upon WebSocket reconnection, leading to incorrect broadcast behavior. By reading the `room_id` from the message payload and re-registering the connection, the system now ensures persistent room membership across reconnections.

## Key Concepts

[[WebSocket]],Reconnect logic,Broadcast set,Room management

## Details

This commit (SHA: `82cdae8`) for the [[Coro]] project, dated 2026-02-28, resolves an issue where a WebSocket connection, upon reconnecting, would lose its associated `room_id`. Previously, the `room_id` was treated as a local variable, causing it to be discarded during the reconnection process. The fix involves modifying the WebSocket reconnection logic to explicitly read the `room_id` from the incoming message payload. Once retrieved, the connection is then correctly re-registered within the appropriate room's broadcast set, ensuring that messages continue to be routed to the correct participants after a network interruption.

## Related

[[Coro]],[[Backend Core Implementation: FastAPI, Pydantic, and Docker]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]]
