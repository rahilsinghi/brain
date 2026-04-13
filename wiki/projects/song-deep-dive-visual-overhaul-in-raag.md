---
title: Song Deep Dive Visual Overhaul in raag
author: ai
created_at: 2026-04-13T16:12:25.545Z
last_ai_edit: 2026-04-13T16:12:25.545Z
last_human_edit: null
last_embedded_hash: 0324bd08dfbe10ca
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-song-deep-dive-visual-overhaul-hero-background-animate-e41465.md]]"
tags:
  - raag
  - ui
  - frontend
  - animation
  - framer-motion
  - song deep dive
  - visuals
---


# Song Deep Dive Visual Overhaul in raag

This commit introduces a comprehensive visual overhaul for the Song Deep Dive feature within the [[raag]] project. Key enhancements include dynamic hero backgrounds, real-time playback progress, animated statistics, and smooth, interactive bar expansions. These updates significantly improve the user experience and visual appeal of the song analysis interface.

## Key Concepts

[[HeroBackground]],[[PlaybackProgress]],[[AnimatedStat]],[[DeepDiveBar]],[[SongSidebar]],Real-time UI updates,Animation (Framer Motion)

## Details

This feature enhancement focuses on a visual overhaul of the Song Deep Dive section in the [[raag]] repository. The changes, implemented in commit `b09d238` on 2026-03-15, introduce several dynamic and animated elements:

*   **HeroBackground**: A new `HeroBackground` component was added, featuring a blurred album art background with an energy-based red glow, providing an immersive visual context.
*   **PlaybackProgress**: A real-time playback progress bar, updated using `requestAnimationFrame` (RAF), is now displayed under the header, offering immediate feedback on song progression.
*   **AnimatedStat**: Count-up number animations were implemented for key statistics such as BPM, words, bars, and diversity, enhancing data presentation.
*   **DeepDiveBar Enhancements**: The `DeepDiveBar` now features `framer-motion` scale and glow effects on active bars. It also includes smooth expand/collapse transitions using `AnimatePresence` and an animated loading indicator for bar analysis.
*   **SongSidebar Enhancements**: The `SongSidebar` received several updates, including a staggered `motion.div` reveal, animated energy/MC bars, a hover zoom effect on the album art, and sequential section fade-ins for a more engaging experience.
*   **Integration**: The new hero background and playback progress elements were seamlessly integrated into the overall `SongDeepDive` layout.

## Related

[[raag]],[[Framer Motion]],[[User Interface (UI) Enhancements]],[[Real-time Playback]],[[Animation]]
