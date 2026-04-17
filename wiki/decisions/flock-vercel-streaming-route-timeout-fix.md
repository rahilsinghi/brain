---
title: "Flock: Vercel Streaming Route Timeout Fix"
author: ai
created_at: 2026-04-12T21:40:47.597Z
last_ai_edit: 2026-04-12T21:40:47.597Z
last_human_edit: null
last_embedded_hash: 1e5411e9d043fec8
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-add-maxduration-to-streaming-routes-for-vercel-timeout-a25702.md]]"
tags:
  - flock
  - vercel
  - timeout
  - streaming
  - maxduration
  - api
  - fix
  - elevenlabs
---


# Flock: Vercel Streaming Route Timeout Fix

This article details a fix implemented in the Flock project to address Vercel Hobby plan's default 10-second function timeout for streaming routes. Specific `maxDuration` values were set for `/api/session/mediate`, `/api/session/round`, and `/api/voice/speak` to prevent timeouts for mediator logic, agent streaming, and ElevenLabs TTS integration, respectively.

## Key Concepts

Vercel function timeout,Streaming routes,`maxDuration` configuration,Mediator logic,Agent streaming,ElevenLabs Text-to-Speech (TTS)

## Details

Vercel Hobby's default function timeout of 10 seconds was causing issues with specific streaming routes in the Flock project. To resolve this, `maxDuration` settings were added to these routes:

*   `/api/session/mediate`: Set to 60 seconds to accommodate the mediator's processing time.
*   `/api/session/round`: Set to 60 seconds to allow for sufficient agent streaming duration.
*   `/api/voice/speak`: Set to 30 seconds to ensure completion of ElevenLabs Text-to-Speech generation.

Without this fix, the mediator was timing out on Vercel, leading to an incomplete session state where `onFinish` was called to set status to 'complete', but `finalize_trip` was never invoked.

## Related

[[Flock]],[[Vercel]],[[ElevenLabs]]
