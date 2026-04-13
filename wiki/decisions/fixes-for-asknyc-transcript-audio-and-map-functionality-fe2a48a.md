---
title: Fixes for askNYC Transcript, Audio, and Map Functionality (fe2a48a)
author: ai
created_at: 2026-04-10T21:35:57.439Z
last_ai_edit: 2026-04-10T21:35:57.439Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-transcript-text-extraction-audio-queuing-and-map-anima-013508.md]]"
tags:
  - asknyc
  - fix
  - bugfix
  - backend
  - frontend
  - transcript
  - audio
  - map
  - development
  - ux-improvement
---

# Fixes for askNYC Transcript, Audio, and Map Functionality (fe2a48a)

This commit addresses critical issues within the `askNYC` project's backend and frontend, improving transcript text extraction, refining audio chunk queuing, and enhancing map animations. These changes aim to deliver a more accurate, fluid, and real-time user experience for speech interaction.

## Key Concepts

- Transcript text extraction
- Audio queuing and scheduling
- Map animation control
- Backend data handling
- Frontend UI rendering
- Real-time communication

## Details

This commit, identified by SHA `fe2a48a` and authored by Rahil Singhi on 2026-03-28, implements significant fixes across several components of the `askNYC` application. These changes impact three files, resulting in a net addition of 2 lines.

1.  **Backend Transcript Extraction**: The backend now correctly extracts the `.text` property from `Transcription` objects. Previously, using `str()` would dump the full object representation (e.g., `"text='...' finished=True"`) into the UI. The `.finished` property is also now used to accurately set the partial flag for transcripts.

2.  **Frontend Audio Queuing**: A new sequential queuing mechanism for audio chunks has been implemented on the frontend using `AudioContext` scheduling. Chunks are scheduled to play at `max(now, nextPlayTime)`, resolving an issue where simultaneous playback created an undesirable 'mechanical rapid-fire voice'.

3.  **Frontend Transcript Display**: The frontend transcript display has been updated to show partial transcripts in real-time. By removing the `!msg.partial` gate, text now streams as speech is processed, significantly improving the responsiveness of the UI.

4.  **Frontend Map Animations**: The `mapCenter` is now consistently set on every pin event, ensuring that `flyTo` animations always trigger as expected. A redundant `flyTo` call from the pin synchronization effect was removed to prevent conflicting animations and ensure smoother map interactions.

## Related

- [[askNYC Project]]
- [[Real-time Speech Transcription]]
- [[Audio Playback Systems]]
- [[Interactive Map Components]]
- [[fe2a48a]]
