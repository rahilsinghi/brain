---
title: "Backend Fix: Socrata Timeout and Transcription Object Handling"
author: ai
created_at: 2026-04-11T00:18:48.843Z
last_ai_edit: 2026-04-11T00:18:48.843Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-increase-socrata-timeout-and-fix-transcription-7e331a.md]]"
tags:
  - backend
  - fix
  - socrata
  - timeout
  - transcription
  - error_handling
  - asknyc
  - gemini
  - python
---

# Backend Fix: Socrata Timeout and Transcription Object Handling

This update addresses two critical backend issues in the `askNYC` project: increasing the Socrata query timeout to prevent failures and correcting the handling of `Transcription` objects from Gemini Live. By explicitly converting `Transcription` objects to strings, the system avoids crashes caused by incorrect data type assumptions.

## Key Concepts

[[Socrata]] Query Timeout,[[Transcription Objects]],[[Gemini Live]] API,Backend Error Handling,Data Type Coercion

## Details

This commit (`b6dff7b`) for the [[askNYC]] project introduces a fix for two backend issues:

1.  **Socrata Query Timeout:** Socrata queries were timing out after 8 seconds. The timeout period has been increased to 15 seconds to prevent these failures.
2.  **Transcription Object Handling:** The `Gemini Live` API returns `event.input_transcription` and `event.output_transcription` as `Transcription` objects, not raw strings. Attempting to slice or send these objects directly as strings caused crashes. The fix involves explicitly wrapping these `Transcription` objects with `str()` at all four call sites before processing them.

## Related

[[askNYC — Git Activity]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]],[[Socrata]],[[AskNYC Model Update: Gemini 2.5 Flash Native Audio]],[[Transcription/Voice Configuration]],[[Backend Socrata Tool Return Type Refactor for ADK Compatibility]]
