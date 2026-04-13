---
title: Job Tracker and Scraper Orchestrator (Career-Datacenter Phase 2.2 - Part 3)
author: ai
created_at: 2026-04-12T21:17:22.622Z
last_ai_edit: 2026-04-12T21:17:22.622Z
last_human_edit: null
last_embedded_hash: 2b858f9067dfa098
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-tracker-and-scraper-orchestrator-phase-2-910e2d.md]]"
tags:
  - career-datacenter
  - job scraping
  - job tracking
  - scraper orchestration
  - automated job applications
  - python
  - cli
  - job search automation
---


# Job Tracker and Scraper Orchestrator (Career-Datacenter Phase 2.2 - Part 3)

This article details the completion of the job scraping system within the [[Career-Datacenter]] project, integrating a Job Tracker and a Scraper Orchestrator. The system is designed to save scraped jobs to a CSV database, perform deduplication, manage job statuses, and automatically flag high-fit jobs for application generation. It orchestrates scraping across various job boards, applies filters, and scores job relevance.

## Key Concepts

Job Tracking,Job Deduplication,Job Status Management,Scraper Orchestration,Automated Application Generation,Job Fit Scoring,CSV Database

## Details

This commit (`8913d71`) by Rahil Singhi on 2026-02-14 marks the completion of the job scraping system for the [[Career-Datacenter]] project, specifically as Phase 2.2 - Part 3. It introduces two key components:

### 1. Job Tracker (`job_tracker.py`)

This module is responsible for persistent storage and management of scraped job data.

**Features:**
*   **CSV Database:** Saves scraped jobs to a CSV file for easy viewing and editing.
*   **Deduplication:** Prevents duplicate entries based on a unique `job_id`.
*   **Status Tracking:** Allows tracking of job application statuses (e.g., `new`, `applied`, `interview`, etc.).
*   **Querying:** Enables querying jobs based on their status or a calculated `fit score`.
*   **Updates:** Provides functionality to update job statuses and add notes.
*   **Summary Reports:** Generates concise reports based on tracked data.
*   **Detailed Fields:** Tracks up to 20 fields per job entry.
*   **High-Fit Queries:** Can specifically query for jobs with a fit score of 8.0 or higher.
*   **Statistics:** Provides statistics grouped by status, source, and fit score.

**Testing:** The `job_tracker.py` module includes a standalone test mode for verifying tracking functionality.

### 2. Scraper Orchestrator (`run_job_scraper.py`)

This script serves as the main entry point for initiating and managing the job scraping process.

**Workflow:**
1.  **Scrape Jobs:** Executes configured scrapers for various job boards (e.g., Indeed, YC, Wellfound).
2.  **Filter Jobs:** Applies `MUST-HAVE` and `DEALBREAKER` filters using the [[JobFilter]] component.
3.  **Score Jobs:** Utilizes the existing [[FitScorer]] to assign a relevance score to each job.
4.  **Save to Tracker:** Stores the processed job data in `tracking/scraped_jobs.csv` via the [[Job Tracker]] module.
5.  **Flag for Application:** Identifies and flags high-fit jobs (score $\geq 8.0$) for automated application generation.
6.  **Summary Report:** Generates a summary report of the scraping run.

**Usage:**
*   `python run_job_scraper.py`: Runs all configured scrapers.
*   `python run_job_scraper.py --boards indeed`: Runs only the specified scraper (e.g., Indeed).
*   `python run_job_scraper.py --dry-run`: Executes the scraper in a test mode without saving changes.

**Testing:** The `--dry-run` flag provides a dedicated test mode for the scraper orchestrator.

**Next Steps:** The immediate future work involves adding a scheduler to automate daily execution of the scraping system.

## Related

[[Career-Datacenter: Job Search Automation Platform]],[[Career Datacenter: Job Tracker and Scraper Orchestrator]],[[JobTracker Unit Tests]],[[Add JobDeduplicator - Persistent Job ID Tracking]],[[Add JobDeduplicator Unit Tests]],[[ApplicationBatchRunner for Automated Job Application Generation]],[[Add Job Scraper Foundation (Career-Datacenter Phase 2.2 - Part 1)]],[[Career-Datacenter: Phase 2.2 Job Scraping System Completion]],[[JobFilter]],[[FitScorer]]
