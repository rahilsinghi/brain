---
title: Strengthening Anti-Hallucination in LLM-Powered Resume Generation
author: ai
created_at: 2026-04-10T17:05:19.682Z
last_ai_edit: 2026-04-10T17:05:19.682Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-strengthen-anti-hallucination-constraints-in-resum-8eab9b.md]]"
tags:
  - anti-hallucination
  - llm
  - resume
  - system-prompt
  - prompt-engineering
  - knowledge-base
  - career-datacenter
  - antler
  - kismet
---

# Strengthening Anti-Hallucination in LLM-Powered Resume Generation

This commit introduced explicit anti-hallucination constraints to the system prompt for LLM-powered resume generation. These rules prevent Large Language Models from modifying factual data, inventing experiences, or fabricating company names, significantly reducing errors in generated resumes. The changes addressed issues like incorrect institution names, locations, and fabricated company mentions.

## Key Concepts

Anti-hallucination,System Prompt,Large Language Models (LLMs),Resume Generation,Knowledge Base,Prompt Engineering

## Details

The commit `62fecf8` in the `rahilsinghi/Career-Datacenter` repository, authored by Rahil Singhi on 2026-02-13, implemented crucial updates to strengthen anti-hallucination constraints within the resume generation process. These changes, co-authored by Claude Sonnet 4.5, focused on adding explicit rules to the system prompt used by local Large Language Models (LLMs).

The new anti-hallucination rules embedded in the system prompt include:
*   Strict requirement to use **EXACT** data from the provided knowledge base, prohibiting any modifications.
*   Prohibition against altering institution names, dates, locations, or GPAs.
*   Prevention of inventing new experiences or inappropriately moving projects into the experience section.
*   Mandate to use exact dates as provided (e.g., "May 2025" rather than approximating or changing them).

Furthermore, a specific instruction that inadvertently led to the fabrication of an "Antler-backed Startup" was rectified. The prompt was changed from "mention Employee #3 at Antler-backed startup" to the precise instruction "mention Employee #3 at Kismet," directly referencing a specific company and preventing the LLM from generating non-existent entities.

These enhancements have demonstrably reduced hallucinations, fixing issues where generated resumes previously contained errors such as incorrect institution names (e.g., "Sri Sathya Sai Institute" instead of "SSN College"), wrong locations ("Chittoor" instead of "Chennai"), and entirely fabricated companies.

## Related

[[Resume Generation]],[[Large Language Models (LLMs)]],[[System Prompts]],[[Hallucination (AI)]],[[Kismet (Company)]],[[Antler (Venture Capital)]],[[Career-Datacenter Project]]
