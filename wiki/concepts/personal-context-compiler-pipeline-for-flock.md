---
title: Personal Context Compiler Pipeline for Flock
author: ai
created_at: 2026-04-13T16:13:31.529Z
last_ai_edit: 2026-04-13T16:13:31.529Z
last_human_edit: null
last_embedded_hash: 6f8d37c1fe882bcd
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-personal-contextmd-compiler-pipeline-024c07.md]]"
tags:
  - compiler
  - pipeline
  - personal_context
  - flock
  - gemini
  - zod
  - intent extraction
  - ai
  - versioning
  - javascript
  - typescript
---


# Personal Context Compiler Pipeline for Flock

This document describes the `personal_context.md` compiler pipeline implemented in the `rahilsinghi/Flock` repository. It orchestrates the fetching, routing, intent extraction using Gemini 2.5 Flash, and confidence-weighted merging of personal context data, with all changes versioned in a `context_diffs` table.

## Key Concepts

Compiler Pipeline,Intent Extraction,Zod Schemas,Gemini 2.5 Flash,Confidence-Weighted Merge,Token Cap Enforcement,Versioning (context_diffs table),Personal Context Management

## Details

The `personal_context.md` compiler pipeline within the `rahilsinghi/Flock` repository (SHA: 2f3461d) is designed to process and manage personal context data. The pipeline is composed of several key modules:

*   **`schemas.ts`**: Defines [Zod schemas](https://zod.dev/) used for robust intent extraction and mapping of chip fields.
*   **`intent-extractor.ts`**: Utilizes the [Gemini 2.5 Flash](https://blog.google/technology/ai/google-gemini-next-generation-ai-model/) model for performing JSON schema-based intent extraction from voice/text inputs. Chip inputs, being deterministic, bypass this model call.
*   **`merger.ts`**: Handles the confidence-weighted merging of extracted data, ensuring that a token cap is enforced to manage context size.
*   **`compiler.ts`**: Serves as the orchestrator, managing the entire workflow from data fetching and routing to intent extraction, merging, and ultimately writing the processed context.

All modifications and processed context changes are meticulously versioned within a `context_diffs` table, ensuring historical traceability and enabling capabilities like [[Session Persistence]] or granular undo/redo functionality.

This implementation was co-authored with [[Claude Opus 4.6 (1M context)]].

## Related

[[Flock Project]],[[Add Zod and CSV-Parse Dependencies]],[[askNYC: Model Update to Gemini 2.5 Flash Native Audio]],[[Session Persistence]],[[Automated Knowledge System Maintenance (d145456)]],[[CLAUDE.md]]
