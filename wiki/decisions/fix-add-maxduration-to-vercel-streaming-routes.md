---
title: "Fix: Add maxDuration to Vercel Streaming Routes"
author: ai
created_at: 2026-04-10T21:21:02.512Z
last_ai_edit: 2026-04-10T21:21:02.512Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-add-maxduration-to-streaming-routes-for-vercel-timeout-a25702.md]]"
tags:
  - vercel
  - timeout
  - streaming
  - maxduration
  - api
  - fix
  - serverless
  - flock
  - elevenlabs
---

# Fix: Add maxDuration to Vercel Streaming Routes

This article details a fix implemented to prevent Vercel serverless function timeouts on streaming API routes within the Flock project. The solution involves setting the `maxDuration` parameter for specific endpoints like `/api/session/mediate`, `/api/session/round`, and `/api/voice/speak` to accommodate their longer processing requirements. This ensures critical background processes, such as mediator finalization and agent streaming, complete successfully.

## Key Concepts

Vercel Function Timeout,Streaming Routes,`maxDuration` parameter,Serverless Functions,API Endpoints

## Details

The `rahilsinghi/Flock` project encountered an issue with Vercel serverless functions timing out on its streaming API routes. Vercel's Hobby plan defaults to a 10-second execution timeout for functions. Several critical routes, however, require longer processing times:

- **/api/session/mediate**: This route requires up to 60 seconds for the mediator process to complete its task, which includes finalizing a trip. Without an extended timeout, the mediator would time out, setting the session status to 'complete' via `onFinish` but failing to call `finalize_trip`. The `maxDuration` for this route was set to `60` seconds.
- **/api/session/round**: This route handles agent streaming, requiring approximately 30 seconds. To ensure completion, its `maxDuration` was also set to `60` seconds.
- **/api/voice/speak**: This route interacts with the ElevenLabs API, needing around 15 seconds to process speech. Its `maxDuration` was set to `30` seconds.

The implementation of `maxDuration` ensures that these essential streaming operations can execute fully, preventing premature termination and ensuring the correct workflow within the application. This fix was introduced in commit `8ba77d8` by Rahil Singhi on 2026-03-21.

## Related

[[Vercel]],[[Serverless Functions]],[[API Timeout]],[[Flock (Project)]],[[ElevenLabs]]
