---
title: Telegram Voice Message Handler with FFmpeg Conversion
author: ai
created_at: 2026-04-10T19:11:34.672Z
last_ai_edit: 2026-04-10T19:11:34.672Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-telegram-implement-voice-message-handler-with-ffmpeg-co-059a6e.md]]"
tags:
  - telegram
  - voice message
  - ffmpeg
  - audio conversion
  - bot
  - pipeline
  - file handling
  - rahil singhi
  - dependency injection
---

# Telegram Voice Message Handler with FFmpeg Conversion

This commit implements a handler for Telegram voice messages, downloading them, converting them from OGG to WAV using FFmpeg, and saving them for further processing by a voice watcher pipeline. The conversion function is designed to be injectable for improved testability.

## Key Concepts

- **Telegram Bot API**: Interface for interacting with the Telegram messaging service.,- **Voice Messages**: Audio recordings sent by users through Telegram.,- **FFmpeg**: A powerful open-source multimedia framework used for handling audio and video conversion.,- **Audio Conversion**: The process of changing the format of an audio file (e.g., OGG to WAV).,- **Dependency Injection**: A software design pattern that allows for the flexible provision of dependencies (like the `ConvertAudioFn`) into an object or module, enhancing testability.,- **File Handling**: Operations related to downloading, saving, and managing files on a system.

## Details

This commit (`3796dae`) to the `rahilsinghi/brain` repository, authored by Rahil Singhi on 2026-04-09, introduces a new feature to handle Telegram voice messages. The implementation involves the following steps:

1.  **Download Voice File**: Utilizes the Telegram Bot API's `ctx.getFile()` or `file.download()` methods to retrieve the `.ogg` voice message file sent by the user.
2.  **Audio Conversion**: The downloaded `.ogg` file is then converted to the `.wav` format. This conversion is performed using `FFmpeg`.
3.  **Testability**: The `ConvertAudioFn` (the function responsible for FFmpeg conversion) is designed as an injectable dependency, making it easier to test the handler in isolation without relying on actual FFmpeg execution.
4.  **Storage**: The converted `.wav` file is saved to the path `raw/voice/{timestamp}.wav`.
5.  **Pipeline Integration**: The saved `.wav` file is intended to be picked up and processed by a subsequent 'voice watcher pipeline'.

This commit involved changes to 2 files, adding 73 lines and deleting 7 lines. Claude Sonnet 4.6 was a co-author on this commit.

## Related

[[FFmpeg]],[[Telegram Bot API]],[[Voice Watcher Pipeline]],[[Audio Conversion]],[[rahilsinghi/brain]]
