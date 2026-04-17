---
title: Maison Agent Operational Frontend and Documentation
author: ai
created_at: 2026-04-15T20:02:46.554Z
last_ai_edit: 2026-04-15T20:02:46.554Z
last_human_edit: null
last_embedded_hash: 24e4e22bc93c1c9e
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-3.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
aliases:
  - Community 3
---



# Maison Agent Operational Frontend and Documentation

This code community represents the user-facing components of the Maison Agent system, encompassing its operational quality dashboard, real-time status monitoring, and comprehensive API documentation. It provides essential interfaces for user authentication, system diagnostics, and visual analysis of agent performance and activity. This cluster integrates various UI components and client-side logic to deliver a complete administrative and informational frontend experience.

## Key Concepts

*   Maison Agent User Interface (UI),*   Quality Dashboard,*   System Status Monitoring,*   API Reference Documentation,*   Diagnostic Tools (Chat, Forms, Findings),*   User Authentication & Management,*   Theming and UI Components,*   Platform Management

## Details

This code community encompasses the core frontend applications responsible for the user interface, documentation, and operational insights of the `maison-agent` system. It primarily consists of components from three main applications: `quality-dashboard`, `docs`, and `status`.

### Quality Dashboard (`apps/quality-dashboard`)
This application provides an administrative interface for monitoring the performance and quality of the Maison Agent system.

*   **`/apps/quality-dashboard/src/app/login/page.tsx`**: The primary login interface for the dashboard, heavily connected to and relying on the `[[LoginForm.tsx]]` component for handling user authentication.
*   **`/apps/quality-dashboard/src/components/LoginForm.tsx`**: Manages the login form submission logic (`loginform_handlesubmit`).
*   **`/apps/quality-dashboard/src/components/NavBar.tsx`**: Provides consistent navigation across the dashboard, integrating a `[[ThemeToggle.tsx]]` component for UI theme customization.
*   **`/apps/quality-dashboard/src/components/ThemeToggle.tsx`**: Handles the UI theme switching functionality (`themetoggle_toggle`).
*   **`/apps/quality-dashboard/src/components/UserList.tsx`**: Displays and manages a list of users, with functionalities for inviting (`userlist_handleinvite`), re-sending invites (`userlist_handleresendinvite`), and deleting users (`userlist_handledelete`).
*   **`/apps/quality-dashboard/src/components/TrendChart.tsx`**: Visualizes system trends and metrics, utilizing `trendchart_xscale` and `trendchart_yscale` for data rendering.
*   **`/apps/quality-dashboard/src/components/FilterBar.tsx`**: Allows users to filter data displayed within the dashboard.
*   **`/apps/quality-dashboard/src/components/RunConfigPanel.tsx`**: Provides an interface for configuring and managing test runs and scenarios.
*   Pages like `/apps/quality-dashboard/src/app/tests/page.tsx` and `/apps/quality-dashboard/src/app/sessions/[id]/page.tsx` are also part of this dashboard, likely displaying test results and session details, utilizing components from [[Community 2]] such as `[[SessionsTable]]`, `[[TestCatalog]]`, `[[SessionDetail]]`, and `[[PassRateBadge]]`.

### Documentation (`apps/docs`)
This application hosts comprehensive documentation and interactive diagnostic tools for the Maison Agent.

