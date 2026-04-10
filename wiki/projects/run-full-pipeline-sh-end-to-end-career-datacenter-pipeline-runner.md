---
title: run_full_pipeline.sh – End-to-End Career Datacenter Pipeline Runner
author: ai
created_at: 2026-04-10T02:07:40.365Z
last_ai_edit: 2026-04-10T02:07:40.365Z
last_human_edit: null
last_embedded_hash: 1be951de144d6605
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-run-full-pipelinesh-end-to-end-pipeline-run-1c8f56.md]]"
tags:
  - shell-script
  - pipeline
  - automation
  - career-datacenter
  - job-scraping
  - application-generation
  - skills-gap-analysis
  - batch-processing
  - cli
  - orchestration
---


# run_full_pipeline.sh – End-to-End Career Datacenter Pipeline Runner

The `run_full_pipeline.sh` script serves as the master orchestrator for the Career-Datacenter project, chaining five sequential workflow stages from job scraping through weekly progress reporting. It supports both interactive and fully automated modes via command-line flags and automatically manages virtual environment activation. This script was added in commit 52ed0b5 by Rahil Singhi on 2026-02-18.

## Key Concepts

- **5-Stage Pipeline**: Orchestrates scrape → score → deduplicate → review → apply → analyze → report in sequence
- **Overnight Batch (Stage 1)**: Combines job scraping, scoring, and deduplication into a single batch step
- **Job Review (Stage 2)**: Interactive review of scraped jobs, skippable via `--auto` flag
- **Application Generation (Stage 3)**: Produces application materials only for approved jobs
- **Skills Gap Analysis (Stage 4)**: Automatically runs gap analysis and saves results to `outputs/`
- **Weekly Progress Report (Stage 5)**: Generates a summary report of pipeline activity and outcomes
- **`--auto` Flag**: Skips interactive review and auto-approves jobs meeting or exceeding the minimum score threshold
- **`--min-score N` Flag**: Sets the numeric threshold for auto-approval of jobs
- **Virtual Environment Management**: Detects and activates a Python `venv` if one is present before execution

## Details

## Overview

Added in a single-commit change (+110 lines, no deletions), `run_full_pipeline.sh` is the top-level entry point for the Career-Datacenter automation system. It chains all major subsystems into a cohesive, repeatable workflow that can run either interactively or in a fully hands-off automated mode.

## Pipeline Stages

### Stage 1 – Overnight Batch
Runs the core data ingestion and preprocessing steps:
- Job scraping from configured sources
- Relevance/quality scoring of scraped postings
- Deduplication to remove repeated or near-duplicate listings

### Stage 2 – Job Review
Provides an interactive interface for the user to manually review and approve or reject scored job postings. When `--auto` is passed, this stage is skipped and jobs are approved automatically based on the score threshold.

### Stage 3 – Application Generation
Generates application materials (e.g., tailored resumes, cover letters) exclusively for jobs that passed the review stage. This ensures no resources are wasted on unapproved postings.

### Stage 4 – Skills Gap Analysis
Runs an automated analysis comparing the user's current skills profile against requirements found in approved job postings. Output is persisted to the `outputs/` directory for later review.

### Stage 5 – Weekly Progress Report
Compiles and generates a weekly summary report reflecting pipeline activity, application status, and trends.

## Command-Line Flags

| Flag | Description |
|---|---|
| `--auto` | Skips interactive job review; auto-approves jobs at or above `--min-score` |
| `--min-score N` | Sets the minimum numeric score required for auto-approval (used with `--auto`) |

## Environment Handling

The script checks for the presence of a Python virtual environment (`venv`) and activates it automatically before executing pipeline stages, ensuring correct dependency resolution without manual intervention.

## Authorship

- **Primary Author:** Rahil Singhi
- **Co-Author:** Claude Sonnet 4.5
- **Commit SHA:** 52ed0b5
- **Date:** 2026-02-18

## Related

- [[Career-Datacenter Project]]
- [[Overnight Batch Job Scraper]]
- [[Job Scoring System]]
- [[Deduplication Pipeline]]
- [[Application Generation Workflow]]
- [[Skills Gap Analysis]]
- [[Weekly Progress Report]]
- [[Pipeline Automation Flags]]
- [[Virtual Environment Management]]
