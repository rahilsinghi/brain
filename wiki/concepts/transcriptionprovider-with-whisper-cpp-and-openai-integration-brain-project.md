---
title: TranscriptionProvider with whisper.cpp and OpenAI Integration (Brain Project)
author: ai
created_at: 2026-04-13T17:10:51.174Z
last_ai_edit: 2026-04-13T17:10:51.174Z
last_human_edit: null
last_embedded_hash: 45278f6eb1db5a7a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-transcriptionprovider-with-local-whispercpp-94a3d3.md]]"
tags:
  - voice
  - transcription
  - whisper
  - openai
  - whisper.cpp
  - brain project
  - python
  - development
  - feature
  - dependency injection
  - factory pattern
---


# TranscriptionProvider with whisper.cpp and OpenAI Integration (Brain Project)

This article details the implementation of a `TranscriptionProvider` for the `Brain Project`, offering both local transcription via `whisper.cpp` and cloud-based transcription using the OpenAI Whisper API. The design emphasizes testability through dependency injection for execution and fetching mechanisms, complemented by a factory function for provider creation.

## Key Concepts

[[TranscriptionProvider]],`whisper.cpp` (Local Transcription),OpenAI Whisper API (Cloud Transcription),Dependency Injection,Factory Pattern

## Details

This feature introduces a robust `TranscriptionProvider` component within the `[[Brain Project]]` (`rahilsinghi/brain` repository, commit `0839306` by Rahil Singhi on 2026-04-09).

The primary goal is to provide flexible voice transcription capabilities. Two distinct implementations are available:

*   **`LocalWhisperProvider`**: This leverages the `whisper.cpp` binary for local, on-device transcription. It interacts with the binary by shelling out to it.
*   **`OpenAIWhisperProvider`**: This integrates with the OpenAI Whisper API, offering a cloud-based transcription solution.

A key aspect of the implementation is the use of **dependency injection**. This allows for `exec` (for `whisper.cpp` binary execution) and `fetch` (for OpenAI API calls) functionalities to be injected, ensuring full testability of both providers.

A `createTranscriptionProvider` factory function is included to simplify the instantiation and configuration of the appropriate transcription provider based on requirements. The initial implementation includes 4 passing tests, affirming its correctness.

This work was co-authored by Claude Sonnet 4.6.

## Related

[[Brain Project]],[[Add Cluster Type and Transcription/Voice Configuration (Brain Project)]],[[Add Voice Watcher, Daily Summary Cron, and System Activity Logging (Brain Project)]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[OpenAI]]
