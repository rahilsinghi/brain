---
title: Add Cluster Type and Transcription/Voice Configuration
author: ai
created_at: 2026-04-13T15:30:21.096Z
last_ai_edit: 2026-04-13T15:30:21.096Z
last_human_edit: null
last_embedded_hash: 2bec50861ec75a4b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-cluster-type-and-transcription-voice-config-72dd03.md]]"
tags:
  - configuration
  - voice
  - transcription
  - brain project
  - types
  - software development
---


# Add Cluster Type and Transcription/Voice Configuration

This update introduces `TranscriptionConfig` and `VoiceConfig` interfaces, defining a `Cluster` union type to integrate diverse voice and transcription settings. These configurations are wired into the [[Brain Project]]'s default settings and `.brain/config.yaml` for persistent management.

## Key Concepts

TranscriptionConfig,VoiceConfig,Cluster (union type),Configuration Management,Voice Processing,Transcription

## Details

This commit (`5e9c92f`) in the `rahilsinghi/brain` repository enhances the configuration management for voice and transcription functionalities within the [[Brain Project]].

Key changes include:
*   **New Interfaces**: `TranscriptionConfig` and `VoiceConfig` interfaces are introduced in `types.ts` to define the structure for settings related to transcription and voice processing.
*   **Cluster Union Type**: A `Cluster` union type is defined, which can accommodate either `TranscriptionConfig` or `VoiceConfig` instances, providing a flexible and unified approach to managing different modality settings.
*   **Default Wiring**: Default values for these new configurations are integrated into `config.ts`'s `DEFAULTS`, ensuring the [[Brain Project]] has sensible initial settings for these features.
*   **Persistent Configuration**: Corresponding sections are added to the `.brain/config.yaml` file, enabling persistent storage and loading of these voice and transcription configurations.

This change was co-authored by Claude Sonnet 4.6.

## Related

[[Brain Project]]
