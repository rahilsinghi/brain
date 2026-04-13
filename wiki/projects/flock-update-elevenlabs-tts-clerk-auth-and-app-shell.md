---
title: "Flock Update: ElevenLabs TTS, Clerk Auth, and App Shell"
author: ai
created_at: 2026-04-10T17:25:20.269Z
last_ai_edit: 2026-04-10T17:25:20.269Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-elevenlabs-tts-clerk-middleware-and-app-shell-3eecab.md]]"
tags:
  - flock
  - elevenlabs
  - tts
  - clerk
  - authentication
  - middleware
  - ui
  - layout
  - frontend
  - backend
  - feature
  - commit
---

# Flock Update: ElevenLabs TTS, Clerk Auth, and App Shell

This update to the Flock project introduces ElevenLabs Text-to-Speech integration, implements Clerk authentication via middleware, and establishes a foundational dark-themed application shell. It enhances audio generation capabilities, secures API routes, and sets up core UI components for future development.

## Key Concepts

ElevenLabs TTS,Clerk Authentication,Middleware,App Shell,Static File Fallback,Voice Map,Pre-generation of Audio Clips

## Details

This significant update to the `rahilsinghi/Flock` project, committed with SHA `a14b0de` on `2026-03-21T14:23:57Z` by Rahil Singhi (co-authored by Claude Opus 4.6), introduces several key features across 4 changed files with 183 additions.

### ElevenLabs TTS Integration (`tts.ts`)
-   **Voice Map**: Implements a `voice map` to support 7 distinct voices for text-to-speech generation.
-   **Speech Generation**: Utilizes the `turbo_v2_5` model for high-quality speech synthesis via the `generateSpeech` function.
-   **Clip Management**: Introduces `getOrGenerateClip` for efficient audio clip retrieval, incorporating a `static file fallback` mechanism to serve pre-generated or cached audio.
-   **Pre-generation**: Adds `preGenerateRevealClips` functionality, likely for proactively generating audio segments to improve user experience.

### Clerk Authentication Middleware (`middleware.ts`)
-   **Authentication Setup**: Integrates `Clerk authentication` to manage user sessions and access control.
-   **Public Routes**: Configures specific `public routes` for API endpoints and a demo interface, allowing unauthenticated access to designated parts of the application.

### Application Shell and UI (`(app)/layout.tsx`)
-   **Dark Shell Layout**: Establishes a `dark-themed application shell` (`(app)/layout.tsx`), defining the overarching visual structure and styling for the application.

### Profile Viewer Stub (`(app)/preference/page.tsx`)
-   **Profile Page**: Creates a `profile viewer stub` page (`(app)/preference/page.tsx`), providing a placeholder for user preference and profile management.
-   **Completeness Bar**: Includes a `completeness bar` component, indicating the progress or status of profile information, hinting at future user onboarding or data collection features.

## Related

[[Flock (Project)]],[[ElevenLabs]],[[Clerk]],[[Middleware]],[[Text-to-Speech (TTS)]]
