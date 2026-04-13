---
title: "job_review_cli.py: Interactive Job Review Tool"
author: ai
created_at: 2026-04-12T21:56:11.150Z
last_ai_edit: 2026-04-12T21:56:11.150Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-review-clipy-interactive-terminal-job-r-0132c3.md]]"
tags:
  - job search
  - cli
  - automation
  - career-datacenter
  - job review
  - terminal tool
  - python
  - workflow
---

# job_review_cli.py: Interactive Job Review Tool

The `job_review_cli.py` script introduces an interactive command-line interface within the [[Career-Datacenter]] project for efficient job review. It presents scraped jobs with high fit scores, enabling users to approve, skip, or reject applications directly from the terminal. Decisions are logged, and rejected jobs are automatically updated in the tracking system.

## Key Concepts

Interactive Command-Line Interface (CLI),Job Review Automation,Job Scoring and Filtering,Decision Logging and Tracking,Career-Datacenter Workflow Enhancement

## Details

The `job_review_cli.py` script is a crucial addition to the [[Career-Datacenter]] toolkit, designed to streamline the post-scraping job assessment process. It operates as an interactive terminal utility that presents filtered job listings based on their computed fit scores.

**Key Features and Functionality:**

*   **Job Filtering**: By default, the tool lists jobs with a fit score of 8.0 or higher from the `scraped_jobs.csv` file. This threshold can be customized using the `--min-score` flag.
*   **Job Card Display**: For each job, a concise card is displayed containing essential information:
    *   Job Title
    *   Company Name
    *   Fit Score
    *   Location
    *   Salary (if available)
    *   Job URL
    *   Snippet of the job description
*   **Interactive Actions**: Users can perform the following actions for each presented job:
    *   `[a]`pprove: Marks the job as approved.
    *   `[s]`kip: Moves to the next job without making a decision.
    *   `[r]`eject: Marks the job as rejected.
    *   `[q]`uit: Exits the review session.
*   **Decision Logging**: All decisions (`approve`, `skip`, `reject`) are meticulously saved to `tracking/reviewed_jobs.json`, complete with timestamps, ensuring a persistent record of the review process.
*   **Automatic Status Updates**: When a job is rejected through the CLI, its status is automatically updated to 'rejected' in the primary tracker CSV file, reducing manual overhead.
*   **Command-Line Flags**:
    *   `--min-score <score>`: Sets the minimum fit score for jobs to be displayed (default is 8.0).
    *   `--all`: Allows re-reviewing jobs that have already been processed.
    *   `--approved`: Lists all jobs previously marked as approved.
*   **Color-Coded Output**: To provide quick visual cues, job listings are color-coded:
    *   Green: Jobs with a fit score of 9.0 or higher.
    *   Yellow: Jobs with a fit score of 8.0 or higher (but less than 9.0).

This tool significantly enhances the efficiency of the job search workflow by providing a fast and organized method for reviewing and categorizing potential job applications.

## Related

[[Career-Datacenter]],[[Career Datacenter: Job Search Automation Platform]],[[Application Tracking System (Career-Datacenter)]],[[JobDeduplicator - Persistent Job ID Tracking]],[[JobTracker Unit Tests]],[[Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]]
