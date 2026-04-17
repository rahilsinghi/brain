---
title: "Coordinated Drop Button: Bass Drop Trigger in Coro"
author: ai
created_at: 2026-04-12T17:34:00.677Z
last_ai_edit: 2026-04-12T17:34:00.677Z
last_human_edit: null
last_embedded_hash: dc27705ffb5bef90
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-coordinated-drop-button-3-presses-in-2s-triggers-bass-aa068a.md]]"
tags:
  - coro
  - feature
  - real-time
  - audio
  - interaction
  - websocket
  - lyria
  - gemini
---


# Coordinated Drop Button: Bass Drop Trigger in Coro

This article details the implementation of the Coordinated Drop Button feature within the Coro Project. It describes how pressing the button three or more times within a two-second sliding window triggers a 'bass drop' effect, leveraging Lyria for aggressive drop prompts and broadcasting real-time progress to clients.

## Key Concepts

Coordinated Drop Button,Bass Drop Trigger,Sliding Window (2-second),Lyria,WebSocket,Coro Project

## Details

The `Coordinated Drop Button` feature in the [[Coro Project]] enables a synchronized 'bass drop' effect triggered by collective user interaction. The implementation involves: 

*   **Sliding Window Logic:** The `room_service.py` file includes a `record_drop()` function that tracks button presses within a 2-second sliding window. If three or more presses are registered within this timeframe, the bass drop sequence is initiated.
*   **Prompt Routing and AI Integration:** The `ws.py` WebSocket handler manages the trigger. When activated, it bypasses the standard [[Gemini]] processing and sends specialized, 'aggressive drop prompts' directly to [[Lyria]]. Lyria then generates the content or effects associated with the bass drop.
*   **Client Communication:** The system broadcasts two distinct events to all connected clients via [[WebSocket]]:
    *   `drop_progress`: Indicates the build-up phase, signaling that a bass drop is imminent.
    *   `drop_triggered`: Signals the 'explosion' or execution of the bass drop effect.

This architecture ensures a responsive and engaging real-time user experience for the coordinated bass drop.

## Related

[[Coordinated Drop Button (Coro)]],[[Coordinated Drop Button Feature (Coro Project)]],[[Coro Project]],[[Lyria]],[[Gemini]],[[WebSocket]]
