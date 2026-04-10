---
title: Anti-Hallucination Constraints in Resume Generation (Commit 62fecf8)
author: ai
created_at: 2026-04-10T02:10:34.174Z
last_ai_edit: 2026-04-10T02:10:34.174Z
last_human_edit: null
last_embedded_hash: 7595d8a2fbbb0584
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-strengthen-anti-hallucination-constraints-in-resum-8eab9b.md]]"
tags:
  - hallucination
  - prompt-engineering
  - resume-generation
  - llm
  - system-prompt
  - anti-hallucination
  - career-datacenter
  - local-llm
  - data-fidelity
  - commit
---


# Anti-Hallucination Constraints in Resume Generation (Commit 62fecf8)

This commit strengthens the system prompt in the Career-Datacenter resume generation pipeline to explicitly prevent local LLMs from hallucinating or modifying factual data such as institution names, dates, locations, and GPAs. It also fixes a specific prompt instruction that was causing a fabricated company reference ('Antler-backed Startup') to appear instead of the correct company name ('Kismet'). These changes significantly reduce factual errors in AI-generated resumes.

## Key Concepts

- **Anti-hallucination rules**: Explicit constraints added to the system prompt instructing the LLM to use only exact data from the knowledge base
- **System prompt engineering**: Modifying LLM instructions to enforce factual accuracy and prevent data fabrication
- **Knowledge base fidelity**: Requirement that institution names, dates, locations, GPAs, and company names must not be altered
- **Local LLM limitations**: Acknowledgment that locally-run LLMs are prone to hallucination without strict guardrails
- **Prompt specificity**: Replacing vague references (e.g., 'Antler-backed startup') with exact entity names (e.g., 'Kismet') to prevent ambiguous or fabricated output

## Details

## Overview

Commit `62fecf8` in the [rahilsinghi/Career-Datacenter](https://github.com/rahilsinghi/Career-Datacenter) repository introduces explicit anti-hallucination constraints into the system prompt used for AI-driven resume generation. The change was authored by Rahil Singhi on February 13, 2026, with co-authorship attributed to Claude Sonnet 4.5.

## Problem

Local LLMs used in the resume generation pipeline were producing resumes with factual inaccuracies, including:
- **Wrong institution names**: e.g., outputting "Sri Sathya Sai Institute" instead of "SSN College"
- **Wrong locations**: e.g., outputting "Chittoor" instead of "Chennai"
- **Fabricated companies**: e.g., generating a reference to an unnamed "Antler-backed Startup" instead of the actual company "Kismet"
- **Incorrect or invented dates**: e.g., using "June 2023" instead of the correct "May 2025"
- **Content misplacement**: Moving projects into the experience section inappropriately

## Changes Made

### Anti-Hallucination Rules Added to System Prompt
The following explicit constraints were added (+13 lines):
- Must use **EXACT data** from the knowledge base with no modifications
- Cannot change institution names, dates, locations, or GPAs
- Cannot invent experiences or relocate projects to the experience section
- Must use exact date formats as provided in the knowledge base

### Prompt Instruction Fix
A vague instruction was replaced with a specific one to eliminate ambiguity:
- **Before**: `"mention Employee #3 at Antler-backed startup"`
- **After**: `"mention Employee #3 at Kismet"`

## Impact

These changes reduce hallucination frequency in locally-run LLM resume generation by removing ambiguous instructions and enforcing strict data fidelity rules at the prompt level. This is particularly important for resumes where factual accuracy is critical.

## File Changes
- **Files changed**: 1
- **Additions**: +13 lines
- **Deletions**: -3 lines

## Related

- [[Career-Datacenter Project]]
- [[Resume Generation Pipeline]]
- [[LLM Hallucination Mitigation]]
- [[System Prompt Engineering]]
- [[Local LLM Deployment]]
- [[Knowledge Base Design]]
- [[Kismet Startup]]
