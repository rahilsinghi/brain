---
title: Voice and Transcription Configuration with Cluster Type (Brain Project)
author: ai
created_at: 2026-04-11T00:12:01.092Z
last_ai_edit: 2026-04-11T00:12:01.092Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-cluster-type-and-transcription-voice-config-72dd03.md]]"
tags:
  - voice
  - transcription
  - configuration
  - types
  - brain project
  - development
---

# Voice and Transcription Configuration with Cluster Type (Brain Project)

This commit introduces new configuration interfaces for voice and transcription, `TranscriptionConfig` and `VoiceConfig`, and defines a `Cluster` union type within the `rahilsinghi/brain` repository. It also wires these default configurations into `config.ts` and updates the `.brain/config.yaml` file, laying the groundwork for more flexible voice processing. The changes aim to enhance the project's audio processing capabilities by providing structured configuration.

## Key Concepts

[[TranscriptionConfig]],[[VoiceConfig]],[[Cluster Type]] (Union Type),[[Configuration Management]],[[Type Definitions]]

## Details

This update focuses on structuring the configuration for voice and transcription features within the [[brain]] project. Specifically, it involves:

1.  **Introduction of Interfaces**: Two new TypeScript interfaces, `TranscriptionConfig` and `VoiceConfig`, are added to `types.ts`. These interfaces define the expected structure for transcription-related and general voice-related settings, respectively.
2.  **Cluster Union Type**: A `Cluster` union type is introduced, likely to categorize different modes or configurations for audio processing or data grouping.
3.  **Default Configuration Wiring**: The default values for these new configurations are integrated into the `DEFAULTS` object within `config.ts`.
4.  **YAML Configuration Update**: Corresponding sections for these configurations are added to the `.brain/config.yaml` file, enabling external and persistent configuration management.

These changes provide a robust and extensible framework for managing various aspects of voice and transcription, supporting future enhancements in audio processing and analysis within the Brain Project.

## Related

[[brain]],[[feat(voice): parseVoice — Transcription, Classification & Markdown Drop]],[[Audio ML Pipeline with CLAP Embeddings and Librosa Features]],[[Configuration Loader (YAML & Dotenv)]],[[Defining Shared Types for Frontmatter, Config, and Compile Strategy]]
