---
title: "parseVoice: Transcription, Classification, and Markdown Drop Implementation"
author: ai
created_at: 2026-04-10T02:06:10.035Z
last_ai_edit: 2026-04-10T02:06:10.035Z
last_human_edit: null
last_embedded_hash: bb6ddcd64615ac89
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-parsevoice-transcription-classification-f093f7.md]]"
tags:
  - voice
  - parsevoice
  - transcription
  - classification
  - markdown
  - sidecar
  - idempotency
  - tdd
  - brain
  - rahilsinghi
  - daily-log
  - frontmatter
  - pipeline
---


# parseVoice: Transcription, Classification, and Markdown Drop Implementation

The `parseVoice` feature adds a complete voice input processing pipeline to the rahilsinghi/brain repository, introduced in commit 045f4c9 on April 9, 2026. It handles audio transcription, content classification, markdown file output with frontmatter, and daily log integration. The implementation includes an idempotent sidecar guard to prevent duplicate processing and is fully covered by five TDD tests.

## Key Concepts

- **parseVoice**: Core function implementing the voice input processing pipeline
- **Idempotent Sidecar Guard**: A `.processed` sidecar file mechanism that prevents reprocessing already-handled voice inputs
- **Frontmatter Drop**: Automatic generation and writing of YAML frontmatter to `raw/{cluster}/` directory structure
- **Cluster-based Routing**: Classification logic that routes transcribed content into named cluster directories
- **appendDailyEntry**: Integration point that logs processed voice entries into a daily log
- **TDD Coverage**: Five tests written to validate the full processing pipeline

## Details

## Overview

Commit `045f4c9` introduces `parseVoice`, a new feature in the `rahilsinghi/brain` repository that provides an end-to-end pipeline for processing voice input into structured markdown notes.

## Implementation Details

### File Changes
- **Files changed:** 2
- **Additions:** +150 lines
- **Deletions:** 0 lines

### Processing Pipeline

The `parseVoice` function operates through the following stages:

1. **Transcription**: Converts raw voice input into text
2. **Classification**: Categorizes the transcribed content and assigns it to a cluster
3. **Markdown Drop**: Writes the result as a markdown file with frontmatter into `raw/{cluster}/`
4. **Daily Log Entry**: Calls `appendDailyEntry` to record the processed note in the daily log

### Idempotency via Sidecar Guard

To ensure safe re-runs and prevent duplicate entries, `parseVoice` checks for and creates a `.processed` sidecar file alongside the source audio. If the sidecar already exists, processing is skipped entirely.

### Test Coverage

The implementation follows Test-Driven Development (TDD) principles with **5 tests** covering the full pipeline, including edge cases for the idempotency guard.

## Authorship

- **Primary Author:** Rahil Singhi
- **Co-Author:** Claude Sonnet 4.6 (AI pair programming via Anthropic)

## Related

- [[Brain Repository]]
- [[appendDailyEntry]]
- [[Voice Input Pipeline]]
- [[Idempotent Processing Patterns]]
- [[Frontmatter Generation]]
- [[Cluster-based Content Routing]]
- [[Daily Log System]]
- [[TDD in Brain Tooling]]
