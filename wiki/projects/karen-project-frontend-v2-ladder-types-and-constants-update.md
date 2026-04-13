---
title: Karen Project Frontend V2 Ladder Types and Constants Update
author: ai
created_at: 2026-04-13T15:35:28.712Z
last_ai_edit: 2026-04-13T15:35:28.712Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-frontend-update-types-and-constants-for-v2-ladder-de038d.md]]"
tags:
  - karen
  - frontend
  - types
  - constants
  - v2 ladder
  - development
  - feature
---

# Karen Project Frontend V2 Ladder Types and Constants Update

This update introduces new types and constants for the v2 ladder in the Karen project's frontend. Key changes include adding new event types for research, revising the order and content of `LEVEL_LABELS`, updating `CHANNEL_ICONS`, and expanding `SATISFACTION_LABELS` with more emoji-label pairs. These modifications enhance the application's ability to represent diverse event types, communication channels, and user satisfaction metrics.

## Key Concepts

[[KarenEvent]] Types,[[LEVEL_LABELS]] (v2 ladder order),[[CHANNEL_ICONS]],[[SATISFACTION_LABELS]],Frontend development,Constants management,Type definitions

## Details

This commit (`0a89c35`) for the `rahilsinghi/karen` repository, authored by Rahil Singhi on 2026-04-04T15:25:40Z, focuses on updating frontend types and constants crucial for the v2 ladder functionality. The changes involved modifying 2 files, resulting in 31 additions and 13 deletions.

Key updates include:

*   **KarenEvent**: Expanded to include new event types: `research_step`, `research_discovery`, and `fedex_rate`.
*   **LEVEL_LABELS**: Updated to reflect the v2 ladder's ordered categories, such as `email`, `sms`, `whatsapp+voice`, and `osint`.
*   **CHANNEL_ICONS**: Modified to add `email_cc`, `research`, and `slack` icons, while `linkedin` and `twitter` icons were removed.
*   **SATISFACTION_LABELS**: Enhanced with 11 new emoji-label pairs to provide a more nuanced representation of Karen's satisfaction indicator.

The commit was co-authored by Claude Opus 4.6, indicating AI assistance in its development.

## Related

[[Karen Project]],[[Claude Opus 4.6]]
