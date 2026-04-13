---
title: End-to-End Job Application Pipeline (`run_full_pipeline.sh`)
author: ai
created_at: 2026-04-12T21:05:03.294Z
last_ai_edit: 2026-04-12T21:05:03.294Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-run-full-pipelinesh-end-to-end-pipeline-run-1c8f56.md]]"
tags:
  - career-datacenter
  - automation
  - job search
  - pipeline
  - shell script
  - workflow
  - batch processing
  - application generation
  - skills gap analysis
  - reporting
  - claude
---

# End-to-End Job Application Pipeline (`run_full_pipeline.sh`)

The `run_full_pipeline.sh` script provides a complete end-to-end workflow for the [[Career-Datacenter]] project, automating job search and application processes. It orchestrates five distinct stages: overnight batch processing, interactive job review, application generation, skills gap analysis, and weekly progress reporting. The script supports optional flags for automated review and minimum score thresholds, enhancing efficiency.

## Key Concepts

End-to-end workflow,Job application automation,Batch processing,Job scraping,Job scoring,Job deduplication,Application generation,Skills gap analysis,Weekly report

## Details

The `run_full_pipeline.sh` is a master shell script designed for the [[Career-Datacenter]] project to execute the full job search and application workflow from start to finish. It ensures a streamlined process by chaining together five critical stages:

1.  **Overnight Batch Processing**: This initial stage involves scraping job postings, scoring them based on predefined criteria, and deduplicating entries to avoid redundancy. This process is typically run automatically, perhaps nightly.
2.  **Job Review**: After batch processing, jobs can be interactively reviewed. Users can approve or reject job opportunities. Alternatively, the `--auto` flag can be used to skip manual review, automatically approving jobs that meet or exceed a specified minimum score.
3.  **Application Generation**: For approved jobs, the script proceeds to generate applications. This stage leverages pre-configured templates and data to create tailored application materials.
4.  **Skills Gap Analysis**: The script performs an analysis to identify any skills gaps based on the job requirements and the user's profile. The results of this analysis are automatically saved to the `outputs/` directory.
5.  **Weekly Progress Report**: Finally, a comprehensive weekly report is generated, summarizing the activities, applications, and insights from the job search efforts.

The script automatically activates a Python virtual environment (`venv`) if present, ensuring all dependencies are met. Key flags include:

*   `--auto`: Skips the interactive job review stage and automatically approves jobs that meet the minimum score.
*   `--min-score N`: Specifies the minimum score `N` for jobs to be automatically approved when the `--auto` flag is used.

## Related

[[Career-Datacenter]],[[Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]],[[JobDeduplicator - Persistent Job ID Tracking]],[[Application Generator CLI Foundation (Phase 1)]],[[weekly_report.py Script for Job Search Summary]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]],[[CLAUDE.md for Project Context and Session Persistence]]
