---
title: "Karen Project: Next.js 15 Frontend and Live Escalation UI"
author: ai
created_at: 2026-04-11T00:14:06.752Z
last_ai_edit: 2026-04-11T00:14:06.752Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-nextjs-15-frontend-all-6-pages-and-live-escalation-ui-efc025.md]]"
tags:
  - next.js
  - frontend
  - escalation
  - ui
  - sse
  - audio
  - karen
  - project update
---

# Karen Project: Next.js 15 Frontend and Live Escalation UI

This article details the implementation of a comprehensive Next.js 15 frontend for the Karen project, introducing six new pages and a real-time live escalation user interface. Key features include an interactive escalation timeline, dynamic audio playback, and background music with progressive distortion.

## Key Concepts

[[Next.js]] 15,[[Server-Sent Events (SSE)]],[[Web Audio API]],Live Escalation UI,Onboarding Flow,Open Matters Registry

## Details

This commit (`fdb9327`) by Rahil Singhi on 2026-04-04 marks a significant update to the [[Karen Project]]'s frontend, leveraging [[Next.js]] 15. The update introduces a complete user interface with six distinct pages, enhancing user interaction and administrative capabilities. The changes involved 38 files, adding 7866 lines of code.

**New Pages and Features:**
*   **Circle Dashboard (`/`):** The main entry point, likely providing an overview of ongoing activities and statuses.
*   **Live Escalation View (`/escalation/[id]`):** A critical component featuring real-time updates for specific escalations, powered by [[Server-Sent Events (SSE)]].
*   **Trigger Form with Personality Preview (`/trigger`):** Allows users to initiate new escalations, potentially with customizable parameters or previews.
*   **Open Matters Registry (`/open-matters`):** A dedicated page for tracking and managing unresolved issues or pending tasks.
*   **Onboarding Flow (`/join`):** Guides new users through the initial setup or registration process.
*   **Karen Lore Page (`/karen`):** Provides information or background context about the [[Karen Project]].

**Key Components Introduced:**
*   `EscalationTimeline`: Visualizes the progression of an escalation, likely integrated with SSE for live updates.
*   `KarenSidebar`: A navigational or informational sidebar, common across the application.
*   `LevelCard`: Likely displays status or severity levels within the UI.
*   `MemberCard`: Represents individual members or participants within the system.
*   `DeescalationSequence`: Manages or displays steps for de-escalating situations.
*   `OpenMattersTable`: A tabular display for the [[Open Matters Registry]].
*   `OnboardingFlow`: Implements the step-by-step process for user onboarding.

**Custom Hooks for Enhanced Functionality:**
*   `useEscalation`: Manages real-time escalation data using [[SSE]] with built-in deduplication and `last_seq` reconnection logic for robust connectivity.
*   `useCircle`: Likely provides context or data related to the 'Circle' aspect of the project.
*   `useKarenAudio`: Handles audio playback, possibly managing a queue of voice prompts or notifications.
*   `useBackgroundMusic`: Implements dynamic background music using the [[Web Audio API]], featuring progressive distortion effects. An autoplay gate is included to respect user preferences and browser policies regarding audio playback.

## Related

[[Karen Project]],[[Next.js]],[[Next.js 15]],[[Server-Sent Events (SSE)]],[[Web Audio API]],[[Escalation Ladder v2 Implementation Plan]],[[Escalation Ladder, SSE Streaming, and Payment Webhooks in Karen]],[[Open Matters Registry]],[[Onboarding Flow]],[[API: GET /graph-export Endpoint for Cached Graph Data]]
