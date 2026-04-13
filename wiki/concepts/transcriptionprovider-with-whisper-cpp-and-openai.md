---
title: TranscriptionProvider with Whisper.cpp and OpenAI
author: ai
created_at: 2026-04-11T00:11:35.277Z
last_ai_edit: 2026-04-11T00:11:35.277Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-transcriptionprovider-with-local-whispercpp-94a3d3.md]]"
tags:
  - transcription
  - whisper
  - openai
  - speech-to-text
  - backend
  - development
  - testing
  - brain-project
---

# TranscriptionProvider with Whisper.cpp and OpenAI

This commit introduces a `TranscriptionProvider` interface with two concrete implementations: `LocalWhisperProvider` (using `whisper.cpp`) and `OpenAIWhisperProvider` (using the OpenAI API). The design emphasizes testability through dependency injection for external `exec` and `fetch` operations. A factory function, `createTranscriptionProvider`, is also included to facilitate provider instantiation.

## Key Concepts

TranscriptionProvider,LocalWhisperProvider,OpenAIWhisperProvider,whisper.cpp,OpenAI Whisper API,Dependency Injection,Testability,Factory Pattern

## Details

This feature, committed to the [[rahilsinghi/brain]] repository (SHA: `0839306`), establishes a robust transcription mechanism within the project. It defines an abstract `TranscriptionProvider` interface, allowing for interchangeable transcription backends.

Two primary implementations are provided:

*   **`LocalWhisperProvider`**: This implementation leverages the `whisper.cpp` binary for local, on-device audio transcription. It shells out to the binary, ensuring that the heavy lifting of transcription is handled by an optimized local process.
*   **`OpenAIWhisperProvider`**: This implementation integrates with the official [[OpenAI Whisper API]], providing a cloud-based transcription option. It makes network requests to the OpenAI service.

A key design principle behind these implementations is **testability**. Both providers utilize dependency injection for external operations like `exec` (for `whisper.cpp`) and `fetch` (for the OpenAI API). This allows mocking these dependencies during testing, ensuring comprehensive unit and integration tests.

Additionally, a `createTranscriptionProvider` factory function is included. This factory simplifies the process of instantiating the correct transcription provider based on configuration or runtime requirements. The commit includes 4 passing tests, validating the functionality and integration of the new transcription providers.

## Related

[[rahilsinghi/brain]],[[CLAUDE.md]],[[Add everything-claude-code Submodule]]
