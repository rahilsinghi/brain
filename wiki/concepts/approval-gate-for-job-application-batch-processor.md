---
title: Approval Gate for Job Application Batch Processor
author: ai
created_at: 2026-04-13T18:49:37.862Z
last_ai_edit: 2026-04-13T18:49:37.862Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-wire-approval-gate-into-batch-processor-8cbda2.md]]"
tags:
  - careerdatacenter
  - batchprocessing
  - jobapplications
  - cli
  - workflow
  - automation
  - approvals
---

# Approval Gate for Job Application Batch Processor

This update introduces an approval gate into the job application batch processor, ensuring that applications are only generated for jobs explicitly approved via the review CLI. It supports both a default manual approval mode and an `--auto-approve` flag for unattended overnight processing of high-fit jobs, along with a `--dry-run` option for scoring without generation.

## Key Concepts

Job Approval Workflow,Batch Processing Control,Unattended Job Application,Dry Run Functionality,Application Tracking

## Details

This enhancement to the `Career-Datacenter` project, implemented by Rahil Singhi, introduces an 'approval gate' mechanism for the job application batch processor. This gate provides more granular control over which jobs proceed to the application generation stage.

**Key Features and Modes:**

*   **Default Mode:** By default, the batch processor will only generate applications for jobs that have been explicitly approved by the user through the [[`job_review_cli.py` - Interactive Job Review Tool]]. It reads `tracking/reviewed_jobs.json` to identify these approved `job_ids`.
*   **`--auto-approve` Flag:** For automated, unattended operation (e.g., overnight processing), the `--auto-approve` flag can be used. In this mode, applications will be generated for all jobs identified as 'high-fit' by the system, bypassing the manual approval step.
*   **`--dry-run` Flag:** A `--dry-run` option is available to execute only the scraping and scoring phases. This allows users to evaluate job fits and counts without actually generating any applications.

**Implementation Details:**

*   A new helper method, `_get_approved_jobs()`, was added to facilitate the retrieval of approved job IDs.
*   The files `tracking/seen_jobs.json` and `tracking/reviewed_jobs.json` have been added to `.gitignore` to manage tracking data.

**Workflow:**

1.  Initial execution of the [[`batch_process_overnight.py` Enhancements: Job Description Parsing and CLI Flags]] (or similar batch processor) to scrape and score jobs.
2.  Utilize the [[`job_review_cli.py` - Interactive Job Review Tool]] to interactively approve, skip, or reject jobs.
3.  Re-run the batch processor. Applications will either be auto-generated for approved jobs on the next run, or the `--auto-approve` flag can be used for immediate generation of high-fit jobs.

## Related

[[Career-Datacenter]],[[batch_process_overnight.py` Enhancements: Job Description Parsing and CLI Flags]],[[job_review_cli.py` - Interactive Job Review Tool]],[[ApplicationBatchRunner for Automated Job Application Generation]],[[Application Tracking System (ATS) in Career-Datacenter]]
