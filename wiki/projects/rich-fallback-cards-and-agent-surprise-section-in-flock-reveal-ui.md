---
title: Rich Fallback Cards and Agent Surprise Section in Flock Reveal UI
author: ai
created_at: 2026-04-12T21:46:35.748Z
last_ai_edit: 2026-04-12T21:46:35.748Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-rich-fallback-cards-separate-agent-surprise-section-in-662621.md]]"
tags:
  - flock
  - ui
  - ux
  - reveal
  - agent
  - cards
  - fallback
  - surprise
  - claude
---

# Rich Fallback Cards and Agent Surprise Section in Flock Reveal UI

This update enhances the [[Flock Project]]'s reveal UI with rich fallback data for each user card, detailing 'won' and 'traded' items with specific hotel names, markets, and constraint matches. It also introduces a new, distinct 'Agent Surprise Section' displaying unexpected findings from the agent, each with unique content and visual cues.

## Key Concepts

[[Flock Project]] Reveal UI,Rich Fallback Cards,Agent Surprise Section,Personalized Agent Feedback,Dynamic Card Templates

## Details

This feature introduces significant enhancements to the [[Flock Project]]'s reveal user interface, focusing on providing more detailed and personalized feedback to participants.

### Force-reveal Fallback Data
Previously, fallback data might have been generic. With this update, the fallback data is made much richer and more specific:

*   **Detailed 'Won' Items**: Each user card now prominently features three detailed 'won' items. These items provide specific hotel names, relevant market insights, and percentage-based matches against user-defined constraints, offering clear justification for agent choices.
*   **Specific 'Traded' Items**: Traded items are now articulated with specific reasoning, such as: "Skipped second city to keep budget," making the agent's decision-making process more transparent.
*   **Personalized Surprise Texts**: The surprise texts are 2-3 sentences long and are highly personalized, referencing specific user profile signals like "your photos," "your aesthetic fingerprint," or "your food profile score predicted this."
*   **Distinct Card Templates**: To ensure a unique experience for each participant, six distinct card templates have been implemented, varying the presentation of information.

### Split Reveal UI
To improve clarity and user experience, the reveal UI has been redesigned:

*   **'What your agent won for you' Section**: This primary section is clearly delineated with a header. 'Won' items are now displayed with green checkmarks and their full, untruncated text.
*   **'Traded' Items Display**: Items that were traded are indicated with a distinct swap icon.
*   **Agent Color Box-Shadow**: Each card glows with a box-shadow matching the participant's assigned agent color, providing a visual link to their agent.
*   **NEW: 'Something your agent found that you didn't ask for' Section**: A completely new section has been added below the personal cards. This area, which glows with an amber hue, is dedicated to displaying surprises the agent uncovered that weren't explicitly requested.
*   **Individual Surprise Cards**: Each surprise is presented in its own card, explicitly labeled with the participant's name.
*   **Full Surprise Text**: The complete surprise text is displayed within these cards without any truncation.

## Related

[[Flock Project]],[[Aishwarya Session Prompt Update – Flock Repo State (e98074d)]],[[Add QR Code for Judges (Flock Project)]],[[Audio Layer Implementation for Flock Project]],[[Chore: Remove @clerk/nextjs Dependency and Dynamic Agent Labels (Flock)]]
