---
title: Anti-Hallucination Constraints for Resume Generation
author: ai
created_at: 2026-04-10T02:10:01.168Z
last_ai_edit: 2026-04-10T02:10:01.168Z
last_human_edit: null
last_embedded_hash: 5afdb840ffa1bc04
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-strengthen-anti-hallucination-constraints-in-resum-8eab9b.md]]"
tags:
  - hallucination
  - resume-generation
  - system-prompt
  - llm
  - prompt-engineering
  - data-integrity
  - local-llm
  - career-datacenter
  - guardrails
  - knowledge-base
---


# Anti-Hallucination Constraints for Resume Generation

This commit strengthens system prompt constraints in the Career-Datacenter project to prevent local LLMs from fabricating or modifying resume data. Explicit rules were added to enforce exact usage of knowledge base data, and a vague instruction causing a hallucinated company reference was corrected. These changes significantly reduce inaccurate outputs such as wrong institution names, locations, and invented experiences.

## Key Concepts

- **Anti-hallucination constraints**: Explicit rules in system prompts that prevent LLMs from inventing or altering factual data
- **System prompt engineering**: Crafting instructions that guide LLM behavior and enforce data fidelity
- **Knowledge base grounding**: Requiring LLMs to use only exact, pre-verified data rather than generating plausible-sounding alternatives
- **Local LLM behavior**: Tendencies of locally-run language models to hallucinate when instructions are ambiguous or underspecified
- **Resume generation pipeline**: Automated system that produces resumes from structured personal/professional data

## Details

## Overview

Commit `62fecf8` in the `rahilsinghi/Career-Datacenter` repository introduces stronger anti-hallucination guardrails into the resume generation system prompt. The change was authored by Rahil Singhi on February 13, 2026, with co-authorship attributed to Claude Sonnet 4.5.

## Problem

Local LLMs used in the resume generation pipeline were producing outputs with fabricated or modified information, including:

- **Wrong institution names**: e.g., "Sri Sathya Sai Institute" instead of the correct "SSN College"
- **Wrong locations**: e.g., "Chittoor" instead of "Chennai"
- **Fabricated companies**: e.g., an "Antler-backed Startup" appearing where "Kismet" should have been referenced
- **Invented experiences**: Projects being moved into the experience section without authorization
- **Wrong dates**: Dates being altered (e.g., "June 2023" instead of "May 2025")

## Changes Made

### Anti-Hallucination Rules Added to System Prompt
Thirteen lines were added and three removed (`+13 / -3`) to enforce the following constraints:

1. Must use **exact data** from the knowledge base — no paraphrasing or modification
2. Cannot alter **institution names, dates, locations, or GPAs**
3. Cannot **invent experiences** or misplace projects into the experience section
4. Must use **exact date formats** as provided in the source data

### Ambiguous Instruction Fix
A previously vague instruction was identified as the root cause of the hallucinated company name:

- **Before:** `mention Employee #3 at Antler-backed startup`
- **After:** `mention Employee #3 at Kismet`

This change removes ambiguity that led the LLM to substitute a generic descriptor for the actual company name.

## Impact

The update significantly reduces hallucination rates in generated resumes, improving factual accuracy and trustworthiness of the automated resume generation system, particularly when running smaller or local LLM models that are more prone to confabulation.

## Related

- [[Resume Generation Pipeline]]
- [[System Prompt Engineering]]
- [[LLM Hallucination Mitigation]]
- [[Knowledge Base Grounding]]
- [[Career-Datacenter Project]]
- [[Local LLM Deployment]]
- [[Prompt Constraints and Guardrails]]
