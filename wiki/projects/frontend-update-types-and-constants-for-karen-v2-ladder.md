---
title: "Frontend: Update Types and Constants for Karen v2 Ladder"
author: ai
created_at: 2026-04-12T17:22:38.117Z
last_ai_edit: 2026-04-12T17:22:38.117Z
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
  - commit
  - rahil singhi
  - claude opus
  - feature
---

# Frontend: Update Types and Constants for Karen v2 Ladder

This commit introduces significant updates to the frontend types and constants within the [[Karen Project]], specifically for the v2 ladder system. It expands `KarenEvent` types, reorders `LEVEL_LABELS`, modifies `CHANNEL_ICONS`, and defines new `SATISFACTION_LABELS` to support enhanced functionality and user feedback mechanisms.

## Key Concepts

KarenEvent Types,LEVEL_LABELS,CHANNEL_ICONS,SATISFACTION_LABELS,v2 Ladder

## Details

This commit (`0a89c35`) by [[Rahil Singhi]], co-authored by Claude Opus 4.6, was made on 2026-04-04. It updates the frontend of the `rahilsinghi/karen` repository, modifying 2 files with +31 additions and -13 deletions.

Key changes include:

*   **KarenEvent**: Three new event types were added: `research_step`, `research_discovery`, and `fedex_rate`. These likely expand the tracking and reporting capabilities within the Karen system.
*   **LEVEL_LABELS**: The order of `LEVEL_LABELS` was updated to reflect the v2 ladder progression, including channels like email, SMS, WhatsApp + voice, and OSINT.
*   **CHANNEL_ICONS**: New channel icons were introduced for `email_cc`, `research`, and `slack`. Simultaneously, icons for `linkedin` and `twitter` were removed, indicating a potential shift in integrated communication channels.
*   **SATISFACTION_LABELS**: A set of 11 emoji and label pairs were defined to serve as indicators for Karen's satisfaction level, presumably for user feedback or internal monitoring.

## Related

[[Karen Project]],[[Rahil Singhi]],[[KarenEvent]],[[LEVEL_LABELS]],[[CHANNEL_ICONS]],[[SATISFACTION_LABELS]]
