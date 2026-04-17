---
title: Automated Job Search Daily Pipeline
author: ai
created_at: 2026-04-13T22:31:43.541Z
last_ai_edit: 2026-04-13T22:31:43.541Z
last_human_edit: null
last_embedded_hash: 329e46f8149dbaea
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/career-datacenter/career-datacenter-community-3.md]]"
tags:
  - code-community
  - career-datacenter
  - graphify
  - job-search-automation
  - data-pipeline
  - scraping
  - deduplication
  - email-notifications
  - cli-tooling
  - batch-processing
aliases:
  - Community 3
---



# Automated Job Search Daily Pipeline

This code community orchestrates the daily automated job search pipeline within the [[career-datacenter]] project. It systematically scrapes new job postings, deduplicates them to prevent redundancy, and processes them through a nightly batch. The culmination is the generation and dispatch of a personalized email digest, summarizing relevant job opportunities to the user.

## Key Concepts

Job Scraping,Job Deduplication,Automated Batch Processing,Email Digest Generation,Job Search Automation

## Details

This community forms the core of the automated job search system, integrating several command-line interface (CLI) tools to perform a continuous, daily cycle of job discovery, processing, and notification.

*   **`/Users/rahilsinghi/Desktop/career-datacenter/cli/batch_process_overnight.py`**:
    This script is the central orchestrator, embodying the `OvernightBatchProcessor` class. It manages the end-to-end daily workflow by coordinating the other components. Its `run` method sequentially executes various steps, including scraping jobs, filtering them, scoring their relevance, saving them to a tracker, generating application materials, compiling daily reports, and sending out email digests.

*   **`/Users/rahilsinghi/Desktop/career-datacenter/cli/scraper_linkedin.py`**:
    This module contains the `LinkedInScraper` class, which is responsible for programmatically interacting with LinkedIn to extract job data. Key methods include `scrape_jobs` to initiate the scraping process, `parse_job_data` to structure the extracted information, `get_job_details` for fetching specific job insights, and `search_recent_jobs_all_titles` to broaden the search scope.

*   **`/Users/rahilsinghi/Desktop/career-datacenter/cli/job_deduplicator.py`**:
    Implementing the `JobDeduplicator` class, this module is crucial for maintaining a clean and efficient job database by preventing the processing of duplicate job entries. It manages a persistent state to track jobs that have already been seen and provides methods like `load`, `save`, `is_seen`, `mark_seen`, and `filter_new` to manage job uniqueness and lifecycle.

*   **`/Users/rahilsinghi/Desktop/career-datacenter/cli/email_digest.py`**:
    This file houses the `EmailDigestGenerator` class, which is tasked with constructing and dispatching personalized email summaries of newly found and relevant job opportunities. It prepares the email context, renders HTML templates for a professional presentation, and handles the actual sending of the digest. Helper functions such as `load_jobs`, `safe_float`, `fmt_salary`, and `snippet` assist in formatting job data for inclusion in the email.

*   **`/Users/rahilsinghi/Desktop/career-datacenter/tests/test_deduplicator.py`**:
    This module contains the tests for the `JobDeduplicator` functionality, ensuring its correctness. It includes tests for job visibility and marking (`test_deduplicator_testisseenandmarkseen`), filtering of new jobs (`test_deduplicator_testfilternew`), data persistence (`test_deduplicator_testpersistence`), and correct handling of expired entries (`test_deduplicator_testexpiry`).

**External Dependencies and Integrations:**

This pipeline heavily integrates with other components within the [[career-datacenter]] repository:

*   The `job_deduplicator` module is thoroughly tested by components from [[Community 5]], specifically `test_pipeline_integration` (e.g., [[Add JobDeduplicator Unit Tests - Persistence, Expiry, Filter_New]]).
*   The `batch_process_overnight` orchestrator integrates with:
    *   [[Community 0]] for `job_filter` (initial job screening), `job_scraper_models` (data structures like `Job` and `JobStatus`), and `jobscraperbase` (base for scrapers).
    *   [[Community 5]] for `job_tracker` (managing job application states).
    *   [[Community 2]] for `fit_scorer` (job suitability evaluation), `jd_parser` (job description parsing), `cover_letter_generator` (cover letter creation), and `latex_utils` (document generation).
    *   [[Community 4]] for `resume_generator` (tailoring resumes).
*   The `scraper_linkedin` module, built upon `jobscraperbase` from [[Community 0]], also interacts with `rescore_jobs` from [[Community 2]].

## Related

[[career-datacenter]],[[Add JobDeduplicator Unit Tests - Persistence, Expiry, Filter_New]],[[Comprehensive Job Scraper Documentation (Career-Datacenter)]],[[weekly_report.py Script for Job Search Summary]],[[Application Tracking System (Career-Datacenter)]],[[Add tracking CSV files to .gitignore in Career-Datacenter]],[[Career Datacenter: Job Search Automation Platform]],[[job_filter]],[[job_tracker]],[[fit_scorer]],[[jd_parser]],[[resume_generator]],[[cover_letter_generator]],[[job_scraper_models]]
