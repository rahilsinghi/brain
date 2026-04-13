---
title: "run_full_pipeline.sh: End-to-End Career Datacenter Workflow Script"
author: ai
created_at: 2026-04-10T17:04:24.117Z
last_ai_edit: 2026-04-10T17:04:24.117Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-run-full-pipelinesh-end-to-end-pipeline-run-1c8f56.md]]"
tags:
  - shell script
  - automation
  - pipeline
  - career datacenter
  - job application
  - data scraping
  - skills analysis
  - workflow
  - project management
  - cli
---

# run_full_pipeline.sh: End-to-End Career Datacenter Workflow Script

The `run_full_pipeline.sh` script serves as the master orchestrator for the entire Career-Datacenter project, automating a five-stage workflow from data ingestion to report generation. It streamlines job search, review, and application processes, incorporating features like interactive review skipping and minimum score thresholds for approval.

## Key Concepts

- **End-to-end pipeline**: A comprehensive, automated sequence of operations.,- **Shell script automation**: Using shell scripts to automate complex workflows.,- **Career management workflow**: A structured process for managing job search and career development tasks.,- **Data scraping**: Automated extraction of data from websites.,- **Job application generation**: Automated creation of job application materials.,- **Skills gap analysis**: Identifying discrepancies between required and current skill sets.

## Details

The `run_full_pipeline.sh` script is a pivotal component of the `rahilsinghi/Career-Datacenter` repository (SHA: `52ed0b5`, dated `2026-02-18T15:01:56Z`, authored by Rahil Singhi and co-authored by Claude Sonnet 4.5). It provides an end-to-end runner that chains together the full workflow of the Career-Datacenter project.

This master script automates the following five distinct stages:

1.  **Overnight batch**: This initial stage involves data scraping, job scoring, and deduplication of job listings, preparing them for review.
2.  **Job review**: An interactive stage where users can review and approve/reject jobs. This can be skipped if the `--auto` flag is used.
3.  **Application generation**: For approved jobs, this stage generates necessary application materials.
4.  **Skills gap analysis**: Analyzes skill requirements from approved jobs against the user's profile, with results automatically saved to the `outputs/` directory.
5.  **Weekly progress report**: Generates a summary of activities and progress made during the week.

Key features and flags include:

*   `--auto`: When this flag is used, the job review stage is skipped. Jobs meeting or exceeding the specified minimum score (or a default if not provided) are automatically approved.
*   `--min-score N`: This flag allows users to set a minimum score `N` for jobs to be considered for automatic approval during the `job review` stage when `--auto` is active.
*   **Virtual Environment Activation**: The script automatically activates a Python virtual environment if one is detected in the project directory, ensuring dependencies are correctly managed.

## Related

[[Career-Datacenter Project]],[[Overnight Batch Processing]],[[Job Application Automation]],[[Skills Gap Analysis]],[[Job Scoring Algorithm]]
