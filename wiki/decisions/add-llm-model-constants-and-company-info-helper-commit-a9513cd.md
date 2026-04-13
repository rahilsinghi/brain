---
title: Add LLM Model Constants and Company Info Helper (Commit a9513cd)
author: ai
created_at: 2026-04-10T21:46:25.393Z
last_ai_edit: 2026-04-10T21:46:25.393Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-add-llm-model-constants-and-company-info-help-791527.md]]"
tags:
  - llm
  - constants
  - python
  - fix
  - company data
  - claude
  - commit
  - career-datacenter
---

# Add LLM Model Constants and Company Info Helper (Commit a9513cd)

This commit introduces new LLM model constants (Haiku, Sonnet, Opus) to `llm_client.py` and a `get_company_info()` helper function to `company_discovery.py`. It resolves `ImportError` issues in the email and followup generators by providing necessary contextual data.

## Key Concepts

LLM Model Constants,Claude Haiku,Claude Sonnet,Claude Opus,`get_company_info` function,`ImportError`,Email Generator,Followup Generator

## Details

This commit, identified by SHA `a9513cd`, was authored by Rahil Singhi on 2026-02-25 within the `rahilsinghi/Career-Datacenter` repository.

**Key Changes Introduced:**

1.  **LLM Model Constants:** New constants for specific Claude large language models were added to `llm_client.py`:
    *   `HAIKU = "claude-haiku-4-5-20251001"`
    *   `SONNET = "claude-sonnet-4-5-20250929"`
    *   `OPUS = "claude-opus-4-6"`
    These constants standardize the identification and usage of these models within the application.

2.  **`get_company_info()` Helper Function:** A new utility function, `get_company_info()`, was added to `company_discovery.py`. This function is designed to retrieve essential company data, such as its category, domain, and positioning, from either CSV or YAML sources. It serves as a crucial component for providing context to the email generator.

3.  **`ImportError` Fix:** The changes explicitly address and resolve `ImportError` issues that were encountered in both the `email_generator` and `followup_generator` modules, ensuring their correct operation.

This commit involved modifications to 2 files, resulting in 348 new lines of code. Notably, it was co-authored by `Claude Sonnet 4.5`.

## Related

[[LLM Client]],[[Email Generator]],[[Followup Generator]],[[Company Discovery]],[[Claude Models]],[[Rahil Singhi]]
