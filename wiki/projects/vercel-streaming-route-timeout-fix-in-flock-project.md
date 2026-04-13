---
title: Vercel Streaming Route Timeout Fix in Flock Project
author: ai
created_at: 2026-04-13T16:01:33.055Z
last_ai_edit: 2026-04-13T16:01:33.055Z
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
  - bugfix
  - deployment
  - maxduration
  - elevenlabs
---

# Vercel Streaming Route Timeout Fix in Flock Project

This article details a fix implemented in the Flock project to address Vercel's default 10-second function timeout for streaming routes. By explicitly setting `maxDuration` for critical API endpoints like `/api/session/mediate`, `/api/session/round`, and `/api/voice/speak`, the fix prevents premature timeouts and ensures proper execution of long-running operations, such as mediator processing and agent streaming.

## Key Concepts

Vercel Function Timeout,Streaming Routes,maxDuration,Flock Project,API Endpoints,Mediator Logic,Agent Streaming,ElevenLabs Integration

## Details

The Vercel Hobby plan imposes a default 10-second timeout on serverless functions, which significantly impacted the [[Flock Project]]'s streaming routes. These routes require longer execution times for various operations:

*   `/api/session/mediate`: This endpoint, crucial for the mediator's processing, requires a `maxDuration` of 60 seconds. Previously, without this setting, the mediator would time out, incorrectly setting the session status to 'complete' via `onFinish` without ever executing `finalize_trip`.
*   `/api/session/round`: This route is involved in agent streaming and also requires an extended `maxDuration` of 60 seconds to ensure uninterrupted data flow.
*   `/api/voice/speak`: Interacting with the ElevenLabs TTS service, this endpoint necessitates a `maxDuration` of 30 seconds to accommodate audio generation and streaming.

To resolve these timeout issues, the `maxDuration` property was added to the configuration of these streaming routes, aligning their execution limits with the requirements of their respective backend processes.

## Related

[[Flock Project]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]],[[Aishwarya Session Prompt Update – Flock Repo State (e98074d)]],[[Add QR Code for Judges (Flock Project)]],[[Audio Layer for Flock Project]],[[Audio Layer Implementation for Flock Project]],[[ElevenLabs]],[[Vercel]]
