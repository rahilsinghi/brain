---
title: "Fix: Smooth Drop Transition in Coro - No BPM Jump, Gradual Build-Up Ramp"
author: ai
created_at: 2026-04-12T17:31:03.506Z
last_ai_edit: 2026-04-12T17:31:03.506Z
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
  - fix
  - development
  - smooth transition
  - audio engine
---

# Fix: Smooth Drop Transition in Coro - No BPM Jump, Gradual Build-Up Ramp

This commit addresses a critical audio cut issue in the Coro project's 'drop' feature by implementing a smooth, gradual build-up transition. Instead of an abrupt BPM change and context reset, the new approach overlays 'rising tension' prompts over several seconds, culminating in a continuous morph into the drop without interrupting the audio stream.

## Key Concepts

Audio smooth transition,BPM (Beats Per Minute),Lyria audio engine,Context reset,Prompt overlaying,Gradual build-up

## Details

Previously, the 'drop' functionality in the [[Coro]] project would abruptly fire at `bpm+20`, which triggered `reset_context()` within the [[Lyria]] audio engine. This resulted in a hard audio cut, leading to silence followed by unrelated music, disrupting the user experience.

The new approach implements a smooth, gradual build-up to the drop:

*   **At t=1s**: An 'rising tension' prompt is overlaid with a weight of 0.25, increasing density to 0.75 and brightness to 0.80.
*   **At t=2s**: The 'rising tension' prompt's influence increases, with a weight of 0.50, density rising to 0.92, and brightness to 0.96.
*   **At t=3s**: The system transitions to the actual drop prompts. Crucially, this transition occurs at the **same BPM** as the build-up. By avoiding a `reset_context()` call, [[Lyria]] is able to continuously morph the audio from the build phase directly into the drop, ensuring an uninterrupted and fluid auditory experience.

This method keeps the [[BPM]] constant throughout the transition, eliminating the previous audio cuts and delivering a much smoother and more engaging user experience for the drop feature.

## Related

[[Coro — Git Activity]],[[Coordinated Drop Button]],[[Coordinated Drop Button Feature (Coro Project)]],[[Coro Project: Smooth Transitions, Room Cap, and Custom Prompts]],[[Lyria]],[[BPM]],[[Prompts]],[[reset_context()]],[[Claude]]
