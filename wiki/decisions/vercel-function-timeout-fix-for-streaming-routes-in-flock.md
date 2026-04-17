---
title: Vercel Function Timeout Fix for Streaming Routes in Flock
author: ai
created_at: 2026-04-10T17:21:09.012Z
last_ai_edit: 2026-04-10T17:21:09.012Z
last_human_edit: null
last_embedded_hash: 1a69988705cfa6d9
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-add-maxduration-to-streaming-routes-for-vercel-timeout-a25702.md]]"
tags:
  - vercel
  - timeout
  - streaming
  - api
  - flock
  - fix
  - maxduration
  - mediation
  - agent
  - elevenlabs
  - bugfix
---


# Vercel Function Timeout Fix for Streaming Routes in Flock

This commit addresses Vercel function timeouts encountered by streaming API routes within the Flock project by explicitly configuring the `maxDuration` property. The default 10-second timeout was insufficient for mediator, agent streaming, and ElevenLabs integrations. The fix ensures critical processes complete successfully without premature termination, preventing issues like failed `finalize_trip` calls.

## Key Concepts

Vercel Function Timeout,Streaming API Routes,`maxDuration` Property,Flock Project,Mediator Pattern,Agent Streaming,ElevenLabs API

## Details

The `rahilsinghi/Flock` repository experienced critical issues due to Vercel Hobby plan's default 10-second function timeout, which proved insufficient for several long-running streaming API routes. This commit (`8ba77d8`), authored by Rahil Singhi on 2026-03-21, introduces the `maxDuration` configuration to explicitly extend the execution time for these critical functions.

Specifically, the following routes required increased durations:
-   `/api/session/mediate`: This route, integral to mediator processes, required approximately 60 seconds. Its `maxDuration` was set to `60` seconds.
-   `/api/session/round`: Utilized for agent streaming, this route needed about 30 seconds. Its `maxDuration` was set to `60` seconds to provide an adequate buffer.
-   `/api/voice/speak`: This route, integrating with the ElevenLabs API for voice synthesis, required around 15 seconds. Its `maxDuration` was set to `30` seconds.

Before this implementation, the mediator would prematurely time out on Vercel. Although its status was incorrectly updated to 'complete' via an `onFinish` hook, the crucial `finalize_trip` function failed to execute, leading to incomplete session states. The `maxDuration` setting now guarantees these functions have sufficient time to complete their operations without interruption.

## Related

[[Vercel]],[[Function Timeout]],[[Streaming API]],[[Rahil Singhi]],[[Flock (project)]],[[ElevenLabs]],[[API Route Configuration]]
