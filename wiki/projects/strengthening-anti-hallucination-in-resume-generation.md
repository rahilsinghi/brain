---
title: Strengthening Anti-Hallucination in Resume Generation
author: ai
created_at: 2026-04-10T21:05:08.064Z
last_ai_edit: 2026-04-10T21:05:08.064Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-strengthen-anti-hallucination-constraints-in-resum-8eab9b.md]]"
tags:
  - llm
  - hallucination
  - resume_generation
  - system_prompt
  - ai
  - nlp
  - career_datacenter
  - prompt_engineering
---

# Strengthening Anti-Hallucination in Resume Generation

This update focuses on implementing explicit anti-hallucination constraints within the system prompt for resume generation. By adding strict rules and correcting a specific instruction, it significantly reduces the fabrication of information by local LLMs, leading to more accurate and reliable resumes.

## Key Concepts

- [[LLM Hallucination]],- [[System Prompt Engineering]],- Knowledge Base (AI),- Resume Generation (AI)

## Details

This commit (`62fecf8`) from the `rahilsinghi/Career-Datacenter` repository, authored by Rahil Singhi on 2026-02-13, details crucial improvements to resume generation by strengthening anti-hallucination constraints.

**Key changes include:**

*   **Explicit Anti-Hallucination Rules Added to System Prompt:**
    *   Mandates the use of *exact* data from the knowledge base without modification.
    *   Prohibits altering institution names, dates, locations, or GPAs.
    *   Prevents the invention of experiences or moving projects to the experience section.
    *   Requires the use of exact dates as provided (e.g., "May 2025" instead of paraphrased or incorrect dates).

*   **Correction of Fabricated Company Issue:**
    *   An instruction that previously caused the fabrication of an "Antler-backed Startup" was corrected.
    *   The prompt was changed from: "mention Employee #3 at Antler-backed startup"
    *   To: "mention Employee #3 at Kismet"

These modifications, co-authored by Claude Sonnet 4.5, have significantly improved the accuracy of generated resumes by mitigating common issues such as incorrect institution names (e.g., Sri Sathya Sai Institute instead of SSN College), wrong locations (e.g., Chittoor instead of Chennai), and the invention of non-existent companies or experiences by the local Large Language Models (LLMs).

## Related

[[rahilsinghi/Career-Datacenter]],[[Resume Generation]],[[LLM Hallucination]],[[System Prompt Engineering]],[[Rahil Singhi]],[[Claude Sonnet 4.5]]
