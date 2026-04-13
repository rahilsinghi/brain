---
title: "Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)"
author: ai
created_at: 2026-04-12T21:28:09.030Z
last_ai_edit: 2026-04-12T21:28:09.030Z
last_human_edit: null
last_embedded_hash: 9b42317f2ae40161
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-increase-socrata-timeout-and-fix-transcription-7e331a.md]]"
tags:
  - asknyc
  - backend
  - fix
  - socrata
  - gemini
  - transcription
  - timeout
  - error-handling
---


# Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)

This commit addresses two critical backend issues in the askNYC project: an insufficient Socrata query timeout and an error caused by incorrect handling of Gemini Live's `Transcription` objects. The Socrata timeout was increased to 15 seconds, and `Transcription` objects are now explicitly converted to strings before processing, resolving crashes.

## Key Concepts

Socrata API,Timeout,Gemini Live,Transcription Object,Backend Fix,Error Handling

## Details

This commit, identified by SHA `b6dff7b` in the [[askNYC — Git Activity]] repository, implements crucial fixes for the backend infrastructure. The primary issues resolved are:

1.  **Socrata Query Timeout:** Socrata API queries were frequently timing out after 8 seconds. This timeout period has been extended to 15 seconds to accommodate longer-running queries and improve system stability.
2.  **Gemini Live Transcription Object Handling:** The `event.input_transcription` and `event.output_transcription` properties from Gemini Live were being returned as `Transcription` objects, not raw strings as implicitly expected. Attempting to slice or process these objects directly led to application crashes. The fix involves explicitly wrapping these `Transcription` objects with `str()` at all four call sites where they are used, ensuring they are correctly converted to string format before further processing.

## Related

[[askNYC — Git Activity]],[[Backend Fix: Socrata Timeout and Transcription Object Handling]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]],[[askNYC]],[[AskNYC Model Update: Gemini 2.5 Flash Native Audio]]
