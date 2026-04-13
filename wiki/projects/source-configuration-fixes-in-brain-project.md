---
title: Source Configuration Fixes in Brain Project
author: ai
created_at: 2026-04-12T21:12:03.854Z
last_ai_edit: 2026-04-12T21:12:03.854Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-fix-sources-address-spec-review-findings-ecb8d2.md]]"
tags:
  - fix
  - brain project
  - source configuration
  - gmail
  - github
  - cli
  - specification
---

# Source Configuration Fixes in Brain Project

This commit addresses specification review findings by correcting the Gmail search query for improved accuracy, updating the GitHub star threshold to align with project specifications, and refining the command-line interface (CLI) to properly accept source parameters.

## Key Concepts

Source Configuration,Gmail Search Query,GitHub Star Threshold,CLI Parameters

## Details

This commit (`6abc2aa`) to the [[Brain Project]] repository implements several fixes based on a specification review:

*   **Gmail Search Query:** The `label:Brain OR is:starred` filter was missing from the Gmail search query, which has now been added to ensure only relevant emails are processed.
*   **GitHub Star Threshold:** The `DEFAULT_MIN_STARS` setting for GitHub content ingestion was corrected from `50` to `100`, aligning with the specified requirement.
*   **CLI Parameter Handling:** The `main()` function in the CLI now correctly accepts `sources` as a parameter, resolving an issue where an empty, no-op array was being used instead.

## Related

[[Brain Project]],[[Specification Review]],[[Gmail]],[[GitHub]],[[CLI Entry Point for PNPM Seed]],[[CLI Entry Point with Quiet Mode and Report Formatting]],[[Claude]]
