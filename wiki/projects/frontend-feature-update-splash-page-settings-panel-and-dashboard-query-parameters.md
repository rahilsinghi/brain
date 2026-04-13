---
title: "Frontend Feature Update: Splash Page, Settings Panel, and Dashboard Query Parameters"
author: ai
created_at: 2026-04-10T15:16:34.545Z
last_ai_edit: 2026-04-10T15:16:34.545Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-frontend-functional-splash-page-settings-panel-dashb-cafba9.md]]"
tags:
  - frontend
  - feature
  - splash page
  - settings panel
  - dashboard
  - query parameters
  - webspeechapi
  - asknyc
  - 2026-03-28
  - commit
---

# Frontend Feature Update: Splash Page, Settings Panel, and Dashboard Query Parameters

This update introduces a fully functional splash page with search, session history, and demo capabilities. It also adds a new, shared settings panel and enhances the dashboard with URL query parameter support for dynamic content loading and demo activation.

## Key Concepts

Splash Page,Settings Panel,Dashboard Query Parameters,Web Speech API,Session History,Local Storage

## Details

This commit (`1d92c56`) by [[Rahil Singhi]] on 2026-03-28 at 04:26:41Z for the `rahilsinghi/askNYC` repository introduces significant frontend enhancements. The update involved 7 file changes, with +771 additions and -143 deletions.

### Functional Splash Page
The root path (`/`) now serves as a standalone entry point with the following features:

*   **Search Functionality**: Includes a search bar supporting both text input and voice input via the Web Speech API.
*   **Session History/Demos**: Displays cards for previous session history, or demo scenarios for first-time users.
*   **EvidenceCard Integration**: An "Explore" button within EvidenceCards allows navigation directly to the dashboard with a pre-populated query.
*   **Settings Access**: A gear icon opens a slide-out settings panel.
*   **Dashboard Escape Link**: A "Go straight to dashboard" link provides an immediate bypass to the main dashboard.
*   **No Auto-Redirect**: The splash page no longer automatically redirects, allowing users to interact with its features.

### Dashboard Query Parameter Support
The dashboard now supports several URL query parameters for dynamic behavior:

*   `?q=...`: Automatically submits the provided text query upon page load.
*   `?location=...`: Pre-loads a specific location context.
*   `?demo=all|restaurant|building|construction`: Automatically triggers pre-defined demonstration scenarios.
*   `?voice=true`: A placeholder parameter for future voice mode integration.

### Shared Settings Panel
A new slide-out settings panel, accessible from both the splash page and the dashboard, includes:

*   **Full Demo Trigger**: A "RUN FULL DEMO" button that chains all three available demonstration scenarios.
*   **Individual Scenario Buttons**: Buttons to trigger each demo scenario independently.
*   **Volume Control**: A volume slider and a mute toggle, with settings persisted using `localStorage`.

### New Files
This update introduced two new files:

*   `SettingsPanel.tsx`
*   `useSettings.ts`

## Related

[[Rahil Singhi]],[[askNYC]],[[Frontend Development]],[[Web Speech API]],[[Query Parameters]],[[Local Storage]]
