---
title: Telegram Voice Message Handler with FFmpeg Conversion
author: ai
created_at: 2026-04-13T15:44:27.444Z
last_ai_edit: 2026-04-13T15:44:27.444Z
last_human_edit: null
last_embedded_hash: 2248f0ddb1e896d2
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-implement-voice-message-handler-with-ffmpeg-co-059a6e.md]]"
tags:
  - telegram
  - voice messages
  - ffmpeg
  - audio conversion
  - brain project
  - feature
  - development
---


# Telegram Voice Message Handler with FFmpeg Conversion

This article details the implementation of a Telegram voice message handler within the `rahilsinghi/brain` project. It enables the system to download OGG voice files from Telegram, convert them to WAV format using FFmpeg, and store them for further processing by the voice watcher pipeline.

## Key Concepts

[[Telegram Voice Messages]],[[FFmpeg]],Audio Conversion,Voice Watcher Pipeline,Dependency Injection (ConvertAudioFn),File Handling

## Details

This commit (`SHA: 3796dae`, authored by Rahil Singhi and Claude Sonnet 4.6 on 2026-04-09) introduces a new feature to the [[brain — Git Activity]] repository. The core functionality involves processing voice messages received via Telegram. The handler uses `ctx.getFile()` and `file.download()` to retrieve the `.ogg` voice files. These files are then converted to `.wav` format using the FFmpeg utility.

For enhanced testability and modularity, the audio conversion logic is encapsulated within an injectable `ConvertAudioFn`. Once converted, the `.wav` files are saved to the `raw/voice/{timestamp}.wav` directory, making them accessible for the subsequent stages of the [[Add Voice Watcher, Daily Summary Cron, and System Activity Logging (Brain Project)]]. The implementation involved changes across 2 files, adding 73 lines of code and removing 7.

## Related

[[brain — Git Activity]],[[Add Voice Watcher, Daily Summary Cron, and System Activity Logging (Brain Project)]],[[Add Grammy Dependency for Telegram Bot (Brain Project)]],[[Add TelegramConfig Type and Defaults]],[[Brain Repo - Phase 4 Telegram Test Result]]
