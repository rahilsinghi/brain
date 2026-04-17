---
title: probe.ts
author: ai
created_at: 2026-04-17T16:54:10.107Z
last_ai_edit: 2026-04-17T16:54:10.107Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/karen/file-summaries/karen_pretext_pages_probe_ts.md]]"
tags:
  - code-architecture
  - karen
---

# probe.ts

The `probe.ts` file in the `karen` repository contains several functions related to request handling, error reporting, and data analysis. It includes utilities for measuring, summarizing, and classifying data, as well as initializing processes.

## Key Concepts

- `withRequestId()`: A function to associate operations with a unique request identifier.
- `publishReport()`: A function for publishing analysis or error reports.
- `setError()`: A function to set or log error information.
- `getBrowserLinesFromSpans()`: Extracts browser lines from span data.
- `getBrowserLines()`: Retrieves browser line information.
- `getBrowserLinesFromRange()`: Gets browser lines within a specific range.
- `measurePreparedSlice()`: Measures a prepared data slice.
- `getPublicLines()`: Retrieves public line data.
- `summarizeLines()`: Summarizes line data.
- `computeOffsetFromCursor()`: Calculates offset from a cursor position.
- `classifyBreakMismatch()`: Classifies mismatched breaks in data.
- `getFirstBreakMismatch()`: Identifies the first mismatched break.
- `init()`: Initialization function for setting up processes.

## Details

### Overview
The `probe.ts` file in the `karen` repository is focused on data analysis, request management, and error reporting. It provides a suite of functions that support measuring, summarizing, and classifying data, as well as initializing processes and handling errors.

### Key Functions
- **`withRequestId()`**: This function is used to associate operations with a unique request identifier, which can be helpful for tracking and debugging.
- **`publishReport()`**: This function is responsible for publishing analysis or error reports, which could be used for logging or user notification.
- **`setError()`**: A utility function for setting or logging error information, which is essential for error handling and debugging.
- **`getBrowserLinesFromSpans()`**: Extracts browser lines from span data, which might be used to analyze or process browser-related information.
- **`getBrowserLines()`**: Retrieves browser line information, likely for display or further processing.
- **`getBrowserLinesFromRange()`**: Gets browser lines within a specific range, which could be useful for pagination or filtering.
- **`measurePreparedSlice()`**: Measures a prepared data slice, possibly for performance analysis or data validation.
- **`getPublicLines()`**: Retrieves public line data, which might be used for public-facing interfaces or reporting.
- **`summarizeLines()`**: Summarizes line data, which could be used to provide a concise overview of the data.
- **`computeOffsetFromCursor()`**: Calculates the offset from a cursor position, which might be used in data navigation or display.
- **`classifyBreakMismatch()`**: Classifies mismatched breaks in data, which could be used to identify and handle inconsistencies.
- **`getFirstBreakMismatch()`**: Identifies the first mismatched break in data, which might be used for debugging or validation.
- **`init()`**: An initialization function that sets up the necessary processes or configurations for the file to function properly.

### Usage
The `probe.ts` file is likely used in conjunction with other parts of the `karen` repository to provide robust data analysis and error reporting capabilities. The functions within this file are designed to be modular and reusable, making it easier to integrate them into different parts of the application.

## Related

pretext
