---
title: "Backend Fix: Socrata Timeout and Gemini Transcription Object Handling in askNYC"
author: ai
created_at: 2026-04-13T15:40:42.424Z
last_ai_edit: 2026-04-13T15:40:42.424Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-increase-socrata-timeout-and-fix-transcription-7e331a.md]]"
tags:
  - backend
  - bugfix
  - socrata
  - timeout
  - transcription
  - gemini_live
  - asknyc
  - error_handling
  - api
---

# Backend Fix: Socrata Timeout and Gemini Transcription Object Handling in askNYC

This article details a backend fix for the askNYC project, addressing Socrata query timeouts and resolving errors related to processing Gemini Live `Transcription` objects. The timeout for Socrata queries was increased, and `Transcription` objects are now explicitly converted to strings before use.

## Key Concepts

Socrata API,API Timeout,Gemini Live,Transcription Object,Error Handling,Backend Stability

## Details

This commit (`b6dff7b`) to the `rahilsinghi/askNYC` repository implements crucial backend stability improvements.

Two primary issues were addressed:

1.  **Socrata Query Timeout:** Socrata API queries were consistently timing out after 8 seconds. This fix increases the timeout duration to 15 seconds, improving the reliability and success rate of data retrieval from Socrata.
2.  **Gemini Live Transcription Object Handling:** The `Gemini Live` API returns `event.input_transcription` and `event.output_transcription` as `Transcription` objects, not standard strings. Previous attempts to slice or process these objects directly as strings led to application crashes. The solution involved explicitly wrapping these `Transcription` objects with `str()` at all four relevant call sites, ensuring they are correctly converted to string format before further manipulation.

These changes enhance the robustness and error handling of the [[askNYC]] backend, contributing to its overall stability. The update was authored by Rahil Singhi on 2026-03-28.

## Related

[[askNYC]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]],[[Backend Hardening (askNYC)]],[[Gemini Live]]
