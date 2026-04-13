---
title: "Fix: Merge Model Update to Gemini-2.5-Flash-Native-Audio-Latest"
author: ai
created_at: 2026-04-11T01:36:53.627Z
last_ai_edit: 2026-04-11T01:36:53.627Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-merge-model-update-to-gemini-25-flash-native-audio-late-ebbfcc.md]]"
tags:
  - asknyc
  - gemini
  - model update
  - audio model
  - bug fix
  - stability
  - live audio
---

# Fix: Merge Model Update to Gemini-2.5-Flash-Native-Audio-Latest

This commit updates the `askNYC` project to use `gemini-2.5-flash-native-audio-latest` as the primary live audio model. Extensive testing revealed it to be the only stable option, while `gemini-3.1-flash-live-preview` experienced internal errors.

## Key Concepts

Gemini 2.5 Flash Native Audio,Gemini 3.1 Flash Live Preview,Live Audio Model,Model Stability,Internal Errors

## Details

This update, commit `02c6049` by Rahil Singhi on 2026-03-28T03:09:22Z, in the `rahilsinghi/askNYC` repository, involved changing 4 files with 7 additions and 5 deletions.

The core reason for this change was the need for a stable live audio model. Testing conducted by Chinmay confirmed that `gemini-2.5-flash-native-audio-latest` is the only model currently providing stable live audio functionality. In contrast, `gemini-3.1-flash-live-preview` consistently failed due to internal errors, making it unsuitable for the project's requirements.

## Related

[[askNYC — Git Activity]],[[AskNYC Model Update: Gemini 2.5 Flash Native Audio]],[[askNYC: Update Gemini Model to Gemini 2.5 Flash]],[[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]],[[AskNYC Model Update: Gemini 2.5 Flash Native Audio]],[[Gemini Model]]
