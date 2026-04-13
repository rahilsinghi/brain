---
title: TranscriptionProvider with Local whisper.cpp and OpenAI Implementations in Brain Project
author: ai
created_at: 2026-04-12T21:17:48.433Z
last_ai_edit: 2026-04-12T21:17:48.433Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-transcriptionprovider-with-local-whispercpp-94a3d3.md]]"
tags:
  - brain
  - voice
  - transcription
  - whisper
  - openai
  - speech-to-text
  - dependency-injection
  - testing
  - feature
---

# TranscriptionProvider with Local whisper.cpp and OpenAI Implementations in Brain Project

This commit introduces a `TranscriptionProvider` interface within the `brain` project, offering both local `whisper.cpp` and `OpenAI Whisper API` implementations. It leverages dependency injection for `exec` and `fetch` operations, ensuring full testability of the transcription services. The feature includes a `createTranscriptionProvider` factory and passed all initial tests.

## Key Concepts

TranscriptionProvider,LocalWhisperProvider,OpenAIWhisperProvider,whisper.cpp,OpenAI Whisper API,Dependency Injection,Factory Pattern

## Details

The `brain` repository now includes a flexible system for handling speech-to-text transcription. The core component is `TranscriptionProvider`, an abstract interface for transcription services.

Two concrete implementations are provided:

*   **LocalWhisperProvider**: This implementation shells out to a `whisper-cpp` binary for local, on-device transcription. This allows for offline processing and potentially faster results for certain use cases.
*   **OpenAIWhisperProvider**: This implementation interacts with the `OpenAI Whisper API`, leveraging OpenAI's robust cloud-based transcription service.

Both providers are designed with testability in mind, utilizing dependency-injected `exec` and `fetch` utilities. A `createTranscriptionProvider` factory simplifies the instantiation of the correct provider based on configuration. This addition was tested with 4 passing tests, demonstrating its initial stability.

## Related

[[Brain Project]],[[Add Cluster Type and Transcription/Voice Configuration]],[[Add Voice Watcher, Daily Summary Cron, and System Activity Logging (Brain Project)]],[[askNYC: Model Update to Gemini 2.5 Flash Native Audio]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[API Fix: Dynamic LLM Provider/Model Reporting in Synthesis Response]],[[CLAUDE.md]],[[OpenAI Whisper API]],[[whisper.cpp]],[[Dependency Injection]]
