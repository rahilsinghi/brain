---
title: TranscriptionProvider with whisper.cpp and OpenAI Integration
author: ai
created_at: 2026-04-11T00:11:49.130Z
last_ai_edit: 2026-04-11T00:11:49.130Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-transcriptionprovider-with-local-whispercpp-94a3d3.md]]"
tags:
  - transcription
  - whisper
  - openai
  - audio
  - voice
  - dependency injection
  - testing
  - brain project
---

# TranscriptionProvider with whisper.cpp and OpenAI Integration

This commit introduces a flexible `TranscriptionProvider` interface within the `rahilsinghi/brain` repository, offering both local `whisper.cpp` and OpenAI Whisper API implementations. It ensures full testability through dependency injection for `exec` and `fetch` functions. The implementation includes a factory function and is validated by four passing tests.

## Key Concepts

[[TranscriptionProvider]],[[LocalWhisperProvider]],[[OpenAIWhisperProvider]],[[whisper.cpp]],[[OpenAI Whisper API]],Dependency Injection,Unit Testing

## Details

This commit (SHA: `0839306`) in the [[rahilsinghi/brain]] repository, authored by Rahil Singhi and co-authored by [[Claude Sonnet 4.6]], focuses on enhancing audio processing capabilities by adding a robust `TranscriptionProvider`.

Key features include:

*   **`LocalWhisperProvider`**: An implementation that shells out to the `whisper.cpp` binary, enabling local, offline audio transcription.
*   **`OpenAIWhisperProvider`**: An implementation that integrates with the [[OpenAI Whisper API]] for cloud-based, high-quality audio transcription.
*   **Dependency Injection**: Both providers are designed with dependency-injected `exec` and `fetch` functions. This crucial architectural decision ensures that the components are fully testable, allowing for mocking external calls during unit tests.
*   **Factory Function**: A `createTranscriptionProvider` factory is added to simplify the instantiation and selection of the desired transcription service based on configuration or runtime needs.
*   **Testing**: The new implementations are accompanied by 4 passing tests, verifying their correctness and reliability.

## Related

[[rahilsinghi/brain]],[[whisper.cpp]],[[OpenAI Whisper API]],[[Claude Sonnet 4.6]]
