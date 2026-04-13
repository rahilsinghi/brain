---
title: "Karen Frontend: v2 Ladder Types and Constants Update"
author: ai
created_at: 2026-04-13T17:14:34.546Z
last_ai_edit: 2026-04-13T17:14:34.546Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-frontend-update-types-and-constants-for-v2-ladder-de038d.md]]"
tags:
  - karen
  - frontend
  - types
  - constants
  - v2
  - ladder
  - event_types
  - channel_icons
  - satisfaction_labels
  - rahil singhi
---

# Karen Frontend: v2 Ladder Types and Constants Update

This commit introduces significant updates to the Karen frontend, specifically for the v2 ladder system. It expands `KarenEvent` types, reorders `LEVEL_LABELS` to align with the new v2 progression, revises `CHANNEL_ICONS`, and updates `SATISFACTION_LABELS` with new emoji-label pairs.

## Key Concepts

KarenEvent types,LEVEL_LABELS,CHANNEL_ICONS,SATISFACTION_LABELS,v2 ladder system,Frontend development

## Details

This commit (`0a89c35`) by Rahil Singhi (co-authored by Claude Opus 4.6) on April 4, 2026, focuses on updating critical types and constants within the `rahilsinghi/karen` frontend repository, impacting two files with 31 additions and 13 deletions.

Key changes include:

*   **KarenEvent**: Three new event types have been introduced: `research_step`, `research_discovery`, and `fedex_rate`. These additions likely support expanded functionality and tracking within the [[Karen Project]], particularly around research and logistical actions.
*   **LEVEL_LABELS**: The order of `LEVEL_LABELS` has been updated to reflect the new v2 progression. This reordering aligns with a conceptual 'ladder' of interaction or information gathering, encompassing channels like email, SMS, WhatsApp, voice communication, and OSINT (Open-Source Intelligence).
*   **CHANNEL_ICONS**: The set of available `CHANNEL_ICONS` has been refined. New icons for `email_cc`, `research`, and `slack` have been added, indicating integration or support for these communication channels. Conversely, `linkedin` and `twitter` icons have been removed, suggesting a shift in focus or deprecation of direct integration with these platforms within the UI.
*   **SATISFACTION_LABELS**: The system now includes 11 new emoji-label pairs for Karen's satisfaction indicator. This enhancement provides a more nuanced and visually expressive way to convey interaction outcomes or system states.

## Related

[[Karen Project]],[[KarenEvent]],[[LEVEL_LABELS]],[[CHANNEL_ICONS]],[[SATISFACTION_LABELS]],[[v2 ladder]],[[frontend]]
