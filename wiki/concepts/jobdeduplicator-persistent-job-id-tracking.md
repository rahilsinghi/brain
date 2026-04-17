---
title: JobDeduplicator - Persistent Job ID Tracking
author: ai
created_at: 2026-04-12T17:34:10.297Z
last_ai_edit: 2026-04-12T17:34:10.297Z
last_human_edit: null
last_embedded_hash: d73d13fc0d56f38c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-jobdeduplicator-persist-seen-job-ids-across-c9a913.md]]"
tags:
  - job search
  - deduplication
  - career-datacenter
  - automation
  - python
  - cli
---


# JobDeduplicator - Persistent Job ID Tracking

The `JobDeduplicator` module was introduced in the [[Career-Datacenter]] project to prevent reprocessing already-seen job postings. It persistently tracks job IDs using `tracking/seen_jobs.json`, automatically expiring entries after 30 days.
This integration ensures efficient, duplicate-free job scraping during nightly runs by skipping previously encountered job listings.

## Key Concepts

Job ID Deduplication,Persistent Tracking (via JSON file),Configurable Data Expiration (30 days),Integration with `OvernightBatchProcessor`,API for filtering and marking seen jobs,`.gitignore` management for tracking files

## Details

The `JobDeduplicator` is a key component added to the `rahilsinghi/Career-Datacenter` repository (Commit `884cdb0`, dated `2026-02-17T19:49:55Z`, authored by Rahil Singhi and Claude Sonnet 4.5).

**Functionality:**
- **Persistent Tracking**: It maintains a record of job IDs that have already been scraped or processed in a dedicated file, `tracking/seen_jobs.json`.
- **Configurable Expiration**: Entries in `seen_jobs.json` are designed to auto-expire after a configurable period, defaulting to 30 days. This prevents the tracking file from growing indefinitely and allows for re-evaluation of older job postings.
- **API**: The module exposes a clear API including `filter_new()` to identify unseen jobs from a batch, `mark_seen_batch()` to add new job IDs to the tracking list, and `is_seen()` to check individual job IDs.

**Integration:**
- The `JobDeduplicator` is directly integrated into the `_scrape_linkedin_jobs()` method within the `OvernightBatchProcessor` script. This ensures that every nightly job scraping run automatically utilizes the deduplication logic.
- During operation, it effectively skips any job postings that have already been seen, logging the count of duplicates encountered and ignored.

**File Management:**
- The `tracking/seen_jobs.json` file is explicitly added to the `.gitignore` file, ensuring that this dynamic, local tracking data is not committed to the repository.

## Related

[[Add JobDeduplicator - Persistent Job ID Tracking]],[[Career-Datacenter]],[[Career Datacenter: Job Tracker and Scraper Orchestrator]],[[OvernightBatchProcessor]],[[Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]],[[weekly_report.py Script for Job Search Summary]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]]
