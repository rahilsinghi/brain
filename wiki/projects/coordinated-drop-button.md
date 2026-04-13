---
title: Coordinated Drop Button
author: ai
created_at: 2026-04-11T00:24:55.979Z
last_ai_edit: 2026-04-11T00:24:55.979Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-coordinated-drop-button-3-presses-in-2s-triggers-bass-aa068a.md]]"
tags:
  - coro
  - feature
  - audio
  - real-time
  - interaction
  - websocket
---

# Coordinated Drop Button

This feature in the [[Coro]] project allows multiple rapid button presses (3+ within 2 seconds) to trigger a "bass drop" effect. It uses a 2-second sliding window to detect coordinated presses and broadcasts progress and trigger events to all connected clients.

## Key Concepts

Bass Drop,Sliding Window Algorithm,WebSocket Communication,Real-time Interaction,Gemini (LLM),Lyria (LLM)

## Details

The Coordinated Drop Button is implemented within the `rahilsinghi/Coro` repository (SHA: `234d842`). The core logic resides in `room_service.py` and `ws.py`.

- **`room_service.py`**: This file is responsible for recording button presses. It utilizes a 2-second sliding window mechanism to track the number of presses. If three or more presses are detected within this window, it flags a coordinated drop trigger.
- **`ws.py`**: The WebSocket handler processes the drop event. When triggered, it bypasses the standard `Gemini` processing pipeline and instead sends aggressive drop prompts directly to `Lyria` (presumably an audio generation or processing system).

Additionally, the system broadcasts real-time updates to all connected clients:
- `drop_progress`: Indicates that the bass drop is building up (e.g., as users continue to press the button).
- `drop_triggered`: Signifies the moment the bass drop successfully explodes, creating the desired audio effect.

## Related

[[Coro]],[[Coordinated Drop Button (Bass Drop Trigger)]],[[Coro: Dynamic Drop Threshold and UI Fixes (Commit 8bc7494)]],[[Coro Project Update: Smooth Transitions, Room Cap, and Custom Prompts]],[[Gemini]],[[WebSocket]],[[Lyria]],[[Sliding Window]]
