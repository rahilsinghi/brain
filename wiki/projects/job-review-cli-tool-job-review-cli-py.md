---
title: Job Review CLI Tool (`job_review_cli.py`)
author: ai
created_at: 2026-04-10T21:29:21.223Z
last_ai_edit: 2026-04-10T21:29:21.223Z
last_human_edit: null
last_embedded_hash: b2d8a11941d56be0
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-review-clipy-interactive-terminal-job-r-0132c3.md]]"
tags:
  - cli
  - job-review
  - automation
  - python
  - terminal-tool
  - career-datacenter
  - job-tracking
  - interactive
---


# Job Review CLI Tool (`job_review_cli.py`)

The `job_review_cli.py` script is an interactive terminal tool designed to streamline the job review process within the Career Datacenter project. It efficiently displays high-fit job opportunities, allows users to approve, skip, or reject them, and records decisions for persistent tracking.

## Key Concepts

Interactive Terminal Tool,Job Application Review,Command Line Interface (CLI),Job Scoring,Data Persistence (JSON, CSV)

## Details

The `job_review_cli.py` script is a core component of the [[Career Datacenter]] project, offering an interactive command-line interface for reviewing potential job opportunities.

### Purpose
Its primary function is to help users efficiently sift through jobs identified as high-fit, presenting them one by one for a quick decision. This streamlines the process of moving from raw scraped data to actionable applications.

### Key Features
*   **Job Listing**: Automatically lists high-fit jobs (default score `≥8.0`) sourced from `scraped_jobs.csv`.
*   **Detailed Job Cards**: For each job, it displays comprehensive information including:
    *   Title
    *   Company
    *   Score
    *   Location
    *   Salary
    *   Job URL
    *   A concise description snippet
*   **Color-Coded Output**: Enhances readability by color-coding job scores:
    *   Green for scores `≥9.0`
    *   Yellow for scores `≥8.0`
*   **Decision Tracking**: Saves user decisions (approve, skip, reject) to `tracking/reviewed_jobs.json`, complete with timestamps.
*   **Automatic Status Updates**: When a job is rejected, its status is automatically updated to 'rejected' in the relevant tracker CSV.

### User Actions
Users can interact with the tool using the following single-key commands:
*   `[a]` - **Approve**: Marks the job as approved.
*   `[s]` - **Skip**: Skips the current job without making a decision, allowing it to be reviewed later.
*   `[r]` - **Reject**: Marks the job as rejected and updates its status in the tracker.
*   `[q]` - **Quit**: Exits the review session.

### Command-Line Flags
The tool supports several command-line arguments to customize its behavior:
*   `--min-score [THRESHOLD]`: Allows users to specify a custom minimum score threshold for jobs to be listed (e.g., `--min-score 7.5`).
*   `--all`: Enables re-review of jobs that have already been processed, overriding the default behavior of only showing unreviewed jobs.
*   `--approved`: Lists all jobs that have previously been marked as approved, rather than starting a new review session.

### Development Details
*   **Repository**: `rahilsinghi/Career-Datacenter`
*   **SHA**: `71bc9fc`
*   **Date Added**: `2026-02-17T19:50:41Z`
*   **Author**: `Rahil Singhi`
*   **Co-Authored-By**: `Claude Sonnet 4.5`
*   **Changes**: 1 file changed, +232 additions, 0 deletions.

## Related

[[Career Datacenter]],[[Job Application Tracking]],[[CLI Tools]],[[Job Scraping]],[[Job Scoring Algorithm]]
