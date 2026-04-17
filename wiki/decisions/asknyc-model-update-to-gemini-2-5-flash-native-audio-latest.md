---
title: "askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest"
author: ai
created_at: 2026-04-10T15:22:59.090Z
last_ai_edit: 2026-04-10T15:22:59.090Z
last_human_edit: null
last_embedded_hash: d74022b19d10e985
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-merge-model-update-to-gemini-25-flash-native-audio-late-ebbfcc.md]]"
tags:
  - fix
  - model update
  - gemini
  - audio
  - asknyc
  - stability
  - commit
  - live audio
---


# askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest

This commit updates the `askNYC` repository to utilize the `gemini-2.5-flash-native-audio-latest` model for live audio processing. Extensive testing by Chinmay revealed this model to be the only stable option for live audio, as `gemini-3.1-flash-live-preview` experienced internal errors.

## Key Concepts

- Model Update,- Live Audio Processing,- Gemini Models,- Stability Testing

## Details

A model update was implemented in the `rahilsinghi/askNYC` repository, specifically targeting the live audio processing capabilities. This change was committed on 2026-03-28T03:09:22Z by Rahil Singhi, identified by SHA `02c6049`.

Prior to this update, Chinmay conducted thorough testing across various available models to ascertain their suitability for stable live audio interactions. The testing concluded that `gemini-2.5-flash-native-audio-latest` was the only model capable of providing a stable live audio experience.

Conversely, the `gemini-3.1-flash-live-preview` model, despite being a newer iteration, consistently failed during tests, reporting internal errors. This instability led to the decision to adopt `gemini-2.5-flash-native-audio-latest`.

The commit involved changes across 4 files, with +7 additions and -5 deletions, reflecting the necessary adjustments to integrate the new model.

## Related

[[askNYC]],[[Gemini-2.5-Flash-Native-Audio-Latest]],[[Gemini-3.1-Flash-Live-Preview]],[[Rahil Singhi]],[[Chinmay]]
