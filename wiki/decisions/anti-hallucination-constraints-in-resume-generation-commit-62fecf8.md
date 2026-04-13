---
title: Anti-Hallucination Constraints in Resume Generation (Commit 62fecf8)
author: ai
created_at: 2026-04-12T21:08:05.152Z
last_ai_edit: 2026-04-12T21:08:05.152Z
last_human_edit: null
last_embedded_hash: 881e7a95b018ee94
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-strengthen-anti-hallucination-constraints-in-resum-8eab9b.md]]"
tags:
  - resume
  - generation
  - hallucination
  - llm
  - prompt engineering
  - career-datacenter
  - commit
  - data accuracy
---


# Anti-Hallucination Constraints in Resume Generation (Commit 62fecf8)

This commit introduced explicit anti-hallucination rules into the system prompt for resume generation, ensuring data accuracy and preventing the invention of information by Large Language Models. Key changes included requiring exact data usage from the knowledge base and fixing a specific instruction that led to fabricated company names. These updates significantly reduced issues like incorrect institution names, locations, and invented experiences in generated resumes.

## Key Concepts

Anti-hallucination,Resume generation,System prompt engineering,Large Language Models (LLMs),Data accuracy

## Details

On February 13, 2026, commit `62fecf8` to the `rahilsinghi/Career-Datacenter` repository implemented crucial anti-hallucination constraints for the resume generation system. The changes primarily involved updating the system prompt with strict directives for the underlying Large Language Models (LLMs).

**Explicit Anti-Hallucination Rules Added to System Prompt:**
*   **Data Fidelity:** LLMs are now mandated to use **EXACT** data from the knowledge base without any modifications.
*   **Immutability of Core Data:** Institution names, dates, locations, and GPAs must not be altered.
*   **Experience Fabrication Prevention:** LLMs are prohibited from inventing experiences or reclassifying projects as professional experience.
*   **Exact Date Usage:** Dates must be used precisely as provided (e.g., "May 2025" must not be interpreted as "June 2023").

**Instruction Fix for Fabricated Company:**
An instruction that previously led to the fabrication of an "Antler-backed Startup" was corrected.
*   **Original:** `mention Employee #3 at Antler-backed startup`
*   **Corrected:** `mention Employee #3 at Kismet`

These enhancements were critical in mitigating hallucinations from local LLMs, which had previously resulted in errors such as incorrect institution names (e.g., `Sri Sathya Sai Institute` instead of `SSN College`), wrong locations (`Chittoor` instead of `Chennai`), and the creation of non-existent companies.

## Related

[[Career-Datacenter]],[[Anti-Hallucination Constraints in Resume Generation]],[[Anti-Hallucination Constraints in Resume Generation (Career-Datacenter)]]
