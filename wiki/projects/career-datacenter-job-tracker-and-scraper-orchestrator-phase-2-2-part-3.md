---
title: "Career Datacenter: Job Tracker and Scraper Orchestrator (Phase 2.2 - Part 3)"
author: ai
created_at: 2026-04-10T02:45:14.149Z
last_ai_edit: 2026-04-10T02:45:14.149Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-tracker-and-scraper-orchestrator-phase-2-910e2d.md]]"
tags:
  - career-datacenter
  - job-scraping
  - orchestration
  - csv-database
  - job-tracker
  - fit-scoring
  - automation
  - python
  - phase-2
  - rahil-singhi
---

# Career Datacenter: Job Tracker and Scraper Orchestrator (Phase 2.2 - Part 3)

Phase 2.2 Part 3 of the Career Datacenter project introduces a job tracking system and scraper orchestrator to manage the full pipeline from job discovery to application generation. The job tracker persists scraped jobs to a CSV database with deduplication, status tracking, and fit-score querying. The orchestrator serves as the main entry point, coordinating all scrapers, filters, and scorers while automatically flagging high-fit jobs for application generation.

## Key Concepts

- **Job Tracker (`job_tracker.py`)**: Saves and manages scraped jobs in a CSV database with 20 fields per job, supporting deduplication by job ID, status lifecycle tracking, and summary report generation
- **Scraper Orchestrator (`run_job_scraper.py`)**: Main entry point that sequences scraping, filtering, scoring, saving, and application generation into a cohesive workflow
- **Status Lifecycle**: Jobs are tracked through states including `new`, `applied`, `interview`, and others, enabling pipeline visibility
- **Fit Score Threshold**: A score of ≥8.0 is used to identify high-fit jobs, which are automatically flagged for application generation
- **JobFilter Integration**: MUST-HAVE and DEALBREAKER filters are applied to scraped jobs before scoring
- **FitScorer Integration**: Existing fit scoring logic is reused to rank jobs after filtering
- **Dry-Run Mode**: A `--dry-run` flag enables safe testing of the scraping pipeline without side effects
- **Board Selection**: The `--boards` argument allows targeting specific job boards (Indeed, YC, Wellfound) individually or all at once

## Details

## Overview

This commit (SHA: `8913d71`) adds two new modules to the Career Datacenter project, completing the job scraping system with persistence, orchestration, and automated application triggering.

## Job Tracker (`job_tracker.py`)

The job tracker provides a lightweight CSV-based database for managing scraped job listings.

### Key Features
- **Persistence**: Saves all scraped jobs to `tracking/scraped_jobs.csv`
- **Deduplication**: Prevents duplicate entries using `job_id` as a unique key
- **20 Fields per Job**: Captures comprehensive metadata per listing
- **Status Tracking**: Supports lifecycle states — `new`, `applied`, `interview`, and more
- **Querying**: Retrieve jobs by status or fit score threshold
- **Updates**: Allows updating job status and adding notes
- **Reporting**: Generates summary statistics by status, source, and fit score
- **High-Fit Queries**: Built-in support for querying jobs with fit score ≥8.0

### Test Mode
```bash
python job_tracker.py
```

## Scraper Orchestrator (`run_job_scraper.py`)

The orchestrator is the top-level entry point for the job scraping pipeline.

### Workflow
1. Scrape jobs from all configured boards (Indeed, YC, Wellfound)
2. Apply MUST-HAVE and DEALBREAKER filters via `JobFilter`
3. Score remaining jobs using `FitScorer`
4. Save results to `tracking/scraped_jobs.csv` via `JobTracker`
5. Flag jobs with fit score ≥8.0 for auto application generation
6. Generate and output a summary report

### Usage
```bash
# Scrape all boards
python run_job_scraper.py

# Scrape a specific board
python run_job_scraper.py --boards indeed

# Test without saving
python run_job_scraper.py --dry-run
```

## File Changes

| File | Additions | Deletions |
|---|---|---|
| `job_tracker.py` | +725 (combined) | 0 |
| `run_job_scraper.py` | +725 (combined) | 0 |

**Total:** +725 additions, 0 deletions across 2 files

## Next Steps
- Add a scheduler for daily automated scraping runs

## Related

- [[Career Datacenter]]
- [[Job Scraper Pipeline]]
- [[FitScorer]]
- [[JobFilter]]
- [[Application Generator]]
- [[Indeed Scraper]]
- [[YC Job Board Scraper]]
- [[Wellfound Scraper]]
- [[CSV Job Database]]
- [[Job Application Tracker]]
