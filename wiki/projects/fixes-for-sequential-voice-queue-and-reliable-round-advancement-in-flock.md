---
title: Fixes for Sequential Voice Queue and Reliable Round Advancement in Flock
author: ai
created_at: 2026-04-10T21:35:31.490Z
last_ai_edit: 2026-04-10T21:35:31.490Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-sequential-voice-queue-round-advancement-in-onfinish-f0ab3a.md]]"
tags:
  - flock
  - audio
  - voice
  - queue
  - serverless
  - vercel
  - bugfix
  - onfinish
  - javascript
  - sequencing
  - audio ducking
  - commit
  - fix
---

# Fixes for Sequential Voice Queue and Reliable Round Advancement in Flock

This article details a critical fix implemented in the Flock project, addressing issues with voice playback sequencing and ensuring reliable round advancement. The update introduces a robust sequential voice queue with natural pacing and resolves round progression failures on serverless platforms by relocating the advancement logic.

## Key Concepts

Sequential Voice Queue,Audio Playback Sequencing,source.onended Event,Audio Ducking,Serverless Reliability,onFinish Callback,setTimeout Replacement

## Details

This commit (`3861106`) to the `rahilsinghi/Flock` repository, authored by Rahil Singhi on 2026-03-21, addresses key stability and user experience issues related to audio playback and game progression. The changes involve modifying 3 files with +57 additions and -40 deletions.

### Voice Queue Improvements

The previous implementation for voice playback suffered from `setTimeout` staggering, leading to potential overlaps and an "echo" effect. The following improvements have been made:

*   **Proper Sequential Queue:** The `setTimeout` staggering mechanism has been replaced with a robust sequential queue. Each voice now plays only *after* the previous one has completely finished, utilizing the `source.onended` event to trigger the next playback.
*   **Natural Pacing:** An 800ms pause has been introduced between individual voice readings to provide more natural pacing and improve readability.
*   **Ambient Music Ducking:** The system now intelligently manages ambient background music. It automatically "ducks" (reduces volume) during voice playback and restores the volume in the pauses between readings.
*   **Elimination of Echo:** By enforcing that only one voice can play at a time, the previous "echo" effect caused by overlapping audio has been successfully eliminated.

### Round Advancement Fix

Reliable round advancement is crucial for the game's progression, especially in serverless environments. A significant fix was implemented to ensure this reliability:

*   **Relocation of `advanceRound()` Call:** The `advanceRound()` function is now called within the personal agent's `onFinish` callback. This change is critical as it prevents issues where background processes responsible for advancing rounds (which could be terminated by serverless platforms like Vercel) might fail.
*   **Serverless Reliability:** This ensures that the round advances reliably and consistently, even when deployed on serverless architectures, by linking the advancement directly to a guaranteed completion event.

## Related

[[Flock (Project)]],[[Vercel]],[[Serverless Architecture]],[[Audio Playback Systems]]
