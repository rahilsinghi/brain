---
title: Core Frontend Infrastructure and Service Endpoint Configuration
author: ai
created_at: 2026-04-15T20:06:48.629Z
last_ai_edit: 2026-04-15T20:06:48.629Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-9.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
  - frontend
  - infrastructure
  - configuration
  - ui
  - navigation
  - tracing
aliases:
  - Community 9
---

# Core Frontend Infrastructure and Service Endpoint Configuration

This code community establishes the foundational frontend infrastructure for the `maison-agent` project, encompassing application layouts, navigation, theme management, and critical service endpoint configurations. It centralizes domain and API path definitions used across applications like the documentation site and quality dashboard, while also integrating tracing for observability.

## Key Concepts

Frontend Infrastructure,Application Layout,Navigation System,Theme Management,Authentication Status,Domain Configuration,API Endpoint Management,Observability/Tracing Initialization,Quality Dashboard,Documentation Site

## Details

This community forms the backbone of the `maison-agent` project's frontend applications, particularly for its documentation site and [[Quality Dashboard]]. It handles the core structural elements, navigation, and crucial configurations for interacting with various backend services.

### Key Components and Their Roles:

*   **`domains.ts`**: This is a highly central and interconnected file that defines crucial application-wide domain and API configurations. It specifies `baseDomain`, `subDomain`, `baseURL`, `subURL`, `apiBase`, `agentCDN`, `consoleURL`, and `apiKeyPrefix`. These definitions are fundamental for constructing correct URLs and endpoints across the application, affecting components like the [[TopNav.tsx]] and [[use-auth-status.ts]], and even external clients like [[chat_client]] and [[site_check_client]] (from [[Community 3]]).
*   **Layout Files (`/apps/docs/src/app/(docs)/layout.tsx`, `/apps/docs/src/app/layout.tsx`, `/apps/quality-dashboard/src/app/layout.tsx`)**: These files define the overarching visual structure and layout for different parts of the application, such as the documentation portal and the quality dashboard. They integrate core UI components like the top navigation and sidebar, ensuring a consistent user experience.
*   **Navigation Components (`/apps/docs/src/components/layout/TopNav.tsx`, `/apps/docs/src/components/layout/Sidebar.tsx`, `/apps/docs/src/lib/nav.ts`)**: These components manage application navigation. [[TopNav.tsx]] provides the primary top navigation bar, often including features like theme toggling (dark/light mode) and displaying authentication status via `use-auth-status`. [[Sidebar.tsx]] offers side-panel navigation, relying on `nav.ts` for its structural data.
*   **Authentication Status (`/apps/docs/src/lib/use-auth-status.ts`)**: This utility hook or module is responsible for managing and querying the current user's authentication status. It is utilized by navigation components, such as `TopNav.tsx`, and relies on `domains.ts` for understanding the application's domain context.
*   **Tracing Initialization (`/apps/quality-dashboard/src/components/TracingInit.tsx`)**: Within the [[Quality Dashboard]] application, this component is critical for setting up distributed tracing. It includes logic to `deriveEnv` and configure the `otlpEndpoint`, enabling performance monitoring and debugging across the `maison-agent` ecosystem. It contains sub-components like `tracinginit_deriveenv`, `tracinginit_otlpendpoint`, and the main `tracinginit_tracinginit` function.

### External Dependencies:

*   The `domains.ts` and `use-auth-status.ts` modules are imported by `page` components from [[Community 3]], indicating their foundational role across different parts of the application. The `domains.ts` specifically provides configurations used by the `chat_client` and `site_check_client` also found in [[Community 3]].

## Related

[[maison-agent]],[[Quality Dashboard]],[[Community 3]],[[API Endpoint Management]],[[Frontend Infrastructure]],[[TopNav.tsx]],[[use-auth-status.ts]],[[chat_client]],[[site_check_client]]
