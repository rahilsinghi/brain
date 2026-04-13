---
title: Personal Context Compiler Pipeline
author: ai
created_at: 2026-04-10T21:44:37.857Z
last_ai_edit: 2026-04-10T21:44:37.857Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-personal-contextmd-compiler-pipeline-024c07.md]]"
tags:
  - compiler
  - pipeline
  - personal-context
  - ai
  - llm
  - gemini
  - claude
  - intent-extraction
  - zod
  - flock
  - rahilsinghi
---

# Personal Context Compiler Pipeline

This document describes the Personal Context Compiler Pipeline, a core component within the `rahilsinghi/Flock` repository. It is designed to process and synthesize personal context from various inputs, leveraging AI models like Gemini 2.5 Flash for intent extraction and employing a confidence-weighted merge strategy. The pipeline orchestrates a series of steps including data fetching, routing, extraction, merging, and writing, with all changes versioned for traceability.

## Key Concepts

- Personal Context,- Compiler Pipeline,- Intent Extraction,- JSON Schema Extraction,- Confidence-Weighted Merge,- Token Cap Enforcement,- Zod Schemas,- Gemini 2.5 Flash,- `context_diffs` table

## Details

The **Personal Context Compiler Pipeline** is an essential system within the `rahilsinghi/Flock` project, responsible for compiling and managing dynamic personal context. Orchestrated by `compiler.ts`, the pipeline follows a structured sequence: `fetch` data, `route` it appropriately, `extract` relevant information, `merge` the extracted context, and finally `write` the compiled output.

Key components of the pipeline include:
*   **`schemas.ts`**: Defines Zod schemas crucial for both intent extraction processes and for mapping fields within 'chip' inputs.
*   **`intent-extractor.ts`**: This module is responsible for performing intent extraction, specifically utilizing `Gemini 2.5 Flash` to extract structured data based on defined JSON schemas.
*   **`merger.ts`**: Handles the integration of various context pieces. It employs a confidence-weighted merging algorithm and enforces token caps to manage the size and relevance of the compiled context.

Input processing varies by type: `Chip inputs` are deterministic and do not involve model calls, ensuring predictable behavior. In contrast, `Voice/text inputs` undergo sophisticated processing via the `Gemini 2.5` intent extraction system to derive meaning and structure. All modifications and compiled context changes are meticulously versioned and stored in the `context_diffs` table, providing a historical record.

This pipeline was developed by Rahil Singhi and co-authored with assistance from Claude Opus 4.6 (1M context). The specific implementation detailed here corresponds to SHA `2f3461d` within the `rahilsinghi/Flock` repository, dated 2026-03-21T14:22:54Z, involving 4 file changes, 466 additions, and no deletions.

## Related

[[Rahil Singhi]],[[Flock (Project)]],[[Gemini 2.5 Flash]],[[Claude Opus 4.6]],[[Intent Extraction]],[[Context Management]],[[Zod]]
