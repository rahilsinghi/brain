---
title: Dynamic Follow-Up Draft Generation for Outreach
author: ai
created_at: 2026-04-10T21:35:21.965Z
last_ai_edit: 2026-04-10T21:35:21.965Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-dynamically-load-follow-up-drafts-from-outreach-lo-3ec8d7.md]]"
tags:
  - outreach
  - automation
  - email
  - drafts
  - python
  - gmail
  - career
  - crm
  - ai-assisted
  - scripting
  - follow-up
---

# Dynamic Follow-Up Draft Generation for Outreach

This commit introduces significant enhancements to the `gmail_drafts.py` script, enabling dynamic loading of follow-up email drafts from `outreach_log.csv`. It automates the generation of personalized drafts with company-specific hooks and role-aware calls-to-action, pushing 19 drafts successfully on its first run.

## Key Concepts

- Dynamic Draft Loading,- Outreach Log Integration,- Company-Specific Follow-Up Hooks,- Role-Aware Calls-to-Action (CTAs),- Gmail Drafts Automation,- Automated Filtering of Outreach Contacts

## Details

This update, committed by [[Rahil Singhi]] on March 4, 2026 (SHA: 3904495) to the `[[Career-Datacenter (Repository)]]` repository, significantly refines the outreach process. The `[[gmail_drafts.py (Script)]]` script was modified to dynamically read all sent, unreplied, and non-[[Mews (Company)]] contacts directly from the `[[Outreach Log (CSV)]]`. This new functionality automates the creation of follow-up drafts.

Key features introduced include:

*   **Automated Contact Selection:** The script now automatically filters contacts from `outreach_log.csv` based on specific criteria (sent, unreplied, not Mews-related).
*   **Company-Specific Hooks:** Integration of tailored follow-up messages for nine distinct companies: [[Canary (Company)]], [[Actabl (Company)]], [[Duetto (Company)]], [[HiJiffy (Company)]], [[Conduit (Company)]], [[Apaleo (Company)]], [[Selfbook (Company)]], [[Cloudbeds (Company)]], and [[Lighthouse (Company)]].
*   **Role-Aware CTAs:** Implementation of different calls-to-action based on the recipient's role, distinguishing between recruiters and engineering managers/founders.
*   **Improved Output Modes:** Enhanced command-line interaction with grouped output for the `--list` command and a silent mode for `--draft-all` to ensure clean logging.

During its initial execution, the system successfully pushed 19 out of 19 generated drafts to Gmail's Drafts folder, demonstrating high efficiency. This development was co-authored with assistance from [[Claude Opus 4.6 (AI Model)]].

## Related

[[Career-Datacenter (Repository)]],[[Rahil Singhi]],[[Outreach Log (CSV)]],[[gmail_drafts.py (Script)]],[[Canary (Company)]],[[Actabl (Company)]],[[Duetto (Company)]],[[HiJiffy (Company)]],[[Conduit (Company)]],[[Apaleo (Company)]],[[Selfbook (Company)]],[[Cloudbeds (Company)]],[[Lighthouse (Company)]],[[Mews (Company)]],[[Claude Opus 4.6 (AI Model)]]
