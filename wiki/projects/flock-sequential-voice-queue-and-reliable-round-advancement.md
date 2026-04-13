---
title: "Flock: Sequential Voice Queue and Reliable Round Advancement"
author: ai
created_at: 2026-04-12T22:06:13.233Z
last_ai_edit: 2026-04-12T22:06:13.233Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-fix-sequential-voice-queue-round-advancement-in-onfinish-f0ab3a.md]]"
tags:
  - flock
  - audio
  - voice queue
  - round advancement
  - serverless
  - bug fix
  - commit
  - audio ducking
---

# Flock: Sequential Voice Queue and Reliable Round Advancement

This commit addresses critical issues in the Flock project by implementing a robust sequential voice queue and ensuring reliable round advancement. It replaces `setTimeout` based voice staggering with an `onended` event-driven system, adds an 800ms pause between voices, and incorporates ambient music ducking. Additionally, `advanceRound()` calls are moved to the personal agent's `onFinish` callback, preventing interruptions on serverless platforms like Vercel.

## Key Concepts

Voice Queue,Round Advancement,Audio Playback Sequencing,Serverless Reliability,Audio Ducking,[[Web Audio API]]

## Details

This commit (SHA: `3861106`) to the [[Flock]] repository, authored by [[Rahil Singhi]] with assistance from [[Claude Opus 4.6]], introduces significant improvements to the audio and game-flow logic.

### Voice Queue Enhancements

The previous implementation used `setTimeout` for staggering voice playback, which could lead to overlapping audio and an 'echo' effect. The updated system now ensures a proper sequential queue:

*   **Sequential Playback**: Voices now play one after another, with each subsequent voice triggering only `AFTER` the previous one finishes, utilizing the `source.onended` event.
*   **Natural Pacing**: An 800ms pause is introduced between voices to provide a more natural and less rushed auditory experience.
*   **Audio Ducking**: Ambient background music dynamically 'ducks' (reduces volume) while a voice is playing and then restores to its original level between readings, improving clarity and focus on the spoken content.
*   **Single Voice Rule**: Only one voice can play at a time, eliminating the 'echo' problem.

### Reliable Round Advancement

To ensure consistent game progression, a crucial fix was applied to the round advancement mechanism:

*   **Moved `advanceRound()` Call**: The `advanceRound()` function is now explicitly called within the personal agent's `onFinish` callback. This change addresses an issue where, on serverless environments like [[Vercel]], background processes (such as `pipeTo` operations) could be prematurely terminated, causing rounds to fail to advance reliably.
*   **Guaranteed Progression**: By integrating round advancement directly into a guaranteed callback, the system ensures that rounds progress as intended, even under serverless execution constraints.

## Related

[[Flock]],[[Rahil Singhi]],[[Claude Opus 4.6]],[[Vercel]]
