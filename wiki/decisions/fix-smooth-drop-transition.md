---
title: "Fix: Smooth Drop Transition"
author: ai
created_at: 2026-04-10T22:11:43.869Z
last_ai_edit: 2026-04-10T22:11:43.869Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-coro-fix-smooth-drop-transition-no-bpm-jump-gradual-build-up-ram-1d4561.md]]"
tags:
  - fix
  - audio
  - transition
  - bpm
  - coro
  - lyria
  - commit
  - software development
  - design decision
---

# Fix: Smooth Drop Transition

This article details a fix implemented in the Coro project to address abrupt audio cuts during drop transitions. The new approach replaces an instantaneous BPM jump with a gradual build-up and constant BPM, allowing Lyria to morph continuously into the drop without resetting its audio context.

## Key Concepts

- [[Drop Transition]],- [[BPM Jump]],- [[Audio Cut]],- [[reset_context()]],- [[Gradual Build-up]],- [[Overlay Prompts]],- [[Lyria (Audio Engine)]]

## Details

This commit addresses a critical issue in the audio playback within the [[Coro]] project, specifically concerning the transition into a 'drop' section.

**Problem Statement:**
Previously, when a drop was triggered, the system would immediately fire a `bpm+20` event. This change in BPM, coupled with the immediate switch, would trigger `reset_context()` within the [[Lyria (Audio Engine)|Lyria]] system. The consequence was a harsh audio cut, leading to a momentary silence followed by music that sounded unrelated or 'from scratch', disrupting the user experience.

**New Approach (Smooth Drop Transition):**
To achieve a seamless and continuous transition, the following timed sequence of events is implemented:

*   **t=1s before drop:** An 'rising tension' audio prompt is overlaid. Its weight (`w`) is set to `0.25`, density increases to `0.75`, and brightness to `0.80`. This initiates the build-up phase.
*   **t=2s before drop:** The 'rising tension' prompt's intensity is further increased. Its weight (`w`) is set to `0.50`, density to `0.92`, and brightness to `0.96`. This intensifies the build-up.
*   **t=3s (Drop Activation):** The system switches to the primary 'drop prompts'. Crucially, this switch occurs at the **same BPM** as the preceding build-up. Because the BPM remains constant, the `reset_context()` function in Lyria is *not* triggered. This allows Lyria to continuously morph the audio from the rising tension build-up directly into the drop, providing a smooth and uninterrupted experience.

By holding the BPM constant throughout the transition, the audio stream maintains continuity, eliminating the jarring cut and enhancing the overall flow of the music.

## Related

[[Rahil Singhi]],[[Claude Sonnet 4.6]],[[Coro Project]],[[Lyria (Audio Engine)]],[[Commit 10a2cc6]]
