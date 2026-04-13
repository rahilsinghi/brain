---
title: Model Update to Gemini-2.5-Flash-Native-Audio-Latest in askNYC
author: ai
created_at: 2026-04-13T17:47:26.297Z
last_ai_edit: 2026-04-13T17:47:26.297Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-merge-model-update-to-gemini-25-flash-native-audio-late-ebbfcc.md]]"
tags:
  - asknyc
  - model update
  - gemini
  - audio
  - bug fix
  - stability
---

# Model Update to Gemini-2.5-Flash-Native-Audio-Latest in askNYC

This article details a critical model update for the askNYC project, switching to `gemini-2.5-flash-native-audio-latest` as the stable live audio model. Extensive testing revealed that the `gemini-3.1-flash-live-preview` model was unstable, frequently encountering internal errors. This change ensures reliable audio functionality within the askNYC application.

## Key Concepts

Gemini-2.5-Flash-Native-Audio-Latest,Gemini-3.1-Flash-Live-Preview,Live Audio Model,Model Stability,Internal Errors

## Details

A model update was merged into the `rahilsinghi/askNYC` repository with SHA `02c6049` on 2026-03-28T03:09:22Z by Rahil Singhi. The primary goal of this update was to establish a stable live audio model for the askNYC application.

During testing, it was determined by Chinmay that `gemini-2.5-flash-native-audio-latest` was the only consistently stable live audio model among those available. Conversely, the `gemini-3.1-flash-live-preview` model exhibited frequent internal errors, rendering it unsuitable for production use.

The commit involved changes across 4 files, with 7 additions and 5 deletions, reflecting the necessary configurations to integrate the stable Gemini model.

## Related

[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[askNYC: Model Update to Gemini 2.5 Flash]],[[askNYC: Update Gemini Model to Gemini 2.5 Flash]],[[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]],[[Rahil Singhi]],[[Chinmay]]
