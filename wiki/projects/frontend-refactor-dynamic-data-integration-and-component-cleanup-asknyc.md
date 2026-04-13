---
title: "Frontend Refactor: Dynamic Data Integration and Component Cleanup (askNYC)"
author: ai
created_at: 2026-04-10T15:14:42.538Z
last_ai_edit: 2026-04-10T15:14:42.538Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-frontend-remove-all-hardcoded-content-and-orphaned-comp-3a553a.md]]"
tags:
  - frontend
  - refactor
  - hardcoded-content
  - orphaned-components
  - dynamic-data
  - asknyc
  - cleanup
  - bugfix
  - javascript
  - react
---

# Frontend Refactor: Dynamic Data Integration and Component Cleanup (askNYC)

This commit significantly refactors the `askNYC` frontend, replacing static, hardcoded content with dynamic session-based information. It also cleans up the codebase by removing several non-functional and orphaned components.

## Key Concepts

Hardcoded content,Orphaned components,Dynamic data,Frontend refactoring,Code cleanup,Component-based architecture

## Details

This commit, `8c17c69`, authored by Rahil Singhi on 2026-03-28, focuses on a major frontend refactor for the `rahilsinghi/askNYC` repository. The changes involved modifications across 10 files, with +49 additions and -395 deletions, indicating a substantial cleanup and replacement of existing code.

Key changes implemented:

*   **IntelligenceBrief**: Replaced hardcoded strings like "High Line" and "Chelsea Market" with real session data. The non-functional settings gear button was also removed.
*   **CameraFeed**: Updated to use a dynamic `mapCenter` prop instead of hardcoded GPS coordinates.
*   **dashboard/page**: Modified to pass `sessionSummary` and `mapCenter` to its child components, facilitating dynamic data flow.
*   **AnswerPanel**: Replaced placeholder Lorem Ipsum text with actual venue descriptions.
*   **SearchInput**: Removed the non-functional microphone button.
*   **EvidenceCard**: The non-functional `buttons` prop was removed.

Additionally, several components were identified as orphaned and subsequently deleted to streamline the codebase:

*   `IdentityHeader`
*   `GlowingLandmarkOverlay`
*   `SessionCard`

## Related

[[askNYC Project]],[[Rahil Singhi]],[[Frontend Development]],[[Code Refactoring]]
