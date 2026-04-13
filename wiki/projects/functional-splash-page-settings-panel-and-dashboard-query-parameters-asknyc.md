---
title: Functional Splash Page, Settings Panel, and Dashboard Query Parameters (askNYC)
author: ai
created_at: 2026-04-12T17:55:57.867Z
last_ai_edit: 2026-04-12T17:55:57.867Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-frontend-functional-splash-page-settings-panel-dashb-cafba9.md]]"
tags:
  - frontend
  - ui
  - ux
  - asknyc
  - splash page
  - settings
  - dashboard
  - query parameters
  - voice input
  - session management
  - demo
  - javascript
  - react
  - typescript
---

# Functional Splash Page, Settings Panel, and Dashboard Query Parameters (askNYC)

This commit introduces a standalone, feature-rich splash page for the askNYC application, enhances the dashboard with query parameter support, and adds a shared, persistent settings panel. These updates improve user experience by providing flexible entry points and customizable options.

## Key Concepts

[[Splash Page]],[[Settings Panel]],[[Dashboard Query Parameters]],[[Web Speech API]],[[Session History]],[[Demo Scenarios]],[[User Interface (UI)]],[[User Experience (UX)]]

## Details

This significant frontend update for the [[askNYC]] project (commit `1d92c56` in `rahilsinghi/askNYC`) introduces several key features:

### Standalone Splash Page (`/`)
The root URL now serves as a dedicated entry point with the following functionalities:
*   **Search Bar**: Supports both text and voice input via the Web Speech API.
*   **Session History Cards**: Displays past sessions or offers demo scenarios for new users.
*   **EvidenceCard Integration**: An "Explore" button on `EvidenceCard` instances navigates directly to the dashboard with a pre-populated query.
*   **Settings Access**: A gear icon opens a slide-out settings panel.
*   **Quick Access**: An "Go straight to dashboard" escape link allows users to bypass the splash page.
*   **No Auto-Redirect**: The splash page no longer automatically redirects to the dashboard.

### Dashboard Query Parameter Support
The dashboard now processes URL query parameters to offer dynamic content loading and interaction:
*   `?q=...`: Automatically submits a text query upon page load.
*   `?location=...`: Pre-loads a specific location context.
*   `?demo=all|restaurant|building|construction`: Auto-triggers predefined demo scenarios.
*   `?voice=true`: A placeholder parameter for future voice mode integration.

### Shared Settings Panel
A new, shared settings panel is accessible from both the splash page and the dashboard, providing persistent controls:
*   **Full Demo Button**: Initiates a sequence chaining all three demo scenarios.
*   **Individual Scenario Buttons**: Allows activation of specific demo scenarios.
*   **Volume Control**: Features a slider and mute toggle, with settings persisted in `localStorage`.

### Implementation Details
*   **New Files**: `SettingsPanel.tsx` and `useSettings.ts` were introduced to support these features.
*   **Author**: Rahil Singhi
*   **Date**: 2026-03-28T04:26:41Z
*   **Files Changed**: 7
*   **Additions**: +771 lines
*   **Deletions**: -143 lines

## Related

[[askNYC — Git Activity]],[[askNYC Frontend Backend Integration Update (2026-03-28)]],[[askNYC: Frontend Pages Wired to Backend (March 2026)]],[[askNYC: Mobile UI Enhancements & Pipeline Fixes]],[[askNYC: UI and Map Navigation Improvements (2026-03-28)]],[[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel]],[[Animated Login Modal and Chat Sidebar Transitions]],[[Chat UI Animations with Framer Motion]],[[CMDK Command Palette with Category and Source Filtering (Brain-Explorer)]],[[Collapsible QR Code Bridge on askNYC Dashboard]]
