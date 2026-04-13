---
title: Karen Frontend Implementation (Next.js 15)
author: ai
created_at: 2026-04-10T15:08:26.046Z
last_ai_edit: 2026-04-10T15:08:26.046Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-nextjs-15-frontend-all-6-pages-and-live-escalation-ui-efc025.md]]"
tags:
  - next.js
  - frontend
  - karen
  - ui
  - sse
  - react
  - javascript
  - web audio
  - escalation
  - dashboard
  - onboarding
  - development
---

# Karen Frontend Implementation (Next.js 15)

This document details the initial implementation of the `karen` project's frontend, built using Next.js 15. It encompasses six core pages, including a live escalation UI utilizing Server-Sent Events (SSE), alongside several key components and custom hooks for enhanced functionality like audio playback and background music.

## Key Concepts

Next.js 15,Server-Sent Events (SSE),React Hooks,Web Audio API

## Details

This significant feature (`feat`) commit by [[Rahil Singhi]] on 2026-04-04T13:30:56Z represents the comprehensive initial frontend implementation for the `[[karen project]]` (repository: `rahilsinghi/karen`, SHA: `fdb9327`). The update involved substantial changes, with 38 files modified and +7866 additions.

**Implemented Pages:**
The frontend includes a complete set of six pages:
*   **Circle Dashboard** (`/`)
*   **Live Escalation View** with Server-Sent Events (SSE) (`/escalation/[id]`)
*   **Trigger Form** with personality preview (`/trigger`)
*   **Open Matters Registry** (`/open-matters`)
*   **Onboarding Flow** (`/join`)
*   **Karen Lore Page** (`/karen`)

**Key Components:**
Several custom React components were developed to support these pages and their functionalities:
*   `EscalationTimeline`
*   `KarenSidebar`
*   `LevelCard`
*   `MemberCard`
*   `DeescalationSequence`
*   `OpenMattersTable`
*   `OnboardingFlow`

**Custom Hooks:**
Critical functionalities are encapsulated within custom React hooks:
*   `useEscalation`: Manages the SSE connection for live updates, incorporating logic for deduplication and `last_seq` based reconnection.
*   `useCircle`: (Likely handles data or state related to the Circle Dashboard).
*   `useKarenAudio`: Manages a queue for voice playback.
*   `useBackgroundMusic`: Utilizes the [[Web Audio API]] to provide progressive distortion for background music, including an autoplay gate mechanism to comply with browser policies.

## Related

[[Rahil Singhi]],[[karen project]],[[Next.js]],[[Server-Sent Events]],[[Web Audio API]],[[React Hooks]]
