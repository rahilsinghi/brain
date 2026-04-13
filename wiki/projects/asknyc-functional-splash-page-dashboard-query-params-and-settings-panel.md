---
title: "askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel"
author: ai
created_at: 2026-04-13T17:34:58.306Z
last_ai_edit: 2026-04-13T17:34:58.306Z
last_human_edit: null
last_embedded_hash: 53e61c03665bdf78
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-frontend-functional-splash-page-settings-panel-dashb-cafba9.md]]"
tags:
  - frontend
  - ui
  - ux
  - asknyc
  - splash page
  - settings panel
  - dashboard
  - query parameters
  - web speech api
  - session history
  - next.js
---


# askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel

This update to the askNYC frontend introduces a standalone, functional splash page as the primary entry point, enhances the dashboard with query parameter support for dynamic content loading, and implements a shared, persistent settings panel. These changes improve user experience by offering clearer navigation, demo capabilities, and customizable options.

## Key Concepts

Splash Page,Settings Panel,Dashboard Query Parameters,Web Speech API,Session History,Local Storage,Demo Scenarios

## Details

This commit (SHA: 1d92c56) by Rahil Singhi significantly refactors the frontend of the `rahilsinghi/askNYC` project, focusing on user experience and navigability through a new splash page, enhanced dashboard querying, and a unified settings panel.

### Standalone Splash Page
The root path (`/`) now serves as a dedicated entry point, eliminating automatic redirects. Key features of the splash page include:
*   **Search Bar:** Supports both text and voice input, utilizing the [[Web Speech API]] for voice commands.
*   **Session History Cards:** Displays past user sessions or offers demo scenarios for new users.
*   **EvidenceCard 'Explore' Button:** Allows navigation to the dashboard with a pre-populated query based on the selected evidence.
*   **Settings Access:** A gear icon provides access to a slide-out settings panel.
*   **Direct Dashboard Access:** An 'escape link' allows users to bypass the splash page and go straight to the dashboard.

### Dashboard Query Parameter Support
The dashboard now intelligently responds to URL query parameters, enabling dynamic content loading and pre-configuration:
*   `?q=...`: Automatically submits a text query upon dashboard load.
*   `?location=...`: Pre-loads specific location context within the dashboard.
*   `?demo=all|restaurant|building|construction`: Automatically triggers predefined demo scenarios.
*   `?voice=true`: A placeholder parameter for activating voice mode.

### Shared Settings Panel
A new, unified settings panel is accessible from both the splash page and the dashboard. This panel offers user-configurable options, with certain preferences like volume being persisted using [[Local Storage]]. Features include:
*   **Full Demo Button:** Initiates a chain of all available demo scenarios.
*   **Individual Scenario Buttons:** Allows users to trigger specific demo scenarios.
*   **Volume Control:** A slider and mute toggle for managing audio output, with settings persisted across sessions.

### New Files Introduced
This update introduces two new component files:
*   `[[SettingsPanel.tsx]]`: Implements the UI and logic for the settings panel.
*   `[[useSettings.ts]]`: A custom hook to manage settings state and persistence.

This refactor streamlines the initial user interaction with askNYC and provides greater control over content presentation and demo experiences.

## Related

[[askNYC — Git Activity]],[[AskNYC Frontend UI Specification (Sariya's Task)]],[[askNYC Frontend Backend Integration (March 2026)]],[[askNYC: Real Session Data and Navigation Fixes]],[[askNYC: Mobile UI Enhancements & Pipeline Fixes]],[[askNYC: UI and Map Navigation Improvements (2026-03-28)]],[[askNYC CLAUDE.md Update: Composite Tool Architecture and Session Persistence]],[[askNYC: Model Update to Gemini 2.5 Flash Native Audio]],[[askNYC Project Documentation Update (March 2026)]],[[SettingsPanel.tsx]],[[useSettings.ts]]
