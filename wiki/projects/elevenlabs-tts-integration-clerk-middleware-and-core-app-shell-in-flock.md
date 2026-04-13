---
title: ElevenLabs TTS Integration, Clerk Middleware, and Core App Shell in Flock
author: ai
created_at: 2026-04-12T21:48:39.059Z
last_ai_edit: 2026-04-12T21:48:39.059Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-elevenlabs-tts-clerk-middleware-and-app-shell-3eecab.md]]"
tags:
  - elevenlabs
  - tts
  - speech synthesis
  - clerk
  - authentication
  - middleware
  - nextjs
  - app shell
  - layout
  - user profile
  - flock
---

# ElevenLabs TTS Integration, Clerk Middleware, and Core App Shell in Flock

This commit introduces key infrastructure components to the [[Flock Project]], integrating ElevenLabs Text-to-Speech (TTS) functionality, setting up Clerk for authentication, and establishing the foundational application shell. It enables dynamic speech generation, secure user access management, and a consistent user interface framework. A profile viewer stub with a completeness bar was also added, laying groundwork for user customization.

## Key Concepts

[[ElevenLabs TTS]],[[Speech Synthesis]],[[Clerk Authentication]],[[Middleware]],[[Application Layout]],[[User Profile]],Static File Fallback,Dark Theme,Profile Completeness Bar,Next.js App Router

## Details

This commit (SHA: `a14b0de`) for the [[Flock Project]] focuses on establishing core technical capabilities:

-   **`tts.ts`**: Implements the [[ElevenLabs TTS]] integration, featuring:
    -   A `voice map` supporting 7 distinct voices.
    -   `generateSpeech` functionality utilizing the `turbo_v2_5` model for high-quality speech output.
    -   `getOrGenerateClip` with a `static file fallback` mechanism to ensure speech availability even if real-time generation fails or for pre-generated content.
    -   `preGenerateRevealClips` logic, likely for optimizing content delivery by preparing audio clips in advance.

-   **`middleware.ts`**: Sets up [[Clerk Authentication]] for the application.
    -   Configures Clerk middleware to protect routes, while explicitly defining `public routes` for the API and demo sections, allowing unauthenticated access where needed.

-   **`(app)/layout.tsx`**: Defines the global application layout.
    -   Establishes a `dark shell layout`, providing a consistent visual theme across the application.

-   **`(app)/preference/page.tsx`**: Creates a stub for user preferences.
    -   Includes a `profile viewer stub` along with a `completeness bar`, indicating future functionality for users to manage their profiles and track completion of necessary information.

## Related

[[Flock Project]],[[Audio Layer Implementation for Flock Project]],[[Clerk Authentication]]
