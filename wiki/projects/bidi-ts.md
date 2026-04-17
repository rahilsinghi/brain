---
title: bidi.ts
author: ai
created_at: 2026-04-17T16:52:16.878Z
last_ai_edit: 2026-04-17T16:52:16.878Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/karen/file-summaries/karen_pretext_src_bidi_ts.md]]"
tags:
  - code-architecture
  - karen
---

# bidi.ts

The `bidi.ts` file in the karen repository contains functions for handling bidirectional text, including character classification and computing bidirectional levels for text segments.

## Key Concepts

- Bidirectional text algorithm
- Character classification
- Text segmentation

## Details

### Overview
The `bidi.ts` file is part of the karen repository and provides functionality for processing bidirectional text. This is particularly important for handling text that includes both left-to-right and right-to-left scripts, such as mixing English with Arabic or Hebrew.

### Key Functions
- **`classifyChar()`**: This function is used to classify individual characters based on their bidirectional properties. It helps determine how each character should be treated in the context of bidirectional text.

- **`computeBidiLevels()`**: This function calculates the bidirectional levels for a given text. These levels are used to determine the correct visual order of characters when rendering bidirectional text.

- **`computeSegmentLevels()`**: This function computes the bidirectional levels for text segments. It is useful for breaking down larger pieces of text into manageable segments for processing.

### Usage
The functions in `bidi.ts` are essential for ensuring that text is displayed correctly in applications that support multiple languages and scripts. They help maintain the integrity of the text's visual representation, especially when dealing with mixed-directional content.

## Related

- [[Bi-directional Text Algorithm for Pretext]]
