---
title: "Fix: Add LLM Model Constants and Company Info Helper"
author: ai
created_at: 2026-04-12T22:24:59.360Z
last_ai_edit: 2026-04-12T22:24:59.360Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-add-llm-model-constants-and-company-info-help-791527.md]]"
tags:
  - llm
  - career-datacenter
  - python
  - constants
  - company data
  - error fix
  - automation
  - email generator
  - followup generator
---

# Fix: Add LLM Model Constants and Company Info Helper

This commit to the Career-Datacenter project introduces new LLM model constants for Claude Haiku, Sonnet, and Opus, and adds a `get_company_info()` helper function. These changes resolve `ImportError` issues in the email and follow-up generators by providing necessary company data context.

## Key Concepts

LLM Model Constants,Company Information Helper,Email Generation,Follow-up Generation,Claude Haiku,Claude Sonnet,Claude Opus,ImportError

## Details

This update for the [[Career-Datacenter]] repository, captured in commit `a9513cd`, focuses on enhancing the system's ability to interact with Large Language Models (LLMs) and contextualize company data for automated outreach.

**LLM Model Constants:**
New model identifiers were added to `llm_client.py` to specify different versions of Claude models:
- `HAIKU = "claude-haiku-4-5-20251001"`
- `SONNET = "claude-sonnet-4-5-20250929"`
- `OPUS = "claude-opus-4-6"`
These constants ensure consistent and correct referencing of specific LLM versions within the application.

**Company Information Helper:**
A new function, `get_company_info()`, was implemented in `company_discovery.py`. This helper is designed to retrieve detailed company data, such as category, domain, and positioning, from either CSV or YAML sources. This information is crucial for providing relevant context to the email and follow-up generators.

**Error Resolution:**
The integration of `get_company_info()` specifically addresses and fixes `ImportError` issues that were occurring in the `email_generator` and `followup_generator` modules. By providing a centralized and reliable method for accessing company-specific context, these generators can now operate without errors related to missing data.

This commit was co-authored by [[Claude Sonnet]] 4.5.

## Related

[[Career-Datacenter]],[[Add SMTP Email Sending and Update Signature URLs (Career-Datacenter)]],[[Application Generator CLI Implementation Plan]],[[API Enhancement: Report Actual LLM Provider/Model in Synthesis Response]],[[Claude Sonnet]]
