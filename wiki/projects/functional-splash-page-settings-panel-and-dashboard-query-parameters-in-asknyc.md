---
title: Functional Splash Page, Settings Panel, and Dashboard Query Parameters in askNYC
author: ai
created_at: 2026-04-11T00:33:56.342Z
last_ai_edit: 2026-04-11T00:33:56.342Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-frontend-functional-splash-page-settings-panel-dashb-cafba9.md]]"
tags:
  - frontend
  - ui
  - asknyc
  - splash page
  - settings
  - dashboard
  - query parameters
  - web speech api
  - user experience
---

# Functional Splash Page, Settings Panel, and Dashboard Query Parameters in askNYC

This commit introduces a standalone splash page, enhances the dashboard with query parameter support, and adds a persistent settings panel to the askNYC frontend. These features improve user experience by providing a clear entry point, flexible navigation, and configurable options.

## Key Concepts

Splash page,Dashboard query parameters,Settings panel,Web Speech API,Session history,Demo scenarios,localStorage

## Details

This commit (`1d92c56`) in the `rahilsinghi/askNYC` repository significantly updates the frontend user interface and functionality.

### Standalone Splash Page
The application's entry point (`/`) is now a dedicated splash page, offering several new features:

*   **Search Bar:** Integrated text and voice input capabilities, powered by the [[Web Speech API]].
*   **Session History Cards:** Displays past session data or provides demo scenarios for new users.
*   **EvidenceCard Integration:** An 'Explore' button on these cards now navigates directly to the dashboard, pre-populating queries.
*   **Settings Access:** A gear icon provides access to a new slide-out settings panel.
*   **Dashboard Escape Link:** A direct link allows users to bypass the splash page and go straight to the dashboard.
*   **No Auto-Redirect:** The previous automatic redirection behavior has been removed, making the splash page a stable entry point.

### Dashboard Query Parameter Support
The dashboard now supports URL query parameters for enhanced flexibility and deep-linking:

*   `?q=...`: Automatically submits a text query upon dashboard load.
*   `?location=...`: Pre-loads specific location context.
*   `?demo=all|restaurant|building|construction`: Automatically triggers pre-defined demo scenarios.
*   `?voice=true`: A placeholder for activating voice mode directly.

### Settings Panel
A new, shared settings panel is accessible from both the splash page and the dashboard:

*   **Full Demo Button:** Allows users to initiate a chained sequence of all three demo scenarios.
*   **Individual Scenario Buttons:** Provides options to run specific demo scenarios separately.
*   **Volume Slider & Mute Toggle:** Controls audio output, with preferences persisted using [[localStorage]].

New files introduced for these features include `SettingsPanel.tsx` and `useSettings.ts`.

## Related

[[askNYC]],[[askNYC Frontend Backend Integration Update (2026-03-28)]],[[AskNYC Frontend UI Specification (Sariya's Task)]],[[AskNYC: Next.js 15 Dashboard with Real-time WebSocket UI]],[[Web Speech API]],[[localStorage]],[[askNYC Project Documentation Overview]]
