---
title: Job Tracker and Scraper Orchestrator Implementation (Phase 2.2 - Part 3)
author: ai
created_at: 2026-04-10T21:09:47.446Z
last_ai_edit: 2026-04-10T21:09:47.446Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-tracker-and-scraper-orchestrator-phase-2-910e2d.md]]"
tags:
  - job tracking
  - web scraping
  - orchestration
  - python
  - career management
  - automation
  - csv
  - project update
---

# Job Tracker and Scraper Orchestrator Implementation (Phase 2.2 - Part 3)

This document details the completion of a job scraping system, incorporating a Job Tracker and a Scraper Orchestrator. The system allows for robust job tracking, deduplication, status management, and the automated orchestration of multiple web scrapers with filtering and fit scoring capabilities. It was implemented as part of the Career-Datacenter project.

## Key Concepts

Job Scraping System,Job Tracker,Scraper Orchestrator,Job Deduplication,Job Status Tracking,Fit Scoring,Job Filtering,Automated Application Generation

## Details

This entry describes the development and completion of the job scraping system, comprising a Job Tracker and a Scraper Orchestrator, as part of the `rahilsinghi/Career-Datacenter` project. This commit (`8913d71`) by Rahil Singhi on 2026-02-14 involved 2 file changes and 725 additions.

### 1. Job Tracker (`job_tracker.py`)
The `job_tracker.py` module is responsible for managing scraped job data. It offers the following functionalities:

*   **Data Storage:** Saves scraped jobs to a CSV database for easy viewing and editing.
*   **Deduplication:** Prevents duplicate entries using a `job_id`.
*   **Status Tracking:** Allows tracking of job application status (e.g., new, applied, interview, offer, rejected).
*   **Querying:** Enables querying jobs by status or a calculated 'fit score'.
*   **Updates:** Supports updating job status and adding notes.
*   **Reporting:** Generates summary reports.

**Key Features:**

*   Uses CSV format, tracking 20 fields per job.
*   Provides queries for high-fit jobs (fit score \u2265 8.0).
*   Offers statistics by status, source, and fit score category.

### 2. Scraper Orchestrator (`run_job_scraper.py`)
The `run_job_scraper.py` module serves as the main entry point for initiating and coordinating the job scraping process across various platforms.

**Core Functions:**

*   Executes all configured scrapers (e.g., Indeed, YC, Wellfound).
*   Filters jobs using a `JobFilter` component.
*   Scores jobs based on relevance using a `FitScorer` component.
*   Saves processed jobs to the `JobTracker`.
*   Automatically flags high-fit jobs (score \u2265 8.0) for application generation.

**Workflow:**

1.  **Scraping:** Gathers jobs from all specified job boards.
2.  **Filtering:** Applies MUST-HAVE and DEALBREAKER filters to narrow down results.
3.  **Scoring:** Evaluates job fit using the `FitScorer`.
4.  **Saving:** Stores the filtered and scored jobs in `tracking/scraped_jobs.csv` via the `JobTracker`.
5.  **Flagging:** Identifies and flags high-fit jobs for potential automated application.
6.  **Reporting:** Generates a summary report of the scraping run.

**Usage:**

*   `python run_job_scraper.py` - Runs scrapers for all configured boards.
*   `python run_job_scraper.py --boards indeed` - Runs scraper for a specific board (e.g., Indeed).
*   `python run_job_scraper.py --dry-run` - Executes in test mode without making persistent changes.

### Testing
Both modules support standalone test modes:

*   `python job_tracker.py` - Initiates testing for the Job Tracker.
*   `python run_job_scraper.py --dry-run` - Initiates testing for the Scraper Orchestrator.

### Next Steps
Future development includes adding a scheduler to automate daily execution of the job scraping and tracking system.

## Related

[[Career-Datacenter]],[[JobFilter]],[[FitScorer]],[[Indeed]],[[Y Combinator]],[[Wellfound]],[[Web Scraping]],[[Automated Job Applications]],[[Rahil Singhi]]
