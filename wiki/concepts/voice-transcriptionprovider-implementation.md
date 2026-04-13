---
title: Voice TranscriptionProvider Implementation
author: ai
created_at: 2026-04-10T15:07:01.895Z
last_ai_edit: 2026-04-10T15:07:01.895Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-transcriptionprovider-with-local-whispercpp-94a3d3.md]]"
tags:
  - voice
  - transcription
  - whisper
  - openai
  - implementation
  - dependency-injection
  - factory-pattern
  - rahilsinghi
  - brain
  - commit
---

# Voice TranscriptionProvider Implementation

This entry details the implementation of a `TranscriptionProvider` interface within the `rahilsinghi/brain` repository. It introduces `LocalWhisperProvider` utilizing `whisper.cpp` and `OpenAIWhisperProvider` integrating with the `OpenAI Whisper API`, both designed for high testability via dependency injection. A factory function `createTranscriptionProvider` is also added.

## Key Concepts

TranscriptionProvider,LocalWhisperProvider,OpenAIWhisperProvider,whisper.cpp,OpenAI Whisper API,Dependency Injection,Factory Pattern

## Details

This commit (SHA: `0839306`) by [[Rahil Singhi]] on 2026-04-09 adds a robust `TranscriptionProvider` system to the `[[rahilsinghi/brain repository]]`. The core of this addition is an interface for audio transcription, along with two distinct implementations:

*   **LocalWhisperProvider**: This provider leverages the `[[whisper.cpp]]` binary for local, on-device audio transcription. It shells out to the binary for efficient local processing.
*   **OpenAIWhisperProvider**: This provider integrates with the `[[OpenAI Whisper API]]`, enabling cloud-based audio transcription by making API calls to OpenAI's services.

A significant architectural aspect of these implementations is the use of **[[Dependency Injection]]** for `exec` (for `whisper.cpp` interactions) and `fetch` (for OpenAI API calls). This design choice ensures full testability, as evidenced by the inclusion of 4 passing tests. Co-authored by [[Claude Sonnet 4.6]].

Additionally, a `createTranscriptionProvider` **[[Factory Pattern]]** function is introduced to abstract the instantiation of these providers, allowing for flexible selection based on configuration or runtime needs. The commit involved 160 additions across 2 files.

## Related

[[Transcription Provider]],[[whisper.cpp]],[[OpenAI Whisper API]],[[Dependency Injection]],[[Factory Pattern]],[[rahilsinghi/brain repository]],[[Rahil Singhi]],[[Claude Sonnet 4.6]]
