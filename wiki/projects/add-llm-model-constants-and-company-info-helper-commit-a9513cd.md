---
title: Add LLM Model Constants and Company Info Helper (Commit a9513cd)
author: ai
created_at: 2026-04-11T01:44:24.556Z
last_ai_edit: 2026-04-11T01:44:24.556Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-add-llm-model-constants-and-company-info-help-791527.md]]"
tags:
  - llm
  - career-datacenter
  - python
  - bugfix
  - code
  - helper
  - constants
  - commit
---

# Add LLM Model Constants and Company Info Helper (Commit a9513cd)

This commit to the [[Career-Datacenter]] project introduced essential [[LLM Model Constants]] for Claude models and a `get_company_info()` helper function. These additions resolved critical import errors in the [[Email Generator]] and [[Followup Generator]] modules, providing necessary context for automated outreach.

## Key Concepts

LLM Model Constants,Company Information Helper,Email Generation,Follow-up Generation,ImportError,Career-Datacenter Project

## Details

This commit, `a9513cd`, dated 2026-02-25, by Rahil Singhi, implemented two key improvements within the `rahilsinghi/Career-Datacenter` repository:

1.  **Added Missing LLM Model Constants**: The `llm_client.py` file was updated to include specific model identifiers for Claude LLMs. These constants ensure consistency and easy referencing of the correct model versions:
    *   `HAIKU = "claude-haiku-4-5-20251001"`
    *   `SONNET = "claude-sonnet-4-5-20250929"`
    *   `OPUS = "claude-opus-4-6"`

2.  **Introduced `get_company_info()` Helper**: A new function, `get_company_info()`, was added to `company_discovery.py`. This utility is designed to retrieve detailed company data (e.g., category, domain, positioning) from either CSV or YAML sources. Its primary purpose is to supply contextual information to the [[Email Generator]], enabling more tailored and effective communication.

These changes effectively fixed `ImportError` issues encountered in both the [[Email Generator]] and [[Followup Generator]] components, improving the robustness of the automated application and outreach system.

Co-Authored-By: [[Claude Sonnet 4.5]]

## Related

[[Career-Datacenter]],[[LLM Model Constants and Company Info Helper (Commit a9513cd)]],[[Email Generator]],[[Followup Generator]],[[LLM Integration]],[[Company Discovery]],[[Claude Sonnet 4.5]],[[Add LLM Model Constants and Company Info Helper (Commit a9513cd)]]
