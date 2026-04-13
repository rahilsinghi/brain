---
title: "Flock: VoiceOrb Mic Integration and Agent Findings Fix"
author: ai
created_at: 2026-04-10T17:35:29.434Z
last_ai_edit: 2026-04-10T17:35:29.434Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-voiceorb-mic-on-all-round-inputs-fix-agent-findings-ov-476d2a.md]]"
tags:
  - flock
  - voiceorb
  - microphone
  - ui-fix
  - agentfindings
  - commit
  - feature
  - ux
  - claude-opus
  - questioncard
---

# Flock: VoiceOrb Mic Integration and Agent Findings Fix

This commit to the Flock repository introduces VoiceOrb microphone functionality across all three input rounds (constraints, vision, dealmakers) for enhanced user interaction. It also addresses and fixes critical UI issues within the AgentFindings bottom sheet, ensuring better readability and usability by preventing text overflow and maintaining dismiss button visibility.

## Key Concepts

VoiceOrb,QuestionCard,AgentFindings,User Interface (UI),User Experience (UX),Microphone Integration

## Details

This commit (`33f8183`) was made on `2026-03-21` by `Rahil Singhi` to the `rahilsinghi/Flock` repository. It involved changes to 2 files, adding 118 lines and deleting 211 lines.

### QuestionCard Rewrite and VoiceOrb Integration

-   **VoiceOrb Microphone Added**: The microphone button for VoiceOrb functionality is now integrated into all three input rounds of the QuestionCard:
    -   **Round 1 (Constraints)**: Mic placed next to the text override field, appending voice input to existing text.
    -   **Round 2 (Vision)**: Mic placed next to the vision textarea.
    -   **Round 3 (Dealmakers)**: Separate microphone inputs for both dealbreaker and delight fields.
-   **UI Enhancements**:
    -   Primary buttons have been updated to a `glow-teal` style, replacing the older gold design.
    -   Improved text contrast using specific hex colors for better readability.
    -   Chip pre-selection now supports a wider range of budget patterns.

### AgentFindings Bottom Sheet Fix

Several issues with the AgentFindings bottom sheet overlay have been resolved:

-   **Text Overflow Fixed**: Addressed the problem of text overflowing and obscuring the dismiss button.
-   **Independent Scrolling**: The content area now scrolls independently (`overflow-y-auto`), allowing the bottom section with the dismiss button to remain always visible.
-   **Max Height Cap**: The bottom sheet's maximum height is now capped at `60vh`.
-   **Label Update**: The generic "working" label has been replaced with "Travelling..." for better context.
-   **Background and Blur**: Implemented a proper dark background with a backdrop blur effect for improved visual presentation.

_Co-Authored-By: Claude Opus 4.6 (1M context)_

## Related

[[Flock (Project)]],[[VoiceOrb]],[[QuestionCard (UI Component)]],[[AgentFindings (Feature)]],[[Rahil Singhi]],[[Claude Opus]]
