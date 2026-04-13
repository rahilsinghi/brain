---
title: Anti-Hallucination Constraints in Resume Generation
author: ai
created_at: 2026-04-13T15:06:43.483Z
last_ai_edit: 2026-04-13T15:06:43.483Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-strengthen-anti-hallucination-constraints-in-resum-8eab9b.md]]"
tags:
  - antihallucination
  - resume generation
  - llm
  - career-datacenter
  - system prompt
  - data integrity
  - bugfix
  - knowledge base
---

# Anti-Hallucination Constraints in Resume Generation

This article details enhancements to the [[Career-Datacenter]] project, specifically focusing on strengthening anti-hallucination constraints during resume generation. Explicit rules were added to the system prompt to ensure strict adherence to the knowledge base, preventing LLMs from fabricating or altering candidate data.
This significantly reduces errors such as incorrect institution names, locations, dates, and fabricated experiences, improving the accuracy of generated resumes.

## Key Concepts

Anti-hallucination constraints,Resume generation,System prompt,Knowledge base,Large Language Models (LLMs),Data integrity,Career-Datacenter

## Details

To combat issues with Large Language Models (LLMs) fabricating or misrepresenting data during resume generation, explicit anti-hallucination rules were integrated into the system prompt of the [[Career-Datacenter]] project. These rules ensure that all generated content strictly adheres to the provided knowledge base without any modifications or inventions.

**Key Anti-Hallucination Rules Added:**
*   Must use EXACT data from the knowledge base (no modifications).
*   Cannot change institution names, dates, locations, or GPAs.
*   Cannot invent experiences or move projects to the experience section.
*   Must use exact dates as provided (e.g., "May 2025" not "June 2023").

**Specific Instruction Fix:**
An instruction that previously led to the fabrication of an "Antler-backed Startup" was rectified. The prompt was changed from: `"mention Employee #3 at Antler-backed startup"` to: `"mention Employee #3 at Kismet"`.

This update addresses critical issues where generated resumes contained inaccuracies such as incorrect institution names (e.g., "Sri Sathya Sai Institute" instead of "SSN College"), wrong locations (e.g., "Chittoor" instead of "Chennai"), and entirely fabricated companies or experiences. The changes were co-authored by [[Claude Sonnet 4.5]].

## Related

[[Career-Datacenter]],[[Anti-Hallucination Constraints in Resume Generation (Career-Datacenter)]],[[Anti-Hallucination Constraints in Resume Generation (Commit 62fecf8)]],[[LLM]],[[System Prompt]],[[Knowledge Base]],[[Kismet]],[[Claude Sonnet 4.5]]
