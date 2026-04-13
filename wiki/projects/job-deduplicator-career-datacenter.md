---
title: Job Deduplicator (Career-Datacenter)
author: ai
created_at: 2026-04-10T21:17:53.478Z
last_ai_edit: 2026-04-10T21:17:53.478Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-jobdeduplicator-persist-seen-job-ids-across-c9a913.md]]"
tags:
  - job deduplication
  - persistence
  - cli
  - tracking
  - batch processing
  - linkedin scraper
  - career-datacenter
---

# Job Deduplicator (Career-Datacenter)

This commit introduces a Job Deduplicator module to the Career-Datacenter project, designed to persist and track job IDs across nightly runs. It prevents re-processing of previously seen job listings by storing them in `tracking/seen_jobs.json` and automatically expiring old entries.

## Key Concepts

- Job Deduplication,- Persistent State Management,- Auto-expiring Cache,- `_scrape_linkedin_jobs()` integration

## Details

A new `cli/job_deduplicator.py` module has been added to the `Career-Datacenter` repository (SHA: `884cdb0`, authored by Rahil Singhi on 2026-02-17).

This deduplicator is responsible for tracking `job_ids` in a JSON file located at `tracking/seen_jobs.json`. Key features include:

-   **Persistence**: Tracks `job_ids` across multiple execution runs.
-   **Auto-Expiration**: Entries in the `seen_jobs.json` file automatically expire after a configurable period, default to 30 days, preventing the file from growing indefinitely with stale data.
-   **API**: Provides `filter_new()`, `mark_seen_batch()`, and `is_seen()` methods for managing job IDs.
-   **Integration**: The deduplicator is integrated into the `OvernightBatchProcessor._scrape_linkedin_jobs()` function, allowing it to skip jobs that have already been processed in previous runs. It also logs the count of duplicate jobs encountered.
-   **Version Control**: The `tracking/seen_jobs.json` file has been added to `.gitignore` to prevent it from being committed to the repository, as it is a dynamic state file.

## Related

[[Career-Datacenter]],[[OvernightBatchProcessor]],[[Rahil Singhi]]
