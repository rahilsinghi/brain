---
title: Flock Audio Layer Feature
author: ai
created_at: 2026-04-10T21:37:52.134Z
last_ai_edit: 2026-04-10T21:37:52.134Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-audio-layer-ambient-music-elevenlabs-voice-sound-eff-cff78c.md]]"
tags:
  - audio
  - elevenlabs
  - web audio api
  - sound effects
  - ambient music
  - tts
  - flock
  - feature
  - api
  - javascript
  - typescript
---

# Flock Audio Layer Feature

This feature introduces a comprehensive audio layer to the Flock project, managing ambient background music, ElevenLabs-powered voice narration, and synthesized sound effects. It leverages the Web Audio API for precise control, including ambient music ducking during speech, and integrates with a custom API for text-to-speech generation. The system is designed to provide rich audio feedback for user interactions and application state.

## Key Concepts

Ambient Music,Text-to-Speech (TTS),Sound Effects,Web Audio API,Audio Ducking,API Integration,ElevenLabs,Oscillator Synthesis

## Details

This commit introduces a comprehensive audio layer to the [[Flock]] project, incorporating ambient music, AI-generated voice narration, and distinct sound effects.

### Core Components

#### 1. Audio Manager (`src/lib/audio/manager.ts`)
The `AudioManager` is responsible for controlling all audio playback within the application:

*   `startAmbientMusic()`: Initiates playback of a royalty-free ambient loop, gradually fading it in over 3 seconds.
*   `playVoice(text, color)`:
    *   Sends the `text` and `color` to the `/api/voice/speak` endpoint for TTS generation.
    *   Automatically *ducks* (reduces the volume of) the ambient music during speech playback.
    *   Restores the ambient music volume once the speech concludes.
    *   Leverages the [[Web Audio API]] for precise control over audio playback.
*   `playEffect(type)`: Generates synthesized sound effects using an oscillator based on the specified `type`:
    *   `propose`: A rising tone.
    *   `block`: A falling tone.
    *   `accept`: An ascending chime.
    *   `consensus`: A triumphant sweep.
    *   `join`: A quick ping.
*   `setAmbientVolume()`: A utility function primarily used for managing ambient music volume, particularly for ducking.

#### 2. Voice API (`POST /api/voice/speak`)
This backend API endpoint handles the text-to-speech generation:

*   **Input:** Accepts a JSON payload containing `text` (the message to be spoken) and `voice` (identifier, potentially linked to agent `color`).
*   **TTS Generation:** Utilizes the [[ElevenLabs]] text-to-speech service to convert the input text into audio.
*   **Output:** Returns an `audio/mpeg` buffer containing the generated speech.
*   **Configuration:** Maps agent colors to specific voice IDs, which are likely configured via environment variables.

### Integration
The audio layer is designed to be wired into the host page, with interactions like proposals triggering both voice narration and appropriate sound effects.

### Commit Details
*   **Repository:** `rahilsinghi/Flock`
*   **SHA:** `92555aa`
*   **Date:** `2026-03-21T18:29:19Z`
*   **Author:** [[Rahil Singhi]]
*   **Co-Authored By:** [[Claude Opus 4.6 (1M context)]]
*   **Changes:** 2 files changed, 207 additions, 0 deletions.

## Related

[[Flock]],[[ElevenLabs]],[[Web Audio API]],[[Rahil Singhi]],[[Claude Opus 4.6 (1M context)]]
