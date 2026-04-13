---
title: Pretext Source Code Analysis Probe
author: ai
created_at: 2026-04-13T18:50:54.873Z
last_ai_edit: 2026-04-13T18:50:54.873Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/portfolio/portfolio-community-13.md]]"
tags:
  - code-community
  - portfolio
  - graphify
  - pretext
  - analysis
  - diagnostics
  - reporting
  - typescript
aliases:
  - Community 13
---

# Pretext Source Code Analysis Probe

This code community represents a self-contained module, `probe.ts`, integral to the `pretext` project within the `portfolio` repository. It provides core functionality for analyzing and processing source code or text lines, generating diagnostic reports, and handling errors in a browser context.

## Key Concepts

Request context management (`probe_withrequestid`),Error tracking and reporting (`probe_seterror`),Diagnostic report publishing (`probe_publishreport`),Browser line extraction and processing (`probe_getbrowserlines`, `probe_getbrowserlinesfromspans`, `probe_getbrowserlinesfromrange`, `probe_getpubliclines`),Line summarization (`probe_summarizelines`),Offset computation (`probe_computeoffsetfromcursor`),Break mismatch classification (`probe_classifybreakmismatch`, `probe_getfirstbreakmismatch`),Module initialization (`probe_init`)

## Details

The entirety of this code community is encapsulated within a single TypeScript file, `probe.ts`, located at `/Users/rahilsinghi/Desktop/portfolio/pretext/pages/probe.ts`. This file serves as a diagnostic and analysis utility for the [[Pretext Submodule and @chenglou/pretext Dependency]] integrated into the main [[portfolio]] project.

The `probe.ts` module contains several interconnected functions, designed to support introspection and reporting, likely within a browser-based environment for displaying or comparing code/text. Key functionalities include:

*   `probe_withrequestid`: Manages request context, potentially for logging or tracing operations, and calls `probe_seterror` and `probe_init`.
*   `probe_publishreport`: Responsible for generating and dispatching diagnostic reports, interacting with error handling and initialization.
*   `probe_seterror`: A central error handling function, also calling `probe_init`.
*   `probe_getbrowserlines`, `probe_getbrowserlinesfromspans`, `probe_getbrowserlinesfromrange`, `probe_getpubliclines`: These functions are crucial for extracting and manipulating lines of text, presumably from a browser's DOM or a source code view. `probe_getbrowserlines` specifically calls `probe_getbrowserlinesfromrange` and `probe_init`.
*   `probe_summarizelines`: Processes and condenses extracted lines, also calling `probe_init`.
*   `probe_classifybreakmismatch` and `probe_getfirstbreakmismatch`: These suggest functionality for identifying and categorizing discrepancies or 'breaks' in the processed text, with `probe_classifybreakmismatch` calling `probe_getfirstbreakmismatch`, which in turn calls `probe_init`.
*   `probe_computeoffsetfromcursor`: Calculates positional offsets, likely in relation to text cursors or selection.
*   `probe_init`: Appears to be a common initialization or setup function called by many other core `probe` functions.

This module operates independently, with no external dependencies identified, indicating a self-contained and focused utility for diagnostic purposes within the `pretext` context.

## Related

[[portfolio]],[[Add Pretext Submodule]],[[Add Pretext Submodule and @chenglou/pretext Dependency]],[[Add Pretext Submodule and @chenglou/pretext Dependency to Portfolio]],[[Pretext Submodule (Karen Project)]]
