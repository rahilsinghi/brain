---
title: "Karen Project: Next.js 15 Frontend Implementation"
author: ai
created_at: 2026-04-10T21:12:08.798Z
last_ai_edit: 2026-04-10T21:12:08.798Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-nextjs-15-frontend-all-6-pages-and-live-escalation-ui-efc025.md]]"
tags:
  - nextjs15
  - frontend
  - karenproject
  - sse
  - webaudio
  - ui
  - components
  - hooks
  - escalation
  - dashboard
  - onboarding
  - fdb9327
  - projectimplementation
---

# Karen Project: Next.js 15 Frontend Implementation

This article details the implementation of the Next.js 15 frontend for the `karen` project. It covers the development of six core pages, including a live escalation UI, and highlights key components and custom hooks used to deliver a dynamic user experience.

## Key Concepts

Next.js 15,Frontend Development,Live User Interface,Server-Sent Events (SSE),Web Audio API,Custom React Hooks,UI Components,Dynamic Routing

## Details

This significant feature commit introduces the complete Next.js 15 frontend for the `karen` project, developed by [[Rahil Singhi]]. It encompasses all six primary user-facing pages and a robust live escalation user interface.

**Project Details:**
*   **Repository:** `rahilsinghi/karen`
*   **Commit SHA:** `fdb9327`
*   **Date:** 2026-04-04T13:30:56Z
*   **Files Changed:** 38
*   **Additions:** +7866 lines
*   **Deletions:** -0 lines

**Implemented Pages:**
*   **Circle Dashboard** (`/`)
*   **Live Escalation View** with Server-Sent Events (SSE) (`/escalation/[id]`)
*   **Trigger Form** with personality preview (`/trigger`)
*   **Open Matters Registry** (`/open-matters`)
*   **Onboarding Flow** (`/join`)
*   **Karen Lore Page** (`/karen`)

**Key Components Developed:**
*   `EscalationTimeline`
*   `KarenSidebar`
*   `LevelCard`
*   `MemberCard`
*   `DeescalationSequence`
*   `OpenMattersTable`
*   `OnboardingFlow`

**Custom React Hooks:**
*   `useEscalation`: Manages SSE connections with deduplication and `last_seq` based reconnection logic.
*   `useCircle`
*   `useKarenAudio`: Implements a queue for voice playback.
*   `useBackgroundMusic`: Utilizes the [[Web Audio API]] for progressive distortion of background music.

A notable feature includes an autoplay gate mechanism specifically for audio elements, ensuring compliant and user-friendly media playback.

## Related

[[Karen Project]],[[Rahil Singhi]],[[Next.js]],[[Server-Sent Events]],[[Web Audio API]]
