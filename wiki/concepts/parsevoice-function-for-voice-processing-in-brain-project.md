---
title: parseVoice Function for Voice Processing in Brain Project
author: ai
created_at: 2026-04-12T21:06:32.425Z
last_ai_edit: 2026-04-12T21:06:32.425Z
last_human_edit: null
last_embedded_hash: f98796ad6a152b15
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-parsevoice-transcription-classification-f093f7.md]]"
tags:
  - voice processing
  - transcription
  - classification
  - markdown
  - sidecar
  - brain project
  - tdd
  - automation
  - log management
---


# parseVoice Function for Voice Processing in Brain Project

The `parseVoice` function, implemented in the `rahilsinghi/brain` repository, is a robust voice processing utility. It handles transcription, classification, and markdown file generation, ensuring idempotence through a `.processed` sidecar guard and maintaining daily activity logs with full Test-Driven Development (TDD) coverage.

## Key Concepts

[[parseVoice]] function,Voice Transcription,Voice Classification,Markdown File Generation,Sidecar Guard,Daily Log Entry,[[Test-Driven Development]] (TDD)

## Details

The `parseVoice` function (SHA: `045f4c9`) was introduced into the [[Brain Project]] by Rahil Singhi on 2026-04-09. This function provides a comprehensive pipeline for processing voice data, integrating several key functionalities:

*   **Transcription**: Converts audio input into text.
*   **Classification**: Categorizes the transcribed content.
*   **Markdown Drop**: Processes the content and generates markdown files, saving them to `raw/{cluster}/` directories.
*   **Idempotent Sidecar Guard**: Utilizes a `.processed` sidecar file to prevent redundant processing, ensuring that each voice input is processed only once.
*   **Daily Log Entry**: Automatically appends an entry to a daily activity log, likely managed by `appendDailyEntry`, contributing to system activity tracking.

The implementation follows [[Test-Driven Development]] (TDD) principles, boasting a suite of five dedicated tests to ensure its reliability and correctness. The development of this feature was co-authored by [[Claude Sonnet 4.6]].

## Related

[[Brain Project]],[[Add Cluster Type and Transcription/Voice Configuration]],[[Add Voice Watcher, Daily Summary Cron, and System Activity Logging (Brain Project)]],[[Test-Driven Development]],[[Claude Sonnet 4.6]]
