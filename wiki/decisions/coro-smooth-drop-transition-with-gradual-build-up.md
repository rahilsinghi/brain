---
title: "Coro: Smooth Drop Transition with Gradual Build-Up"
author: ai
created_at: 2026-04-12T21:31:14.736Z
last_ai_edit: 2026-04-12T21:31:14.736Z
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
  - music
  - gradual
  - build-up
---

# Coro: Smooth Drop Transition with Gradual Build-Up

This article details a fix implemented in the Coro project to improve the audio 'drop' transition, eliminating hard cuts caused by BPM changes. The new approach uses a gradual build-up ramp with overlaid prompts and maintains a constant BPM to ensure continuous audio morphing.

## Key Concepts

Audio Drop Transition,Beats Per Minute (BPM),Context Reset (Lyria),Audio Morphing,Gradual Build-Up

## Details

The commit `10a2cc6` in the [[Coro]] repository addresses an issue where the audio 'drop' transition would trigger `reset_context()` in [[Lyria]] by changing the BPM by +20. This resulted in a disruptive hard audio cut, followed by silence, and then unrelated music.

The new implementation, co-authored by [[Claude Sonnet 4.6]], introduces a smoother transition:

*   **At t=1s**: An initial "rising tension" prompt is overlaid with a weight (`w`) of 0.25, density increased to 0.75, and brightness to 0.80.
*   **At t=2s**: The "rising tension" prompt is intensified, overlaid with `w`=0.50, density at 0.92, and brightness at 0.96.
*   **At t=3s**: The system switches to the main 'drop' prompts while maintaining the **same BPM**. This crucial change prevents `reset_context()` from firing, allowing [[Lyria]] to continuously morph the audio from the build-up phase directly into the drop without any abrupt cuts.

By holding the BPM constant throughout the transition, the audio stream remains uninterrupted and fluid.

## Related

[[Coro]],[[Lyria]],[[Claude Sonnet 4.6]],[[Claude]]
