---
title: Smooth Transitions, Room Cap, and Custom Prompts in Coro
author: ai
created_at: 2026-04-12T18:11:09.094Z
last_ai_edit: 2026-04-12T18:11:09.094Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-smooth-transitions-room-cap-custom-prompts-dcb8d7.md]]"
tags:
  - coro
  - audio
  - transitions
  - gemini
  - bpm
  - room capacity
  - custom prompts
  - product development
---

# Smooth Transitions, Room Cap, and Custom Prompts in Coro

This commit introduces several key features to the Coro project, enhancing audio transitions, imposing a room capacity limit, and enabling custom prompt passthrough for the Gemini service. Specifically, it refines BPM adjustments for smoother audio mixing, implements continuity rules for DJ crossfades, and adds a 10-user room cap to optimize resource usage.

## Key Concepts

Smooth Audio Transitions,Room Capacity Limit,Custom Prompts,DJ Crossfade,Continuity Rules (Audio),BPM Clamping

## Details

This commit, with SHA `f9a2c7d` authored by Rahil Singhi on 2026-02-28, introduces significant updates across four files within the `rahilsinghi/Coro` repository. Key changes include:

*   **`lyria_service.py`**: The BPM (beats per minute) adjustment logic has been refined to clamp changes at ±10 beats per tick. This ensures a more gradual and smoother ramping of tempo, contributing to better audio transitions.
*   **`gemini_service.py`**: New continuity rules have been implemented for the Gemini service. These rules include requiring a minimum of 60% overlap between audio segments and enabling DJ crossfade functionality, which improves the seamlessness of audio mixing. Additionally, the service now supports custom prompt passthrough, allowing for more flexible interactions.
*   **`room_service.py`**: A capacity limit has been introduced for rooms, capping them at a maximum of 10 users. This helps manage resource allocation and performance. The service also now clears stale inputs after each tick, ensuring data freshness and efficiency.
*   **`PRD_V2.md`**: The Product Requirements Document (version 2) was updated to reflect new task distributions, specifically assigning tasks to Bharath and Sariya.

## Related

[[Coro]],[[Backend Applause Handling in Coro (PR #12)]],[[Chore: Remove Task Files from Coro Repository Root]],[[Add Open Matter for Bharath Mahesh Gera]],[[Bharath's askNYC Deployment & Live Camera Testing Task Specification]],[[Sariya's Task]]
