---
title: Fixes for Transcript Text, Audio Queuing, and Map Animations in askNYC
author: ai
created_at: 2026-04-10T15:19:14.801Z
last_ai_edit: 2026-04-10T15:19:14.801Z
last_human_edit: null
last_embedded_hash: ad212b1c41989b35
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-transcript-text-extraction-audio-queuing-and-map-anima-013508.md]]"
tags:
  - asknyc
  - fix
  - bugfix
  - transcript
  - audio
  - map
  - frontend
  - backend
  - javascript
  - python
  - commit
---


# Fixes for Transcript Text, Audio Queuing, and Map Animations in askNYC

This article documents a set of crucial fixes implemented in the `askNYC` project, addressing issues with transcript text extraction, audio chunk queuing, and map animation behavior. These updates significantly enhance the real-time user experience for speech-to-text and interactive map features.

## Key Concepts

Transcript Text Extraction,Audio Queuing,Map Animations,Partial Transcripts,AudioContext API,Speech-to-Text,Pin Events

## Details

This entry details a set of important fixes implemented in the `askNYC` project, committed on March 28, 2026.

### Commit Details
- **Repo:** `rahilsinghi/askNYC`
- **SHA:** `fe2a48a`
- **Date:** `2026-03-28T15:13:13Z`
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +21
- **Deletions:** -19

### Implemented Fixes

1.  **Backend: Transcript Text Extraction Improvement**
    Previously, the backend was extracting the `str()` representation of `Transcription` objects, which led to verbose and unhelpful output like `"text='...' finished=True"` in the UI. This fix updates the extraction logic to directly use the `.text` attribute from `Transcription` objects. Additionally, the `.finished` attribute is now correctly utilized to set the partial flag, improving the accuracy of transcript completion status.

2.  **Frontend Audio: Sequential Audio Queuing**
    A significant improvement was made to the frontend audio playback. The previous implementation played all audio chunks simultaneously, resulting in a rapid-fire, mechanical voice effect. The new approach utilizes `AudioContext` scheduling to queue chunks sequentially. This is achieved by calculating `startAt = max(now, nextPlayTime)`, ensuring that audio segments play one after another for a natural-sounding voice.

3.  **Frontend Transcript: Real-time Partial Transcripts**
    To provide a more dynamic and real-time user experience, the frontend transcript display was updated to show partial transcripts as they become available. This was accomplished by removing the `!msg.partial` gate, allowing text to stream into the UI during speech and enhancing the perceived responsiveness of the application.

4.  **Frontend Map: Optimized Map Animations**
    Map animations related to pin events were refined. The `mapCenter` is now explicitly set on every pin event, guaranteeing that the `flyTo` animation always triggers correctly. A duplicate `flyTo` call from the pin sync effect was removed to prevent competing animations and ensure smoother, more predictable map movement.

## Related

[[askNYC]],[[Transcription Service]],[[AudioContext API]],[[Map Interface]],[[Real-time UI]]
