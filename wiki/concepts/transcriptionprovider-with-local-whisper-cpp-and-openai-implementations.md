---
title: TranscriptionProvider with Local Whisper.cpp and OpenAI Implementations
author: ai
created_at: 2026-04-12T17:16:50.466Z
last_ai_edit: 2026-04-12T17:16:50.466Z
last_human_edit: null
last_embedded_hash: 03ec1aa062614297
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-transcriptionprovider-with-local-whispercpp-94a3d3.md]]"
tags:
  - voice
  - transcription
  - whisper
  - openai
  - dependency injection
  - factory pattern
  - brain project
---


# TranscriptionProvider with Local Whisper.cpp and OpenAI Implementations

This feature introduces a robust `TranscriptionProvider` system within the Brain project, offering implementations for both local `whisper.cpp` execution and the OpenAI Whisper API. Designed with dependency injection for enhanced testability, it includes a factory to streamline provider creation.

## Key Concepts

TranscriptionProvider,whisper.cpp,OpenAI Whisper API,Dependency Injection,Factory Pattern

## Details

A significant update to the Brain project introduces a flexible `TranscriptionProvider` interface, allowing for interchangeable transcription backend implementations. This commit specifically adds two key providers:

*   **LocalWhisperProvider**: This implementation leverages the `whisper.cpp` binary locally, shelling out to perform transcriptions. It is designed to be fully testable by injecting `exec` functionality.
*   **OpenAIWhisperProvider**: This provider integrates with the OpenAI Whisper API, handling external API calls for transcription. Its `fetch` operations are dependency-injected to ensure comprehensive testability.

To manage the creation and selection of these providers, a `createTranscriptionProvider` factory function has been added. The entire system is built with testability as a core principle, ensuring reliability and maintainability. Four new tests were added and all are currently passing.

## Related

[[Brain Project]],[[Add Cluster Type and Transcription/Voice Configuration]],[[Add Voice Watcher, Daily Summary Cron, System Activity Logging (Brain Project)]],[[AskNYC Voice Pipeline Bugfix Integration]],[[OpenAI]],[[Claude]],[[Dependency Injection]],[[Factory Pattern]],[[TranscriptionProvider]],[[whisper.cpp]]
