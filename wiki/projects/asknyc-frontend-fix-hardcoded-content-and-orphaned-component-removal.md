---
title: "askNYC Frontend Fix: Hardcoded Content and Orphaned Component Removal"
author: ai
created_at: 2026-04-13T17:26:36.683Z
last_ai_edit: 2026-04-13T17:26:36.683Z
last_human_edit: null
last_embedded_hash: 70cd7cef35ccc808
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-frontend-remove-all-hardcoded-content-and-orphaned-comp-3a553a.md]]"
tags:
  - asknyc
  - frontend
  - refactoring
  - ui
  - hardcoded content
  - orphaned components
  - session data
  - bugfix
---


# askNYC Frontend Fix: Hardcoded Content and Orphaned Component Removal

This commit addresses critical frontend issues in the `rahilsinghi/askNYC` project by replacing all hardcoded content with dynamic session data and eliminating non-functional or orphaned components. The changes ensure a more dynamic and responsive user interface, particularly for displaying location-based information and search results.

## Key Concepts

Hardcoded Content,Orphaned Components,Dynamic Data Loading,Session Data,Frontend Refactoring,GPS Coordinates,User Interface (UI)

## Details

This significant frontend fix for the `rahilsinghi/askNYC` project, identified by SHA `8c17c69`, involved extensive cleanup and data integration to improve the application's dynamism and maintainability. Key changes include:

*   **IntelligenceBrief:** Replaced hardcoded references like "High Line" and "Chelsea Market" with actual data derived from user sessions. The non-functional settings gear button was also removed to streamline the UI.
*   **CameraFeed:** Updated to receive `mapCenter` as a dynamic prop, replacing static GPS coordinates. This allows the map view to accurately reflect the user's current or selected location.
*   **dashboard/page:** The main dashboard component was refactored to pass `sessionSummary` and `mapCenter` data to its child components, ensuring data consistency and flow throughout the application.
*   **AnswerPanel:** Placeholder Lorem Ipsum text was replaced with real venue descriptions, providing meaningful information to the user.
*   **SearchInput:** The non-functional microphone button was removed, simplifying the search interface.
*   **EvidenceCard:** The `buttons` prop, which was non-functional, was removed.
*   **Orphaned Components:** Several components that were no longer used or functional, including `IdentityHeader`, `GlowingLandmarkOverlay`, and `SessionCard`, were deleted from the codebase.

## Related

[[askNYC Frontend Cleanup: Remove Hardcoded Content and Orphaned Components]],[[askNYC Frontend Fix: Hardcoded Content and Orphaned Component Removal]],[[askNYC Frontend Backend Integration (2026-03-28)]],[[askNYC: Wire Real Session Data and Fix Navigation]],[[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel]],[[askNYC: Next.js 15 Dashboard with Real-time WebSocket UI]],[[askNYC]]
