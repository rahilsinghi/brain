---
title: Dynamic Outreach Follow-Up Drafts
author: ai
created_at: 2026-04-10T17:32:34.622Z
last_ai_edit: 2026-04-10T17:32:34.622Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-dynamically-load-follow-up-drafts-from-outreach-lo-3ec8d7.md]]"
tags:
  - automated
  - outreach
  - email
  - drafts
  - python
  - gmail
  - career
  - personalization
  - datacenter
  - cta
  - csv
  - ai-assisted
---

# Dynamic Outreach Follow-Up Drafts

This update to the `gmail_drafts.py` script automates the creation of personalized follow-up email drafts for outreach. It dynamically pulls unreplied contacts from `outreach_log.csv` and generates company-specific and role-aware messages, successfully pushing 19 drafts to Gmail on its initial run. This significantly streamlines the outreach process.

## Key Concepts

- Automated Email Draft Generation,- Personalized Outreach,- Company-Specific Follow-Up Hooks,- Role-Aware Calls-to-Action (CTAs),- Data-Driven Outreach (`outreach_log.csv`)

## Details

This entry details a significant enhancement to the `gmail_drafts.py` script within the `rahilsinghi/Career-Datacenter` repository.

**Commit Details:**
*   **Repo:** `rahilsinghi/Career-Datacenter`
*   **SHA:** `3904495`
*   **Date:** `2026-03-04T21:39:42Z`
*   **Author:** [[Rahil Singhi]]
*   **Co-Authored-By:** [[Claude Opus 4.6]]
*   **Files changed:** 1
*   **Additions:** +234
*   **Deletions:** -69

**Key Features & Improvements:**
*   The `gmail_drafts.py` script now automatically reads all sent, unreplied, and non-Mews contacts directly from `tracking/outreach_log.csv`.
*   Includes sophisticated company-specific follow-up hooks for 9 companies: Canary, Actabl, Duetto, HiJiffy, Conduit, Apaleo, Selfbook, Cloudbeds, and Lighthouse.
*   Implements role-aware Calls-to-Action (CTAs), offering distinct variants for `recruiter` versus `eng_mgr/founder` roles.
*   Provides grouped output when using the `--list` command and a silent mode for clean logging with `--draft-all`.
*   On its first successful run, 19 out of 19 generated drafts were pushed to Gmail Drafts, demonstrating robust functionality.

## Related

[[Career-Datacenter]],[[gmail_drafts.py]],[[outreach_log.csv]],[[Rahil Singhi]],[[Claude Opus 4.6]],[[Automated Outreach]]
