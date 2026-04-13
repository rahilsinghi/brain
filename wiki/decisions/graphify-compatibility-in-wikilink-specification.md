---
title: Graphify Compatibility in Wikilink Specification
author: ai
created_at: 2026-04-13T01:04:17.282Z
last_ai_edit: 2026-04-13T01:04:17.282Z
last_human_edit: null
last_embedded_hash: 9b622c6617f42276
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-docs-address-graphify-compatibility-in-wikilink-spec-f4fbba.md]]"
tags:
  - graphify
  - wikilinks
  - brain project
  - architecture
  - backfill
  - caching
  - llm
  - compatibility
---


# Graphify Compatibility in Wikilink Specification

This update addresses compatibility concerns for Graphify within the wikilink specification. Key changes include applying URI prefixes at `cache.ts` export, excluding specific directories from backfill processes, and setting a 500-article title cap for the compile prompt.

## Key Concepts

[[Graphify compatibility]],[[Wikilink Specification]],[[URI prefix]],[[Cache management]],[[Backfill process]],[[Compile prompt]],[[Title capping]]

## Details

This commit focuses on refining the wikilink specification to ensure proper compatibility with the Graphify system within the `rahilsinghi/brain` repository.

Key changes include:

*   **URI Prefix Application**: A URI prefix is now applied at the `cache.ts` export stage, while the `scan-wiki` process remains path-based. This ensures consistent URI handling for Graphify while maintaining flexibility for scanning.
*   **Backfill Exclusions**: The backfill process will now skip the `wiki/code-architecture/` directory. This is intended to manage cross-layer dependencies more effectively via Graphify.
*   **Compile Prompt Title Cap**: A 500-article title cap has been implemented in the compile prompt, a measure in place since the project's inception, to control the scope and performance of LLM-based compilation.

## Related

[[brain — Git Activity]],[[Graphify Venv Setup Script]],[[Brain Explorer Completion: Deep-Linking and Wikilink Navigation]],[[Backfill Script for Broken Wikilinks]],[[Add LLM Model Constants and Company Info Helper (Commit a9513cd)]],[[Brain Project: CLAUDE.md and REMAINING-WORK.md Updated for Phase 4 Completion]]
