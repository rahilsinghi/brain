---
title: "Fix: Sequential Voice Queue and Round Advancement in Flock Project"
author: ai
created_at: 2026-04-12T18:05:25.047Z
last_ai_edit: 2026-04-12T18:05:25.047Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-sequential-voice-queue-round-advancement-in-onfinish-f0ab3a.md]]"
tags:
  - flock
  - voice
  - audio
  - bugfix
  - backend
  - vercel
  - onfinish
---

# Fix: Sequential Voice Queue and Round Advancement in Flock Project

This commit addresses critical issues in the Flock project, implementing a proper sequential voice queue to ensure voices play one after another with natural pacing and ambient music ducking. It also fixes round advancement by moving the `advanceRound()` call into the personal agent's `onFinish` callback for serverless reliability.

## Key Concepts

Sequential Voice Queue,Audio Pacing,Ambient Music Ducking,Round Advancement Logic,Serverless Reliability,onFinish Callback

## Details

This commit, identified by **SHA `3861106`**, from the `rahilsinghi/Flock` repository, was authored by Rahil Singhi on 2026-03-21T20:06:46Z. It involved changes across 3 files, adding 57 lines and deleting 40.

The primary focus of this update was to enhance the **voice queue** and ensure reliable **round advancement** within the Flock project:

### Voice Queue Improvements

*   The previous `setTimeout` based staggering mechanism was replaced with a **proper sequential queue**. This ensures that each voice plays only *after* the previous one has completed, utilizing the `source.onended` event.
*   A natural **800ms pause** was introduced between voices to improve pacing and user experience.
*   **Ambient music now ducks** (reduces volume) during voice playback and restores its volume between readings, preventing audio overlap.
*   The fix eliminates issues where multiple voices could play simultaneously, resolving the "echo" effect.

### Round Advancement Fix

*   The `advanceRound()` function, crucial for progressing through the game or interaction, is now called reliably within the **personal agent's `onFinish` callback**.
*   This change mitigates issues where round advancement might fail due to background processes being terminated prematurely, especially in **serverless environments** like Vercel.

This commit was co-authored by Claude Opus 4.6 (1M context) <noreply@anthropic.com>.

## Related

[[Flock Project]],[[Chore: Add QR Code for Judges (Flock Project)]],[[Aishwarya Session Prompt Update (Flock Backend, e98074d)]],[[Chore: Remove @clerk/nextjs Dependency and Make Agent Labels Dynamic]],[[Backend Applause Handling in Coro (PR #12)]]
