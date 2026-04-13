---
title: "Coordinated Drop Button: Bass Drop Trigger in Coro"
author: ai
created_at: 2026-04-11T00:22:01.563Z
last_ai_edit: 2026-04-11T00:22:01.563Z
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
  - multiplayer
  - audio
---

# Coordinated Drop Button: Bass Drop Trigger in Coro

This feature introduces a 'Coordinated Drop Button' in the [[Coro]] project, allowing users to collectively trigger a bass drop. If three or more button presses occur within a two-second sliding window, a bass drop is initiated, bypassing standard AI processing and sending aggressive prompts to the [[Lyria]] system.

## Key Concepts

Bass Drop Trigger,Sliding Window Algorithm,WebSocket Communication,Real-time Event Processing

## Details

The 'Coordinated Drop Button' feature in the [[Coro]] project enhances user interaction by enabling a collective bass drop. The core logic resides in `room_service.py`, which records drop events using a two-second sliding window. If this window detects three or more drop presses, the system triggers the bass drop.

The `ws.py` component handles the WebSocket communication. Upon triggering, it bypasses the standard [[Gemini]] AI processing and instead sends 'aggressive drop prompts' directly to the [[Lyria]] system, indicating a heightened state for the audio experience. The system then broadcasts two distinct events to all connected clients:

*   `drop_progress`: Informs clients that a bass drop is building.
*   `drop_triggered`: Signals that the bass drop 'explosion' has occurred.

## Related

[[Coro]],[[Coro Project Update: Name Login, Room Names, Timeline, and Participant Visibility]],[[Coro Project Update: Smooth Transitions, Room Cap, and Custom Prompts]],[[Coro: Dynamic Drop Threshold and UI Fixes (Commit 8bc7494)]],[[ADK Multi-Agent Backend (askNYC Project)]],[[Lyria]],[[AskNYC Model Update: Gemini 2.5 Flash Native Audio]]
