---
title: run_full_pipeline.sh Script
author: ai
created_at: 2026-04-13T01:03:29.087Z
last_ai_edit: 2026-04-13T01:03:29.087Z
last_human_edit: null
last_embedded_hash: 466e8e491a1549f0
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-run-full-pipelinesh-end-to-end-pipeline-run-1c8f56.md]]"
tags:
  - career-datacenter
  - automation
  - job-search
  - pipeline
  - shell-script
  - cli
  - workflow
  - batch-processing
  - reporting
---


# run_full_pipeline.sh Script

The `run_full_pipeline.sh` script automates the entire job application workflow within the [[Career-Datacenter]] project. It sequentially executes five stages: overnight batch processing, job review, application generation, skills gap analysis, and weekly progress reporting. This master shell script includes options for automated processing and score-based approvals, and it handles virtual environment activation.

## Key Concepts

End-to-End Pipeline,Job Application Workflow Automation,Batch Processing,Job Scoring,Job Deduplication,Skills Gap Analysis,Weekly Progress Reporting,CLI Flags,Virtual Environment Activation

## Details

The `run_full_pipeline.sh` script serves as the master shell script for orchestrating the complete job search and application workflow within the [[Career-Datacenter]] repository. It integrates several distinct stages into a cohesive, end-to-end pipeline, aiming to streamline and automate the process from job discovery to application. This script was introduced in commit `52ed0b5` by [[Rahil Singhi]].

**Pipeline Stages:**
1.  **Overnight Batch Processing**: This initial stage involves scraping job postings from various sources, scoring them based on relevance, and performing deduplication to prevent redundant applications. This likely leverages functionalities found in scripts like [[batch_process_overnight.py Enhancements: Job Description Parsing and CLI Flags]].
2.  **Job Review**: After batch processing, the script presents jobs for interactive review, allowing users to approve or reject them. This stage can be automatically skipped using the `--auto` flag.
3.  **Application Generation**: For all approved jobs, the pipeline proceeds to generate customized applications, which may include tailoring resumes and writing cover letters based on specific job descriptions. This stage is a core part of the [[Agentic Job Application System: Multi-Agent Workflow Architecture]] envisioned for Career-Datacenter.
4.  **Skills Gap Analysis**: An automated analysis compares the skills required for the targeted jobs against the user's profile, identifying any gaps. The results of this analysis are automatically saved to the `outputs/` directory.
5.  **Weekly Progress Report**: The final stage generates a summary of the week's job search activities and application progress, providing an overview of efforts and outcomes. This likely utilizes a script such as [[weekly_report.py Script for Job Search Summary]].

**Key Features:**
*   **Automation Flags**: The script supports command-line interface (CLI) flags to control its behavior:
    *   `--auto`: Skips the interactive job review stage. When this flag is active, jobs are automatically approved if they meet or exceed a specified minimum score.
    *   `--min-score N`: Sets the minimum score `N` for jobs to be automatically approved when the `--auto` flag is used.
*   **Virtual Environment Management**: The script automatically detects and activates a Python virtual environment (`venv`) if present, ensuring that all necessary dependencies are loaded correctly before executing any Python-based components of the pipeline.
*   **Repository Integration**: This script is a fundamental component of the [[Career-Datacenter]] project, enhancing its capabilities for automated job search and application management.

## Related

[[Career-Datacenter]],[[batch_process_overnight.py Enhancements: Job Description Parsing and CLI Flags]],[[weekly_report.py Script for Job Search Summary]],[[Application Generator CLI Implementation Plan (Career-Datacenter)]],[[Agentic Job Application System: Multi-Agent Workflow Architecture]],[[Job Deduplicator - Persistent Job ID Tracking]],[[Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]],[[Application Tracking System (ATS) in Career-Datacenter]],[[Rahil Singhi]]
