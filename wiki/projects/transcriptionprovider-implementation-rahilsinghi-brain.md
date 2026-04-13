---
title: TranscriptionProvider Implementation (rahilsinghi/brain)
author: ai
created_at: 2026-04-10T19:07:55.858Z
last_ai_edit: 2026-04-10T19:07:55.858Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-transcriptionprovider-with-local-whispercpp-94a3d3.md]]"
tags:
  - voice
  - transcription
  - whisper.cpp
  - openai whisper
  - dependency injection
  - factory pattern
  - rahilsinghi/brain
  - commit
  - feature
  - speech-to-text
---

# TranscriptionProvider Implementation (rahilsinghi/brain)

This commit introduces a new `TranscriptionProvider` interface within the `rahilsinghi/brain` repository, offering both local `whisper.cpp` and OpenAI Whisper API implementations. It includes dependency injection for testability and a factory for provider creation. This feature enhances the project's voice processing capabilities.

## Key Concepts

- **TranscriptionProvider**: An interface for abstracting speech-to-text functionality.,- **LocalWhisperProvider**: An implementation using the `whisper.cpp` binary for local transcription.,- **OpenAIWhisperProvider**: An implementation utilizing the OpenAI Whisper API for cloud-based transcription.,- **Dependency Injection**: Used for `exec` and `fetch` dependencies to ensure testability.,- **Factory Pattern**: Implemented via `createTranscriptionProvider` for managing provider instantiation.,- **whisper.cpp**: A high-performance C++ port of OpenAI's Whisper model.,- **OpenAI Whisper API**: OpenAI's cloud service for speech-to-text.

## Details

This commit (`0839306`), authored by [[Rahil Singhi]] on `2026-04-09`, adds a significant `feat(voice)` to the `[[rahilsinghi/brain]]` repository. The core of this update is the introduction of a `TranscriptionProvider` interface, which abstracts the process of converting audio to text.

Key components and features include:

*   **`LocalWhisperProvider`**: This implementation leverages the `[[whisper.cpp]]` binary, allowing for local, offline speech-to-text transcription. It shells out to the `whisper.cpp` executable to perform its function.
*   **`OpenAIWhisperProvider`**: For cloud-based transcription, this provider calls the `[[OpenAI Whisper API]]`. This offers an alternative for scenarios requiring cloud scalability or specific OpenAI features.
*   **Testability through Dependency Injection**: Both providers are designed with dependency-injected `exec` (for `LocalWhisperProvider`) and `fetch` (for `OpenAIWhisperProvider`) mechanisms. This architectural choice ensures that the transcription logic can be fully tested without external dependencies.
*   **`createTranscriptionProvider` Factory**: A factory function is introduced to simplify the creation and management of `TranscriptionProvider` instances, promoting cleaner code and easier configuration.

The change involved modifications to 2 files, resulting in an addition of 160 lines of code and no deletions. The feature was thoroughly tested with 4 new tests, all of which are reported as passing. This commit was co-authored by `Claude Sonnet 4.6`.

## Related

[[rahilsinghi/brain]],[[Rahil Singhi]],[[whisper.cpp]],[[OpenAI Whisper API]],[[Dependency Injection]],[[Factory Pattern]],[[Speech-to-Text]]
