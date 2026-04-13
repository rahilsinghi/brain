---
title: Rich Fallback Cards and Agent Surprise Section in Flock Reveal UI
author: ai
created_at: 2026-04-10T21:24:44.619Z
last_ai_edit: 2026-04-10T21:24:44.619Z
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
  - personalization
  - fallback
  - surprise
  - feature
  - commit
  - anthropic
---

# Rich Fallback Cards and Agent Surprise Section in Flock Reveal UI

This commit introduces significant enhancements to the Flock reveal UI, particularly focusing on rich fallback data for user cards and a new, distinct section for agent-discovered surprises. These updates aim to provide more detailed, personalized, and engaging content during the reveal phase, improving user understanding of agent actions.

## Key Concepts

Rich Fallback Cards,Agent Surprise Section,SplitReveal UI,Personalized User Cards,Agent-discovered Items

## Details

This commit (`700792c`) by [[Rahil Singhi]], co-authored with [[Claude Opus 4.6]], significantly updates the `Flock` project's user interface, specifically impacting the 'reveal' phase of agent interactions. The changes involve substantial improvements to how fallback data is presented and the introduction of a dedicated section for agent-discovered surprises.

### Commit Details
- **Repo:** `rahilsinghi/Flock`
- **SHA:** `700792c`
- **Date:** `2026-03-21T21:03:37Z`
- **Author:** [[Rahil Singhi]]
- **Files changed:** 2
- **Additions:** +94
- **Deletions:** -36
- **Co-Authored-By:** [[Claude Opus 4.6]]

### Force-Reveal Fallback Data Enhancements
Improvements to the fallback data presented in user cards aim to provide more specific and personalized information:
- Each user card now displays **3 detailed "won" items**, including specific hotel names, relevant markets, and constraint match percentages.
- **Traded items** are described specifically (e.g., "Skipped second city to keep budget") rather than generically.
- **Surprise texts** are extended to 2-3 sentences each, referencing specific user profile signals such as "your photos," "your aesthetic fingerprint," or "your food profile score predicted this."
- **6 distinct card templates** have been implemented to ensure each participant receives unique content, enhancing personalization.

### SplitReveal UI Updates
Various updates to the `SplitReveal` UI improve clarity, engagement, and information presentation:
- **"What your agent won for you" section:**
    - Features a dedicated section header.
    - Won items are clearly marked with green checkmarks and displayed in their full, untruncated text.
    - Traded items are visually indicated with a swap icon.
    - Cards now glow with the agent's assigned color using a `box-shadow` effect, providing visual distinction.
- **NEW: "Something your agent found that you didn't ask for" section:**
    - This is a new, separate area positioned below the personal cards.
    - It features a distinctive **amber-glowing background** to highlight its content.
    - Each surprise item is presented in its own dedicated card, explicitly including the participant's name.
    - The **full surprise text** is displayed without any truncation, ensuring complete context for the user.

## Related

[[Flock (Project)]],[[Rahil Singhi]],[[Claude Opus 4.6]],[[SplitReveal UI]]
