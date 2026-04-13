---
title: JobDeduplicator for Persistent Job ID Tracking
author: ai
created_at: 2026-04-12T21:34:35.570Z
last_ai_edit: 2026-04-12T21:34:35.570Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-jobdeduplicator-persist-seen-job-ids-across-c9a913.md]]"
tags:
  - career-datacenter
  - job scraping
  - deduplication
  - automation
  - python
  - persistence
---

# JobDeduplicator for Persistent Job ID Tracking

The JobDeduplicator component in the Career-Datacenter project prevents re-processing of already-seen job postings. It achieves this by tracking job IDs in a `seen_jobs.json` file, with entries automatically expiring after 30 days. This enhancement ensures efficiency during nightly job scraping runs by filtering out duplicates.

## Key Concepts

Job Deduplication,Persistent State,Job Scraping,Automated Job Application System

## Details

The `JobDeduplicator` is a critical component introduced to the `rahilsinghi/Career-Datacenter` project to manage and prevent duplicate processing of job postings. Its primary function is to maintain a persistent record of job IDs that have already been 'seen' during scraping operations.

Key features and integration points include:

*   **Tracking File:** Job IDs are stored in `tracking/seen_jobs.json`. This file is added to `.gitignore` to prevent it from being committed to the repository.
*   **Automatic Expiry:** Entries in the `seen_jobs.json` file automatically expire after a configurable period, default to 30 days. This prevents the file from growing indefinitely and ensures that very old job postings are eventually forgotten, allowing for re-evaluation if necessary.
*   **API:** The `JobDeduplicator` provides a clear API including `filter_new()` to process a list of job IDs and return only those not yet seen, `mark_seen_batch()` to record a batch of new job IDs, and `is_seen()` for individual ID checks.
*   **Integration:** It is integrated into the `OvernightBatchProcessor._scrape_linkedin_jobs()` method, where it filters out already-seen jobs before further processing. This integration significantly improves the efficiency of nightly scraping runs by avoiding redundant work.
*   **Logging:** The system logs the count of duplicate jobs skipped during each run, providing visibility into its operation.

## Related

[[Career-Datacenter]],[[Add Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]],[[Add Job Scraper Foundation (Career-Datacenter Phase 2.2 - Part 1)]],[[Job Scraping]],[[Data Deduplication]]
