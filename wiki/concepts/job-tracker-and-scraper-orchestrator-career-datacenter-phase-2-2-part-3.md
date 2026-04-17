---
title: Job Tracker and Scraper Orchestrator (Career-Datacenter Phase 2.2 - Part 3)
author: ai
created_at: 2026-04-13T18:12:43.102Z
last_ai_edit: 2026-04-13T18:12:43.102Z
last_human_edit: null
last_embedded_hash: d7f9dee23f410dcb
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-tracker-and-scraper-orchestrator-phase-2-910e2d.md]]"
tags:
  - career-datacenter
  - job-scraping
  - job-tracking
  - orchestration
  - python
  - cli
  - automation
  - application-generation
---


# Job Tracker and Scraper Orchestrator (Career-Datacenter Phase 2.2 - Part 3)

This article details the implementation of the Job Tracker (`job_tracker.py`) and Scraper Orchestrator (`run_job_scraper.py`) within the [[Career-Datacenter]] project. These modules establish a comprehensive system for automated job scraping, deduplication, status tracking, fit scoring, and flagging high-fit opportunities for subsequent application generation. This work completes Phase 2.2 of the Career-Datacenter roadmap.

## Key Concepts

Job Tracking,Job Deduplication,Job Status Management,Scraper Orchestration,Job Filtering,Fit Scoring,Automated Application Generation Flagging,CLI Tools,CSV Database

## Details

This document outlines the completion of the job scraping system within the [[Career-Datacenter]] project, specifically focusing on the [[Job Tracker]] and [[Scraper Orchestrator]] components as part of Phase 2.2 - Part 3.

**Repository & Commit Details:**
*   **Repo:** `rahilsinghi/Career-Datacenter`
*   **SHA:** `8913d71`
*   **Date:** `2026-02-14T16:47:44Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 2
*   **Additions:** +725
*   **Deletions:** -0

The system is composed of two primary modules:

### 1. Job Tracker (`job_tracker.py`)
The `job_tracker.py` module serves as a persistent database and management system for scraped job postings. Related unit tests are described in [[JobTracker Unit Tests]].

**Features:**
*   **CSV Database:** Stores all scraped job data in a CSV format (`tracking/scraped_jobs.csv`) for easy viewing and editing.
*   **Deduplication:** Prevents duplicate job entries by using a unique `job_id`. This leverages the work done in [[Add JobDeduplicator - Persistent Job ID Tracking]].
*   **Status Tracking:** Allows for updating and querying jobs based on their current status (e.g., `new`, `applied`, `interview`, `rejected`, `offered`).
*   **Querying:** Supports querying jobs by specific criteria such as status or [[FitScorer]] score. High-fit jobs (score ≥8.0) can be easily identified.
*   **Notes:** Provides functionality to add and update notes associated with each job entry.
*   **Summary Reports:** Generates statistics on jobs by status, source, and fit score, offering insights into the job search progress.
*   **Detailed Fields:** Tracks 20 distinct fields per job entry.

### 2. Scraper Orchestrator (`run_job_scraper.py`)
The `run_job_scraper.py` script acts as the main entry point for the entire job scraping and processing pipeline, orchestrating the execution of various sub-components.

**Workflow:**
1.  **Scraping:** Initiates scraping from all configured job boards (e.g., Indeed, YC, Wellfound). This builds upon [[Job Scraper Foundation (Career-Datacenter Phase 2.2 - Part 1)]] and [[Add Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]].
2.  **Filtering:** Applies [[JobFilter]] criteria to prune irrelevant jobs based on "MUST-HAVE" and "DEALBREAKER" requirements.
3.  **Scoring:** Utilizes the existing [[FitScorer]] to calculate a compatibility score for each job.
4.  **Saving:** Persists filtered and scored jobs into the `tracking/scraped_jobs.csv` database managed by the [[Job Tracker]].
5.  **Application Flagging:** Automatically flags jobs with a [[FitScorer]] score of 8.0 or higher for potential [[ApplicationBatchRunner for Automated Job Application Generation]].
6.  **Reporting:** Generates a summary report of the scraping run.

**Usage:**
The orchestrator supports flexible execution via command-line interface (CLI):
*   `python run_job_scraper.py`: Runs scrapers for all configured job boards.
*   `python run_job_scraper.py --boards indeed`: Runs scrapers for a specific board (e.g., Indeed).
*   `python run_job_scraper.py --dry-run`: Executes the scraping process in a test mode without persisting changes, useful for validation.

**Testing:**
Both modules include standalone test modes for verification:
*   `python job_tracker.py`: Tests the functionalities of the Job Tracker.
*   `python run_job_scraper.py --dry-run`: Tests the scraping and orchestration workflow.

**Next Steps:**
The immediate next step is to integrate a scheduler for daily automation of the job scraping and tracking process.

## Related

[[Career-Datacenter]],[[Job Tracker]],[[Scraper Orchestrator]],[[JobTracker Unit Tests]],[[Add JobDeduplicator - Persistent Job ID Tracking]],[[FitScorer]],[[JobFilter]],[[Job Scraper Foundation (Career-Datacenter Phase 2.2 - Part 1)]],[[Add Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]],[[ApplicationBatchRunner for Automated Job Application Generation]]
