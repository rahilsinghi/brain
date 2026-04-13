---
title: Smooth Transitions, Room Cap, Custom Prompts (Coro)
author: ai
created_at: 2026-04-12T22:11:15.421Z
last_ai_edit: 2026-04-12T22:11:15.421Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-feat-smooth-transitions-room-cap-custom-prompts-dcb8d7.md]]"
tags:
  - coro
  - feature
  - llm
  - gemini
  - bpm
  - room management
  - custom prompts
  - project management
  - development
---

# Smooth Transitions, Room Cap, Custom Prompts (Coro)

This update to the [[Coro]] project introduces significant enhancements across core services, enabling smoother musical transitions via BPM clamping, advanced LLM continuity rules with custom prompt support, and improved room management through a 10-user cap and stale input clearing. It also outlines task distribution for a new Project Requirements Document.

## Key Concepts

Smooth BPM Transitions,LLM Continuity Rules,Custom Prompts,Room Management,Project Requirements Document (PRD),Task Distribution

## Details

This commit (`f9a2c7d`) for the `rahilsinghi/Coro` repository brings several key features and refinements:

*   **`lyria_service.py`**: The BPM (Beats Per Minute) functionality is enhanced by clamping the change rate to ±10 BPM per tick. This ensures a more gradual and fluid transition between different musical tempos, improving the user experience.
*   **`gemini_service.py`**: Introduces advanced continuity rules for the underlying Large Language Model (LLM) integration, specifically a `≥60% overlap` requirement and `DJ crossfade` logic. These rules aim to maintain thematic coherence and natural flow in generated content. Additionally, the service now supports `custom_prompt passthrough`, allowing users to provide specific instructions or context to the LLM.
*   **`room_service.py`**: Implements robust room management features, including a `10-user room cap` to control participant numbers and a mechanism to `clear stale inputs after tick`, ensuring that the system processes only the most current interactions.
*   **`PRD_V2.md`**: The Project Requirements Document (PRD) version 2 is updated to include a clear `task distribution for Bharath + Sariya`, outlining their responsibilities for upcoming project phases.

## Related

[[Coro]],[[LLM]],[[Gemini (LLM)]],[[Bharath Mahesh Gera]],[[Sariya]],[[Project Requirements Document]],[[BPM]]