*   **`/apps/docs/src/app/(docs)/api-reference/page.tsx`**: A central page dedicated to displaying API reference documentation. It includes sophisticated utilities for resolving API schemas (`page_resolveschema`), flattening body properties (`page_flattenbodyproperties`), and dynamically generating example API calls (cURL, response examples using `page_generatecurlexample`, `page_generateresponseexample`). It leverages `[[codeblock]]` and `[[syntax]]` components from [[Community 18]] for effective code highlighting.
*   **`/apps/docs/src/components/diagnostic/DiagnosticChat.tsx`**: An interactive chat interface designed for diagnosing system issues. It relies heavily on `[[site-check-client.ts]]` and `[[chat-client.ts]]` for its functionality, including `diagnosticchat_handlesend` and `diagnosticchat_handlekeydown` for user interactions.
*   **`/apps/docs/src/components/diagnostic/DiagnosticForm.tsx`**: Provides a structured form for submitting diagnostic information (`diagnosticform_handlesubmit`).
*   **`/apps/docs/src/components/diagnostic/FindingsCard.tsx`**: Displays the results or findings obtained from diagnostic checks, utilizing `[[site-check-client.ts]]`.
*   **`/apps/docs/src/lib/site-check-client.ts`**: Offers client-side logic for executing site checks (`site_check_client_runsitecheck`). This client is also imported by the `[[domains]]` module in [[Community 9]].
*   **`/apps/docs/src/lib/chat-client.ts`**: A client library facilitating chat interactions, used by `DiagnosticChat.tsx` and also imported by `[[domains]]` in [[Community 9]].
*   **`/apps/docs/src/components/docs/PlatformPicker.tsx`**: A component designed to select or display information pertinent to different platforms, directly linked to `[[platforms.ts]]`.
*   **`/apps/docs/src/lib/platforms.ts`**: Defines utilities and data structures for managing platform-specific information, including a `platforms_getplatform` function.
*   **`/apps/docs/src/components/docs/GuideHeader.tsx`**: Ensures a consistent header structure for various documentation guides.
*   **`/apps/docs/src/components/docs/Callout.tsx`** and **`/apps/docs/src/components/docs/StepList.tsx`**: Generic, reusable documentation components for formatting content.

### Status Monitoring (`apps/status`)
This application is dedicated to displaying the current operational status of the Maison Agent system.

*   **`/apps/status/src/components/StatusHeader.tsx`**: Displays critical status information in the header, incorporating theme management utilities (`statusheader_getstoredtheme`, `statusheader_getsystemtheme`, `statusheader_applytheme`).
*   **`/apps/status/src/components/StatusPageFooter.tsx`**: Provides a standard footer for the status page.
*   The main status page (`/apps/status/src/app/page.tsx`) integrates several status-related components from [[Community 2]], such as `[[OverallStatusBanner]]`, `[[IncidentTimeline]]`, `[[ServiceGrid]]`, and `[[ChangeLogFeed]]`. It also leverages `[[data]]` and `[[types]]` from [[Community 2]] for data handling and schema definition.

### External Dependencies
This community heavily relies on shared utilities and components, particularly:
*   `[[types]]` and `[[data]]` from [[Community 2]] for data structures and mock data.
*   Various status and session-related components from [[Community 2]] including `[[OverallStatusBanner]]`, `[[IncidentTimeline]]`, `[[ServiceGrid]]`, `[[ChangeLogFeed]]`, `[[SessionsTable]]`, `[[TestCatalog]]`, `[[SessionDetail]]`, and `[[PassRateBadge]]`.
*   `[[codeblock]]` and `[[syntax]]` from [[Community 18]] for rendering code examples.
*   `[[domains]]` (which itself imports `chat_client` and `site_check_client` from this cluster) and `[[use_auth_status]]` from [[Community 9]] for authentication and domain-specific logic.

## Related

[[maison-agent]],[[quality-dashboard]],[[docs]],[[status]],[[Community 2]],[[Community 9]],[[Community 18]],[[LoginForm.tsx]],[[NavBar.tsx]],[[ThemeToggle.tsx]],[[UserList.tsx]],[[TrendChart.tsx]],[[FilterBar.tsx]],[[RunConfigPanel.tsx]],[[site-check-client.ts]],[[chat-client.ts]],[[DiagnosticChat.tsx]],[[DiagnosticForm.tsx]],[[FindingsCard.tsx]],[[PlatformPicker.tsx]],[[platforms.ts]],[[GuideHeader.tsx]],[[Callout.tsx]],[[StepList.tsx]],[[StatusHeader.tsx]],[[StatusPageFooter.tsx]]
