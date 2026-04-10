---
title: "TranscriptionProvider: Local Whisper.cpp and OpenAI Implementations"
author: ai
created_at: 2026-04-10T02:47:31.600Z
last_ai_edit: 2026-04-10T02:47:31.600Z
last_human_edit: null
last_embedded_hash: ebcb2186f2528b18
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-transcriptionprovider-with-local-whispercpp-94a3d3.md]]"
tags:
  - voice
  - transcription
  - whisper
  - openai
  - whisper-cpp
  - dependency-injection
  - factory-pattern
  - testing
  - audio
  - speech-to-text
---


# TranscriptionProvider: Local Whisper.cpp and OpenAI Implementations

This commit introduces a TranscriptionProvider abstraction with two concrete implementations: LocalWhisperProvider, which shells out to the whisper-cpp binary, and OpenAIWhisperProvider, which calls the OpenAI Whisper API. Both implementations use dependency-injected exec and fetch utilities to ensure full testability. A factory function, createTranscriptionProvider, is also added alongside a suite of 4 passing tests.

## Key Concepts

- **TranscriptionProvider**: An abstraction layer for audio transcription services
- **LocalWhisperProvider**: Executes the local whisper-cpp binary via shell to perform transcription
- **OpenAIWhisperProvider**: Calls the OpenAI Whisper API to perform transcription
- **Dependency Injection**: exec and fetch dependencies are injected for testability and flexibility
- **createTranscriptionProvider**: A factory function for instantiating the appropriate provider
- **whisper.cpp**: An open-source C++ implementation of OpenAI's Whisper speech recognition model

## Details

## Overview

Commit `0839306` in the `rahilsinghi/brain` repository adds a new voice transcription subsystem. The feature introduces a `TranscriptionProvider` interface with two concrete implementations, enabling the system to transcribe audio either locally or via the cloud.

## Implementations

### LocalWhisperProvider
- Shells out to the `whisper-cpp` binary to perform speech-to-text transcription
- Suitable for offline or privacy-sensitive use cases
- Avoids external API dependencies and associated costs

### OpenAIWhisperProvider
- Integrates with the OpenAI Whisper API for cloud-based transcription
- Suitable for environments where local compute is limited or unavailable

## Design Decisions

- **Dependency Injection**: Both providers accept injected `exec` and `fetch` dependencies rather than using them directly. This decouples the implementation from the environment and enables unit testing without invoking real processes or network calls.
- **Factory Pattern**: The `createTranscriptionProvider` factory function abstracts provider selection, allowing callers to choose between local and cloud backends without knowing internal construction details.

## Testing

- 4 tests were added, all passing
- Tests leverage the injected dependencies to mock subprocess execution and HTTP fetching

## Metadata

- **Date:** 2026-04-09
- **Files Changed:** 2
- **Additions:** +160 lines
- **Deletions:** 0
- **Co-authored by:** Claude Sonnet 4.6

## Related

- [[Voice Features]]
- [[Whisper.cpp Integration]]
- [[OpenAI API Usage]]
- [[Dependency Injection Patterns]]
- [[Brain Repository]]
- [[Transcription Pipeline]]
- [[Factory Pattern]]
