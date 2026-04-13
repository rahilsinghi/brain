---
title: Whisper CLI Integration and Model Upgrade in Brain Project
author: ai
created_at: 2026-04-13T17:38:25.562Z
last_ai_edit: 2026-04-13T17:38:25.562Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-fix-voice-use-whisper-cli-binary-m-f-flags-resolve-model-73afb3.md]]"
tags:
  - whisper
  - voice transcription
  - cli
  - model upgrade
  - brain project
  - large-v3-turbo
---

# Whisper CLI Integration and Model Upgrade in Brain Project

This commit integrates the `whisper-cli` binary for voice transcription within the Brain Project, replacing previous methods. It introduces CLI flags for model and file specification, resolves model paths dynamically, and upgrades the underlying speech-to-text model to `large-v3-turbo` for improved accuracy.

## Key Concepts

Whisper (speech-to-text model),whisper-cli,large-v3-turbo (Whisper model),Voice Transcription,Command Line Interface (CLI) flags,Model path resolution

## Details

This commit, identified by SHA `1c4cae9` in the `rahilsinghi/brain` repository, focuses on a significant enhancement to the voice transcription capabilities. The change, authored by Rahil Singhi on 2026-04-09, involves refactoring the voice processing to utilize the `whisper-cli` binary.

Key changes include:
*   **Integration of `whisper-cli`:** The system now invokes the `whisper-cli` binary for performing speech-to-text tasks, replacing any prior custom or library-based implementations.
*   **CLI Flag Implementation:** New command-line flags, `-m` for specifying the model and `-f` for indicating the input audio file, have been introduced for interaction with the `whisper-cli` tool.
*   **Dynamic Model Path Resolution:** Logic has been added to intelligently resolve the path to the Whisper model files, ensuring flexibility and portability.
*   **Model Upgrade:** The default Whisper model used for transcription has been upgraded to `large-v3-turbo`, promising enhanced accuracy and performance for voice processing tasks.

The commit touched 5 files, adding 15 lines and deleting 10 lines, reflecting a focused modification to the voice transcription module.

## Related

[[Brain Project]],[[Add Cluster Type and Transcription/Voice Configuration (Brain Project)]],[[Add Voice Watcher, Daily Summary Cron, and System Activity Logging (Brain Project)]],[[askNYC: Model Update to Gemini 2.5 Flash Native Audio]],[[Backend Fix: Socrata Timeout and Gemini Transcription Object Handling in askNYC]]
