---
title: Audio Layer Implementation for Flock Project
author: ai
created_at: 2026-04-12T18:09:44.644Z
last_ai_edit: 2026-04-12T18:09:44.644Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-audio-layer-ambient-music-elevenlabs-voice-sound-eff-cff78c.md]]"
tags:
  - audio
  - sound
  - music
  - voice
  - tts
  - elevenlabs
  - web audio api
  - flock project
  - api
---

# Audio Layer Implementation for Flock Project

This article details the implementation of an audio layer within the [[Flock Project]], integrating ambient music, ElevenLabs Text-to-Speech (TTS) for agent voices, and synthesized sound effects. The system manages audio playback, including ducking ambient music during speech and mapping agent colors to specific voice IDs.

## Key Concepts

Ambient Music,ElevenLabs Text-to-Speech (TTS),Synthesized Sound Effects,Web Audio API,Audio Ducking,API Endpoints

## Details

The audio layer for the [[Flock Project]] is managed by an `AudioManager` (`src/lib/audio/manager.ts`) responsible for orchestrating various audio components:

*   **Ambient Music:**
    *   The `startAmbientMusic()` function loads a royalty-free ambient loop and fades it in over 3 seconds, providing background atmosphere.
    *   `setAmbientVolume()` is used to dynamically adjust the ambient music volume, particularly for 'ducking' it during voice playback.

*   **Voice Playback (ElevenLabs TTS):**
    *   The `playVoice(text, color)` function is central to agent communication.
    *   It makes an API call to `/api/voice/speak` to generate speech using [[ElevenLabs]] TTS.
    *   During speech playback, the ambient music is automatically 'ducked' (volume lowered) using the [[Web Audio API]] for precise control, and then restored afterwards.
    *   Agent colors are mapped to specific [[ElevenLabs]] voice IDs, configured via environment variables, to provide distinct vocal identities.

*   **Synthesized Sound Effects:**
    *   The `playEffect(type)` function generates various sound effects using an oscillator.
    *   Specific effects are implemented for different events:
        *   `propose`: A rising tone.
        *   `block`: A falling tone.
        *   `accept`: An ascending chime.
        *   `consensus`: A triumphant sweep.
        *   `join`: A quick ping.

**Voice API (`POST /api/voice/speak`):**
*   This [[API Endpoint]] accepts a `text` string and a `voice` identifier.
*   It leverages the [[ElevenLabs]] service to generate the corresponding [[Text-to-Speech (TTS)]] audio.
*   The API returns an `audio/mpeg` buffer, which the `AudioManager` then plays.

This audio layer is designed to be easily integrated with the host page, allowing specific application events (e.g., proposals) to trigger corresponding voice prompts and sound effects, enhancing user experience and feedback.

## Related

[[Flock Project]],[[ElevenLabs]],[[Audio Commentary and Ad-Lib System Improvements (Karen Project)]],[[Audio Integration: ElevenLabs TTS, Quips, and Background Music in Karen Project]],[[Audio: Commentary Timing Sync and Level-Aware Ad-Libs (Karen Project)]]
