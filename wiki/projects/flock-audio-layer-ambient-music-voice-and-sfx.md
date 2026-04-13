---
title: "Flock Audio Layer: Ambient Music, Voice, and SFX"
author: ai
created_at: 2026-04-10T17:34:45.061Z
last_ai_edit: 2026-04-10T17:34:45.061Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-audio-layer-ambient-music-elevenlabs-voice-sound-eff-cff78c.md]]"
tags:
  - audio
  - sfx
  - elevenlabs
  - tts
  - web audio api
  - commit
  - feature
  - flock
  - ambient music
  - audio ducking
---

# Flock Audio Layer: Ambient Music, Voice, and SFX

This article details the implementation of the audio layer within the Flock project, introduced in commit `92555aa`. It integrates ambient background music, ElevenLabs-powered text-to-speech voice generation, and synthesized sound effects. A dedicated audio manager orchestrates all sound, supported by a voice API.

## Key Concepts

Audio Layer,Ambient Music,ElevenLabs TTS,Sound Effects (SFX),Web Audio API,Audio Ducking,API Integration

## Details

This commit (`92555aa`) introduces a comprehensive audio layer to the `Flock` project, enhancing user experience with dynamic sound. The implementation consists of an `Audio Manager` and a `Voice API`, co-authored with Claude Opus 4.6.

### Audio Manager (`src/lib/audio/manager.ts`)
The `Audio Manager` is responsible for orchestrating all audio elements:
-   **Ambient Music**: Features `startAmbientMusic()` to load a royalty-free ambient loop, fading it in over 3 seconds. The volume can be adjusted via `setAmbientVolume()`, primarily used for audio ducking.
-   **Voice Playback**: The `playVoice(text, color)` function handles speech playback. It makes a call to the `/api/voice/speak` endpoint to generate audio, and critically, it **ducks the ambient music** during speech and restores its volume afterward. Playback leverages the **Web Audio API** for precise control.
-   **Sound Effects**: `playEffect(type)` synthesizes various sound effects using an oscillator for immediate feedback:
    -   **`propose`**: A rising tone.
    -   **`block`**: A falling tone.
    -   **`accept`**: An ascending chime.
    -   **`consensus`**: A triumphant sweep.
    -   **`join`**: A quick ping.

### Voice API (`POST /api/voice/speak`)
This dedicated API endpoint facilitates text-to-speech functionality:
-   It accepts a `text` string and a `voice` identifier as input.
-   Internally, it integrates with **ElevenLabs TTS** to generate high-quality speech audio.
-   The API returns an `audio/mpeg` buffer, ready for playback.
-   Agent colors are mapped to specific ElevenLabs voice IDs, configurable via environment variables, allowing for distinct voices for different participants.

### Integration
The audio layer is designed to be wired into the host page, with proposals and other interactions triggering appropriate voice responses and sound effects, creating a more interactive and immersive environment.

## Related

[[Flock (Project)]],[[ElevenLabs]],[[Web Audio API]]
