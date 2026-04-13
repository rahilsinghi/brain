---
title: Add JobDeduplicator - Persistent Job ID Tracking
author: ai
created_at: 2026-04-10T17:18:00.303Z
last_ai_edit: 2026-04-10T17:18:00.303Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-jobdeduplicator-persist-seen-job-ids-across-c9a913.md]]"
tags:
  - deduplication
  - job_tracking
  - persistence
  - batch_processing
  - python
  - career-datacenter
  - efficiency
---

# Add JobDeduplicator - Persistent Job ID Tracking

This commit introduces a `JobDeduplicator` component to the `Career-Datacenter` project, designed to persistently track and filter already-seen job IDs. It prevents reprocessing of duplicate job offers across nightly runs, improving efficiency and resource usage. The component includes an auto-expiration feature for tracked job IDs.

## Key Concepts

Job Deduplication,Persistent Tracking,Job ID Expiration,Overnight Batch Processing,Data Filtering

## Details

This change introduces a new Python component, `cli/job_deduplicator.py`, specifically designed to manage and persist job IDs that have already been processed. The primary goal is to prevent the `Career-Datacenter` project from re-scraping or reprocessing the same job offers during subsequent nightly runs.

Key features and implementation details include:
*   **Persistent Storage**: Job IDs are tracked and stored in `tracking/seen_jobs.json`.
*   **Auto-Expiration**: Entries in the tracking file automatically expire after a configurable duration, defaulting to 30 days, to manage data freshness and storage.
*   **API**: Provides a simple API with methods like `filter_new()`, `mark_seen_batch()`, and `is_seen()` to interact with the tracking system.
*   **Integration**: The `JobDeduplicator` is integrated into the `OvernightBatchProcessor._scrape_linkedin_jobs()` method, ensuring that scraped jobs are checked for duplicates before being processed further.
*   **Efficiency**: The system skips already-seen jobs, significantly improving processing efficiency and providing logging of the number of duplicate jobs identified in each run.
*   **Version Control**: The `tracking/seen_jobs.json` file has been added to `.gitignore` to prevent it from being committed to the repository.

**Commit Details:**
*   **Repository:** `rahilsinghi/Career-Datacenter`
*   **Commit SHA:** `884cdb0`
*   **Date:** `2026-02-17T19:49:55Z`
*   **Author:** Rahil Singhi
*   **Files Changed:** 2
*   **Additions:** +104
*   **Deletions:** -3
*   **Co-Authored-By:** Claude Sonnet 4.5 <noreply@anthropic.com>

## Related

[[Career-Datacenter]],[[OvernightBatchProcessor]]
