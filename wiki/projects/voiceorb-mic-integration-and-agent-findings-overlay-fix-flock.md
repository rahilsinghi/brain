---
title: VoiceOrb Mic Integration and Agent Findings Overlay Fix (Flock)
author: ai
created_at: 2026-04-12T22:12:17.992Z
last_ai_edit: 2026-04-12T22:12:17.992Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-voiceorb-mic-on-all-round-inputs-fix-agent-findings-ov-476d2a.md]]"
tags:
  - voiceorb
  - ui
  - bugfix
  - flock
  - enhancement
  - accessibility
  - user experience
  - multimodal input
---

# VoiceOrb Mic Integration and Agent Findings Overlay Fix (Flock)

This commit introduces VoiceOrb microphone integration across all input rounds (constraints, vision, dealmakers) in the Flock project, allowing for voice input. It also addresses a critical UI bug in the AgentFindings bottom sheet, fixing text overflow and ensuring the dismiss button remains visible and accessible.

## Key Concepts

VoiceOrb,AgentFindings,User Interface (UI) Enhancement,Multimodal Input,Bug Fix,Accessibility

## Details

This commit implements significant user interface enhancements and bug fixes within the [[Flock Project]], specifically targeting input mechanisms and overlay displays.

**QuestionCard Rewrite (VoiceOrb Integration)**

The `QuestionCard` component underwent a rewrite to integrate the VoiceOrb microphone functionality across all three input rounds:

*   **Round 1 (Constraints):** A microphone button is now positioned next to the text override field, enabling users to input text via voice, which then appends to the existing text.
*   **Round 2 (Vision):** A microphone button has been added adjacent to the vision textarea for convenient voice input.
*   **Round 3 (Dealmakers):** Dedicated microphone buttons are now available for both the 'dealbreaker' and 'delight' fields.

Further UI refinements include:

*   Primary buttons have been updated from gold to a 'glow-teal' color scheme.
*   Text contrast has been improved using specific hex colors for better readability.
*   The chip pre-selection mechanism now functions correctly with a wider range of budget patterns.

**AgentFindings Bottom Sheet Fix**

A critical bug in the [[AgentFindings]] bottom sheet has been resolved, which previously caused text overflow and obscured the dismiss button. The fixes include:

*   The content area now scrolls independently (`overflow-y-auto`) to prevent text overflow.
*   The bottom section containing the dismiss button is always visible, regardless of content length.
*   The maximum height of the bottom sheet is capped at `60vh`.
*   The generic 'working' label has been replaced with 'Travelling...' for better contextual feedback.
*   A proper dark background with a backdrop blur has been implemented for improved visual presentation.

## Related

[[Flock Project]],[[VoiceOrb]],[[AgentFindings]],[[User Interface]],[[Claude Opus 4.6]]
