---
title: "Flock Project: ElevenLabs TTS, Clerk Auth, and App Shell Integration"
author: ai
created_at: 2026-04-10T21:25:59.683Z
last_ai_edit: 2026-04-10T21:25:59.683Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-elevenlabs-tts-clerk-middleware-and-app-shell-3eecab.md]]"
tags:
  - elevenlabs
  - tts
  - clerk
  - authentication
  - middleware
  - appshell
  - nextjs
  - project
  - flock
  - commit
---

# Flock Project: ElevenLabs TTS, Clerk Auth, and App Shell Integration

This commit for the Flock project introduces core infrastructure, including integration with ElevenLabs for text-to-speech, Clerk for authentication middleware, and a foundational dark-themed application shell. It establishes key services for speech generation, user authentication, and the overall UI layout.

## Key Concepts

[[ElevenLabs TTS]],[[Clerk Authentication]],[[Middleware (Software)]],[[Text-to-Speech (TTS)]],[[Application Shell Architecture]],[[Next.js App Router]]

## Details

This commit (`a14b0de`) by Rahil Singhi (co-authored by Claude Opus 4.6) on 2026-03-21 focuses on establishing crucial components for the `rahilsinghi/Flock` project. The changes span across four files, adding significant functionality (+183 lines).

### ElevenLabs TTS Integration (`tts.ts`)
- Implements a `voice map` supporting 7 distinct voices.
- Provides a `generateSpeech` function utilizing ElevenLabs' `turbo_v2_5` model for high-quality audio generation.
- Includes `getOrGenerateClip` for efficient speech clip management, featuring a static file fallback mechanism to prevent redundant generation.
- Features `preGenerateRevealClips` suggesting a proactive approach to TTS content preparation.

### Clerk Authentication Middleware (`middleware.ts`)
- Configures Clerk for authentication, safeguarding application routes.
- Defines `public routes` specifically for API endpoints and a demo, ensuring accessibility where authentication is not required.

### Application Shell (`(app)/layout.tsx`)
- Establishes a `dark shell layout` for the application, setting the foundational visual theme.
- This file likely defines the root layout component, providing a consistent UI structure.

### Profile Viewer Stub (`(app)/preference/page.tsx`)
- Adds a basic `profile viewer stub` page.
- Includes a `completeness bar`, indicating a future feature for user profile completion tracking.

## Related

[[Flock (Project)]],[[Rahil Singhi]],[[Next.js Framework]],[[Speech Synthesis]]
