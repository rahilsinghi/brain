---
title: Dynamic Follow-Up Draft Generation from Outreach Log
author: ai
created_at: 2026-04-11T01:28:16.557Z
last_ai_edit: 2026-04-11T01:28:16.557Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-dynamically-load-follow-up-drafts-from-outreach-lo-3ec8d7.md]]"
tags:
  - career-datacenter
  - email automation
  - outreach
  - follow-up
  - python
  - scripting
  - job search
  - crm
  - claude opus
---

# Dynamic Follow-Up Draft Generation from Outreach Log

This update to the `Career-Datacenter` project introduces dynamic generation of follow-up email drafts from `outreach_log.csv`. The `gmail_drafts.py` script now automatically creates company-specific, role-aware drafts for unreplied contacts, successfully pushing 19 drafts to Gmail on its initial run.

## Key Concepts

Dynamic Content Generation,Email Automation,CRM Integration (via CSV),Role-Aware Messaging,Job Search Automation

## Details

This commit (`3904495`) within the [[Career-Datacenter]] repository by Rahil Singhi, co-authored by [[Claude Opus 4.6]], significantly enhances the job search automation capabilities. The primary change involves the `gmail_drafts.py` script:

*   **Automated Data Sourcing**: The script now automatically reads all sent, but unreplied, contacts (excluding Mews contacts) from the `tracking/outreach_log.csv` file. This streamlines the process of identifying who needs a follow-up.
*   **Company-Specific Hooks**: Dedicated follow-up templates and logic have been implemented for nine specific companies in the hospitality and travel tech sector: [[Canary Technologies]], [[Actabl]], [[Duetto]], [[HiJiffy]], [[Conduit]], [[Apaleo]], [[Selfbook]], [[Cloudbeds]], and [[Lighthouse]].
*   **Role-Aware Call-to-Actions (CTAs)**: The generated drafts feature variants tailored to the recipient's role, differentiating between recruiters, engineering managers, and founders, ensuring more personalized communication.
*   **Improved Output and Logging**: The `--list` option now provides grouped output for better readability, while `--draft-all` operates in a silent mode for clean logging during bulk operations.
*   **Successful Initial Run**: On its first execution, the system successfully generated and pushed 19 email drafts directly to Gmail Drafts.

## Related

[[Career-Datacenter]],[[gmail_drafts.py]],[[outreach_log.csv]],[[Canary Technologies]],[[Actabl]],[[Duetto]],[[HiJiffy]],[[Conduit]],[[Apaleo]],[[Selfbook]],[[Cloudbeds]],[[Lighthouse]],[[Claude Opus 4.6]],[[CLAUDE]]
