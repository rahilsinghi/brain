---
title: "Next.js 15 Frontend for Karen Project: All Pages and Live Escalation UI"
author: ai
created_at: 2026-04-12T21:21:43.236Z
last_ai_edit: 2026-04-12T21:21:43.236Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-nextjs-15-frontend-all-6-pages-and-live-escalation-ui-efc025.md]]"
tags:
  - frontend
  - next.js
  - ui
  - real-time
  - sse
  - web audio api
  - escalation
  - onboarding
  - karen project
---

# Next.js 15 Frontend for Karen Project: All Pages and Live Escalation UI

This feature introduces the complete Next.js 15 frontend for the Karen project, encompassing six core pages including the Circle dashboard, live escalation view, and onboarding flow. It integrates real-time Server-Sent Events (SSE) for live updates and sophisticated Web Audio API usage for dynamic sound effects and background music.

## Key Concepts

[[Next.js]],[[Server-Sent Events (SSE)]],[[Web Audio API]],[[Frontend Development]],[[Real-time UI]],[[Audio Playback Queue]]

## Details

This commit (`fdb9327`) marks the initial implementation of the full Next.js 15 frontend for the [[Karen Project]]. It introduces all six primary pages, providing a comprehensive user interface for interacting with the system.

**Implemented Pages:**
*   **Circle Dashboard (`/`):** The main landing page, likely offering an overview of the system's state.
*   **Live Escalation View (`/escalation/[id]`):** A real-time interface utilizing Server-Sent Events (SSE) for dynamic updates on ongoing escalations. This includes a `DeescalationSequence` component.
*   **Trigger Form with Personality Preview (`/trigger`):** A form for initiating actions, potentially allowing users to preview how different 'personalities' or configurations might affect the outcome.
*   **Open Matters Registry (`/open-matters`):** A dedicated page to list and manage `Open Matters` via the `OpenMattersTable` component.
*   **Onboarding Flow (`/join`):** Guides new users through the initial setup process using the `OnboardingFlow` component.
*   **Karen Lore Page (`/karen`):** Provides background information and context for the Karen system.

**Key Components Introduced:**
*   `EscalationTimeline`
*   `KarenSidebar`
*   `LevelCard`
*   `MemberCard`
*   `DeescalationSequence`
*   `OpenMattersTable`
*   `OnboardingFlow`

**Key Hooks Developed:**
*   `useEscalation`: Manages SSE connections for real-time escalation data, featuring deduplication and `last_seq` based reconnection logic for robust updates.
*   `useCircle`: Likely for managing or fetching data related to the 'Circle' context.
*   `useKarenAudio`: Implements a queue for voice playback, ensuring smooth audio delivery.
*   `useBackgroundMusic`: Leverages the Web Audio API to provide background music with progressive distortion effects, and includes an autoplay gate to comply with browser policies.

## Related

[[Karen Project]],[[Authentic Command Center and Escalation Fortress UI Implementation (Karen Project)]],[[Authentic Command Center and Escalation Fortress UI Merge for Karen Project]],[[Open Matter for Bharath Mahesh Gera (Karen Project)]],[[Open Matter for Rahil Singhi (Karen Project)]],[[Add Pretext Submodule (Karen Project)]],[[Audio Commentary and Ad-Lib System Improvements (Karen Project)]],[[Audio Integration: ElevenLabs TTS, Quips, and Background Music in Karen Project]],[[Audio: Commentary Timing Sync and Level-Aware Ad-Libs (Karen Project)]],[[Calendar Service Updates for Service Account Compatibility in Karen Project]],[[Channel Integrations and Personality Service (Karen Project)]],[[Chore: Add Pretext Submodule to Karen Project]],[[Chore: Karen Project Scaffold, Docker Config, and Spec (e7967fd)]],[[Circle Members: Pre-seeded Data and CRUD Endpoints (Karen Project)]]
