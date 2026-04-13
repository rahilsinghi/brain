---
title: Dynamic Follow-Up Draft Generation from Outreach Log (Career-Datacenter)
author: ai
created_at: 2026-04-12T18:05:18.234Z
last_ai_edit: 2026-04-12T18:05:18.234Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-dynamically-load-follow-up-drafts-from-outreach-lo-3ec8d7.md]]"
tags:
  - career-datacenter
  - email automation
  - job search
  - outreach
  - python
  - gmail
  - claude
  - automation
  - commit
---

# Dynamic Follow-Up Draft Generation from Outreach Log (Career-Datacenter)

This commit introduces functionality to dynamically generate email follow-up drafts for job outreach from the `outreach_log.csv` file within the Career-Datacenter project. The `gmail_drafts.py` script now automates draft creation for specific contacts, featuring company-specific hooks and role-aware calls-to-action. This significantly streamlines the job application follow-up process.

## Key Concepts

Email automation,Dynamic content generation,CSV parsing,Outreach management,Conditional logic,Batch processing,Job search automation

## Details

This update to the `rahilsinghi/Career-Datacenter` repository (SHA: 3904495) on March 4, 2026, focuses on enhancing the email follow-up process for job applications. The `gmail_drafts.py` script has been significantly improved to automate the generation of personalized follow-up drafts.

Key features and changes include:

*   **Automated Data Ingestion**: The `gmail_drafts.py` script now automatically reads all sent, unreplied, and non-Mews contacts from the `tracking/outreach_log.csv` file. This eliminates manual data entry for follow-ups.
*   **Company-Specific Hooks**: The system includes pre-defined follow-up hooks tailored for nine specific companies: Canary Technologies, Actabl, Duetto, HiJiffy, Conduit, Apaleo, Selfbook, Cloudbeds, and Lighthouse. This ensures highly relevant messaging.
*   **Role-Aware CTAs**: Calls-to-action (CTAs) are dynamically generated based on the contact's role, with separate variants for recruiters versus engineering managers/founders. This increases the effectiveness of the outreach.
*   **Improved CLI Output**: The script provides grouped output when using the `--list` flag and operates in a silent mode with `--draft-all` for clean logging, making it easier to monitor and manage the draft generation process.
*   **Successful First Run**: On its initial execution, the script successfully pushed 19 out of 19 generated drafts to Gmail.

This enhancement was co-authored with Claude Opus 4.6, demonstrating the integration of AI assistance in developing sophisticated automation tools for career management.

## Related

[[Career-Datacenter]],[[Career-Datacenter Outreach Analysis: Hospitality & Travel Tech Job Search]],[[Career-Datacenter Outreach Analysis: Hospitality Tech Job Search Campaign]],[[Career-Datacenter Outreach Analysis: Hospitality Tech Job Search Status]],[[Canary Technologies]],[[Actabl]],[[Apaleo]],[[Cloudbeds]],[[CLAUDE.md Agent Instructions and Hospitality Outreach Playbook]]
