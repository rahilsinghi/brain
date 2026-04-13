---
title: Graphify Compatibility in Wikilink Specification
author: ai
created_at: 2026-04-13T18:06:37.362Z
last_ai_edit: 2026-04-13T18:06:37.362Z
last_human_edit: null
last_embedded_hash: 18a0708b747c0592
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-docs-address-graphify-compatibility-in-wikilink-spec-f4fbba.md]]"
tags:
  - graphify
  - wikilinks
  - brain
  - backend
  - configuration
  - documentation
---


# Graphify Compatibility in Wikilink Specification

This update addresses crucial compatibility aspects between the wikilink specification and the Graphify system within the brain repository. It clarifies how URI prefixes are handled during cache export, outlines exclusions for the backfill process, and confirms an existing article title cap for compile prompts.

## Key Concepts

Graphify,Wikilink Specification,URI Prefixes,cache.ts,Backfill Process,Compile Prompt,Code Architecture

## Details

This commit, `bde0671`, from the `rahilsinghi/brain` repository, details adjustments made to ensure compatibility between the wikilink specification and the Graphify system. The key changes are:

*   **URI Prefix Application**: The URI prefix for wikilinks is now applied specifically at the `cache.ts` export stage. The `scan-wiki` process, however, will continue to operate using path-based references, maintaining consistency in its scanning approach.
*   **Backfill Exclusions**: To prevent cross-layer issues, particularly with Graphify's architecture, the backfill script will now explicitly skip processing content within the `wiki/code-architecture/` directory.
*   **Compile Prompt Article Cap**: The existing limitation of a 500-article title cap within the compile prompt is reaffirmed as a design choice implemented from the project's inception.

## Related

[[Brain Project]],[[Brain Repository: Frontmatter Management Utilities]],[[Backfill Script for Broken Wikilinks]],[[cache.ts]],[[Brain-integrated CLI Entry Point (graphify_cli.py)]],[[Add Python Requirements for Graphify CLI]],[[Graphify Venv Setup Script]],[[Brain-Explorer: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[Brain Explorer Completion: Deep-Linking and Wikilink Navigation]],[[Claude Opus]]
