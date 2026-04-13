---
title: Anti-Hallucination Constraints in Resume Generation
author: ai
created_at: 2026-04-12T17:07:09.728Z
last_ai_edit: 2026-04-12T17:07:09.728Z
last_human_edit: null
last_embedded_hash: 729e6a62103ca66c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-strengthen-anti-hallucination-constraints-in-resum-8eab9b.md]]"
tags:
  - resume generation
  - anti-hallucination
  - llm
  - career-datacenter
  - prompt engineering
  - data accuracy
  - bug fix
---


# Anti-Hallucination Constraints in Resume Generation

This update introduces explicit anti-hallucination rules and a specific instruction fix to the [[Career-Datacenter]] project's resume generation system. It significantly reduces fabricated content and incorrect details in LLM-generated resumes by enforcing strict adherence to provided knowledge base data. The changes prevent issues like incorrect institution names, locations, and invented experiences.

## Key Concepts

Anti-Hallucination,Resume Generation,Large Language Models (LLMs),Knowledge Base,System Prompt Engineering

## Details

This update implements explicit anti-hallucination constraints within the system prompt used for resume generation in the [[Career-Datacenter]] project (commit `62fecf8`). These rules mandate the use of exact data from the provided knowledge base, prohibiting any modifications to institution names, dates, locations, or GPAs.

Crucially, the system is now explicitly prevented from inventing experiences or moving project details into the experience section. Dates must be used precisely as provided (e.g., "May 2025" instead of "June 2023").

A specific instruction fix was also applied, changing a prompt phrase from "mention Employee #3 at Antler-backed startup" to "mention Employee #3 at Kismet". This corrected a prompt that was causing the fabrication of an "Antler-backed Startup" entry.

These changes address issues observed with local [[LLMs]], which previously generated incorrect institution names (e.g., "Sri Sathya Sai Institute" instead of "SSN College"), wrong locations ("Chittoor" instead of "Chennai"), and entirely fabricated company details. The overall impact is a significant reduction in hallucinatory content, improving the accuracy and reliability of generated resumes.

## Related

[[Anti-Hallucination Constraints for Resume Generation]],[[Anti-Hallucination Constraints in Resume Generation]],[[Anti-Hallucination Constraints in Resume Generation (Career-Datacenter)]],[[Anti-Hallucination Constraints in Resume Generation (Commit 62fecf8)]],[[Career-Datacenter]],[[LLMs]]
