---
title: "Karen Project: Audio Commentary Timing and Level-Aware Ad-Libs Fix"
author: ai
created_at: 2026-04-12T21:40:16.263Z
last_ai_edit: 2026-04-12T21:40:16.263Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-audio-sync-commentary-timing-add-level-aware-ad-libs-d0a8c6.md]]"
tags:
  - karen project
  - audio
  - synchronization
  - ad-libs
  - tts
  - game audio
  - fix
---

# Karen Project: Audio Commentary Timing and Level-Aware Ad-Libs Fix

This commit addresses audio synchronization issues in the Karen Project by ensuring level-complete commentary plays before ad-libs, preventing mismatched audio. It also introduces level-aware ad-libs and significantly expands the ad-lib pool for each personality, enhancing the game's dynamic audio experience.

## Key Concepts

Audio Synchronization,Level-Aware Ad-Libs,Text-to-Speech (TTS) Commentary,Personality-Generic Ad-Libs,Demo Interval Timing

## Details

This commit for the [[Karen Project]] implements several crucial fixes and enhancements to the in-game audio system:

*   **Commentary Synchronization**: The system now awaits the completion of level-complete commentary [[Text-to-Speech|TTS]] before triggering ad-libs. This resolves a prior issue where audio would arrive late or feel out of sync with the current level.
*   **Level-Aware Ad-Libs**: A `LEVEL_ADLIBS` dictionary has been introduced, providing two channel-specific ad-lib lines per level (e.g., "L7: 'Discord pinged. Everyone heard that.'"). The first ad-lib for any given level is always level-specific.
*   **Personality-Generic Ad-Libs**: Subsequent ad-libs within a level, after the initial level-specific one, draw from a pool of personality-generic lines.
*   **Fixed Timing for Demo Intervals**: For 10-second demo intervals, ad-libs are now precisely timed at the 3-second and 7-second marks to ensure tight synchronization.
*   **Expanded Ad-Lib Pool**: The total ad-lib pool has been doubled, now offering 15 lines per personality (up from 7), allowing for more varied and 'quirkier' lines.

## Related

[[Karen Project]],[[Audio Commentary and Ad-Lib System Improvements (Karen Project)]],[[Audio Integration: ElevenLabs TTS, Quips, and Background Music in Karen Project]],[[Audio: Commentary Timing Sync and Level-Aware Ad-Libs (Karen Project)]]
