---
title: "Frontend Feature Update: Satisfaction Score, Research Animation, FedEx Rate (Karen)"
author: ai
created_at: 2026-04-10T19:15:17.999Z
last_ai_edit: 2026-04-10T19:15:17.999Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-frontend-satisfaction-score-research-animation-fedex-91739d.md]]"
tags:
  - frontend
  - feature
  - satisfaction score
  - research animation
  - fedex rate
  - karen
  - escalation
  - event types
  - commit
---

# Frontend Feature Update: Satisfaction Score, Research Animation, FedEx Rate (Karen)

This commit to the `rahilsinghi/karen` repository introduces several new frontend features, including a satisfaction score display in the HUD, a research animation in the sidebar for Level 4 events, and a FedEx rate quote card for Level 10 events. It also updates escalation logic and event types to support these additions.

## Key Concepts

- Satisfaction Score Display,- Research Animation,- FedEx Rate Quote Card,- EscalationTower Component,- Event Types (v2),- Frontend HUD,- Sidebar UI

## Details

This commit, `a2ec3f8`, was authored by [[Rahil Singhi]] on 2026-04-04 and is part of the `rahilsinghi/karen` repository. It involved 3 files changed, with +56 additions and -10 deletions.

The update introduces the following key frontend features and modifications:

*   **Satisfaction Score:** A satisfaction score is now displayed in the top Head-Up Display (HUD), featuring an emoji and a corresponding label for each level.
*   **Research Animation:** A `ResearchAnimation` component is rendered in the left sidebar specifically when Level 4 events occur.
*   **FedEx Rate Quote Card:** A dedicated FedEx rate quote card is now rendered in the UI after Level 10 events.
*   **EscalationTower Component:** The `LEVEL_ICONS` within the `EscalationTower` component have been updated to align with a new v2 ladder order.
*   **useEscalation Hook:** The `useEscalation` hook has been modified to include new event types: `research_step`, `research_discovery`, and `fedex_rate` within its `EVENT_TYPES` definition.

This commit was co-authored by Claude Opus 4.6.

## Related

[[Karen (repository)]],[[Rahil Singhi]],[[Frontend Development]],[[EscalationTower]],[[useEscalation hook]],[[Event Types]]
