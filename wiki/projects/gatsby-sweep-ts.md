---
title: gatsby-sweep.ts
author: ai
created_at: 2026-04-17T05:11:01.536Z
last_ai_edit: 2026-04-17T05:11:01.536Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/karen/file-summaries/karen_pretext_scripts_gatsby-sweep_ts.md]]"
tags:
  - code-architecture
  - karen
---

# gatsby-sweep.ts

A TypeScript script in the karen repository that contains various parsing and diagnostic functions for handling command-line flags, browser configurations, and output formatting.

## Key Concepts

- `parseNumberFlag()`: Parses a command-line flag as a number.
- `parseStringFlag()`: Parses a command-line flag as a string.
- `hasFlag()`: Checks if a command-line flag is present.
- `parseBrowser()`: Parses browser-related command-line flags.
- `parseOptions()`: Parses command-line options into a structured format.
- `getTargetWidths()`: Determines target widths for output formatting.
- `formatSignedInt()`: Formats an integer with a sign.
- `formatRanges()`: Formats a list of ranges into a string.
- `printSummary()`: Prints a summary of parsed flags and options.
- `maybeWriteSummary()`: Conditionally writes the summary to a file.
- `runDetailedDiagnose()`: Runs a detailed diagnostic check.

## Details

The `gatsby-sweep.ts` script is part of the karen repository and serves as a utility for parsing command-line arguments and performing diagnostic checks. It includes functions such as `parseNumberFlag()` and `parseStringFlag()` for extracting numerical and string values from command-line flags, respectively. The `hasFlag()` function checks for the presence of a specific flag. The script also handles browser configurations through `parseBrowser()` and processes command-line options with `parseOptions()`. Additional functions like `getTargetWidths()`, `formatSignedInt()`, and `formatRanges()` are used for formatting output, while `printSummary()` and `maybeWriteSummary()` manage the display and storage of diagnostic information. The `runDetailedDiagnose()` function executes a comprehensive diagnostic check.

## Related

- [[karen]]
- [[pretext]]
