---
title: VoiceOrb Mic Integration and AgentFindings UI Fixes in Flock
author: ai
created_at: 2026-04-12T18:12:12.512Z
last_ai_edit: 2026-04-12T18:12:12.512Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-voiceorb-mic-on-all-round-inputs-fix-agent-findings-ov-476d2a.md]]"
tags:
  - flock
  - ui
  - ux
  - voiceorb
  - microphone
  - agentfindings
  - frontend
  - bug fix
  - feature
  - commit
---

# VoiceOrb Mic Integration and AgentFindings UI Fixes in Flock

This commit introduces the VoiceOrb microphone button across all input rounds (constraints, vision, dealmakers) in the Flock project, enhancing user interaction. It also addresses critical UI issues within the AgentFindings bottom sheet, improving text visibility, scrolling behavior, and overall presentation.

## Key Concepts

VoiceOrb,AgentFindings,UI/UX Enhancements,Microphone Input,Frontend Development,User Interface Fixes

## Details

This commit for the [[Flock Project]] (SHA: `33f8183`) by [[Rahil Singhi]] primarily focuses on two areas: a significant rewrite of the `QuestionCard` component and crucial fixes for the `AgentFindings` bottom sheet.

### QuestionCard Rewrite

The `QuestionCard` component was re-engineered to seamlessly integrate the VoiceOrb microphone functionality across all three input rounds:

*   **Round 1 (Constraints):** A microphone button is now positioned next to the text override field, allowing voice input to append directly to the existing text.
*   **Round 2 (Vision):** The microphone button is added adjacent to the vision textarea.
*   **Round 3 (Dealmakers):** Separate microphone buttons are provided for both the 'dealbreaker' and 'delight' fields.

Further UI enhancements include:

*   Primary buttons now utilize a `glow-teal` style, replacing the previous gold color.
*   Improved text contrast has been implemented using specific hex color values.
*   Pre-selection of chips now functions correctly with a broader range of budget patterns.

### AgentFindings Bottom Sheet Fix

Several issues plaguing the `AgentFindings` bottom sheet were resolved to improve usability and presentation:

*   **Text Overflow:** Previously, text content would overflow and hide the dismiss button. This has been fixed.
*   **Independent Scrolling:** The content area within the bottom sheet now scrolls independently (`overflow-y-auto`), ensuring all information is accessible.
*   **Persistent Dismiss Button:** The bottom section containing the dismiss button is now always visible, regardless of content length.
*   **Max Height Constraint:** The bottom sheet's maximum height is capped at `60vh` for better visual consistency.
*   **Contextual Label:** A more specific "Travelling..." label replaces the generic "working" label, providing clearer status feedback.
*   **Dark Background & Blur:** A proper dark background with a `backdrop-blur` effect has been applied to enhance visual separation and focus.

This commit was co-authored by Claude Opus 4.6 (1M context), indicating the use of AI in the development process.

## Related

[[Flock Project]],[[Rahil Singhi]],[[Audio Layer Implementation for Flock Project]],[[AskNYC Frontend UI Specification (Sariya's Task)]]
