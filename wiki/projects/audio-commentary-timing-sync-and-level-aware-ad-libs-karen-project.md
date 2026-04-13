---
title: "Audio: Commentary Timing Sync and Level-Aware Ad-Libs (Karen Project)"
author: ai
created_at: 2026-04-13T16:00:15.591Z
last_ai_edit: 2026-04-13T16:00:15.591Z
last_human_edit: null
last_embedded_hash: 5b0c1338529b78a7
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-audio-sync-commentary-timing-add-level-aware-ad-libs-d0a8c6.md]]"
tags:
  - audio
  - karen project
  - tts
  - ad-libs
  - synchronization
  - game audio
---


# Audio: Commentary Timing Sync and Level-Aware Ad-Libs (Karen Project)

This update to the Karen Project's audio system synchronizes commentary timing by awaiting Text-to-Speech (TTS) completion before initiating ad-libs, resolving issues with audio arriving late. It introduces level-specific and personality-generic ad-libs, effectively doubling the ad-lib pool for richer, more timely audio feedback during gameplay.

## Key Concepts

Text-to-Speech (TTS),Ad-libs,Audio Synchronization,Level-specific commentary,Personality-generic commentary

## Details

- Await level-complete commentary TTS before starting ad-libs to fix audio arriving late and feeling mismatched with the current level.
- Added `LEVEL_ADLIBS` dictionary containing two channel-specific lines per level (e.g., L7: "Discord pinged. Everyone heard that.").
- Ensured the first ad-lib is always level-specific, with subsequent ones being personality-generic.
- For 10-second demo intervals, fixed ad-lib timing at 3 seconds and 7 seconds for tight synchronization.
- Doubled the ad-lib pool from 7 to 15 lines per personality, incorporating quirkier lines.

## Related

[[Karen Project]],[[Audio Commentary and Ad-Lib System Improvements (Karen Project)]],[[Audio Integration in Karen Project]],[[Audio Integration: ElevenLabs TTS, Quips, and Background Music in Karen Project]]
