---
title: Maison Agent Diagnostic & Documentation Frontend
author: ai
created_at: 2026-04-15T19:50:40.941Z
last_ai_edit: 2026-04-15T19:50:40.941Z
last_human_edit: null
last_embedded_hash: 9e5796966ff9bbaf
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-6.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
  - frontend
  - documentation
  - diagnostics
  - ui
  - client-side
  - react
  - typescript
aliases:
  - Community 6
---



# Maison Agent Diagnostic & Documentation Frontend

This code community defines the client-side user interface, interactive components, and communication utilities for the Maison Agent's documentation and diagnostic applications. It provides the core frontend experience, enabling users to navigate, perform site checks, engage in diagnostic chats, and manage authentication status within the ecosystem. The community integrates UI layout, client services, and configuration for a comprehensive user-facing portal.

## Key Concepts

Frontend User Interface (UI),Application Layout and Navigation,Client-Side Diagnostic Tools,Site Health Check Functionality,Chat-Based Interaction Services,User Authentication Status Management,Domain and API Endpoint Configuration,Observability and Tracing Initialization

## Details

This community forms the backbone of the Maison Agent's interactive frontend, primarily within the `apps/docs` and partially the `apps/quality-dashboard` applications. It orchestrates UI components, client-side logic, and service integrations.

**Core Application Layout & Navigation:**
*   `apps/docs/src/components/layout/TopNav.tsx`: A central component providing the top navigation bar, theme switching functionality, and interaction with the sidebar. Its high connection count highlights its foundational role in the application's user experience.
*   `apps/docs/src/components/layout/Sidebar.tsx`: Manages the side navigation for the documentation portal.
*   `apps/docs/src/app/(docs)/layout.tsx` and `apps/docs/src/app/layout.tsx`: These files define the overarching layout structures for the documentation application.
*   `apps/docs/src/lib/nav.ts`: Contains the configuration for navigation links and structures.

**Diagnostic and Interaction Features:**
*   `apps/docs/src/components/diagnostic/DiagnosticChat.tsx`: Implements a chat interface used for diagnostic purposes, facilitating user interaction with the Maison Agent's analytical capabilities. It interacts heavily with both `chat-client.ts` and `site-check-client.ts`.
*   `apps/docs/src/components/diagnostic/FindingsCard.tsx`: Responsible for displaying the results or 'findings' from diagnostic processes, often derived from site checks.
*   `apps/docs/src/lib/site-check-client.ts`: Provides the client-side logic for initiating and processing site health checks (via the `runsitecheck` function), a critical part of the diagnostic toolkit.
*   `apps/docs/src/lib/chat-client.ts`: Manages communication with backend chat services, enabling the interactive diagnostic chat functionality.

**Shared Utilities and Configuration:**
*   `apps/docs/src/lib/domains.ts`: A crucial configuration file that defines various domain-related constants and URLs, including `basedomain`, `subdomain`, `apibase`, `agentcdn`, and `consoleurl`. This module centralizes the configuration of API endpoints and service locations, making it a highly connected and foundational piece for client-server communication.
*   `apps/docs/src/lib/use-auth-status.ts`: A custom React hook designed to fetch and manage the user's authentication status across the application.

**Quality Dashboard Integration:**
*   `apps/quality-dashboard/src/app/layout.tsx`: The primary layout definition for a separate quality dashboard application.
*   `apps/quality-dashboard/src/components/TracingInit.tsx`: Handles the initialization of tracing and observability for the quality dashboard, including the setup of OTLP endpoints for telemetry collection.

This community demonstrates a strong emphasis on testing, with dedicated test files (`.test.tsx`, `.test.ts`) accompanying most significant components and libraries, ensuring the reliability of the frontend and its interactions. Components from this community, such as the `domains` configuration, `findingscard`, `diagnosticchat`, `site_check_client`, and `use_auth_status`, are utilized by components in [[Community 3]], indicating a dependency where higher-level pages or features consume the core UI and client services provided here.

## Related

[[maison-agent]],[[Community 3]],[[Top Navigation Bar]],[[Sidebar Navigation]],[[Diagnostic Chat Interface]],[[Diagnostic Findings Display]],[[Site Health Checks]],[[Chat Client]],[[Domains Configuration]],[[Auth Status Hook]],[[Tracing Initialization]],[[React Components]],[[Client-Server Communication]]
