---
title: Rich Fallback Cards and Agent Surprise Section in Reveal UI (Flock)
author: ai
created_at: 2026-04-10T17:24:11.806Z
last_ai_edit: 2026-04-10T17:24:11.806Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-rich-fallback-cards-separate-agent-surprise-section-in-662621.md]]"
tags:
  - flock
  - ui
  - feature
  - agent
  - personalization
  - reveal
  - fallback
  - surprise
  - ux
  - commit
---

# Rich Fallback Cards and Agent Surprise Section in Reveal UI (Flock)

This update introduces enhanced 'fallback cards' within the Flock reveal UI, providing detailed information on won and traded items, alongside personalized surprise texts. A new dedicated section is added to separately display agent-generated surprises, improving clarity and user engagement.

## Key Concepts

- **Fallback Cards**: Detailed cards displayed in the reveal UI when an agent's suggestion is presented.,- **Agent Surprise Section**: A new, distinct UI area dedicated to displaying unexpected discoveries made by the agent.,- **SplitReveal UI**: The user interface responsible for revealing agent-generated outcomes.,- **Won Items**: Specific, detailed items successfully secured by the agent for the user.,- **Traded Items**: Items that were foregone or swapped by the agent to achieve other goals.,- **Agent Personalization**: Custom content and explanations tailored to a user's profile and preferences.

## Details

This commit (`700792c`) by Rahil Singhi (co-authored by Claude Opus 4.6) on 2026-03-21 introduces significant enhancements to the Flock application's reveal UI.

### Commit Details
- **Repo:** `rahilsinghi/Flock`
- **SHA:** `700792c`
- **Date:** `2026-03-21T21:03:37Z`
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +94
- **Deletions:** -36

### Force-Reveal Fallback Data Improvements
Individual user cards now feature richer, more detailed content:
-   Each user card presents **3 detailed 'won' items**, including specific hotel names, market locations, and constraint matches with percentages.
-   **Traded items are now specific**, with examples like "Skipped second city to keep budget."
-   **Surprise texts are 2-3 sentences each**, directly referencing specific profile signals (e.g., "your photos," "your aesthetic fingerprint," "your food profile score predicted this").
-   **6 distinct card templates** ensure unique content for each participant.

### SplitReveal UI Enhancements
The user interface for revealing agent outcomes has been refined:
-   A clear **"What your agent won for you"** section header is introduced.
-   **Won items** are displayed with green checkmarks and full, untruncated text.
-   **Traded items** are indicated with a swap icon.
-   Cards visually glow with an **agent color box-shadow**.
-   **NEW: A separate "Something your agent found that you didn't ask for" section** is added as an amber-glowing area below the personal cards. This section is dedicated to showing unexpected discoveries.
-   Each surprise within this new section is presented in its own card, complete with the participant's name.
-   **Full surprise text** is displayed without truncation.

This update significantly enhances the clarity, personalization, and user engagement of the Flock reveal experience.

## Related

[[Flock (Project)]],[[SplitReveal UI]],[[Agent Systems]],[[Personalized Recommendations]],[[User Experience (UX)]]
