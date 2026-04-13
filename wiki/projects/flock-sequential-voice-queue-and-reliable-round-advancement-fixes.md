---
title: "Flock: Sequential Voice Queue and Reliable Round Advancement Fixes"
author: ai
created_at: 2026-04-10T17:32:45.154Z
last_ai_edit: 2026-04-10T17:32:45.154Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-sequential-voice-queue-round-advancement-in-onfinish-f0ab3a.md]]"
tags:
  - flock
  - audio
  - voice queue
  - bug fix
  - round advancement
  - serverless
  - onfinish
  - game development
  - optimization
  - rahil singhi
---

# Flock: Sequential Voice Queue and Reliable Round Advancement Fixes

This update to the Flock project implements a robust sequential voice queue, ensuring audio plays without overlap and with natural pacing. It also refactors the round advancement logic to guarantee reliability, particularly in serverless environments, by linking it directly to the personal agent's `onFinish` callback.

## Key Concepts

Sequential Voice Queue,`source.onended` event,Audio Ducking,Round Advancement Logic,Serverless Reliability,`onFinish` callback

## Details

This commit addresses critical issues in the Flock project related to audio playback and game state advancement, aiming for a smoother user experience and more robust server-side operations.

### Repository Information
*   **Repo:** `rahilsinghi/Flock`
*   **SHA:** `3861106`
*   **Date:** `2026-03-21T20:06:46Z`
*   **Author:** Rahil Singhi
*   **Files Changed:** 3
*   **Additions:** +57 lines
*   **Deletions:** -40 lines
*   **Co-Authored-By:** Claude Opus 4.6 (1M context)

### Voice Queue Enhancements
The previous voice queue implementation, which relied on `setTimeout` for staggering, often led to issues such as overlapping voices and echoes. This update introduces a significantly improved sequential voice queue system:
*   **Proper Sequencing:** The `setTimeout`-based staggering has been replaced with a robust system where each voice plays only *after* the previous one has completely finished, leveraging the `source.onended` event for precise timing.
*   **Natural Pacing:** An 800ms pause is introduced between successive voices, creating a more natural and less rushed listening experience for the user.
*   **Ambient Music Ducking:** During voice playback, ambient background music levels are automatically "ducked" (reduced) to prioritize voice clarity. Music levels are then restored to normal during the pauses between readings.
*   **Elimination of Echo:** By ensuring that only one voice can play at a time, the problem of overlapping audio and resulting echoes has been effectively resolved.

### Reliable Round Advancement
A critical fix was implemented for the game's round advancement mechanism, which is especially important for deployments in serverless environments like Vercel:
*   **Callback-Driven Advancement:** The `advanceRound()` function is now called directly within the personal agent's `onFinish` callback. This direct integration ensures that round progression is tied to the completion of specific agent actions.
*   **Serverless Reliability:** This change prevents issues where background processes (such as `pipeTo` operations) might be prematurely terminated by serverless platforms due to their ephemeral nature. By linking `advanceRound()` to an explicit callback, the system guarantees that rounds reliably advance to the next state without interruption, enhancing the overall stability of the game.

## Related

[[Flock (project)]],[[Audio Playback Systems]],[[Serverless Architecture]],[[Game State Management]],[[Rahil Singhi]]
