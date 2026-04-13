---
title: Coordinated Bass Drop Feature in Coro
author: ai
created_at: 2026-04-13T15:51:44.900Z
last_ai_edit: 2026-04-13T15:51:44.900Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-coordinated-drop-button-3-presses-in-2s-triggers-bass-aa068a.md]]"
tags:
  - coro
  - feature
  - bass drop
  - real-time
  - websocket
  - python
  - audio
---

# Coordinated Bass Drop Feature in Coro

This feature introduces a 'coordinated drop button' in the Coro project, enabling multiple users to collaboratively trigger a bass drop. It utilizes a 2-second sliding window to detect 3+ presses, bypassing Gemini to send prompts directly to Lyria, and broadcasts real-time progress to clients.

## Key Concepts

Coordinated Drop Button,Bass Drop,Sliding Window Algorithm,WebSocket Communication,Real-time Interaction,LLM Bypassing (Gemini),Audio Generation (Lyria)

## Details

The `rahilsinghi/Coro` project introduces a `feat: coordinated drop button` functionality (commit `234d842`). This feature allows for a collaborative 'bass drop' event, triggered by three or more presses of a designated button within a 2-second sliding window.

The core logic for tracking button presses is implemented in `room_service.py` via the `record_drop()` function. This function maintains the 2-second sliding window to count activations. When the threshold is met, the bass drop sequence is initiated.

The `ws.py` module, responsible for WebSocket communication, handles the `drop` event from clients. Upon activation, this handler is designed to *bypass* typical processing by [[Gemini]] (likely an LLM or content generation system). Instead, it directly sends 'aggressive drop prompts' to [[Lyria]], suggesting Lyria is an audio processing or generation service responsible for executing the bass drop effect.

To ensure an engaging user experience, the system broadcasts real-time updates to all connected clients. It sends `drop_progress` messages to indicate the build-up phase before the drop, and `drop_triggered` messages once the bass drop has been successfully activated (described as an 'explosion'). This provides immediate feedback and synchronizes the experience across all participants.

## Related

[[Coro]],[[room_service.py]],[[ws.py]],[[Gemini]],[[Lyria]],[[Rahil Singhi]],[[WebSocket Communication]]
