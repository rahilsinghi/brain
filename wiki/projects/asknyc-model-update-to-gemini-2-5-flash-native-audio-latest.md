---
title: "askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest"
author: ai
created_at: 2026-04-12T22:20:52.158Z
last_ai_edit: 2026-04-12T22:20:52.158Z
last_human_edit: null
last_embedded_hash: 2d59daaf366b92ba
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-merge-model-update-to-gemini-25-flash-native-audio-late-ebbfcc.md]]"
tags:
  - asknyc
  - gemini
  - model update
  - audio
  - fix
  - stability
  - live audio
---


# askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest

This commit updates the [[askNYC]] project to utilize the `gemini-2.5-flash-native-audio-latest` model. This decision was made following extensive testing which confirmed its stability for live audio processing, unlike the `gemini-3.1-flash-live-preview` model that encountered internal errors.

## Key Concepts

[[Gemini-2.5-Flash-Native-Audio-Latest]],[[Gemini-3.1-Flash-Live-Preview]],[[Live Audio Model]],Model Stability,Internal Errors

## Details

This commit, with SHA `02c6049` authored by [[Rahil Singhi]] on `2026-03-28T03:09:22Z`, merges an update for the [[rahilsinghi/askNYC]] repository. The primary change involves switching the AI model used for live audio processing.

After comprehensive testing by Chinmay, it was determined that `gemini-2.5-flash-native-audio-latest` is the only stable and reliable model for live audio applications within the project. The alternative, `gemini-3.1-flash-live-preview`, repeatedly failed due to internal errors, rendering it unsuitable for production use.

The change involved modifying 4 files, with 7 additions and 5 deletions to integrate the new model.

## Related

[[askNYC — Git Activity]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[askNYC: Update Gemini Model to Gemini 2.5 Flash]],[[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]],[[AskNYC Model Update: Gemini 2.5 Flash Native Audio]],[[AskNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]]
