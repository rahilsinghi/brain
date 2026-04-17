---
title: "Backend Fix: Socrata Timeout and Transcription Object Handling"
author: ai
created_at: 2026-04-10T21:15:36.672Z
last_ai_edit: 2026-04-10T21:15:36.672Z
last_human_edit: null
last_embedded_hash: 6c530bb830bdba40
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-increase-socrata-timeout-and-fix-transcription-7e331a.md]]"
tags:
  - backend
  - bug fix
  - socrata
  - timeout
  - transcription
  - gemini
  - python
  - api
  - error handling
---


# Backend Fix: Socrata Timeout and Transcription Object Handling

This article details a backend fix in the `rahilsinghi/askNYC` repository addressing two issues: Socrata API queries timing out and incorrect handling of `Transcription` objects from Gemini Live events. The fix involved increasing the Socrata timeout to 15 seconds and explicitly converting `Transcription` objects to strings.

## Key Concepts

Socrata API,Timeout Configuration,Transcription Objects,Type Casting (str()),Backend Bug Fixes,Gemini Live Event Processing

## Details

This backend fix, identified by SHA `b6dff7b` and committed on `2026-03-28T14:50:30Z` by Rahil Singhi in the `rahilsinghi/askNYC` repository, resolved two distinct issues:

*   **Socrata Query Timeout:** Socrata API queries were consistently timing out after 8 seconds. This timeout duration was deemed insufficient, especially during critical operations like [[Gemini Live]] events. The fix involved increasing the timeout threshold to 15 seconds, allowing more time for queries to complete successfully.

*   **Transcription Object Subscript Error:** During [[Gemini Live]] event processing, `event.input_transcription` and `event.output_transcription` were found to be `Transcription` objects rather than the expected string types. Attempting to directly slice or process these objects as strings led to application crashes. The solution implemented was to explicitly wrap these `Transcription` objects with `str()` at all four relevant call sites, ensuring they are correctly converted to string representations before further processing and preventing runtime errors.

## Related

[[Socrata]],[[Gemini Live]],[[API Timeout]],[[Type Casting]],[[Backend Engineering]]
