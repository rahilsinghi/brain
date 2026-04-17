---
title: JobDeduplicator for Career-Datacenter
author: ai
created_at: 2026-04-13T15:51:50.853Z
last_ai_edit: 2026-04-13T15:51:50.853Z
last_human_edit: null
last_embedded_hash: 0bccee530748c719
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-jobdeduplicator-persist-seen-job-ids-across-c9a913.md]]"
tags:
  - job deduplication
  - career-datacenter
  - automation
  - cli
  - data persistence
  - job scraping
---


# JobDeduplicator for Career-Datacenter

The JobDeduplicator is a utility implemented in the Career-Datacenter project to prevent reprocessing of already-seen job postings. It tracks unique job IDs in a JSON file, automatically expiring entries after a configurable period, and integrates into the nightly job scraping process to skip duplicates.

## Key Concepts

Job Deduplication,Job ID Tracking,Automated Job Application System,Data Persistence,CLI Utility

## Details

The `JobDeduplicator` is a new component introduced within the [[Career-Datacenter]] project, located at `cli/job_deduplicator.py`. Its primary function is to maintain a persistent record of job IDs that have already been processed or seen, thus preventing redundant actions during subsequent runs of automated job application workflows.

Key features of the `JobDeduplicator` include:
-   **Persistent Storage**: It tracks job IDs in a file named `tracking/seen_jobs.json`. This file is intentionally added to `.gitignore` to prevent it from being committed to the repository, as it stores local state.
-   **Automatic Expiration**: Entries in `seen_jobs.json` automatically expire after 30 days by default, though this duration is configurable. This prevents the list from growing indefinitely and allows for potential re-evaluation of older job postings.
-   **API for Interaction**: It exposes a clear API including `filter_new()` to identify jobs not yet seen, `mark_seen_batch()` to add a collection of job IDs to the tracker, and `is_seen()` to check if a specific job ID has been recorded.
-   **Integration**: The deduplicator is integrated into the `OvernightBatchProcessor`, specifically within its `_scrape_linkedin_jobs()` method. This ensures that during nightly runs, any jobs that have already been processed are automatically skipped, improving efficiency and reducing redundant operations.
-   **Logging**: During execution, the system logs the count of duplicate jobs skipped, providing visibility into the deduplication process.

## Related

[[Career-Datacenter]],[[batch_process_overnight.py Enhancements: Job Description Parsing and CLI Flags]],[[Add JobDeduplicator - Persistent Job ID Tracking]],[[Add Tracking CSV Files to Gitignore]],[[.gitignore]]
