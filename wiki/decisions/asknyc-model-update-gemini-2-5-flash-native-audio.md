---
title: "AskNYC Model Update: Gemini 2.5 Flash Native Audio"
author: ai
created_at: 2026-04-10T21:43:45.592Z
last_ai_edit: 2026-04-10T21:43:45.592Z
last_human_edit: null
last_embedded_hash: 2a057b983e39f6e4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-merge-model-update-to-gemini-25-flash-native-audio-late-ebbfcc.md]]"
tags:
  - model update
  - gemini
  - live audio
  - asknyc
  - fix
  - llm
  - testing
  - stability
---


# AskNYC Model Update: Gemini 2.5 Flash Native Audio

This commit for the `askNYC` project updates the integrated language model to `gemini-2.5-flash-native-audio-latest` for live audio processing. Extensive testing confirmed this model as the only stable option, as others like `gemini-3.1-flash-live-preview` encountered internal errors.

## Key Concepts

gemini-2.5-flash-native-audio-latest,gemini-3.1-flash-live-preview,Live audio model,Model stability,LLM integration

## Details

This commit, identified by SHA `02c6049`, was authored by [[Rahil Singhi]] on 2026-03-28T03:09:22Z within the `rahilsinghi/askNYC` repository. The primary purpose was to update the integrated language model for live audio capabilities.

Extensive testing conducted by [[Chinmay]] indicated that `gemini-2.5-flash-native-audio-latest` was the only stable and reliable model for live audio processing among the available options. Other models, specifically `gemini-3.1-flash-live-preview`, were found to fail consistently with internal errors during testing.

The update involved changes to 4 files, with 7 additions and 5 deletions, reflecting the configuration adjustments necessary for the new model integration.

## Related

[[Rahil Singhi]],[[Chinmay]],[[AskNYC Project]],[[Gemini Models]],[[Large Language Models]],[[Live Audio Processing]]
