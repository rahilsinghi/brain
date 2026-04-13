---
title: "Next.js 15 Frontend for Karen Project: Six Pages and Live Escalation UI"
author: ai
created_at: 2026-04-13T17:13:17.437Z
last_ai_edit: 2026-04-13T17:13:17.437Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-nextjs-15-frontend-all-6-pages-and-live-escalation-ui-efc025.md]]"
tags:
  - next.js
  - frontend
  - escalation
  - karen project
  - ui
  - server-sent events
  - audio
  - react hooks
---

# Next.js 15 Frontend for Karen Project: Six Pages and Live Escalation UI

This commit introduces the complete Next.js 15 frontend for the Karen project, encompassing six core pages and a live escalation user interface. It integrates various custom components and hooks to provide dynamic content, real-time updates via Server-Sent Events (SSE), and advanced audio functionalities.

## Key Concepts

Next.js 15,Live Escalation UI,Server-Sent Events (SSE),Audio Playback Queue,Web Audio API,Autoplay Gate,Frontend Architecture,User Interface Components,Custom React Hooks

## Details

This significant feature commit (`fdb9327`) for the `rahilsinghi/karen` repository implements the full Next.js 15 frontend, comprising six primary pages:

*   **Dashboard (`/`)**: The main overview page.
*   **Live Escalation View (`/escalation/[id]`)**: Displays real-time escalation data, leveraging Server-Sent Events (SSE) for dynamic updates.
*   **Trigger Form with Personality Preview (`/trigger`)**: Allows users to initiate escalations with a preview of associated personalities.
*   **Open Matters Registry (`/open-matters`)**: A dedicated page for viewing and managing open matters.
*   **Onboarding Flow (`/join`)**: Guides new users through the project's onboarding process.
*   **Karen Lore Page (`/karen`)**: Provides background and context about the Karen project.

Key components introduced include `EscalationTimeline`, `KarenSidebar`, `LevelCard`, `MemberCard`, `DeescalationSequence`, `OpenMattersTable`, and `OnboardingFlow`. The frontend also utilizes custom React hooks for enhanced functionality:

*   `useEscalation`: Manages SSE connections for escalation data, including deduplication and `last_seq` reconnect logic to ensure data integrity.
*   `useCircle`: A general-purpose hook, likely related to dashboard or data visualization.
*   `useKarenAudio`: Handles a voice playback queue for sequential audio delivery.
*   `useBackgroundMusic`: Implements background music with progressive distortion effects using the Web Audio API, incorporating an autoplay gate for user consent and browser compatibility.

## Related

[[Karen Project]],[[Next.js]],[[Server-Sent Events]],[[Web Audio API]],[[Open Matters Registry]],[[Open Matter for Bharath Mahesh Gera (Karen Project)]],[[Audio Commentary and Ad-Lib System Improvements (Karen Project)]],[[Audio Integration in Karen Project]],[[Authentic Command Center and Escalation Fortress UI Implementation (Karen Project)]]
