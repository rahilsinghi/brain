---
title: "Flock Project: Rich Fallback Cards and Agent Surprise Section in Reveal UI"
author: ai
created_at: 2026-04-12T17:45:55.884Z
last_ai_edit: 2026-04-12T17:45:55.884Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-rich-fallback-cards-separate-agent-surprise-section-in-662621.md]]"
tags:
  - flock
  - ui
  - reveal
  - agent
  - feature
  - fallback
  - personalization
---

# Flock Project: Rich Fallback Cards and Agent Surprise Section in Reveal UI

This commit introduces significant enhancements to the 'reveal' UI within the Flock project, focusing on richer fallback data for user cards and a distinct section for agent-generated surprises. It details how 'won' and 'traded' items are presented, along with unique surprise texts that leverage user profile signals.

## Key Concepts

Rich Fallback Cards,Agent Surprise Section,SplitReveal UI,Flock Project

## Details

This feature (`feat`) from the `rahilsinghi/Flock` repository (SHA: `700792c`) enhances the "reveal" interface to provide a more detailed and engaging user experience.

### Force-reveal Fallback Data
Upon revealing outcomes, the system now presents more specific and personalized information:

*   **User Cards**: Each user card displays 3 detailed "won" items, including specific hotel names, market locations, and constraint match percentages.
*   **Traded Items**: Descriptions for traded items are now specific, e.g., "Skipped second city to keep budget."
*   **Surprise Texts**: 2-3 sentence surprise texts are generated, referencing specific profile signals like "your photos," "your aesthetic fingerprint," or "your food profile score predicted this."
*   **Card Templates**: Six distinct card templates ensure each participant receives unique content, preventing repetition.

### SplitReveal UI
The user interface for the reveal phase has been redesigned to highlight these new data points:

*   **"What your agent won for you" Section**: A clear header introduces this section.
*   **Won Items Display**: Items won are shown with green checkmarks and their full text, without truncation.
*   **Traded Items Display**: Traded items are indicated with a swap icon.
*   **Agent Color Box-Shadow**: Cards glow with a `box-shadow` matching the respective agent's color.
*   **NEW: "Something your agent found that you didn't ask for" Section**: A dedicated, amber-glowing area appears below the personal cards. This section highlights unexpected discoveries made by the agent.
*   **Individual Surprise Cards**: Each surprise is presented in its own card, featuring the participant's name.
*   **Full Surprise Text**: The complete surprise text is displayed, ensuring no information is cut off.

## Related

[[Flock Project]],[[Agent]]
