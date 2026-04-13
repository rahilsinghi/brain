---
title: "Frontend Features: Splash Page, Settings Panel, and Dashboard Query Parameters"
author: ai
created_at: 2026-04-10T21:29:58.687Z
last_ai_edit: 2026-04-10T21:29:58.687Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-frontend-functional-splash-page-settings-panel-dashb-cafba9.md]]"
tags:
  - frontend
  - feature
  - asknyc
  - splash page
  - settings panel
  - dashboard
  - query parameters
  - ux
  - ui
  - javascript
  - typescript
  - react
  - web speech api
  - localstorage
---

# Frontend Features: Splash Page, Settings Panel, and Dashboard Query Parameters

This update introduces a new standalone splash page with robust search capabilities and session history for the `askNYC` application. It also implements comprehensive URL query parameter support for the dashboard, enabling dynamic content loading. A shared settings panel provides user preferences and access to demo scenarios, enhancing overall user control and experience.

## Key Concepts

- Web Speech API
- localStorage
- URL Query Parameters
- Frontend Development
- User Interface (UI) Design
- User Experience (UX) Design
- Application Entry Point

## Details

This commit (`1d92c56`) by Rahil Singhi on 2026-03-28 introduces several key frontend features to the `rahilsinghi/askNYC` application, significantly enhancing its user experience and functionality.

**Commit Details:**
- **Repo:** `rahilsinghi/askNYC`
- **SHA:** `1d92c56`
- **Date:** 2026-03-28T04:26:41Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +771
- **Deletions:** -143

### Standalone Splash Page (`/`)
The application's root URL (`/`) now serves as a dedicated entry point with the following functionalities:
-   **Search Bar:** Features both text input and voice input, utilizing the [[Web Speech API]].
-   **Session History/Demo Scenarios:** Displays cards for past user sessions or offers pre-configured demo scenarios for first-time users.
-   **EvidenceCard "Explore" Button:** Facilitates direct navigation to the [[Dashboard (askNYC)]], pre-populating a query based on the selected card.
-   **Settings Gear:** Opens a slide-out [[Settings Panel (askNYC)]].
-   **"Go straight to dashboard" Link:** Provides an alternative escape route to bypass the splash page directly to the dashboard.
-   **No Auto-Redirect:** The previous automatic redirection behavior from the splash page has been removed.

### Dashboard Query Parameter Support
The [[Dashboard (askNYC)]] now supports various URL [[URL Query Parameters]] for dynamic loading and functionality:
-   `?q=...`: Automatically submits a text query upon page load.
-   `?location=...`: Pre-loads a specific location context.
-   `?demo=all|restaurant|building|construction`: Automatically triggers pre-defined demo scenarios.
-   `?voice=true`: A placeholder parameter for enabling voice mode.

### Shared Settings Panel
A new [[Settings Panel (askNYC)]], accessible from both the splash page and the dashboard, offers enhanced user controls:
-   **"RUN FULL DEMO" Button:** Initiates a sequence chaining all three available demo scenarios.
-   **Individual Scenario Buttons:** Allows users to run specific demo scenarios independently.
-   **Volume Slider & Mute Toggle:** Controls audio output, with user preferences persisted using [[localStorage]].

**New Files Introduced:**
-   `SettingsPanel.tsx`
-   `useSettings.ts`

## Related

- [[askNYC Project]]
- [[Web Speech API]]
- [[localStorage]]
- [[Settings Panel (askNYC)]]
- [[Dashboard (askNYC)]]
- [[Splash Page (askNYC)]]
- [[URL Query Parameters]]
