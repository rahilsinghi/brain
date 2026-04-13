---
title: "`run_full_pipeline.sh` Script for End-to-End Job Application Workflow"
author: ai
created_at: 2026-04-13T18:05:58.110Z
last_ai_edit: 2026-04-13T18:05:58.110Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-run-full-pipelinesh-end-to-end-pipeline-run-1c8f56.md]]"
tags:
  - automation
  - pipeline
  - script
  - job application
  - career-datacenter
  - cli
  - workflow
  - python
---

# `run_full_pipeline.sh` Script for End-to-End Job Application Workflow

The `run_full_pipeline.sh` script provides an end-to-end automation solution for job applications within the `Career-Datacenter` project. It orchestrates a five-stage workflow, including overnight batch processing, job review, application generation, skills gap analysis, and weekly reporting. The script supports `—auto` and `—min-score N` flags for flexible operation.

## Key Concepts

End-to-End Automation,Job Application Workflow,Batch Processing,Job Review,Application Generation,Skills Gap Analysis,Weekly Progress Reporting,CLI Flags

## Details

The `run_full_pipeline.sh` script, residing in the `rahilsinghi/Career-Datacenter` repository, serves as a master shell script to chain together a comprehensive five-stage job application workflow. This automation initiative, co-authored by Claude Sonnet 4.5, streamlines the entire process from job discovery to reporting.

**Workflow Stages:**
1.  **Overnight Batch Processing:** This stage involves scraping job listings, scoring them based on predefined criteria, and deduplicating entries to maintain a clean dataset. Relevant components include [[Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]] and [[JobDeduplicator - Persistent Job ID Tracking]].
2.  **Job Review:** An interactive step where users can review the processed jobs. This stage can be skipped using the `—auto` flag, which automatically approves jobs scoring above a specified minimum.
3.  **Application Generation:** For approved jobs, this stage generates application materials, leveraging tools like [[ApplicationBatchRunner for Automated Job Application Generation]] or [[Application Generator CLI Implementation Plan (Career-Datacenter)]].
4.  **Skills Gap Analysis:** This stage analyzes the user's skills against job requirements, identifying any gaps. The results are automatically saved to the `outputs/` directory.
5.  **Weekly Progress Report:** The final stage generates a summary of job search activities and progress, typically using scripts like [[`weekly_report.py` Script for Job Search Summary]].

**Command-Line Interface (CLI) Flags:**
*   `--auto`: Skips the interactive job review stage and automatically approves jobs that meet or exceed the minimum score.
*   `--min-score N`: Specifies the minimum score `N` for jobs to be automatically approved when the `—auto` flag is active.

The script also includes functionality to automatically activate the Python virtual environment (`venv`) if one is detected, ensuring proper dependency management.

## Related

[[Career-Datacenter]],[[Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]],[[JobDeduplicator - Persistent Job ID Tracking]],[[ApplicationBatchRunner for Automated Job Application Generation]],[[Application Generator CLI Implementation Plan (Career-Datacenter)]],[[`weekly_report.py` Script for Job Search Summary]],[[Application Tracking System (Career-Datacenter)]],[[Skills Gap Analysis]],[[Claude Sonnet]]
