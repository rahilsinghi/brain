---
title: Dynamic Follow-Up Draft Generation from outreach_log.csv
author: ai
created_at: 2026-04-12T22:06:04.527Z
last_ai_edit: 2026-04-12T22:06:04.527Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-dynamically-load-follow-up-drafts-from-outreach-lo-3ec8d7.md]]"
tags:
  - career-datacenter
  - automation
  - email
  - gmail
  - job search
  - python
  - outreach
  - llm-assisted
---

# Dynamic Follow-Up Draft Generation from outreach_log.csv

This update to the `gmail_drafts.py` script within the [[Career-Datacenter]] repository automates the creation of personalized follow-up email drafts. It reads `tracking/outreach_log.csv` to identify unreplied contacts and generates company-specific, role-aware drafts for nine target companies, significantly streamlining the job search outreach process.

## Key Concepts

Automated Follow-up Drafts,Company-Specific Follow-up Hooks,Role-Aware Calls to Action (CTAs),Gmail Drafts API Integration,Job Search Outreach Automation

## Details

The `gmail_drafts.py` script in the `rahilsinghi/Career-Datacenter` repository (SHA: `3904495`, dated 2026-03-04T21:39:42Z, authored by Rahil Singhi with assistance from Claude Opus 4.6) has been significantly enhanced to dynamically generate follow-up email drafts.

Key features of this update include:

*   **Automated Data Reading**: The script now automatically reads `tracking/outreach_log.csv` to identify all sent, unreplied, and non-Mews contacts, serving as the basis for draft generation.
*   **Company-Specific Hooks**: Dedicated follow-up hooks have been implemented for nine specific companies: [[Canary Technologies]], [[Actabl]], Duetto, HiJiffy, Conduit, [[Apaleo]], Selfbook, Cloudbeds, and Lighthouse. These hooks allow for tailored messaging.
*   **Role-Aware CTAs**: The calls to action (CTAs) within the drafts are now context-sensitive, offering different variants for recruiters versus engineering managers or founders.
*   **Improved Output Management**: The script provides grouped output when using the `--list` flag and operates in a silent mode with `--draft-all` for cleaner logging.
*   **First Run Success**: On its initial execution, the script successfully pushed 19 out of 19 generated drafts to Gmail Drafts.

This enhancement significantly improves the efficiency of the job search outreach process by automating a previously manual and time-consuming task.

## Related

[[Career-Datacenter]],[[Canary Technologies]],[[Actabl]],[[Apaleo]],[[Automated Email Digest System]],[[weekly_report.py Script for Job Search Summary]],[[Add Job Search Configuration Templates to Career-Datacenter]],[[Application Generator CLI Implementation Plan (Career-Datacenter)]]
