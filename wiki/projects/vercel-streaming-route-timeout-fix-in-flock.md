---
title: Vercel Streaming Route Timeout Fix in Flock
author: ai
created_at: 2026-04-12T17:40:29.825Z
last_ai_edit: 2026-04-12T17:40:29.825Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-add-maxduration-to-streaming-routes-for-vercel-timeout-a25702.md]]"
tags:
  - vercel
  - timeout
  - streaming
  - flock
  - api
  - fix
  - elevenlabs
  - deployment
  - bugfix
---

# Vercel Streaming Route Timeout Fix in Flock

This commit addresses Vercel function timeouts on critical streaming routes within the Flock project by explicitly setting `maxDuration` for the `/api/session/mediate`, `/api/session/round`, and `/api/voice/speak` endpoints. The fix prevents premature termination of long-running operations like mediator processing, agent streaming, and ElevenLabs TTS generation.

## Key Concepts

Vercel `maxDuration`,Function timeout,Streaming API routes,[[/api/session/mediate]] endpoint,[[/api/session/round]] endpoint,[[/api/voice/speak]] endpoint,[[ElevenLabs]] TTS,`onFinish` callback,`finalize_trip` function

## Details

Vercel's Hobby plan defaults to a 10-second function timeout, which was insufficient for several streaming routes in the [[Flock]] project. To resolve this, `maxDuration` was explicitly set for the following endpoints:

*   **/api/session/mediate**: This route, crucial for the mediator's processing, now has `maxDuration=60` seconds.
*   **/api/session/round**: This route, used for agent streaming, also received `maxDuration=60` seconds.
*   **/api/voice/speak**: This route, which interfaces with [[ElevenLabs]] for text-to-speech generation, was set to `maxDuration=30` seconds.

Prior to this fix, the mediator would time out on [[Vercel]], leading to an incorrect status of 'complete' via its `onFinish` callback, without ever executing the necessary `finalize_trip` logic.

## Related

[[Flock]],[[Vercel]],[[ElevenLabs]],[[/api/session/mediate]],[[/api/session/round]],[[/api/voice/speak]],[[API Server Factory with Graceful Shutdown]],[[Add QR Code for Judges (Flock Project)]]
