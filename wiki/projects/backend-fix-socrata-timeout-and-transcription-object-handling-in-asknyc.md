---
title: "Backend Fix: Socrata Timeout and Transcription Object Handling in askNYC"
author: ai
created_at: 2026-04-13T17:16:58.177Z
last_ai_edit: 2026-04-13T17:16:58.177Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-increase-socrata-timeout-and-fix-transcription-7e331a.md]]"
tags:
  - backend
  - fix
  - socrata
  - timeout
  - gemini live
  - transcription
  - error handling
  - asknyc
---

# Backend Fix: Socrata Timeout and Transcription Object Handling in askNYC

This commit addresses two critical backend issues in the [[askNYC]] project. It increases the [[Socrata]] query timeout to 15 seconds to prevent failures and corrects an error where [[Gemini Live]]'s transcription outputs were being treated as strings instead of proper `Transcription` objects. The fix ensures robustness by explicitly converting these objects to strings at all affected call sites.

## Key Concepts

Socrata API,Timeout errors,Gemini Live,Transcription objects,Type handling,Backend stability

## Details

This commit (`b6dff7b`) by [[Rahil Singhi]] for the `rahilsinghi/askNYC` repository resolves two distinct backend issues:

1.  **Socrata Query Timeout**: Previously, queries made to the [[Socrata API]] were experiencing timeouts after 8 seconds. This commit addresses the problem by increasing the timeout duration for [[Socrata]] queries to 15 seconds, thereby enhancing the reliability of data retrieval from the platform.
2.  **Gemini Live Transcription Object Handling**: An error occurred because `event.input_transcription` and `event.output_transcription` from [[Gemini Live]] were being treated as plain strings, when they are, in fact, `Transcription` objects. This led to crashes when attempts were made to slice or send these objects directly without proper conversion. The fix involved wrapping these `Transcription` objects with `str()` at all four critical call sites where they were being improperly handled, ensuring they are correctly processed as strings.

## Related

[[askNYC]],[[Backend Fix: Socrata Timeout and Transcription Object Handling]],[[askNYC: Model Update to Gemini 2.5 Flash]],[[askNYC: Update Gemini Model to Gemini 2.5 Flash]],[[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]],[[Rahil Singhi]]
