---
title: "Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)"
author: ai
created_at: 2026-04-10T15:09:57.581Z
last_ai_edit: 2026-04-10T15:09:57.581Z
last_human_edit: null
last_embedded_hash: 121e56624f02abca
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-increase-socrata-timeout-and-fix-transcription-7e331a.md]]"
tags:
  - backend
  - socrata
  - timeout
  - error
  - transcription
  - bugfix
  - python
  - api
  - asknyc
---


# Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)

This update addresses two critical backend issues in the `askNYC` project: increasing the Socrata query timeout from 8s to 15s to prevent timeouts, and correctly handling `Transcription` objects by converting them to strings before processing to avoid crashes.

## Key Concepts

* Socrata API Integration,* API Timeout,* Transcription Objects,* Type Mismatch Errors,* Error Handling

## Details

This backend fix for the `rahilsinghi/askNYC` repository (SHA: `b6dff7b`, authored by Rahil Singhi on 2026-03-28) resolves two distinct issues:

1.  **Socrata Timeout Increase**: Previously, queries to the Socrata API were timing out at 8 seconds. This change extends the timeout period to 15 seconds, aiming to improve reliability for data retrieval.

2.  **Transcription Object Handling**: During a Gemini Live event, it was identified that `event.input_transcription` and `event.output_transcription` were `Transcription` objects, not standard strings. Attempting to slice or send these objects directly led to crashes. The fix involves wrapping these objects with `str()` at all four call sites to ensure they are handled as strings, preventing further errors.

These changes involved 2 files, resulting in +7 additions and -5 deletions.

## Related

[[Socrata]],[[API Integration]],[[Error Handling]],[[Python Type Conversion]],[[Gemini Live]],[[askNYC Project]]
