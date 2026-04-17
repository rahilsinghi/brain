---
title: measurement.ts
author: ai
created_at: 2026-04-17T15:02:46.482Z
last_ai_edit: 2026-04-17T15:02:46.482Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/karen/file-summaries/karen_pretext_src_measurement_ts.md]]"
tags:
  - code-architecture
  - karen
---

# measurement.ts

The `measurement.ts` file in the `karen` repository contains utility functions for text and font measurement, including handling of emojis and grapheme segmentation.

## Key Concepts

- Text and font measurement utilities
- Emoji detection and correction
- Grapheme segmentation
- Segment metric caching

## Details

The `measurement.ts` file is part of the `karen` repository and provides a set of utility functions for measuring text and fonts. These functions include handling of emojis, grapheme segmentation, and caching of segment metrics. The file contains the following key functions:

- `getMeasureContext()`: Returns a measurement context.
- `getSegmentMetricCache()`: Retrieves a cache for segment metrics.
- `getSegmentMetrics()`: Gets metrics for a specific segment.
- `getEngineProfile()`: Retrieves an engine profile.
- `parseFontSize()`: Parses a font size.
- `getSharedGraphemeSegmenter()`: Gets a shared grapheme segmenter.
- `isEmojiGrapheme()`: Checks if a grapheme is an emoji.
- `textMayContainEmoji()`: Determines if text may contain an emoji.
- `getEmojiCorrection()`: Gets a correction factor for emojis.
- `countEmojiGraphemes()`: Counts emoji graphemes in a string.
- `getEmojiCount()`: Gets the count of emojis.
- `getCorrectedSegmentWidth()`: Calculates the corrected width of a segment.
- `getSegmentGraphemeWidths()`: Gets the widths of graphemes in a segment.
- `getSegmentGraphemePrefixWidths()`: Gets the prefix widths of graphemes in a segment.
- `getFontMeasurementState()`: Retrieves the state of font measurements.
- `clearMeasurementCaches()`: Clears all measurement caches.

These functions are designed to handle complex text rendering tasks, particularly those involving emojis and grapheme segmentation, and include caching mechanisms to improve performance.

## Related

- [[karen]]
