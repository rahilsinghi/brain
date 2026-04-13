---
title: "job_review_cli.py: Interactive Terminal Job Review Tool"
author: ai
created_at: 2026-04-12T17:55:17.316Z
last_ai_edit: 2026-04-12T17:55:17.316Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-review-clipy-interactive-terminal-job-r-0132c3.md]]"
tags:
  - job review
  - cli
  - career-datacenter
  - job search
  - automation
  - python
  - interactive
  - tracking
  - scoring
  - tool
---

# job_review_cli.py: Interactive Terminal Job Review Tool

The `job_review_cli.py` script provides an interactive command-line interface for reviewing high-fit job applications identified by the Career-Datacenter project. It allows users to approve, skip, or reject jobs, with decisions saved and reflected in the tracking system. This tool streamlines the job application process by presenting curated job details and facilitating rapid decision-making.

## Key Concepts

Interactive CLI,Job Application Review,Job Tracking,Scoring and Filtering,Decision Management

## Details

The `job_review_cli.py` is a Python script developed for the [[Career-Datacenter]] project, specifically designed to aid in the efficient review of scraped job listings. Located in the `rahilsinghi/Career-Datacenter` repository (SHA: 71bc9fc), this tool presents high-fit jobs (typically those with a score of 8.0 or higher) in an interactive terminal interface.

### Core Functionality

*   **Job Display**: For each job, it presents key information including title, company, score, location, salary, URL, and a snippet of the job description.
*   **Interactive Actions**: Users can perform the following actions:
    *   `[a]pprove`: Marks the job as approved.
    *   `[s]kip`: Skips the current job, moving to the next without making a decision.
    *   `[r]eject`: Marks the job as rejected. Rejected jobs are automatically updated to 'rejected' status in the tracking CSV.
    *   `[q]uit`: Exits the review process.
*   **Decision Persistence**: All decisions are saved to `tracking/reviewed_jobs.json` along with timestamps, maintaining a historical record.

### Command-Line Flags

The script supports several command-line flags to customize its behavior:

*   `--min-score`: Allows users to set a custom threshold for the minimum job score to be displayed (default is 8.0).
*   `--all`: Enables re-reviewing jobs that have already been processed.
*   `--approved`: Lists all jobs that have been previously approved.

### Visual Enhancements

Output is color-coded for quick visual assessment of job fit:

*   Green: Jobs with a score of 9.0 or higher.
*   Yellow: Jobs with a score of 8.0 or higher (and less than 9.0).

This tool significantly enhances the [[Career-Datacenter]]'s job application workflow by providing a user-friendly and efficient way to triage job listings.

## Related

[[Career-Datacenter]],[[Career Datacenter: Job Search Automation Platform]],[[Career Datacenter: Job Tracker and Scraper Orchestrator]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]]
