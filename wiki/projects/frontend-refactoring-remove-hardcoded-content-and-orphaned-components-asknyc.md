---
title: "Frontend Refactoring: Remove Hardcoded Content and Orphaned Components (askNYC)"
author: ai
created_at: 2026-04-10T21:26:12.891Z
last_ai_edit: 2026-04-10T21:26:12.891Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-frontend-remove-all-hardcoded-content-and-orphaned-comp-3a553a.md]]"
tags:
  - frontend
  - refactoring
  - hardcoded-data
  - orphaned-components
  - asknyc
  - bugfix
  - development
  - code-cleanup
---

# Frontend Refactoring: Remove Hardcoded Content and Orphaned Components (askNYC)

This commit focuses on a significant frontend refactoring for the `askNYC` project, addressing the removal of hardcoded data and non-functional or orphaned UI components. The changes aim to enhance data dynamism, improve code maintainability, and clean up the user interface.

## Key Concepts

Hardcoded content removal,Orphaned components,Frontend refactoring,Dynamic data integration,Code maintainability,User interface cleanup

## Details

This commit, authored by [[Rahil Singhi]] on 2026-03-28T04:15:48Z (SHA: `8c17c69`), marks a significant cleanup and refactoring effort in the frontend of the [[askNYC]] repository. A total of 10 files were changed, resulting in +49 additions and -395 deletions, indicating a substantial removal of deprecated or unnecessary code.

The key changes include:

*   **IntelligenceBrief**: Replaced hardcoded venue names like "High Line" and "Chelsea Market" with dynamic, real session data. The non-functional settings gear button was also removed.
*   **CameraFeed**: Updated to use a dynamic `mapCenter` prop instead of hardcoded GPS coordinates.
*   **dashboard/page**: Modified to pass `sessionSummary` and `mapCenter` data to its child components, enabling data flow.
*   **AnswerPanel**: Replaced placeholder lorem ipsum text with actual venue descriptions.
*   **SearchInput**: Removed the non-functional microphone button.
*   **EvidenceCard**: Removed the non-functional `buttons` prop.
*   **Orphaned Components Deleted**: The following unused components were entirely removed from the codebase: [[IdentityHeader]], [[GlowingLandmarkOverlay]], and [[SessionCard]].

## Related

[[Rahil Singhi]],[[askNYC]],[[IntelligenceBrief (Component)]],[[CameraFeed (Component)]],[[AnswerPanel (Component)]],[[SearchInput (Component)]],[[EvidenceCard (Component)]],[[IdentityHeader (Component)]],[[GlowingLandmarkOverlay (Component)]],[[SessionCard (Component)]]
