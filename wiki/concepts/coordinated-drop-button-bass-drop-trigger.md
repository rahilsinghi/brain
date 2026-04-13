---
title: Coordinated Drop Button (Bass Drop Trigger)
author: ai
created_at: 2026-04-10T18:12:49.857Z
last_ai_edit: 2026-04-10T18:12:49.857Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-coordinated-drop-button-3-presses-in-2s-triggers-bass-aa068a.md]]"
tags:
  - feature
  - bass drop
  - coordination
  - real-time
  - ai integration
  - websocket
  - coro
  - rahil singhi
  - gemini
  - lyria
  - event trigger
---

# Coordinated Drop Button (Bass Drop Trigger)

This feature introduces a 'Coordinated Drop Button' mechanism within the Coro project. When pressed 3 or more times within a 2-second sliding window, it triggers a 'bass drop' event. The system is designed to bypass standard AI handling, sending aggressive drop prompts directly to Lyria, and broadcasts real-time progress updates to all connected clients.

## Key Concepts

Coordinated Drop Button,Bass Drop Event,2-second Sliding Window,AI Bypassing (Gemini),Aggressive Prompts (Lyria),WebSocket Communication,Client Broadcasts (`drop_progress`, `drop_triggered`)

## Details

This feature, committed under SHA `234d842` by [[Rahil Singhi]] on `2026-02-28T18:14:50Z`, introduces a 'Coordinated Drop Button' to the [[Coro (Project)]] project.

**Implementation Details:**
*   **Trigger Mechanism:** The system is activated when a designated drop button is pressed three or more times within a 2-second sliding window.
*   **`room_service.py`:** This module includes the `record_drop()` function, responsible for tracking button presses and implementing the 2-second sliding window logic to determine if the trigger condition is met.
*   **`ws.py` (WebSocket Handler):** The WebSocket handler manages the drop event. Upon detection of the trigger, it bypasses standard AI processing, specifically [[Gemini (AI)]], and directly sends aggressive drop prompts to [[Lyria (AI)]].
*   **Client Communication:** The system broadcasts two distinct events to all connected clients:
    *   `drop_progress`: Indicates the 'building' phase leading up to the drop.
    *   `drop_triggered`: Signals the 'explosion' or activation of the bass drop.

This commit involved changes to 2 files, adding 58 lines of code with no deletions.

## Related

[[Rahil Singhi]],[[Coro (Project)]],[[Gemini (AI)]],[[Lyria (AI)]]
