---
title: run_full_pipeline.sh End-to-End Pipeline
author: ai
created_at: 2026-04-10T21:04:00.078Z
last_ai_edit: 2026-04-10T21:04:00.078Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-run-full-pipelinesh-end-to-end-pipeline-run-1c8f56.md]]"
tags:
  - shell script
  - pipeline
  - automation
  - job search
  - career-datacenter
  - batch processing
  - cli
  - python venv
---

# run_full_pipeline.sh End-to-End Pipeline

The `run_full_pipeline.sh` script orchestrates a comprehensive 5-stage end-to-end career management workflow within the `Career-Datacenter` project. It automates tasks ranging from job scraping and scoring to application generation and skills gap analysis, supporting configurable options for review and approval.

## Key Concepts

End-to-End Pipeline,Shell Scripting,Job Search Automation,Batch Processing,Job Review Automation,Application Generation,Skills Gap Analysis,Progress Reporting,Command Line Interface (CLI)

## Details

The `run_full_pipeline.sh` script serves as the central orchestrator for the job application and career management workflow within the [[Career-Datacenter Project]]. Developed by [[Rahil Singhi]] (with co-authorship from [[Claude Sonnet 4.5]]), this script integrates and automates a sequential five-stage process:

1.  **Overnight Batch**: This initial stage performs background operations, including scraping new job postings, scoring their relevance, and deduplicating entries to maintain a clean dataset.
2.  **Job Review**: Users can interactively review filtered jobs. This stage can be skipped using the `--auto` flag, which enables automatic approval of jobs that meet or exceed a specified minimum score.
3.  **Application Generation**: For jobs that have been approved (either manually or automatically), the script proceeds to generate application materials.
4.  **Skills Gap Analysis**: An analysis of required skills versus personal skills is performed, with the results automatically saved to the `outputs/` directory.
5.  **Weekly Progress Report**: The final stage compiles and generates a summary report detailing the week's progress in job applications and related activities.

### Key Features and Flags:
*   **`--auto`**: A command-line flag that bypasses the interactive job review stage, automatically approving jobs that satisfy the minimum score threshold.
*   **`--min-score N`**: Used in conjunction with `--auto`, this flag sets `N` as the minimum score a job must achieve to be automatically approved.
*   **Virtual Environment Activation**: The script intelligently detects and activates a Python virtual environment (`venv`) if present in the project directory, ensuring proper execution of Python-based components within the pipeline.

### Origin:
This script was introduced in the `Career-Datacenter` repository via commit `52ed0b5` on 2026-02-18 by Rahil Singhi, adding 110 lines of code to the project.

## Related

[[Career-Datacenter Project]],[[Rahil Singhi]],[[Claude Sonnet 4.5]],[[Job Application Automation]],[[Skills Gap Analysis]]
