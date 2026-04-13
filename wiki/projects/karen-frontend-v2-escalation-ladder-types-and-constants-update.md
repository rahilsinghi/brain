---
title: "Karen Frontend: V2 Escalation Ladder Types and Constants Update"
author: ai
created_at: 2026-04-11T00:15:47.444Z
last_ai_edit: 2026-04-11T00:15:47.444Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-frontend-update-types-and-constants-for-v2-ladder-de038d.md]]"
tags:
  - frontend
  - karen
  - escalation ladder
  - types
  - constants
  - ui
  - event types
  - satisfaction
  - channel icons
---

# Karen Frontend: V2 Escalation Ladder Types and Constants Update

This commit updates frontend types and constants for the Karen project's v2 escalation ladder, introducing new event types, reordering level labels, and revising channel icons. It also integrates new satisfaction indicators to enhance feedback mechanisms.

## Key Concepts

KarenEvent Types,Escalation Ladder V2,Channel Icons,Satisfaction Indicators,Frontend Development

## Details

The `0a89c35` commit to the `rahilsinghi/karen` repository by [[Rahil Singhi]] on April 4, 2026, focuses on updating frontend types and constants related to the v2 escalation ladder within the [[Karen Project]].

Key changes include:
- **`KarenEvent` Types:** Added new event types such as `research_step`, `research_discovery`, and `fedex_rate`. These likely expand the range of trackable actions or states within the system.
- **`LEVEL_LABELS` Update:** The ordering of escalation level labels was revised to reflect the v2 process, prioritizing channels like email, SMS, WhatsApp+voice, and OSINT. This directly impacts the display and structure of the [[Escalation Ladder v2 Design Specification for Karen Project]].
- **`CHANNEL_ICONS` Revision:** New channel icons were introduced for `email_cc`, `research`, and `slack`, while `linkedin` and `twitter` icons were removed. This reflects an adjustment in the primary communication channels supported or emphasized by the platform.
- **`SATISFACTION_LABELS` Addition:** Eleven new emoji and label pairs were added to serve as satisfaction indicators for users, enhancing feedback mechanisms within Karen.

This update, co-authored by [[Claude]], involved 31 additions and 13 deletions across 2 files, signaling significant frontend adjustments for the `karen` project.

## Related

[[Karen Project]],[[Rahil Singhi]],[[Claude]],[[Escalation Ladder v2 Design Specification for Karen Project]],[[Escalation Ladder v2 Implementation Plan]]
