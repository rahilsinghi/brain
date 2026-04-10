---
title: Strengthen Anti-Hallucination Constraints in Resume Generation
author: ai
created_at: 2026-04-10T02:08:41.298Z
last_ai_edit: 2026-04-10T02:08:41.298Z
last_human_edit: null
last_embedded_hash: 1c59f3986e738754
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-strengthen-anti-hallucination-constraints-in-resum-8eab9b.md]]"
tags:
  - anti-hallucination
  - prompt engineering
  - llm
  - resume generation
  - system prompt
  - local llm
  - knowledge base
  - career-datacenter
  - factual accuracy
  - rahil singhi
---


# Strengthen Anti-Hallucination Constraints in Resume Generation

This commit introduces explicit anti-hallucination rules to the system prompt in the Career-Datacenter resume generation pipeline, ensuring that local LLMs use only exact data from the knowledge base without modification or fabrication. Key fixes include correcting a vague company reference that caused LLMs to invent details, and adding strict constraints against altering institution names, dates, locations, or GPAs. These changes significantly reduce errors such as wrong institution names and fabricated companies in generated resumes.

## Key Concepts

- **Anti-Hallucination Constraints**: Explicit rules added to the LLM system prompt to prevent fabrication or modification of factual data
- **System Prompt Engineering**: Crafting precise instructions to guide LLM behavior and reduce undesirable outputs
- **Knowledge Base Fidelity**: Requirement that generated content must exactly reflect structured source data without paraphrasing or invention
- **Local LLM Reliability**: Addressing the tendency of locally-run language models to hallucinate facts when instructions are ambiguous
- **Prompt Specificity**: Replacing vague references (e.g., 'Antler-backed startup') with exact names (e.g., 'Kismet') to eliminate ambiguous inference by the model

## Details

## Overview

Commit `62fecf8` in the `rahilsinghi/Career-Datacenter` repository, authored by Rahil Singhi on 2026-02-13, adds anti-hallucination safeguards to the resume generation system prompt. The change modifies a single file with 13 additions and 3 deletions.

## Problem

Local LLMs used in the resume generation pipeline were producing resumes with fabricated or incorrect details, including:
- **Wrong institution names**: Outputting "Sri Sathya Sai Institute" instead of "SSN College"
- **Wrong locations**: Outputting "Chittoor" instead of "Chennai"
- **Fabricated companies**: Generating an "Antler-backed Startup" due to a vague prompt instruction
- **Date inaccuracies**: Changing dates like "May 2025" to incorrect alternatives such as "June 2023"
- **Structural fabrication**: Moving projects into the experience section without authorization

## Changes Made

### Anti-Hallucination Rules Added to System Prompt
The following explicit constraints were introduced:
1. Must use **EXACT data** from the knowledge base — no modifications allowed
2. Cannot change institution names, dates, locations, or GPAs
3. Cannot invent experiences or restructure sections (e.g., moving projects to experience)
4. Must use exact dates as provided (e.g., "May 2025" not "June 2023")

### Prompt Specificity Fix
A key root cause of hallucination was an ambiguous instruction referencing an unnamed company:
- **Before:** `"mention Employee #3 at Antler-backed startup"`
- **After:** `"mention Employee #3 at Kismet"`

This change removes the need for the LLM to infer or guess the company name, directly eliminating a hallucination source.

## Impact

These changes meaningfully reduce hallucination rates in locally-run LLM resume generation, improving factual accuracy and trustworthiness of generated outputs. The fix also demonstrates the importance of precise, unambiguous language in system prompts when working with LLMs that lack strong factual grounding.

## Authorship

Co-authored with Claude Sonnet 4.5 (`noreply@anthropic.com`).

## Related

- [[Resume Generation Pipeline]]
- [[System Prompt Engineering]]
- [[LLM Hallucination Mitigation]]
- [[Career-Datacenter Project]]
- [[Knowledge Base Design]]
- [[Local LLM Deployment]]
- [[Prompt Specificity Best Practices]]
