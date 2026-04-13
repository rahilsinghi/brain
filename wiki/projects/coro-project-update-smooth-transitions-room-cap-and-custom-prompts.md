---
title: "Coro Project Update: Smooth Transitions, Room Cap, and Custom Prompts"
author: ai
created_at: 2026-04-11T01:31:23.460Z
last_ai_edit: 2026-04-11T01:31:23.460Z
last_human_edit: null
last_embedded_hash: dac6b63854088cab
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-smooth-transitions-room-cap-custom-prompts-dcb8d7.md]]"
tags:
  - coro
  - project update
  - bpm
  - transitions
  - room cap
  - custom prompts
  - gemini
  - lyria service
  - room service
  - task distribution
  - smooth experience
---


# Coro Project Update: Smooth Transitions, Room Cap, and Custom Prompts

This update to the [[Coro Project]] introduces several enhancements for a smoother user experience, including gradual BPM changes, continuity rules for DJ crossfades, and a 10-user room capacity. It also adds custom prompt passthrough for the Gemini service and outlines task distribution for the team.

## Key Concepts

BPM Ramping,LLM Continuity Rules,Room Management,User Capacity,Custom Prompts,Task Distribution

## Details

This commit (`f9a2c7d`) for the `rahilsinghi/Coro` repository, authored by Rahil Singhi on 2026-02-28, focuses on improving the user experience and backend logic of the [[Coro Project]].

Key changes include:

*   **`lyria_service.py`**: Implemented BPM clamping, allowing for a maximum change of ±10 BPM per tick. This ensures a more gradual and smoother tempo transition within the application's musical elements, preventing abrupt shifts.
*   **`gemini_service.py`**: Introduced new continuity rules for the Gemini service. These rules include a requirement for at least 60% overlap between audio segments and explicit support for DJ crossfades, enhancing the seamless blending of tracks. Additionally, a `custom_prompt` passthrough mechanism was added, allowing for more flexible and dynamic prompt generation for the underlying LLM.
*   **`room_service.py`**: A 10-user cap was set for each room to manage server load and user experience. The service also now includes functionality to clear stale inputs after each tick, ensuring room state consistency.
*   **`PRD_V2.md`**: The Project Requirements Document (PRD) was updated to reflect the task distribution for Bharath and Sariya, detailing their respective responsibilities within the project. This likely refers to [[Coro v2 Feature Task File Distribution (Commit 1298eb8)]].

## Related

[[Coro — Git Activity]],[[Coro Project: Gemini Arbitration and Energy Controller Wiring (PR#2)]],[[Coro v2 Feature Task File Distribution (Commit 1298eb8)]],[[Coro: Fix Drop Vote Keying and Server-Sourced Countdown]],[[Coro: Initial Scaffold]],[[Coro: Sariya's UI Overhaul Merge]],[[Coro: Smooth Audio Drop Transition]],[[Coro: WebSocket Reconnection Fix (PR#6)]],[[Gemini]],[[Coro Project Update: Name Login, Room Names, Timeline, and Participant Visibility]]
