---
title: Dynamic Follow-Up Draft Generation for Job Search Outreach
author: ai
created_at: 2026-04-11T01:31:11.475Z
last_ai_edit: 2026-04-11T01:31:11.475Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-dynamically-load-follow-up-drafts-from-outreach-lo-3ec8d7.md]]"
tags:
  - career-datacenter
  - job search
  - automation
  - email marketing
  - outreach
  - python
  - gmail
  - follow-up
  - claude opus
---

# Dynamic Follow-Up Draft Generation for Job Search Outreach

This update to the `Career-Datacenter` project automates the creation of personalized follow-up email drafts based on the `outreach_log.csv` file. The `gmail_drafts.py` script now dynamically generates drafts for unreplied contacts, incorporating company-specific hooks and role-aware calls to action for targeted outreach.

## Key Concepts

Automated Email Generation,Personalized Outreach,Company-Specific Hooks,Role-Aware CTAs,Job Search Automation

## Details

This commit to the `rahilsinghi/Career-Datacenter` repository introduces significant enhancements to the `gmail_drafts.py` script. The script is now capable of dynamically loading follow-up draft content directly from the `tracking/outreach_log.csv` file.

The core functionality includes:

*   **Automated Contact Identification**: The script reads all sent, unreplied, and non-Mews contacts from `outreach_log.csv`, streamlining the process of identifying candidates for follow-up.
*   **Company-Specific Follow-Up Hooks**: Tailored follow-up messages are generated for nine specific companies: [[Canary Technologies]], [[Actabl]], [[Duetto]], [[HiJiffy]], [[Conduit]], [[Apaleo]], [[Selfbook]], [[Cloudbeds]], and [[Lighthouse]]. This allows for highly relevant and contextual communication.
*   **Role-Aware Calls to Action (CTAs)**: The drafts include variants of CTAs optimized for different recipient roles, distinguishing between messages for recruiters versus engineering managers or founders, increasing the effectiveness of the outreach.
*   **Improved Script Output**: The `gmail_drafts.py` script now supports a `--list` option for grouped output and a `--draft-all` option for silent operation, facilitating cleaner logging and batch processing.

Upon its first run, the updated script successfully pushed 19 out of 19 generated drafts to Gmail Drafts, demonstrating its effectiveness in automating the follow-up process.

## Related

[[Career-Datacenter]],[[outreach_log.csv]],[[gmail_drafts.py]],[[Canary Technologies]],[[Actabl]],[[Duetto]],[[HiJiffy]],[[Conduit]],[[Apaleo]],[[Selfbook]],[[Cloudbeds]],[[Lighthouse]],[[Automated Email Digest System]],[[Career-Datacenter Outreach Analysis: Hospitality Tech Job Search Campaign]],[[Automated Job Application Workflow Script (apply_workflow.py)]],[[CLAUDE.md Agent Instructions and Hospitality Outreach Playbook]]
