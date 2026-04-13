---
title: "Karen Frontend Update: v2 Escalation Ladder Types and Constants"
author: ai
created_at: 2026-04-11T00:15:03.592Z
last_ai_edit: 2026-04-11T00:15:03.592Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-frontend-update-types-and-constants-for-v2-ladder-de038d.md]]"
tags:
  - karen
  - frontend
  - escalation ladder
  - types
  - constants
  - update
  - event types
  - channel icons
  - satisfaction labels
---

# Karen Frontend Update: v2 Escalation Ladder Types and Constants

This commit updates the frontend of the [[Karen Project]] to support the new v2 escalation ladder, introducing new event types, reorganizing level labels, adding and removing channel icons, and defining new satisfaction indicator labels. These changes are crucial for the enhanced functionality and user experience of the updated escalation system.

## Key Concepts

[[KarenEvent]] Types,[[LEVEL_LABELS]],[[CHANNEL_ICONS]],[[SATISFACTION_LABELS]],[[Escalation Ladder v2]]

## Details

This commit (`0a89c35`) introduces significant updates to the frontend of the [[Karen Project]], specifically targeting the integration and display logic for the v2 escalation ladder. Key changes include:

*   **KarenEvent Types**: New event types, `research_step`, `research_discovery`, and `fedex_rate`, were added to the system, expanding the range of events Karen can handle and display.
*   **LEVEL_LABELS**: The order and content of `LEVEL_LABELS` were updated to reflect the v2 escalation process. This includes new labels for communication channels such as 'email', 'sms', 'whatsapp+voice', and 'osint', among others.
*   **CHANNEL_ICONS**: The `CHANNEL_ICONS` mapping was modified to include `email_cc`, `research`, and `slack` icons, while `linkedin` and `twitter` icons were removed. This reflects changes in the preferred communication channels within the escalation workflow.
*   **SATISFACTION_LABELS**: A set of 11 new emoji and label pairs were defined for Karen's satisfaction indicator, providing a more nuanced way to represent user or interaction sentiment.

## Related

[[Karen Project]],[[Escalation Ladder v2 Implementation Plan]],[[Escalation Ladder v2 Design Specification for Karen Project]],[[Escalation Ladder v2 Spec: Incorporating User Feedback]],[[Escalation Ladder, SSE Streaming, and Payment Webhooks in Karen]]
