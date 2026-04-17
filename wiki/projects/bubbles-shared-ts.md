---
title: bubbles-shared.ts
author: ai
created_at: 2026-04-17T15:00:53.777Z
last_ai_edit: 2026-04-17T15:00:53.777Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/karen/file-summaries/karen_pretext_pages_demos_bubbles-shared_ts.md]]"
tags:
  - code-architecture
  - karen
---

# bubbles-shared.ts

This file contains shared utilities for rendering chat bubbles in the Karen project. It includes functions for text preparation, layout calculations, and formatting.

## Key Concepts

- Shared utility functions for chat bubble rendering
- Text wrapping and layout metrics
- Pixel formatting for UI elements

## Details

### Overview
`bubbles-shared.ts` provides shared functions for rendering chat bubbles in the Karen project. These utilities handle text preparation, layout calculations, and pixel formatting to ensure consistent and visually appealing chat bubble rendering.

### Key Functions
- `prepareBubbleTexts()`: Prepares text content for chat bubbles
- `getMaxChatWidth()`: Calculates maximum chat width
- `collectWrapMetrics()`: Collects text wrapping metrics
- `findTightWrapMetrics()`: Finds optimal tight wrapping metrics
- `computeBubbleRender()`: Computes final bubble rendering parameters
- `formatPixelCount()`: Formats pixel counts for UI display

The file contains no imports or external calls, focusing entirely on internal utility functions for chat bubble rendering.

## Related

- [[bubbles.ts: Chat Bubble Rendering Utilities]]
