---
title: Add apply_workflow.py - Complete Application Workflow with Pipeline Tracking
author: ai
created_at: 2026-04-12T18:18:16.810Z
last_ai_edit: 2026-04-12T18:18:16.810Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-apply-workflowpy-complete-apply-workflow-wi-63b7b1.md]]"
tags:
  - career-datacenter
  - cli
  - job application
  - automation
  - python
  - workflow
  - pipeline
  - batch processing
---

# Add apply_workflow.py - Complete Application Workflow with Pipeline Tracking

This commit introduces `apply_workflow.py` to the `Career-Datacenter` repository, providing a command-line interface for managing and automating job applications. It facilitates generating application packs, reviewing PDFs, marking applications as applied, and visualizing the application pipeline status.

## Key Concepts

[[Application Workflow CLI Tool (`apply_workflow.py`)]],Job Application Automation,Application Pipeline Tracking,Batch Application Generation,Command Line Interface (CLI),Job Tracking

## Details

This commit, `4011045`, authored by Rahil Singhi on 2026-02-17, adds `cli/apply_workflow.py` to the [[Career-Datacenter]] repository. This Python script provides a comprehensive CLI for managing the job application process.

The script introduces several key functions:

*   `generate_and_review(job_id)`: Generates an application pack for a specified `job_id`, automatically opens the generated PDF documents for review, and then prompts the user to mark the application as 'applied'.
*   `batch_generate(approved_only, min_score)`: Integrates with `ApplicationBatchRunner` to generate application packs in batch. This function can be configured to process only pre-approved jobs (`approved_only`) or jobs exceeding a certain `min_score`.
*   `mark_applied(job_id)`: Updates the application status for a given `job_id` across both `applications.csv` and `scraped_jobs.csv` files, ensuring data consistency.
*   `show_pipeline()`: Provides a terminal-based view of the current application pipeline, organized by status, offering an overview of pending, in-progress, and completed applications.

### Usage Examples:

The `apply_workflow.py` script can be invoked with various command-line arguments to perform specific actions:

*   `python cli/apply_workflow.py --job-id linkedin_xxx`: Processes a single job application, generating documents and facilitating review.
*   `python cli/apply_workflow.py --batch --approved-only`: Initiates batch application generation for all jobs marked as 'approved'.
*   `python cli/apply_workflow.py --batch --min-score 8.5`: Triggers batch application generation for jobs with a score of 8.5 or higher.
*   `python cli/apply_workflow.py --mark-applied <id>`: Manually updates the status of a specific job application to 'applied'.
*   `python cli/apply_workflow.py --pipeline`: Displays the current state of the application pipeline in the terminal.

## Related

[[Career-Datacenter]],[[Application Workflow CLI Tool (`apply_workflow.py`)]],[[ApplicationBatchRunner for Automated Job Application Generation]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]],[[Agentic Job Application System: Multi-Agent Workflow Architecture]]
