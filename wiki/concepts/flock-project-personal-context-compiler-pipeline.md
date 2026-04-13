---
title: "Flock Project: Personal Context Compiler Pipeline"
author: ai
created_at: 2026-04-12T18:23:31.658Z
last_ai_edit: 2026-04-12T18:23:31.658Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-personal-contextmd-compiler-pipeline-024c07.md]]"
tags:
  - flock
  - compiler
  - pipeline
  - context
  - intent extraction
  - gemini
  - zod
  - typescript
  - versioning
  - rahilsinghi
  - claudeopus
---

# Flock Project: Personal Context Compiler Pipeline

This document describes the `personal_context.md` compiler pipeline within the Flock project, designed for extracting and managing user-specific contextual information. It leverages Gemini 2.5 Flash for intent extraction from voice/text inputs and performs a confidence-weighted merge of contextual data, with all changes versioned for traceability.

## Key Concepts

personal_context.md compiler pipeline,Intent Extraction,Gemini 2.5 Flash,Confidence-weighted context merge,Token cap enforcement,Zod schemas,Context versioning (`context_diffs` table)

## Details

The `personal_context.md` compiler pipeline is a core component within the [[Flock Project]] responsible for processing and managing user-specific contextual data. This pipeline orchestrates several key steps:

*   **`schemas.ts`**: Defines [[Zod]] schemas crucial for precise intent extraction and the mapping of chip field inputs.
*   **`intent-extractor.ts`**: Utilizes [[Gemini 2.5 Flash]] for advanced JSON schema extraction, primarily processing voice and text inputs to identify user intent.
*   **`merger.ts`**: Implements a confidence-weighted merge strategy to combine contextual information, ensuring data integrity and enforcing token cap limits.
*   **`compiler.ts`**: Serves as the orchestrator, managing the entire workflow from fetching raw data, routing it, extracting relevant information, merging it, and finally writing the processed context.

Chip inputs are inherently deterministic, bypassing model calls, while voice and text inputs are routed through the [[Gemini 2.5 Flash]] intent extraction process. All modifications and contextual data changes are meticulously versioned and stored in a `context_diffs` table, providing a complete history and traceability.

This system was implemented in the `rahilsinghi/Flock` repository (SHA: `2f3461d`) on 2026-03-21T14:22:54Z by Rahil Singhi, with significant contributions from Claude Opus 4.6 (1M context).

**Commit Details:**
*   **SHA:** `2f3461d`
*   **Date:** 2026-03-21T14:22:54Z
*   **Author:** Rahil Singhi
*   **Files changed:** 4
*   **Additions:** +466
*   **Deletions:** -0

## Related

[[Flock Project]],[[Gemini 2.5 Flash]],[[Zod]],[[Intent Extraction]],[[Context Management]]
