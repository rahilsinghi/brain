---
title: "Coro Enhancements: Smooth Transitions, Room Cap, and Custom Prompts"
author: ai
created_at: 2026-04-13T17:42:15.143Z
last_ai_edit: 2026-04-13T17:42:15.143Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-smooth-transitions-room-cap-custom-prompts-dcb8d7.md]]"
tags:
  - coro
  - audio
  - bpm
  - gemini
  - llm
  - room management
  - multi-user
  - backend
  - feature
  - prd
---

# Coro Enhancements: Smooth Transitions, Room Cap, and Custom Prompts

This commit introduces several key enhancements to the Coro project, focusing on improved user experience and backend stability. It refines BPM ramping for smoother transitions, integrates advanced continuity rules and custom prompt passthrough for the Gemini service, and implements a 10-user room cap with stale input clearing for better room management.

## Key Concepts

Smooth BPM transitions,Gemini service continuity rules,Custom prompt passthrough,User room capacity limits,Stale input clearing,Task distribution for PRD

## Details

This commit to the `rahilsinghi/Coro` repository (SHA: `f9a2c7d`) on 2026-02-28 introduces several significant features and improvements:

*   **`lyria_service.py`**: The BPM (Beats Per Minute) handling has been enhanced to clamp changes within a ±10/tick range. This ensures more gradual and smooth transitions in audio playback, preventing abrupt tempo shifts.

*   **`gemini_service.py`**: The integration with the [[Gemini]] service now includes advanced continuity rules. These rules dictate that new content should have at least 60% overlap with previous content, and also support DJ-style crossfading for seamless audio mixing. Additionally, the service now supports `custom_prompt` passthrough, allowing for more flexible and dynamic prompt generation based on user input.

*   **`room_service.py`**: A new room management feature has been implemented, setting a strict 10-user cap per room. This helps maintain performance and a manageable environment. The service also now clears stale inputs after each tick, ensuring that only active and relevant data influences the room state.

*   **`PRD_V2.md`**: The `PRD_V2.md` document was updated to reflect task distribution, specifically outlining responsibilities for [[Bharath Mahesh Gera]] and [[Sariya]]. This indicates ongoing project planning and delegation within the [[Coro Project]].

## Related

[[Coro Project]],[[Gemini]],[[Bharath Mahesh Gera]],[[Sariya]]
