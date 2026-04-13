---
title: Transcript Text Extraction, Audio Queuing, and Map Animation Fixes in askNYC
author: ai
created_at: 2026-04-13T17:39:38.881Z
last_ai_edit: 2026-04-13T17:39:38.881Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-transcript-text-extraction-audio-queuing-and-map-anima-013508.md]]"
tags:
  - fix
  - asknyc
  - backend
  - frontend
  - transcription
  - audio
  - map
  - animation
  - bugfix
  - user experience
---

# Transcript Text Extraction, Audio Queuing, and Map Animation Fixes in askNYC

This update to the `rahilsinghi/askNYC` repository addresses critical issues related to backend transcription text extraction, frontend audio playback, and map animations. It ensures accurate real-time display of transcripts, prevents audio overlap, and guarantees consistent map navigation for pin events. These fixes significantly improve the user experience of the askNYC platform.

## Key Concepts

Transcription Object Processing,AudioContext Scheduling,Real-time Transcript Display,Map Animation Control,Frontend-Backend Synchronization

## Details

This commit (`fe2a48a`) from 2026-03-28 by Rahil Singhi introduces several important fixes to the `rahilsinghi/askNYC` project, impacting both backend and frontend functionalities. A total of 3 files were changed, with 21 additions and 19 deletions.

### Key Fixes Implemented:

1.  **Backend Transcription Text Extraction**: The backend was updated to correctly extract the `.text` attribute from `Transcription` objects. Previously, `str()` was used, which resulted in the full Python object representation (e.g., "text='...' finished=True") being displayed in the UI. The fix also leverages the `.finished` attribute to accurately set the partial flag for transcripts.
2.  **Frontend Audio Queuing**: To resolve issues with overlapping and rapid-fire audio playback, the frontend now queues audio chunks sequentially. This is achieved using `AudioContext` scheduling, where each chunk's start time is determined by `max(now, nextPlayTime)`, ensuring orderly playback.
3.  **Frontend Transcript Display**: The logic for displaying transcripts was modified to remove the `!msg.partial` gate. This change allows partial transcripts to be shown in real-time, providing a smoother streaming text experience as speech is processed.
4.  **Frontend Map Animations**: The map interaction was refined to ensure that `mapCenter` is updated on every pin event, guaranteeing that `flyTo` animations always trigger as expected. A duplicate `flyTo` call from the pin synchronization effect was removed to prevent conflicting animations and ensure a consistent user experience.

## Related

[[askNYC Project Documentation Overview]],[[askNYC Backend and Frontend Deployment to Cloud Run]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]],[[askNYC: Voice Pipeline Merge and Bugfixes (56ccaac)]],[[askNYC: Model Update to Gemini 2.5 Flash Native Audio]],[[askNYC: Floating Data Cards & Map FlyTo Fix (Commit 202fec2)]],[[askNYC: UI and Map Navigation Improvements (2026-03-28)]]
