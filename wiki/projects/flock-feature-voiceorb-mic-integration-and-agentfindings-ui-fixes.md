---
title: "Flock Feature: VoiceOrb Mic Integration and AgentFindings UI Fixes"
author: ai
created_at: 2026-04-10T21:38:45.870Z
last_ai_edit: 2026-04-10T21:38:45.870Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-voiceorb-mic-on-all-round-inputs-fix-agent-findings-ov-476d2a.md]]"
tags:
  - flock
  - voiceorb
  - microphone
  - questioncard
  - agentfindings
  - ui
  - ux
  - bugfix
  - feature
  - commit
  - frontend
---

# Flock Feature: VoiceOrb Mic Integration and AgentFindings UI Fixes

This update introduces VoiceOrb microphone functionality across all input rounds of the QuestionCard interface within the Flock project, allowing for voice input. Additionally, it addresses several UI/UX issues in the AgentFindings bottom sheet, enhancing its usability and appearance.

## Key Concepts

- **VoiceOrb**: A voice input system integrated into the application.,- **QuestionCard**: A UI component with multiple input rounds (constraints, vision, dealmakers).,- **AgentFindings Bottom Sheet**: A UI overlay displaying agent findings.,- **UI/UX Improvements**: Enhancements to user interface and experience, including styling and layout fixes.

## Details

This commit (`33f8183`) for the `rahilsinghi/Flock` repository, authored by Rahil Singhi on 2026-03-21, primarily focuses on two key areas:

### QuestionCard Rewrite (VoiceOrb Integration)

*   **VoiceOrb Microphone Integration**: A microphone button for VoiceOrb input has been added to all three rounds of the QuestionCard (Constraints, Vision, Dealmakers).
    *   **Round 1 (Constraints)**: The mic button is placed next to the text override field, with voice input appending to existing text.
    *   **Round 2 (Vision)**: The mic button is located next to the vision textarea.
    *   **Round 3 (Dealmakers)**: Separate microphone inputs are available for both the dealbreaker and delight fields.
*   **Styling Updates**:
    *   Primary buttons have been updated to a `glow-teal` style, replacing the previous gold color.
    *   Improved text contrast using specific hex colors for better readability.
*   **Functionality Enhancement**: Chip pre-selection now supports a wider range of budget patterns.

### AgentFindings Bottom Sheet Fixes

*   **Overflow Resolution**: Fixed issues where text was overflowing the bottom sheet content area, obscuring the dismiss button.
*   **Independent Scrolling**: The content area now scrolls independently (`overflow-y-auto`), ensuring all text is accessible.
*   **Persistent Dismiss Button**: The bottom section, containing the dismiss button, is now fixed and always visible.
*   **Max Height Cap**: The bottom sheet's maximum height is capped at `60vh` to prevent it from occupying too much screen space.
*   **Dynamic Label**: The generic "working" label has been replaced with "Travelling...", providing more context during agent processing.
*   **Visual Enhancement**: Implemented a proper dark background with a backdrop blur effect for improved aesthetics and focus.

## Related

[[Flock (Project)]],[[VoiceOrb]],[[AgentFindings]],[[User Interface Design]],[[User Experience]]
