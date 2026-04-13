---
title: "Fix: Smooth Drop Transition in Coro"
author: ai
created_at: 2026-04-13T15:44:02.356Z
last_ai_edit: 2026-04-13T15:44:02.356Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-smooth-drop-transition-no-bpm-jump-gradual-build-up-ram-1d4561.md]]"
tags:
  - coro
  - audio
  - transition
  - bpm
  - lyria
  - bugfix
  - music generation
  - software development
---

# Fix: Smooth Drop Transition in Coro

This fix addresses a hard audio cut in the Coro project during "drop" transitions, which was caused by a BPM jump triggering Lyria's reset_context() function. The new approach ensures a smooth, continuous audio stream by maintaining a constant BPM and gradually building tension with timed prompt overlays. This prevents abrupt interruptions and allows for seamless musical morphing into the drop.

## Key Concepts

Audio Transition,BPM (Beats Per Minute),Prompt Overlay,Audio Continuity,Coro Project,Music Generation,reset_context(),Lyria

## Details

The `rahilsinghi/Coro` repository previously experienced abrupt audio cuts during "drop" transitions. This behavior stemmed from a logic where firing a drop increased the BPM by 20. This BPM change inadvertently triggered the `reset_context()` function within the `Lyria` module, leading to a hard audio cut – a moment of silence followed by unrelated music starting from scratch.

The revised approach, implemented in commit `10a2cc6` by Rahil Singhi on 2026-02-28, focuses on maintaining a constant BPM throughout the drop sequence to prevent `reset_context()` from firing. This allows Lyria to morph continuously from the build-up into the drop, ensuring audio continuity. The new, timed transition sequence is as follows:

*   **t=1s**: An initial "rising tension" prompt is overlaid. This prompt is configured with a weight (w) of 0.25, a density of 0.75, and a brightness of 0.80.
*   **t=2s**: A second "rising tension" prompt is overlaid, further intensifying the build-up. Its parameters are set to a weight (w) of 0.50, a density of 0.92, and a brightness of 0.96.
*   **t=3s**: The system transitions to the main "drop" prompts. Crucially, this switch occurs at the *same BPM* as the preceding build-up phases. 

By holding the BPM constant, the audio stream remains uninterrupted, delivering a seamless and gradual build-up into the drop, resolving the previous issue of hard audio cuts.

## Related

[[Applause Handling Enhancement in Coro]],[[Applause Handling in Coro Backend]],[[Backend Applause Handling in Coro]],[[Backend Applause Handling in Coro (PR #12)]]
