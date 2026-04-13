---
title: Application Workflow CLI Tool (`apply_workflow.py`)
author: ai
created_at: 2026-04-12T22:17:56.436Z
last_ai_edit: 2026-04-12T22:17:56.436Z
last_human_edit: null
last_embedded_hash: d0f4d1de0de40453
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-apply-workflowpy-complete-apply-workflow-wi-63b7b1.md]]"
tags:
  - job application
  - automation
  - cli
  - workflow
  - career-datacenter
  - python
  - script
  - pipeline tracking
---


# Application Workflow CLI Tool (`apply_workflow.py`)

This script, `apply_workflow.py`, is a command-line interface tool within the [[Career-Datacenter]] project designed to automate and track the job application process. It handles generating application materials, managing application status, and providing pipeline visibility.

## Key Concepts

Automated Job Application,Application Pipeline Tracking,CLI Tool,`generate_and_review` function,`batch_generate` function,`mark_applied` function,`show_pipeline` function

## Details

The `apply_workflow.py` script, developed by [[Rahil Singhi]] for the [[Career-Datacenter]] repository (SHA: 4011045) on 2026-02-17, streamlines the job application process. It was co-authored by Claude Sonnet 4.5. This Python script introduces several core functionalities to manage and track job applications efficiently.

Key functions include:

*   **`generate_and_review(job_id)`**: This function is responsible for generating application packs based on a specific job ID. It automatically opens corresponding PDF documents for user review and then prompts the user to manually mark the application as 'applied' once reviewed.
*   **`batch_generate(approved_only, min_score)`**: This function facilitates batch generation of applications. It calls the [[ApplicationBatchRunner for Automated Job Application Generation]] internally and can be configured to process only pre-approved jobs (`--approved-only`) or jobs exceeding a specified minimum score (`--min-score`).
*   **`mark_applied(job_id)`**: This utility function updates the application status for a given `job_id` across two critical data files: `applications.csv` and `scraped_jobs.csv`.
*   **`show_pipeline()`**: This provides a terminal-based visualization of the current application pipeline, categorizing applications by their status for quick overview.

### Usage Examples

The script supports various command-line arguments to execute its functionalities:

```bash
python cli/apply_workflow.py --job-id linkedin_xxx   # Process a single job and initiate review
python cli/apply_workflow.py --batch --approved-only  # Batch process applications for pre-approved jobs
python cli/apply_workflow.py --batch --min-score 8.5  # Batch process applications for jobs with a score >= 8.5
python cli/apply_workflow.py --mark-applied <id>      # Mark a specific job (by ID) as applied
python cli/apply_workflow.py --pipeline               # Display the current application pipeline status
```

## Related

[[Career-Datacenter]],[[ApplicationBatchRunner for Automated Job Application Generation]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]],[[Rahil Singhi]]
