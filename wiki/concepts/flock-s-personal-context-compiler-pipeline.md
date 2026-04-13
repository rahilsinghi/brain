---
title: Flock's Personal Context Compiler Pipeline
author: ai
created_at: 2026-04-10T17:41:13.876Z
last_ai_edit: 2026-04-10T17:41:13.876Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-personal-contextmd-compiler-pipeline-024c07.md]]"
tags:
  - flock
  - compiler
  - pipeline
  - personal context
  - ai
  - gemini
  - zod
  - intent extraction
  - versioning
  - rahil singhi
  - anthropic
  - claude
---

# Flock's Personal Context Compiler Pipeline

This pipeline in the Flock project is designed to process and refine personal context data. It orchestrates the extraction of intent from various inputs using AI models, merges information based on confidence, and ensures all changes are versioned. The system supports both deterministic chip inputs and AI-driven voice/text inputs.

## Key Concepts

Gemini 2.5 Flash,Zod schemas,Confidence-weighted merge,Token cap enforcement,Intent extraction,Personal context,Compiler pipeline,Versioning (context_diffs)

## Details

The `personal_context.md` compiler pipeline is a core component within the `rahilsinghi/Flock` repository (SHA: `2f3461d`, dated `2026-03-21`). Its primary function is to manage and process personal context data.

### Key Components:
*   **`schemas.ts`**: Defines [[Zod schemas]] crucial for validating intent extraction and mapping chip fields.
*   **`intent-extractor.ts`**: Utilizes [[Gemini 2.5 Flash]] for extracting intent from various inputs, leveraging its JSON schema extraction capabilities.
*   **`merger.ts`**: Responsible for a [[confidence-weighted merge]] of extracted data, ensuring [[token cap enforcement]] to manage context size.
*   **`compiler.ts`**: Serves as the orchestrator, managing the entire data flow from fetching raw input, routing it, extracting relevant information, merging it, and finally writing the compiled context.

### Input Processing:
*   **Chip inputs**: These inputs are deterministic and do not involve model calls, ensuring predictable behavior.
*   **Voice/text inputs**: These undergo [[intent extraction]] via [[Gemini 2.5 Flash]] to understand user intent and context.

### Versioning:
All modifications and changes made by the pipeline are meticulously versioned and recorded in the `context_diffs` table, providing a historical record of context evolution.

### Authorship:
This pipeline's development involved collaboration, with [[Claude Opus 4.6]] contributing as a co-author.

## Related

[[Flock (project)]],[[Gemini 2.5 Flash]],[[Zod schemas]],[[Claude Opus 4.6]],[[Intent Extraction]]
