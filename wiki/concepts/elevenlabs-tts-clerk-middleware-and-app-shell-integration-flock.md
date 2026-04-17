---
title: ElevenLabs TTS, Clerk Middleware, and App Shell Integration (Flock)
author: ai
created_at: 2026-04-12T17:47:49.660Z
last_ai_edit: 2026-04-12T17:47:49.660Z
last_human_edit: null
last_embedded_hash: 3d31c7d2fdf7f00c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-elevenlabs-tts-clerk-middleware-and-app-shell-3eecab.md]]"
tags:
  - tts
  - elevenlabs
  - clerk
  - authentication
  - middleware
  - nextjs
  - ui
  - flock
  - voice
---


# ElevenLabs TTS, Clerk Middleware, and App Shell Integration (Flock)

This feature commit integrates ElevenLabs Text-to-Speech (TTS) capabilities, implements Clerk authentication middleware for managing public and private routes, and establishes a dark-themed application shell layout. These additions enhance user experience with voice generation and secure access control within the Flock project.

## Key Concepts

ElevenLabs TTS,Clerk Middleware,Application Shell,Authentication (Clerk),Text-to-Speech (TTS),Next.js Layouts

## Details

This commit, identified by SHA `a14b0de` in the `rahilsinghi/Flock` repository, introduces several key functionalities:

*   **`tts.ts`**: Implements Text-to-Speech (TTS) capabilities using ElevenLabs. It defines a voice map for 7 distinct voices, utilizes `turbo_v2_5` for speech generation, and includes a `getOrGenerateClip` function with a static file fallback for pre-generated audio. A `preGenerateRevealClips` utility is also included, likely for pre-caching audio.
*   **`middleware.ts`**: Configures Clerk authentication middleware. This middleware defines public routes for both the API endpoints and demo pages, ensuring proper access control while allowing unauthenticated access to designated areas.
*   **`(app)/layout.tsx`**: Establishes the core application layout using a dark shell theme. This sets the foundational UI structure for the entire application.
*   **`(app)/preference/page.tsx`**: Provides a stub for the profile viewer page, which includes a completeness bar. This indicates future plans for user profile management and onboarding progress tracking.

This commit significantly advances the user-facing and backend infrastructure of the [[Flock Project]].

## Related

[[Flock Project]],[[Add QR Code for Judges (Flock Project)]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]],[[Aishwarya Session Prompt Update – Flock Repo State (e98074d)]],[[Chore: Remove @clerk/nextjs Dependency and Dynamic Agent Labels (Flock)]],[[Chore: Remove @clerk/nextjs Dependency and Implement Dynamic Agent Labels]],[[Chore: Remove @clerk/nextjs Dependency and Make Agent Labels Dynamic]],[[Cookie-Based Authentication with Name and Room Code Login]]
