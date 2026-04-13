---
title: "askNYC Frontend Cleanup: Remove Hardcoded Content and Orphaned Components"
author: ai
created_at: 2026-04-12T21:49:00.358Z
last_ai_edit: 2026-04-12T21:49:00.358Z
last_human_edit: null
last_embedded_hash: f12882cf9564a3ed
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-frontend-remove-all-hardcoded-content-and-orphaned-comp-3a553a.md]]"
tags:
  - asknyc
  - frontend
  - cleanup
  - ui
  - hardcoded content
  - components
  - bugfix
  - refactor
---


# askNYC Frontend Cleanup: Remove Hardcoded Content and Orphaned Components

This commit focused on improving the [[askNYC]] frontend by replacing static, hardcoded data with dynamic session information and removing non-functional or orphaned UI components. These changes enhance the user experience by providing real-time data and decluttering the interface.

## Key Concepts

Hardcoded content removal,Orphaned component deletion,Dynamic data integration,UI cleanup,Frontend development,Session data

## Details

This change addresses significant frontend issues within the `rahilsinghi/askNYC` repository, specifically commit `8c17c69` by Rahil Singhi on March 28, 2026. The primary goal was to eliminate hardcoded values and remove obsolete UI elements, improving the application's responsiveness and maintainability.

Key modifications include:

*   **IntelligenceBrief**: Replaced hardcoded "High Line" and "Chelsea Market" with real-time [[Session data]]. The non-functional settings gear button was also removed.
*   **CameraFeed**: Updated to use a dynamic `mapCenter` prop instead of static GPS coordinates.
*   **dashboard/page**: Modified to pass `sessionSummary` and `mapCenter` to child components, enabling data flow.
*   **AnswerPanel**: Replaced placeholder lorem ipsum text with actual venue descriptions.
*   **SearchInput**: Removed the non-functional microphone button.
*   **EvidenceCard**: Eliminated the non-functional `buttons` prop.
*   **Orphaned Components**: Deleted unused components including `IdentityHeader`, `GlowingLandmarkOverlay`, and `SessionCard`, streamlining the codebase.

This effort involved changing 10 files, adding 49 lines, and deleting 395 lines, indicating a substantial cleanup.

## Related

[[Ask NYC: Multimodal Urban Intelligence Platform]],[[askNYC: Frontend Backend Integration Update (2026-03-28)]],[[AskNYC Frontend UI Specification (Sariya's Task)]]
