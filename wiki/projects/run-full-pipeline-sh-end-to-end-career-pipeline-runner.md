---
title: run_full_pipeline.sh – End-to-End Career Pipeline Runner
author: ai
created_at: 2026-04-10T02:01:24.452Z
last_ai_edit: 2026-04-10T02:01:24.452Z
last_human_edit: null
last_embedded_hash: e4277d1d39ae0cb4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-run-full-pipelinesh-end-to-end-pipeline-run-1c8f56.md]]"
tags:
  - shell-script
  - pipeline
  - automation
  - career-datacenter
  - job-scraping
  - skills-gap
  - cli
  - batch-processing
  - rahil-singhi
  - workflow
---


# run_full_pipeline.sh – End-to-End Career Pipeline Runner

A master shell script added to the Career-Datacenter repository that chains five sequential workflow stages from job scraping through weekly reporting. It supports automated and interactive modes via command-line flags and handles virtual environment activation automatically. Authored by Rahil Singhi with Claude Sonnet 4.5 on 2026-02-18.

## Key Concepts

- **5-Stage Pipeline:** Orchestrates overnight batch, job review, application generation, skills gap analysis, and weekly progress reporting in sequence
- **--auto Flag:** Skips interactive job review and auto-approves jobs meeting or exceeding a minimum score threshold
- **--min-score N Flag:** Configurable numeric threshold for automatic job approval when running in auto mode
- **Virtual Environment Activation:** Detects and activates a Python venv automatically if one is present in the project
- **Overnight Batch Stage:** Combines scraping, scoring, and deduplication into a single first-stage operation
- **Approved Jobs Filter:** Application generation stage only processes jobs that passed the review stage
- **outputs/ Directory:** Skills gap analysis results are automatically saved to a designated output folder

## Details

## Overview

Commit `52ed0b5` introduces `run_full_pipeline.sh`, a 110-line shell script that serves as the single entry point for the full Career-Datacenter workflow. Prior to this addition, pipeline stages would need to be invoked individually; this script chains them into a cohesive, repeatable process.

## Pipeline Stages

### Stage 1: Overnight Batch
Performs the foundational data collection and preparation work:
- Job scraping from configured sources
- Scoring each job against the user's profile
- Deduplication to remove redundant listings

### Stage 2: Job Review
Provides an interactive review step where the user can approve or reject scored jobs. This stage can be bypassed entirely using the `--auto` flag, in which case jobs at or above the `--min-score` threshold are automatically approved.

### Stage 3: Application Generation
Generates application materials (e.g., tailored resumes or cover letters) exclusively for jobs that were approved in Stage 2, preventing wasted generation on rejected listings.

### Stage 4: Skills Gap Analysis
Runs an analysis comparing job requirements against the user's current skill set. Results are automatically persisted to the `outputs/` directory for later reference.

### Stage 5: Weekly Progress Report
Produces a summary report of the week's activity, providing a high-level view of pipeline outcomes.

## Command-Line Interface

| Flag | Description |
|---|---|
| `--auto` | Skip interactive review; auto-approve jobs meeting min-score |
| `--min-score N` | Set the numeric minimum score threshold for auto-approval |

## Environment Handling

The script checks for the presence of a Python virtual environment and activates it automatically before executing pipeline stages, ensuring dependency isolation without manual intervention.

## Commit Metadata

- **Repository:** rahilsinghi/Career-Datacenter
- **SHA:** 52ed0b5
- **Date:** 2026-02-18
- **Author:** Rahil Singhi
- **Co-Author:** Claude Sonnet 4.5
- **Lines Added:** 110
- **Lines Removed:** 0

## Related

- [[Career-Datacenter Repository]]
- [[Overnight Batch Job Scraping]]
- [[Job Scoring and Deduplication]]
- [[Application Generation Workflow]]
- [[Skills Gap Analysis]]
- [[Weekly Progress Reporting]]
- [[Pipeline Automation Flags]]
- [[Virtual Environment Management]]
