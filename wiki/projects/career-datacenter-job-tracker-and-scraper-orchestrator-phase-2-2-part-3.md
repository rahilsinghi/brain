---
title: "Career-Datacenter: Job Tracker and Scraper Orchestrator (Phase 2.2 - Part 3)"
author: ai
created_at: 2026-04-13T15:29:06.450Z
last_ai_edit: 2026-04-13T15:29:06.450Z
last_human_edit: null
last_embedded_hash: 4300aafea298ee90
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-tracker-and-scraper-orchestrator-phase-2-910e2d.md]]"
tags:
  - career-datacenter
  - job search
  - automation
  - job scraper
  - job tracker
  - orchestrator
  - python
  - cli
  - phase 2.2
  - data management
  - deduplication
---


# Career-Datacenter: Job Tracker and Scraper Orchestrator (Phase 2.2 - Part 3)

This article details the completion of the job scraping system within the Career-Datacenter project, focusing on the `job_tracker.py` and `run_job_scraper.py` modules. It outlines the functionalities for saving, deduplicating, tracking, and reporting on scraped jobs, as well as orchestrating the scraping process across multiple job boards. The system also supports filtering, scoring, and flagging high-fit jobs for automated application generation.

## Key Concepts

Job Tracker (`job_tracker.py`),Scraper Orchestrator (`run_job_scraper.py`),Job Deduplication,Job Status Tracking (new, applied, interview),Job Fit Scoring,Automated Job Application Generation,CSV Database,CLI Flags

## Details

This phase marks the completion of the job scraping system for the [[Career-Datacenter]] project, integrating robust job tracking and orchestration capabilities.

### 1. Job Tracker (`job_tracker.py`)
This module is responsible for managing scraped job data, providing persistence and advanced querying:

-   **Saves Scraped Jobs**: Stores job data into a CSV database.
-   **Deduplication**: Prevents duplicate entries using a unique `job_id`.
-   **Status Tracking**: Allows jobs to be marked with statuses such as 'new', 'applied', 'interview', etc.
-   **Querying**: Jobs can be queried by their current status or by a calculated fit score.
-   **Updates**: Facilitates updating job statuses and adding notes.
-   **Summary Reports**: Generates overview reports based on tracked data.

**Features:**
-   **CSV Format**: Utilizes CSV for easy viewing and manual editing.
-   **Detailed Tracking**: Tracks 20 distinct fields for each job entry.
-   **High-Fit Queries**: Supports querying for jobs with a fit score of 8.0 or higher.
-   **Statistics**: Provides statistics categorized by status, source, and fit score.

### 2. Scraper Orchestrator (`run_job_scraper.py`)
This module serves as the central control for the job scraping workflow:

-   **Main Entry Point**: Initiates the entire job scraping process.
-   **Runs Configured Scrapers**: Executes all defined job scrapers (e.g., Indeed, YC, Wellfound).
-   **Job Filtering**: Employs a [[JobFilter]] to process scraped jobs.
-   **Job Scoring**: Uses an existing [[FitScorer]] to assign a fit score to each job.
-   **Persistence**: Saves the processed job data to the [[JobTracker]].
-   **Automated Applications**: Automatically flags and prepares applications for jobs with a fit score of 8.0 or higher.

**Workflow:**
1.  **Scrape**: Gathers job listings from all configured job boards.
2.  **Filter**: Applies `MUST-HAVE` and `DEALBREAKER` filters to the scraped jobs.
3.  **Score**: Calculates a fit score for each remaining job using the `fit_scorer`.
4.  **Save**: Persists the filtered and scored jobs to `tracking/scraped_jobs.csv`.
5.  **Flag**: Identifies high-fit jobs (≥8.0) for subsequent application generation.
6.  **Report**: Generates a summary report of the scraping run.

**Usage:**
-   `python run_job_scraper.py` # Runs all configured job boards.
-   `python run_job_scraper.py --boards indeed` # Runs only the Indeed scraper.
-   `python run_job_scraper.py --dry-run` # Executes in test mode without persisting data.

### Testing
Both modules include standalone testing capabilities:
-   `python job_tracker.py` # Initiates the job tracking test suite.
-   `python run_job_scraper.py --dry-run` # Runs the scraper orchestrator in test mode.

### Next Steps
The immediate next step is to [[Add Scheduler for Daily Automation]] to enable daily, automated execution of the job scraping and tracking system.

## Related

[[Career-Datacenter]],[[Add Job Scraper Foundation (Phase 2.2 - Part 1)]],[[Add JobDeduplicator - Persistent Job ID Tracking]],[[Add JobTracker Unit Tests]],[[Add Job Search Configuration Templates to Career-Datacenter]],[[FitScorer]],[[batch_process_overnight.py` Enhancements: Job Description Parsing and CLI Flags]],[[JobFilter]],[[Add Scheduler for Daily Automation]]
