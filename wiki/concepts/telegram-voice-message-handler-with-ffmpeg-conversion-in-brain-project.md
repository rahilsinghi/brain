---
title: Telegram Voice Message Handler with FFmpeg Conversion in Brain Project
author: ai
created_at: 2026-04-13T17:18:17.855Z
last_ai_edit: 2026-04-13T17:18:17.855Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-implement-voice-message-handler-with-ffmpeg-co-059a6e.md]]"
tags:
  - telegram
  - voice messages
  - ffmpeg
  - audio conversion
  - brain project
  - python
  - bot
  - pipeline
  - multimodal
---

# Telegram Voice Message Handler with FFmpeg Conversion in Brain Project

This article details the implementation of a Telegram voice message handler within the `rahilsinghi/brain` project. It enables the system to download `.ogg` voice files from Telegram, convert them to `.wav` format using FFmpeg, and store them in a structured directory for subsequent processing by the voice watcher pipeline.

## Key Concepts

Telegram Bot Integration,Voice Message Processing,FFmpeg Audio Conversion,Audio File Formats (.ogg, .wav),Voice Watcher Pipeline,Injectable Dependencies for Testability

## Details

The `feat(telegram): implement voice message handler with ffmpeg conversion` commit (SHA: `3796dae`) introduces crucial functionality for processing voice input from Telegram within the `rahilsinghi/brain` repository. Authored by Rahil Singhi and co-authored by Claude Sonnet 4.6, this feature allows the system to interact with Telegram voice messages.

Upon receiving a voice message, the handler utilizes `ctx.getFile()` and `file.download()` to retrieve the Telegram `.ogg` audio file. This file, typically compressed and specific to Telegram, is then converted into a standard `.wav` format. The conversion is performed using `ffmpeg`, a powerful multimedia framework. To ensure testability and modularity, the `ffmpeg` conversion logic is encapsulated within an injectable `ConvertAudioFn` function.

Once converted, the `.wav` file is saved to the `raw/voice/{timestamp}.wav` directory. This structured storage location acts as an input queue for the broader [[Voice Watcher]] pipeline, which is responsible for further analysis, transcription, or other voice-based processing within the [[Brain Project]].

This implementation involved 2 file changes, adding 73 lines of code and deleting 7, contributing to the system's ability to ingest and process multimodal data.

## Related

[[Brain Project]],[[Voice Watcher]],[[Add Voice Watcher, Daily Summary Cron, and System Activity Logging (Brain Project)]],[[Add Grammy Dependency for Telegram Bot (Brain Project)]],[[TelegramConfig Type and Defaults]]
