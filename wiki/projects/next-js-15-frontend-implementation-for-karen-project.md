---
title: Next.js 15 Frontend Implementation for Karen Project
author: ai
created_at: 2026-04-13T15:33:24.747Z
last_ai_edit: 2026-04-13T15:33:24.747Z
last_human_edit: null
last_embedded_hash: 4d21b90ada2353b0
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-nextjs-15-frontend-all-6-pages-and-live-escalation-ui-efc025.md]]"
tags:
  - next.js
  - frontend
  - ui
  - escalation
  - real-time
  - audio
  - web development
  - karen
---


# Next.js 15 Frontend Implementation for Karen Project

This update introduces a comprehensive Next.js 15 frontend for the [[Karen Project]], encompassing six distinct pages and a live escalation user interface. Key features include Server-Sent Events (SSE) for real-time updates and dynamic audio capabilities leveraging the Web Audio API.

## Key Concepts

Next.js 15,Server-Sent Events (SSE),Web Audio API,Frontend Development,User Interface (UI),Escalation Management,Audio Playback Queue,Progressive Audio Distortion

## Details

This significant commit (`fdb9327`) by [[Rahil Singhi]] on 2026-04-04 brings the full [[Next.js]] 15 frontend to the [[Karen Project]]. It includes a total of six distinct pages designed to provide a comprehensive user experience:

*   `/`: The main Circle dashboard.
*   `/escalation/[id]`: A live escalation view, powered by [[Server-Sent Events (SSE)]] for real-time updates.
*   `/trigger`: A form for triggering actions, complete with a personality preview.
*   `/open-matters`: A registry for tracking [[Open Matter for Bharath Mahesh Gera (Karen Project)|Open Matters]].
*   `/join`: The onboarding flow for new users.
*   `/karen`: A dedicated page detailing the lore and background of Karen.

Several key components were developed to support these pages, including `EscalationTimeline`, `KarenSidebar`, `LevelCard`, `MemberCard`, `DeescalationSequence`, `OpenMattersTable`, and `OnboardingFlow`.

Custom hooks were implemented to manage complex functionalities:

*   `useEscalation`: Handles [[Server-Sent Events (SSE)]], ensuring data deduplication and robust reconnection logic using `last_seq`.
*   `useCircle`: A general-purpose hook for circle-related logic.
*   `useKarenAudio`: Manages a queue for voice playback, ensuring smooth audio delivery.
*   `useBackgroundMusic`: Utilizes the [[Web Audio API]] to apply progressive distortion to background music, and includes an autoplay gate to respect user preferences.

## Related

[[Karen Project]],[[Rahil Singhi]],[[Next.js]],[[Server-Sent Events]],[[Web Audio API]],[[Open Matter for Bharath Mahesh Gera (Karen Project)]],[[OnboardingFlow]]
