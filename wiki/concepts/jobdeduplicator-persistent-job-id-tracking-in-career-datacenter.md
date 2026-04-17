---
title: "JobDeduplicator: Persistent Job ID Tracking in Career-Datacenter"
author: ai
created_at: 2026-04-13T18:21:37.874Z
last_ai_edit: 2026-04-13T18:21:37.874Z
last_human_edit: null
last_embedded_hash: 364ab8f7ac3ba6eb
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-jobdeduplicator-persist-seen-job-ids-across-c9a913.md]]"
tags:
  - career-datacenter
  - job search
  - automation
  - deduplication
  - python
  - cli
  - data management
---


# JobDeduplicator: Persistent Job ID Tracking in Career-Datacenter

The `JobDeduplicator` module was introduced in the `Career-Datacenter` project to prevent re-processing of already seen job listings during nightly automation runs. It achieves this by persistently tracking job IDs in a JSON file and automatically expiring old entries. This ensures efficiency and avoids redundant actions in the job application workflow.

## Key Concepts

[[JobDeduplicator]],Persistent Job Tracking,Automated Data Expiration,Job Application Automation,Duplicate Job Filtering

## Details

The `JobDeduplicator` module, implemented in `cli/job_deduplicator.py` within the [[Career-Datacenter]] repository, provides a robust mechanism for managing and filtering previously encountered job IDs. Its primary function is to maintain a `tracking/seen_jobs.json` file, which stores a record of job IDs processed during automated runs.

Key features of the `JobDeduplicator` include:

*   **Persistent Storage**: Job IDs are stored in `tracking/seen_jobs.json` to ensure they are remembered across different execution sessions.
*   **Automatic Expiration**: Entries in the `seen_jobs.json` file are automatically expired after 30 days by default, though this duration is configurable. This prevents the list from growing indefinitely and allows for the re-evaluation of old listings.
*   **API for Interaction**: It exposes a simple API with methods such as `filter_new()` to get only unseen job IDs from a batch, `mark_seen_batch()` to add a list of job IDs to the tracker, and `is_seen()` to check if a single job ID has been seen.
*   **Integration with Automation**: The `JobDeduplicator` is integrated directly into the `OvernightBatchProcessor._scrape_linkedin_jobs()` function. During this process, it efficiently skips any job listings that have already been marked as seen, with the number of duplicate jobs logged for monitoring.
*   **Version Control Exclusion**: The `tracking/seen_jobs.json` file is added to `.gitignore` to prevent it from being committed to the repository, as it contains dynamic, local state information.

## Related

[[Career-Datacenter]],[[batch_process_overnight.py Enhancements: Job Description Parsing and CLI Flags]]
