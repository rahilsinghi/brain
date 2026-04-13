---
title: "askNYC: Model Update to Gemini 2.5 Flash Native Audio"
author: ai
created_at: 2026-04-11T01:42:03.992Z
last_ai_edit: 2026-04-11T01:42:03.992Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-merge-model-update-to-gemini-25-flash-native-audio-late-ebbfcc.md]]"
tags:
  - asknyc
  - llm
  - gemini
  - audio
  - modelupdate
  - stability
  - fix
---

# askNYC: Model Update to Gemini 2.5 Flash Native Audio

This commit updates the `rahilsinghi/askNYC` project to use the `gemini-2.5-flash-native-audio-latest` model for stable live audio processing. Extensive testing revealed this model to be the only stable option, as `gemini-3.1-flash-live-preview` experienced internal errors.

## Key Concepts

[[Large Language Models (LLMs)]],[[Live Audio Processing]],[[Model Stability]],[[Vertex AI]]

## Details

A model update was merged into the `rahilsinghi/askNYC` repository under commit `02c6049` on 2026-03-28 by Rahil Singhi.

The update specifically targeted the LLM model used for live audio processing within the application. Chinmay conducted comprehensive testing across available models, determining that `gemini-2.5-flash-native-audio-latest` was the only model providing stable live audio functionality. In contrast, the `gemini-3.1-flash-live-preview` model consistently failed with internal errors during testing.

This change involved modifications to 4 files, with 7 additions and 5 deletions.

## Related

[[askNYC — Git Activity]],[[askNYC: Update Gemini Model to Gemini 2.5 Flash]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]],[[Rahil Singhi]],[[Chinmay]]
