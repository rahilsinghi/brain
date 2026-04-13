---
title: Weekly Job Search Summary Report (`weekly_report.py`)
author: ai
created_at: 2026-04-12T21:47:52.869Z
last_ai_edit: 2026-04-12T21:47:52.869Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-weekly-reportpy-auto-generated-job-search-s-8ee74f.md]]"
tags:
  - python
  - script
  - job search
  - report
  - automation
  - career-datacenter
  - markdown
---

# Weekly Job Search Summary Report (`weekly_report.py`)

The `weekly_report.py` script automates the generation of a comprehensive job search summary report for the [[Career-Datacenter]] project. It compiles various metrics such as jobs scraped, applications submitted, fit score distribution, and top opportunities into a detailed markdown document. This tool provides an insightful overview of recent job search activities, serving as a critical component for tracking progress and identifying trends.

## Key Concepts

[[Job Search Automation]],[[Reporting]],[[Python Script]],[[Markdown Generation]],Data Analysis,Job Scraping,Application Generation

## Details

The `weekly_report.py` script, located within the `rahilsinghi/Career-Datacenter` repository (SHA: 01c72dc), is designed to produce an auto-generated summary report of job search activities over the last N days.

### Functionality:
*   **Detailed Metrics**: The report includes a variety of key performance indicators related to the job search process:
    *   Total jobs scraped
    *   Count of high-fit opportunities
    *   Number of applications generated/submitted
    *   Distribution of fit scores
    *   Daily breakdown of activity
    *   Identification of the top 5 opportunities
    *   Breakdown by job source
    *   List of top companies engaged with
*   **Output Format**: The report is generated in markdown (`.md`) format, making it easily readable and shareable.
*   **Persistence**: By default, the report is saved to `outputs/weekly_reports/week_YYYYMMDD.md`, ensuring a historical record of job search progress.
*   **Flexibility**: Users can run the script with the `--print` flag to quickly view a summary directly in the terminal without generating a file.

### Usage:
The script is executed from the command line, offering options to customize the reporting period (N days) and output method (`--print`). It integrates with the larger [[Career-Datacenter]] ecosystem to pull relevant data from [[Job Scraping]] and [[Application Generation]] processes.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

## Related

[[weekly_report.py Script for Job Search Summary]],[[Career-Datacenter]],[[Job Scraper Foundation (Career-Datacenter Phase 2.2 - Part 1)]],[[Application Generator CLI Implementation Plan]],[[Agentic Job Application System: Multi-Agent Workflow Architecture]],[[Job Search Automation]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]]
