---
title: "Fix: Transcript Text Extraction, Audio Queuing, and Map Animations in askNYC"
author: ai
created_at: 2026-04-12T22:06:55.523Z
last_ai_edit: 2026-04-12T22:06:55.523Z
last_human_edit: null
last_embedded_hash: e889f9c0af768f1c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-transcript-text-extraction-audio-queuing-and-map-anima-013508.md]]"
tags:
  - backend
  - frontend
  - audio
  - map
  - transcription
  - bugfix
  - asknyc
  - user experience
---


# Fix: Transcript Text Extraction, Audio Queuing, and Map Animations in askNYC

This commit addresses critical issues in the `askNYC` project related to real-time transcript display, audio playback sequencing, and map animation behavior. It improves the user experience by ensuring accurate text streaming, natural-sounding audio, and consistent map navigation.

## Key Concepts

[[Transcript Text Extraction]],[[Audio Queuing]],[[Map Animations]],[[AudioContext]],[[flyTo]],[[Partial Transcripts]],[[Transcription Objects]]

## Details

This commit (`fe2a48a`) by Rahil Singhi on 2026-03-28 introduced several key fixes to the `rahilsinghi/askNYC` repository, addressing issues across both the backend and frontend components.

1.  **Backend Fix for Transcript Text Extraction**: The backend was updated to correctly extract the `.text` attribute from `Transcription` objects. Previously, using `str()` on these objects would dump their full string representation (e.g., `"text='...' finished=True"`) directly into the UI, rather than just the spoken text. Additionally, the `.finished` attribute of the `Transcription` object is now correctly utilized to set the `partial` flag, ensuring accurate real-time status.

2.  **Frontend Audio Queuing Enhancement**: An issue causing audio chunks to play simultaneously, resulting in a rapid-fire, mechanical voice, was resolved. The frontend audio system now queues chunks sequentially using `AudioContext` scheduling. This is achieved by calculating `startAt = max(now, nextPlayTime)`, which ensures each audio segment begins after the previous one finishes or at the current time if it's already past due.

3.  **Frontend Transcript Real-time Streaming**: The transcript display was improved to show partial transcripts. By removing the `!msg.partial` gate, text now streams in real-time as speech is being processed, enhancing the responsiveness and user experience.

4.  **Frontend Map Animation Consistency**: Map navigation was made more reliable by ensuring that `mapCenter` is set on every pin event, guaranteeing that the `flyTo` animation always triggers as expected. A duplicate `flyTo` call from the pin sync effect was removed to prevent competing animations and ensure smoother, more predictable map behavior.

## Related

[[askNYC — Git Activity]],[[askNYC Frontend Backend Integration (March 2026)]],[[askNYC: Mobile UI Enhancements & Pipeline Fixes]],[[askNYC: Model Update to Gemini 2.5 Flash Native Audio]],[[askNYC Cinematic Map Overhaul (feat)]],[[askNYC: Remote Image Capture and Dashboard Integration (PR #4 Merge)]],[[askNYC: Fix - Real Session Data and Navigation Integration]]
