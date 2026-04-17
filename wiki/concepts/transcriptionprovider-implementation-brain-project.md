---
title: TranscriptionProvider Implementation (Brain Project)
author: ai
created_at: 2026-04-13T15:29:24.783Z
last_ai_edit: 2026-04-13T15:29:24.783Z
last_human_edit: null
last_embedded_hash: a766008a074ab98a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-transcriptionprovider-with-local-whispercpp-94a3d3.md]]"
tags:
  - voice
  - transcription
  - whisper
  - openai
  - dependency-injection
  - testing
  - backend
  - development
  - brain-project
---


# TranscriptionProvider Implementation (Brain Project)

This commit introduces a flexible `TranscriptionProvider` interface within the `brain` project, featuring concrete implementations for local `whisper.cpp` and the OpenAI Whisper API. Designed with dependency injection for full testability, it includes a factory for easy provider creation.

## Key Concepts

[[TranscriptionProvider]],[[LocalWhisperProvider]],[[OpenAIWhisperProvider]],[[whisper.cpp]],[[OpenAI Whisper API]],Dependency Injection,Factory Pattern,Testability

## Details

This feature (`feat(voice)`) introduces the `TranscriptionProvider` component to the [[brain]] repository. It is designed to abstract the transcription process, allowing for interchangeable transcription backends.

Two primary implementations are provided:

*   **`LocalWhisperProvider`**: This provider integrates with the local `whisper.cpp` binary. It shells out to the binary to perform transcription, leveraging local resources.
*   **`OpenAIWhisperProvider`**: This implementation connects to the [[OpenAI Whisper API]] to utilize OpenAI's cloud-based transcription service.

A key design principle is the use of **dependency injection** for both `exec` (for local binary execution) and `fetch` (for API calls). This ensures that the providers are fully testable, allowing mock implementations to be injected during unit tests. A `createTranscriptionProvider` factory function is also included to simplify the instantiation and configuration of these providers. The implementation is accompanied by 4 passing tests, validating its functionality.

## Related

[[brain]],[[whisper.cpp]],[[OpenAI]],[[Dependency Injection]],[[Factory Pattern]],[[Testing]],[[Claude (AI assistant)]]
