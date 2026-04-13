---
title: "Career Datacenter: Job Tracker and Scraper Orchestrator"
author: ai
created_at: 2026-04-10T17:09:11.173Z
last_ai_edit: 2026-04-10T17:09:11.173Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-tracker-and-scraper-orchestrator-phase-2-910e2d.md]]"
tags:
  - job scraping
  - job tracking
  - orchestration
  - career datacenter
  - python
  - automation
  - data management
  - software development
  - project update
  - csv
---

# Career Datacenter: Job Tracker and Scraper Orchestrator

This article details the Job Tracker and Scraper Orchestrator system, a core component of the Career Datacenter project. It describes how the system scrapes job postings, tracks their status, deduplicates entries, scores them for fit, and orchestrates the entire job search workflow.
The system integrates `job_tracker.py` for managing job data and `run_job_scraper.py` for automating the scraping, filtering, and scoring processes, including flagging high-fit jobs for potential application generation.

## Key Concepts

Job Tracker,Scraper Orchestrator,Job Scraping,Job Deduplication,Job Filtering,Job Scoring,Job Status Tracking,Application Generation,Career Datacenter,CSV Database

## Details

This document outlines the completion of the job scraping system with tracking and orchestration capabilities, part of the Phase 2.2 - Part 3 development of the Career-Datacenter project.

**Commit Details:**
*   **Repository:** `rahilsinghi/Career-Datacenter`
*   **SHA:** `8913d71`
*   **Date:** `2026-02-14T16:47:44Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 2
*   **Additions:** +725
*   **Deletions:** -0
*   **Co-Authored-By:** Claude Sonnet 4.5 <noreply@anthropic.com>

### 1. Job Tracker (`job_tracker.py`)

This module is responsible for managing scraped job data, providing persistence, deduplication, and tracking capabilities.

*   **Functionality:**
    *   Saves scraped jobs to a CSV database for easy viewing and editing.
    *   Performs deduplication of jobs based on `job_id` to prevent duplicate entries.
    *   Tracks job status (e.g., `new`, `applied`, `interview`, `rejected`, `offer`).
    *   Allows querying jobs by status or by a calculated fit score.
    *   Enables updating job status and adding notes.
    *   Generates summary reports on job statistics.
*   **Features:**
    *   Uses CSV format for data storage.
    *   Tracks 20 distinct fields per job.
    *   Supports queries for high-fit jobs (fit score $\ge$ 8.0).
    *   Provides statistics grouped by status, source, and fit score ranges.

### 2. Scraper Orchestrator (`run_job_scraper.py`)

This module serves as the main entry point for the job scraping process, coordinating multiple scrapers and integrating with the Job Tracker.

*   **Functionality:**
    *   Runs all configured job scrapers (e.g., Indeed, YC, Wellfound).
    *   Filters jobs using a pre-defined [[JobFilter]] system.
    *   Scores jobs for fit using the existing [[FitScorer]] module.
    *   Saves filtered and scored jobs to the [[Job Tracker]].
    *   Automatically flags high-fit jobs (fit score $\ge$ 8.0) for potential application generation.

*   **Workflow:**
    1.  Scrape jobs from all configured job boards.
    2.  Apply `MUST-HAVE` and `DEALBREAKER` filters.
    3.  Score jobs for fit using the [[FitScorer]].
    4.  Save processed jobs to `tracking/scraped_jobs.csv` via the Job Tracker.
    5.  Flag high-fit jobs for subsequent application generation.
    6.  Generate a summary report of the scraping run.

*   **Usage:**
    ```bash
    python run_job_scraper.py                           # Scrapes from all configured boards
    python run_job_scraper.py --boards indeed           # Scrapes only from a specific board (e.g., Indeed)
    python run_job_scraper.py --dry-run                 # Runs in test mode without saving data
    ```

### Testing

Both modules include standalone test modes for development and debugging:

*   **Job Tracker Test:**
    ```bash
    python job_tracker.py      # Tests tracking functionalities
    ```
*   **Scraper Orchestrator Test:**
    ```bash
    python run_job_scraper.py --dry-run  # Tests scraping workflow without persisting data
    ```

### Next Steps

The immediate next step is to integrate a [[Scheduler for Automation]] to enable daily, automated execution of the job scraping and tracking process.

## Related

[[Career Datacenter]],[[JobFilter]],[[FitScorer]],[[Indeed Scraper]],[[YC Scraper]],[[Wellfound Scraper]],[[Job Scraping System]],[[Scheduler for Automation]]
