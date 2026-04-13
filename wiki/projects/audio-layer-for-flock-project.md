---
title: Audio Layer for Flock Project
author: ai
created_at: 2026-04-12T22:10:00.565Z
last_ai_edit: 2026-04-12T22:10:00.565Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-audio-layer-ambient-music-elevenlabs-voice-sound-eff-cff78c.md]]"
tags:
  - audio
  - flock
  - elevenlabs
  - tts
  - web audio api
  - sound effects
  - api
  - backend
  - frontend
  - feature
---

# Audio Layer for Flock Project

This article details the implementation of an audio layer within the Flock project, providing ambient music, ElevenLabs-powered voice synthesis, and synthesized sound effects. It covers the `AudioManager` responsible for playback control and the `Voice API` endpoint for generating speech from text.

## Key Concepts

Web Audio API,Text-to-Speech (TTS),Ambient Music,Sound Effects,Voice Synthesis,API Endpoints,Audio Ducking

## Details

This implementation introduces a comprehensive audio layer to the [[Flock Project]], enhancing user experience with dynamic soundscapes.

### AudioManager (`src/lib/audio/manager.ts`)

The `AudioManager` module orchestrates all audio playback within the application. Its core functionalities include:

*   **`startAmbientMusic()`**: Loads a royalty-free ambient audio loop and fades it in over 3 seconds, creating a continuous background atmosphere.
*   **`playVoice(text, color)`**: Triggers voice synthesis via the `/api/voice/speak` endpoint. During voice playback, the ambient music is dynamically *ducked* (volume lowered) to ensure clarity. The original ambient volume is restored once the speech concludes. This function leverages the [[Web Audio API]] for precise control over playback and volume manipulation.
*   **`playEffect(type)`**: Generates synthesized sound effects using an oscillator, designed to provide auditory feedback for specific application events:
    *   `propose`: Rising tone
    *   `block`: Falling tone
    *   `accept`: Ascending chime
    *   `consensus`: Triumphant sweep
    *   `join`: Quick ping
*   **`setAmbientVolume()`**: A utility function used internally for ducking ambient music during voice playback.

### Voice API (`POST /api/voice/speak`)

The `/api/voice/speak` endpoint is a backend service responsible for generating speech from text. It accepts a JSON payload containing `text` and an optional `voice` parameter. This endpoint utilizes [[ElevenLabs]] for its [[Text-to-Speech]] (TTS) capabilities, returning an `audio/mpeg` buffer as a response. Agent colors are mapped to specific voice IDs configured in the environment, allowing for distinct voices for different agents.

This audio layer is designed to be easily wired into the host page, with proposals (for example) triggering corresponding voice output and sound effects.

## Related

[[Flock Project]],[[Web Audio API]],[[ElevenLabs]],[[Text-to-Speech]],[[Audio Layer Implementation for Flock Project]],[[Audio Commentary and Ad-Lib System Improvements (Karen Project)]],[[Audio Integration in Karen Project]],[[Audio Integration: ElevenLabs TTS, Quips, and Background Music in Karen Project]],[[Audio ML Pipeline with CLAP Embeddings and Librosa Features]],[[Audio: Commentary Timing Sync and Level-Aware Ad-Libs (Karen Project)]],[[Chore: Add QR Code for Judges (Flock Project)]],[[Claude Opus 4.6 (1M context)]]
