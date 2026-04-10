---
title: Anti-Hallucination Constraints in Resume Generation (Career-Datacenter)
author: ai
created_at: 2026-04-10T02:09:18.979Z
last_ai_edit: 2026-04-10T02:09:18.979Z
last_human_edit: null
last_embedded_hash: f3b21673f0bced75
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-strengthen-anti-hallucination-constraints-in-resum-8eab9b.md]]"
tags:
  - anti-hallucination
  - resume-generation
  - system-prompt
  - llm
  - local-llm
  - prompt-engineering
  - career-datacenter
  - knowledge-base
  - factual-accuracy
  - rahil-singhi
---


# Anti-Hallucination Constraints in Resume Generation (Career-Datacenter)

A commit to the Career-Datacenter repository strengthened system prompt constraints to prevent local LLMs from hallucinating or modifying factual data during resume generation. The changes enforce strict use of exact knowledge base data and fix a specific prompt ambiguity that caused a fabricated company reference. This significantly reduces errors such as wrong institution names, locations, and invented experiences.

## Key Concepts

- **Anti-hallucination rules**: Explicit instructions added to the LLM system prompt prohibiting any modification or invention of factual data
- **System prompt engineering**: Crafting precise directives to guide LLM behavior and constrain outputs
- **Knowledge base fidelity**: Requirement that generated content uses exact values (names, dates, locations, GPAs) from a structured data source
- **Local LLM limitations**: Tendency of locally-run language models to fabricate or alter details when prompts are ambiguous
- **Prompt ambiguity fix**: Replacing vague references (e.g., 'Antler-backed startup') with specific proper nouns (e.g., 'Kismet') to eliminate hallucinated outputs

## Details

## Overview

This commit (SHA: `62fecf8`) to the [rahilsinghi/Career-Datacenter](https://github.com/rahilsinghi/Career-Datacenter) repository introduces stronger anti-hallucination constraints into the resume generation system prompt. Authored by Rahil Singhi on 2026-02-13, the change modifies 1 file with 13 additions and 3 deletions.

## Problem

Local LLMs used for resume generation were producing factually incorrect outputs, including:
- **Wrong institution names**: e.g., generating "Sri Sathya Sai Institute" instead of "SSN College"
- **Wrong locations**: e.g., generating "Chittoor" instead of "Chennai"
- **Fabricated companies**: e.g., generating a resume entry for an unnamed "Antler-backed Startup" instead of the correct company "Kismet"
- **Invented or misplaced experiences**: Moving projects into the experience section or creating non-existent roles
- **Incorrect dates**: Using different date values than those provided in the knowledge base

## Changes Made

### Anti-Hallucination Rules Added to System Prompt
The following explicit constraints were added:
- Must use **EXACT** data from the knowledge base with no modifications
- Cannot change institution names, dates, locations, or GPAs
- Cannot invent experiences or relocate projects to the experience section
- Must use exact date formats as provided (e.g., "May 2025" not "June 2023")

### Prompt Ambiguity Fix
A specific instruction was corrected to eliminate a known hallucination trigger:

| Before | After |
|--------|-------|
| `mention Employee #3 at Antler-backed startup` | `mention Employee #3 at Kismet` |

This change removes the ambiguous descriptor and replaces it with the precise company name, preventing the LLM from fabricating or guessing the company identity.

## Impact

These constraints significantly reduce hallucinations in locally-run LLM resume generation, improving factual accuracy and trustworthiness of generated resumes.

## Attribution

Co-authored with Claude Sonnet 4.5 (`noreply@anthropic.com`).

## Related

- [[Resume Generation with LLMs]]
- [[System Prompt Engineering]]
- [[Career-Datacenter Project]]
- [[Local LLM Hallucination Mitigation]]
- [[Knowledge Base Grounding]]
- [[Prompt Ambiguity and LLM Accuracy]]
