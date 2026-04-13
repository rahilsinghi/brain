---
title: Audio Commentary and Ad-Lib System Improvements (Karen Project)
author: ai
created_at: 2026-04-11T00:28:01.227Z
last_ai_edit: 2026-04-11T00:28:01.227Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-fix-audio-sync-commentary-timing-add-level-aware-ad-libs-d0a8c6.md]]"
tags:
  - audio
  - commentary
  - ad-libs
  - timing
  - tts
  - karen project
  - game development
---

# Audio Commentary and Ad-Lib System Improvements (Karen Project)

This update to the Karen project focuses on enhancing audio commentary and ad-lib synchronization. It ensures level-complete Text-to-Speech (TTS) commentary plays before ad-libs, introduces level-aware and channel-specific ad-libs, and doubles the available ad-lib pool for more dynamic and contextually relevant audio feedback.

## Key Concepts

Audio Commentary,Ad-Libs,Text-to-Speech (TTS),Timing Synchronization,Level-aware content,Game Audio

## Details

This commit (`1d9e1e7`) to the `rahilsinghi/karen` repository, authored by Rahil Singhi on 2026-04-04, introduces significant improvements to the project's audio commentary and ad-lib system. It involved changes to 1 file, with 90 additions and 14 deletions.

### Key Improvements:

*   **Commentary Timing Synchronization**: The system now awaits the completion of level-complete commentary Text-to-Speech (TTS) output before triggering any ad-libs. This resolves previous issues where audio would arrive late or feel mismatched with the current in-game level state, ensuring a more cohesive audio experience.
*   **Level-Aware Ad-Libs**: A new `LEVEL_ADLIBS` dictionary has been implemented, allowing for the inclusion of two channel-specific ad-lib lines per level. For example, Level 7 might feature a line like: "Discord pinged. Everyone heard that."
*   **Ad-Lib Selection Logic**: The first ad-lib played in a sequence is always level-specific, providing immediate contextual relevance. Subsequent ad-libs are drawn from a pool of personality-generic lines.
*   **Demo Interval Timing**: For 10-second demo intervals, ad-libs are now precisely timed to occur at the 3-second and 7-second marks, ensuring tight synchronization and impact.
*   **Expanded Ad-Lib Pool**: The overall pool of ad-libs has been doubled, now offering 15 distinct lines per personality (up from 7), and includes a wider array of quirkier lines to enhance variety and character personality.

## Related

[[Karen Project]],[[Audio Commentary and Ad-Lib System Improvements (Karen Project)]]
