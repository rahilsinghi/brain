---
title: "Flock: Personal Context Compiler Pipeline"
author: ai
created_at: 2026-04-12T22:22:30.157Z
last_ai_edit: 2026-04-12T22:22:30.157Z
last_human_edit: null
last_embedded_hash: a5113cd7b937ef20
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-personal-contextmd-compiler-pipeline-024c07.md]]"
tags:
  - flock
  - personal context
  - compiler
  - pipeline
  - intent extraction
  - gemini
  - zod
  - versioning
  - llm
---


# Flock: Personal Context Compiler Pipeline

This document describes the personal context compiler pipeline within the Flock project, which extracts and merges user intent from various inputs. It leverages Zod schemas for intent extraction and Gemini 2.5 Flash for processing voice/text inputs, while deterministic chip inputs bypass model calls.

## Key Concepts

Personal Context Compiler,Intent Extraction,Confidence-weighted Merge,Token Cap Enforcement,Zod Schemas,Gemini 2.5 Flash,context_diffs table,Orchestration

## Details

The personal context compiler pipeline in the [[Flock Project]] is responsible for processing various inputs to build and maintain a user's personal context. The pipeline consists of several key components:

*   `schemas.ts`: Defines [[Zod]] schemas used for intent extraction and mapping chip fields, ensuring structured data output.
*   `intent-extractor.ts`: Utilizes the [[askNYC: Model Update to Gemini 2.5 Flash]] model for robust JSON schema-based intent extraction from voice and text inputs.
*   `merger.ts`: Handles the confidence-weighted merging of extracted intents, enforcing a token cap to manage context size.
*   `compiler.ts`: Orchestrates the entire workflow, managing the sequence of fetching data, routing inputs, extracting intents, merging them, and writing the final context.

Chip inputs are processed deterministically, bypassing the need for a model call. Conversely, voice and text inputs are routed through the [[askNYC: Model Update to Gemini 2.5 Flash]] model for intent extraction. All changes and updates to the personal context are meticulously versioned and stored in the `context_diffs` table, ensuring a complete history of context evolution. The pipeline was co-authored with [[CLAUDE.md for Project Context and Session Persistence]].

## Related

[[Flock Project]],[[Zod]],[[askNYC: Model Update to Gemini 2.5 Flash]],[[CLAUDE.md for Project Context and Session Persistence]]
