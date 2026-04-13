---
title: "Fix: Transcript Extraction, Audio Queuing, and Map Animations in askNYC"
author: ai
created_at: 2026-04-11T01:31:24.193Z
last_ai_edit: 2026-04-11T01:31:24.193Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-transcript-text-extraction-audio-queuing-and-map-anima-013508.md]]"
tags:
  - bug fix
  - asknyc
  - frontend
  - backend
  - audio
  - map
  - transcription
  - ux improvement
  - commit
---

# Fix: Transcript Extraction, Audio Queuing, and Map Animations in askNYC

This commit addresses critical issues in the askNYC project, improving the user experience by fixing transcript text extraction, implementing sequential audio chunk queuing for natural speech, enabling real-time display of partial transcripts, and refining map animations for smoother navigation.

## Key Concepts

[[Transcription]] Object Handling,[[AudioContext]] Scheduling,Real-time Partial Transcripts,Map Animation Conflict Resolution,Frontend-Backend Integration

## Details

This commit (`fe2a48a`) to the `rahilsinghi/askNYC` repository, authored by Rahil Singhi on 2026-03-28, introduces several key fixes across the backend and frontend to enhance the application's functionality and user experience.

### Backend Improvements

1.  **Transcript Text Extraction**: The backend was updated to extract the `.text` attribute directly from `Transcription` objects. Previously, the `str()` representation of these objects was being sent to the UI, resulting in verbose output like "text='...' finished=True". By directly accessing `.text`, only the spoken content is now delivered. Additionally, the `.finished` attribute is now correctly utilized to set the `partial` flag, ensuring accurate status reporting for ongoing transcriptions.

### Frontend Audio Enhancements

2.  **Sequential Audio Queuing**: The frontend audio playback mechanism was refactored to use `AudioContext` scheduling. This change implements sequential queuing of audio chunks, where each chunk is scheduled to start at `max(now, nextPlayTime)`. This resolves an issue where all audio chunks were playing simultaneously, leading to a "mechanical rapid-fire voice" effect. The new approach ensures natural, flowing speech output.

### Frontend Transcript Display

3.  **Real-time Partial Transcripts**: The logic for displaying transcripts was modified to remove the `!msg.partial` gate. This allows partial transcripts to be shown in real-time as speech is processed, providing immediate feedback to the user and creating a more dynamic streaming text experience.

### Frontend Map Animation Refinements

4.  **Map Animation Consistency**: The map's behavior was improved by ensuring that `mapCenter` is set on every pin event. This guarantees that the `flyTo` animation consistently triggers to the correct location. A duplicate `flyTo` call from the pin sync effect was removed to prevent competing animations, which could cause janky or unexpected map movements.

## Related

[[askNYC]],[[Transcription]],[[AudioContext]],[[Real-time Speech Transcription]],[[askNYC Cinematic Map Overhaul (feat)]],[[askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]]
