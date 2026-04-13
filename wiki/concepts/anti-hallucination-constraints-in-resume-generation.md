---
title: Anti-Hallucination Constraints in Resume Generation
author: ai
created_at: 2026-04-13T18:07:46.030Z
last_ai_edit: 2026-04-13T18:07:46.030Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-strengthen-anti-hallucination-constraints-in-resum-8eab9b.md]]"
tags:
  - llm
  - resume
  - hallucination
  - prompt engineering
  - career-datacenter
  - data integrity
---

# Anti-Hallucination Constraints in Resume Generation

This article details the implementation of explicit anti-hallucination rules within the `Career-Datacenter` project to improve the accuracy and reliability of LLM-generated resumes. By enforcing strict adherence to the knowledge base and fixing specific prompt instructions, issues like fabricated companies, incorrect institutional names, and inaccurate dates were significantly reduced.

## Key Concepts

Anti-Hallucination Constraints,Resume Generation,Large Language Model (LLM) Hallucination,System Prompt Engineering,Knowledge Base Adherence,Data Integrity

## Details

To enhance the fidelity of resume generation within the `rahilsinghi/Career-Datacenter` repository (commit `62fecf8`), explicit anti-hallucination rules were integrated into the system prompt. These rules mandate strict adherence to factual data from the knowledge base, preventing the LLM from inventing or modifying information.

**Explicit Anti-Hallucination Rules Added:**
*   Must use EXACT data from the knowledge base (no modifications).
*   Cannot change institution names, dates, locations, or GPAs.
*   Cannot invent experiences or move projects to the experience section.
*   Must use exact dates as provided (e.g., "May 2025" not "June 2023").

**Specific Instruction Fix:**
An instruction that previously led to the fabrication of an "Antler-backed Startup" was rectified. The prompt was changed from "mention Employee #3 at Antler-backed startup" to "mention Employee #3 at Kismet". This targeted fix directly addressed a source of hallucination.

These changes have led to a marked reduction in hallucinations, resolving issues where generated resumes contained incorrect institution names (e.g., "Sri Sathya Sai Institute" instead of "SSN College"), wrong locations ("Chittoor" instead of "Chennai"), and entirely fabricated company entries. This improvement ensures that automatically generated resumes are accurate and reflect the true data from the [[Addition of Specialized Resumes and Projects to Career-Datacenter Knowledge Base]].

## Related

[[Career-Datacenter]],[[Anti-Hallucination Constraints in Resume Generation (Career-Datacenter)]],[[Anti-Hallucination Constraints in Resume Generation (Commit 62fecf8)]],[[Addition of Specialized Resumes and Projects to Career-Datacenter Knowledge Base]]
