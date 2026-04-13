---
title: "Karen Frontend Update: v2 Ladder Types and Constants"
author: ai
created_at: 2026-04-12T21:23:25.413Z
last_ai_edit: 2026-04-12T21:23:25.413Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-frontend-update-types-and-constants-for-v2-ladder-de038d.md]]"
tags:
  - frontend
  - karen
  - types
  - constants
  - v2 ladder
  - ui
  - event management
  - channel integration
---

# Karen Frontend Update: v2 Ladder Types and Constants

This commit updates the frontend types and constants for the Karen project's v2 ladder, introducing new event types, reordering level labels, adding channel icons, and refining satisfaction indicators. These changes are crucial for the updated user interface and underlying logic of Karen's interaction and escalation system.

## Key Concepts

KarenEvent,LEVEL_LABELS,CHANNEL_ICONS,SATISFACTION_LABELS,v2 Ladder

## Details

This commit (`0a89c35`) introduces significant updates to the frontend types and constants within the [[Karen Project]] repository.

Key changes include:

*   **KarenEvent**: Three new event types (`research_step`, `research_discovery`, `fedex_rate`) have been added, expanding the range of actions and information that Karen can process or report.
*   **LEVEL_LABELS**: The order of `LEVEL_LABELS` has been updated to reflect the v2 ladder's progression. This reordering clarifies the escalation path, with examples given such as `email/sms/whatsapp`, `voice`, and `osint`.
*   **CHANNEL_ICONS**: New icons have been added for `email_cc`, `research`, and `slack`, enhancing the visual representation of communication channels. Simultaneously, `linkedin` and `twitter` icons were removed, indicating a potential shift in focused platforms or consolidation of social media interactions.
*   **SATISFACTION_LABELS**: The system now includes 11 distinct emoji and label pairs designed to provide a more nuanced and expressive indicator of Karen's satisfaction or sentiment within interactions.

## Related

[[Karen Project]],[[Audio Commentary and Ad-Lib System Improvements (Karen Project)]],[[Authentic Command Center and Escalation Fortress UI Implementation (Karen Project)]],[[Backend Core Implementation: FastAPI, Pydantic, and Docker (Karen Project)]],[[Calendar Service Updates for Service Account Compatibility in Karen Project]],[[Channel Integrations and Personality Service (Karen Project)]],[[Circle Members: Pre-seeded Data and CRUD Endpoints (Karen Project)]],[[Chore: Add Pretext Submodule to Karen Project]],[[Chore: Karen Project Scaffold, Docker Config, and Spec (e7969fd)]],[[Add Open Matter for Bharath Mahesh Gera (Karen Project)]],[[Add Open Matter for Rahil Singhi (Karen Project)]],[[Add Pretext Submodule (Karen Project)]]
