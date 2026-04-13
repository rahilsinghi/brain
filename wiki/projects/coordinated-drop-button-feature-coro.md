---
title: Coordinated Drop Button Feature (Coro)
author: ai
created_at: 2026-04-13T17:19:47.790Z
last_ai_edit: 2026-04-13T17:19:47.790Z
last_human_edit: null
last_embedded_hash: 95e75877db132856
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-coordinated-drop-button-3-presses-in-2s-triggers-bass-aa068a.md]]"
tags:
  - coro
  - feature
  - audio
  - real-time
  - interaction
  - backend
  - websocket
---


# Coordinated Drop Button Feature (Coro)

This feature introduces a 'coordinated drop button' mechanism within the Coro project, allowing users to trigger a 'bass drop' by pressing a button three or more times within a two-second sliding window. The backend processes these inputs, bypasses the Gemini model, and sends aggressive prompts to the Lyria system, broadcasting progress and trigger events to all connected clients.

## Key Concepts

Bass Drop,Coordinated Action,Sliding Window,Real-time Interaction,WebSocket Communication

## Details

The 'Coordinated Drop Button' feature (commit `234d842` in `rahilsinghi/Coro`) enables a unique interactive audio experience. It is implemented through modifications to `room_service.py` and `ws.py`.

In `room_service.py`, a `record_drop()` function was added, which tracks button presses using a 2-second sliding window. This window continuously monitors for at least three presses within its duration. If the condition is met, it signals a coordinated drop event.

The `ws.py` file handles the WebSocket communication. Upon receiving a coordinated drop trigger, the system bypasses the conventional [[Gemini]] processing. Instead, it directly dispatches 'aggressive drop prompts' to the [[Lyria]] audio processing system. This direct channeling is intended to produce an immediate and impactful 'bass drop' effect.

Throughout this process, the system broadcasts two key events to all connected clients via [[WebSockets]]:
*   `drop_progress`: Indicates that the system is accumulating presses and building towards a drop.
*   `drop_triggered`: Signals that the bass drop has been successfully activated, likely coinciding with an 'explosion' effect or similar audio cue on the client side.

## Related

[[Coro]],[[Gemini]],[[Lyria]],[[WebSockets]]
