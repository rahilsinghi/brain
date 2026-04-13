---
title: Whisper-CLI Integration and large-v3-turbo Model Upgrade in Brain Project
author: ai
created_at: 2026-04-12T22:03:48.877Z
last_ai_edit: 2026-04-12T22:03:48.877Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-fix-voice-use-whisper-cli-binary-m-f-flags-resolve-model-73afb3.md]]"
tags:
  - whisper-cli
  - voice transcription
  - model upgrade
  - large-v3-turbo
  - brain project
  - fix
  - commit
---

# Whisper-CLI Integration and large-v3-turbo Model Upgrade in Brain Project

This commit refactors the voice transcription system in the [[brain — Git Activity]] project. It transitions to using the `whisper-cli` binary, explicitly setting model flags, and upgrading the transcription model to `large-v3-turbo`.
The change aims to improve transcription performance and accuracy by leveraging a more advanced model and a dedicated CLI tool.

## Key Concepts

Whisper-CLI,Voice Transcription,large-v3-turbo Model,Model Upgrade,Model Path Resolution

## Details

This commit, originating from the `rahilsinghi/brain` repository, implements a significant update to the project's voice transcription capabilities. The core change involves transitioning the transcription process to utilize the `whisper-cli` binary. This entails explicitly passing the `-m` (model) and `-f` (file) flags to the `whisper-cli` command to define the input and desired model.

A crucial aspect of this update is the proper resolution of the model path, ensuring that the `whisper-cli` binary can accurately locate and load the necessary transcription models. Furthermore, the chosen transcription model has been upgraded to `large-v3-turbo`. This upgrade indicates an effort to enhance the accuracy, robustness, and overall quality of the voice-to-text conversion within the project.

## Related

[[brain — Git Activity]],[[Add Cluster Type and Transcription/Voice Configuration]],[[Add Voice Watcher, Daily Summary Cron, and System Activity Logging (Brain Project)]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]]
