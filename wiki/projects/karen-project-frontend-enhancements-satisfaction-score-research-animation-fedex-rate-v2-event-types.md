---
title: "Karen Project: Frontend Enhancements (Satisfaction Score, Research Animation, FedEx Rate, v2 Event Types)"
author: ai
created_at: 2026-04-11T00:26:16.367Z
last_ai_edit: 2026-04-11T00:26:16.367Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-frontend-satisfaction-score-research-animation-fedex-91739d.md]]"
tags:
  - karen project
  - frontend
  - satisfaction score
  - research animation
  - fedex
  - escalation ladder
  - event types
  - hud
  - rahil singhi
  - claude opus
---

# Karen Project: Frontend Enhancements (Satisfaction Score, Research Animation, FedEx Rate, v2 Event Types)

This commit to the [[Karen Project]] frontend introduces several new features including a satisfaction score display in the HUD, a research animation for Level 4 events, and a FedEx rate quote card for Level 10 events. It also updates internal event types to align with the v2 escalation ladder order.

## Key Concepts

Satisfaction Score,Research Animation,FedEx Rate Quote,Escalation Ladder v2,Event Types,Heads-Up Display (HUD)

## Details

This commit (`a2ec3f8`) by Rahil Singhi, co-authored by Claude Opus 4.6, was made on `2026-04-04T15:28:28Z` to the `rahilsinghi/karen` repository, involving 3 file changes with 56 additions and 10 deletions.

Key frontend enhancements include:

*   **Satisfaction Score**: A new satisfaction score display has been added to the top HUD (Heads-Up Display), indicating different satisfaction levels using emojis and labels.
*   **Research Animation**: A `ResearchAnimation` component is now rendered specifically in the left sidebar when Level 4 events are active.
*   **FedEx Rate Quote Card**: A dedicated card for displaying FedEx rate quotes is introduced, appearing after the user reaches Level 10 in the escalation process.
*   **EscalationTower Updates**: The `LEVEL_ICONS` within the `EscalationTower` component have been updated to reflect the new ordering of the v2 escalation ladder.
*   **`useEscalation` Hook Enhancements**: The `EVENT_TYPES` constant within the `useEscalation` hook has been expanded to include new types: `research_step`, `research_discovery`, and `fedex_rate`. These additions integrate the new frontend features into the core escalation workflow.

## Related

[[Karen Project]],[[Escalation Ladder v2 Design Specification for Karen Project]],[[Escalation Ladder v2 Implementation Plan (karen)]],[[Escalation Ladder, SSE Streaming, and Payment Webhooks in Karen]]
