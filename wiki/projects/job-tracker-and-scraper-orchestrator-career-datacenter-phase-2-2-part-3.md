---
title: Job Tracker and Scraper Orchestrator (Career Datacenter Phase 2.2 - Part 3)
author: ai
created_at: 2026-04-10T02:45:18.620Z
last_ai_edit: 2026-04-10T02:45:18.620Z
last_human_edit: null
last_embedded_hash: 07326a2c164051a4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-tracker-and-scraper-orchestrator-phase-2-910e2d.md]]"
tags:
  - career-datacenter
  - job-scraping
  - automation
  - python
  - csv
  - orchestration
  - fit-scoring
  - job-tracking
  - phase-2-2
  - rahil-singhi
  - claude-sonnet
---


# Job Tracker and Scraper Orchestrator (Career Datacenter Phase 2.2 - Part 3)

This commit introduces a complete job scraping and tracking system for the Career Datacenter project, consisting of two core modules: a CSV-based job tracker and a scraper orchestrator. The job tracker manages deduplication, status tracking, and reporting across 20 fields per job, while the orchestrator coordinates scraping from multiple job boards, filters results, scores fit, and auto-generates applications for high-fit jobs. Together, these components form the backbone of an automated job discovery and triage pipeline.

## Key Concepts

- **Job Tracker (`job_tracker.py`)**: Persists scraped jobs to a CSV database with deduplication by job ID and status lifecycle management (new, applied, interview, etc.)
- **Scraper Orchestrator (`run_job_scraper.py`)**: Central entry point that runs all configured scrapers (Indeed, YC, Wellfound), applies filters and scoring, and triggers downstream actions
- **Fit Scoring**: Jobs are scored numerically; those scoring ≥8.0 are flagged as high-fit and trigger automatic application generation
- **JobFilter**: Applies MUST-HAVE and DEALBREAKER criteria to filter raw scraped results before scoring
- **FitScorer**: Existing module reused by the orchestrator to assign numerical fit scores to filtered jobs
- **Deduplication**: Jobs are uniquely identified by `job_id` to prevent duplicate entries in the CSV database
- **Dry-Run Mode**: Allows safe testing of the scraping pipeline without committing data
- **Summary Reports**: Auto-generated statistics broken down by status, source, and fit score

## Details

## Overview

Commit `8913d71` to the `rahilsinghi/Career-Datacenter` repository (authored 2026-02-14) adds two new modules totaling **725 lines** of new code with no deletions, completing the job scraping subsystem introduced in Phase 2.2.

---

## Module 1: Job Tracker (`job_tracker.py`)

The job tracker provides a lightweight, CSV-based persistence layer for scraped job listings.

### Key Features
- **Storage Format**: CSV for human readability and easy manual editing
- **Fields Tracked**: 20 fields per job record
- **Deduplication**: Jobs are uniquely keyed by `job_id` to prevent duplicates across scraping runs
- **Status Lifecycle**: Supports statuses such as `new`, `applied`, `interview`, and others
- **Querying**: Supports filtering by status or fit score; includes a dedicated high-fit query (score ≥ 8.0)
- **Updates**: Allows updating job status and appending notes to individual records
- **Reporting**: Generates summary statistics by status, source, and fit score

### Output Location
`tracking/scraped_jobs.csv`

---

## Module 2: Scraper Orchestrator (`run_job_scraper.py`)

The orchestrator acts as the main entry point for the entire job scraping pipeline, coordinating all existing scraper, filter, and scorer components.

### Scraping Pipeline
1. **Scrape** jobs from all configured boards (Indeed, YC, Wellfound)
2. **Filter** results using `JobFilter` (MUST-HAVE / DEALBREAKER criteria)
3. **Score** filtered jobs using the existing `FitScorer` module
4. **Save** results to `tracking/scraped_jobs.csv` via `JobTracker`
5. **Flag** high-fit jobs (score ≥ 8.0) for application generation
6. **Generate** summary report

### CLI Usage

```bash
# Scrape all configured boards
python run_job_scraper.py

# Scrape a specific board only
python run_job_scraper.py --boards indeed

# Run in test/dry-run mode (no data written)
python run_job_scraper.py --dry-run
```

---

## Testing

Both modules include standalone test modes:

```bash
# Test job tracking functionality
python job_tracker.py

# Test scraping pipeline without committing data
python run_job_scraper.py --dry-run
```

---

## Next Steps

The commit notes that a **daily automation scheduler** is planned as the subsequent phase, which would allow the pipeline to run autonomously on a recurring basis.

---

## Commit Metadata

| Field | Value |
|---|---|
| Repository | rahilsinghi/Career-Datacenter |
| SHA | 8913d71 |
| Date | 2026-02-14T16:47:44Z |
| Author | Rahil Singhi |
| Co-Author | Claude Sonnet 4.5 |
| Files Changed | 2 |
| Lines Added | +725 |
| Lines Deleted | 0 |

## Related

- [[Career Datacenter Project]]
- [[Job Scraper Pipeline]]
- [[FitScorer Module]]
- [[JobFilter Module]]
- [[Application Generator]]
- [[Phase 2.2 - Job Scraping System]]
- [[CSV Database Pattern]]
- [[Scraper Orchestration]]
- [[Automated Job Applications]]
- [[Daily Scheduler Automation]]
