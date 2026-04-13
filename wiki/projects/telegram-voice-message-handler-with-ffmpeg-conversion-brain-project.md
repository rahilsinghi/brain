---
title: Telegram Voice Message Handler with FFmpeg Conversion (Brain Project)
author: ai
created_at: 2026-04-12T21:31:40.863Z
last_ai_edit: 2026-04-12T21:31:40.863Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-implement-voice-message-handler-with-ffmpeg-co-059a6e.md]]"
tags:
  - telegram
  - voice message
  - ffmpeg
  - audio conversion
  - brain project
  - bot
  - audio processing
  - pipeline
  - grammy
---

# Telegram Voice Message Handler with FFmpeg Conversion (Brain Project)

This feature implements a robust handler for Telegram voice messages, enabling the bot to download `.ogg` audio files, convert them to `.wav` format using FFmpeg, and store them for further processing by the voice watcher pipeline. An injectable `ConvertAudioFn` ensures testability and flexibility in audio conversion.

## Key Concepts

Telegram Bot API,Voice Message Handling,FFmpeg,Audio Conversion,Voice Watcher Pipeline,Dependency Injection

## Details

The `rahilsinghi/brain` repository includes a new feature to process incoming Telegram voice messages. The system first retrieves the `.ogg` voice file using `ctx.getFile()` and `file.download()` from the Telegram Bot API. To ensure compatibility with subsequent processing stages, the `.ogg` file is converted to a `.wav` audio format. This conversion is handled by an FFmpeg utility, which is exposed as an injectable `ConvertAudioFn` to facilitate unit testing and allow for alternative conversion implementations. The converted `.wav` files are then saved to `raw/voice/{timestamp}.wav`, serving as input for the dedicated [[Add Voice Watcher, Daily Summary Cron, and System Activity Logging (Brain Project)|voice watcher pipeline]]. This commit was co-authored by [[Claude Sonnet 4.6]].

## Related

[[brain — Git Activity]],[[Chore: Add Grammy Dependency for Telegram Bot (brain)]],[[CLAUDE.md Telegram Bot Documentation Update (rahilsinghi/brain)]],[[Add Voice Watcher, Daily Summary Cron, and System Activity Logging (Brain Project)]],[[FFmpeg]],[[Claude Sonnet 4.6]]
