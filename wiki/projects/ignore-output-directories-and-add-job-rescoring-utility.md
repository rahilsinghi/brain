---
title: Ignore Output Directories and Add Job Rescoring Utility
author: ai
created_at: 2026-04-13T15:58:21.095Z
last_ai_edit: 2026-04-13T15:58:21.095Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-chore-ignore-output-directories-and-add-rescore-u-ccd6d0.md]]"
tags:
  - git
  - cli
  - job search
  - scoring
  - automation
  - career-datacenter
  - maintenance
---

# Ignore Output Directories and Add Job Rescoring Utility

This commit for the `Career-Datacenter` project adds several output directories to `.gitignore` to prevent unnecessary tracking of generated files. It also introduces `cli/rescore_jobs.py`, a new utility designed to re-evaluate jobs based on updated scoring criteria.

## Key Concepts

`.gitignore`,Output directory management,Job scoring,CLI utility,Career-Datacenter

## Details

This commit (`0aa635e`) on `2026-02-25T19:05:38Z` by Rahil Singhi (co-authored by Claude Sonnet 4.5) for the `rahilsinghi/Career-Datacenter` repository involved changes to 2 files, with 182 additions and 0 deletions. The key updates include:

*   `.gitignore`: Modified to include several new entries: `outputs/email_drafts`, `batch_generated`, `daily_reports`, and `resume_variants`. These additions ensure that intermediate or generated output files are not inadvertently committed to the repository.
*   `cli/rescore_jobs.py`: A new command-line utility was added. This script provides functionality to rescore existing jobs, allowing for the application of updated evaluation criteria without manual reprocessing.

## Related

[[Career-Datacenter]]
