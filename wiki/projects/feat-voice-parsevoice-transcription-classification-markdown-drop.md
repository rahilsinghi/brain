---
title: "feat(voice): parseVoice — Transcription, Classification & Markdown Drop"
author: ai
created_at: 2026-04-10T02:07:28.719Z
last_ai_edit: 2026-04-10T02:07:28.719Z
last_human_edit: null
last_embedded_hash: 34084439df175168
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-parsevoice-transcription-classification-f093f7.md]]"
tags:
  - voice
  - transcription
  - classification
  - markdown
  - tdd
  - sidecar
  - idempotency
  - daily-log
  - brain
  - parsing
  - frontmatter
  - cluster-routing
---


# feat(voice): parseVoice — Transcription, Classification & Markdown Drop

This commit introduces the `parseVoice` function to the `rahilsinghi/brain` repository, enabling voice input transcription, classification, and structured markdown output with idempotent processing guards. The implementation includes frontmatter generation, cluster-based file routing, and daily log integration. Full test-driven development coverage is provided with five passing tests.

## Key Concepts

- **parseVoice**: Core function handling voice transcription and classification pipeline
- **Idempotent Processing**: `.processed` sidecar file acts as a guard to prevent duplicate processing of voice inputs
- **Frontmatter Drop**: Automatically generates and writes YAML frontmatter to `raw/{cluster}/` directories
- **Cluster Routing**: Classifies voice input and routes output to the appropriate cluster subdirectory
- **appendDailyEntry**: Helper function called to append a log entry to the daily note after processing
- **TDD Coverage**: Five tests written to validate the full parseVoice lifecycle
- **Sidecar Pattern**: Uses a companion `.processed` file alongside source files to track processing state

## Details

## Overview

Commit `045f4c9` (2026-04-09) by Rahil Singhi adds the `parseVoice` feature to the `rahilsinghi/brain` repository. The change spans 2 files with 150 additions and no deletions, indicating a greenfield implementation.

## parseVoice Function

The `parseVoice` function orchestrates the full pipeline for handling voice memos:

1. **Idempotency Check**: Before processing, the function checks for the existence of a `.processed` sidecar file adjacent to the source voice input. If found, processing is skipped, ensuring the same input is never processed twice.
2. **Transcription**: The voice input is transcribed to text.
3. **Classification**: The transcribed text is classified into a cluster category.
4. **Markdown Drop**: A markdown file with YAML frontmatter is generated and written to the `raw/{cluster}/` directory, where `{cluster}` corresponds to the classification result.
5. **Daily Log**: `appendDailyEntry` is called to record a reference to the processed voice note in the daily log.
6. **Sidecar Write**: A `.processed` sidecar file is written to mark the source as complete.

## File Structure Impact

```
raw/
  {cluster}/
    {voice-note}.md       ← generated markdown with frontmatter
{source}/
  {voice-note}.processed  ← idempotency sidecar guard
```

## Testing

The implementation follows strict TDD practices with 5 tests covering:
- Happy path processing
- Idempotency guard (skip if `.processed` exists)
- Correct cluster routing
- Frontmatter structure validation
- Daily entry append behavior

## Collaboration

Co-authored with Claude Sonnet 4.6 as an AI pair programming collaborator.

## Related

- [[parseVoice]]
- [[appendDailyEntry]]
- [[Voice Memo Processing Pipeline]]
- [[Sidecar Pattern]]
- [[Cluster Routing]]
- [[Daily Log System]]
- [[rahilsinghi/brain Repository]]
- [[Test-Driven Development]]
- [[Idempotent Processing]]
