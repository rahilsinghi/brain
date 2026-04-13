---
title: "weekly_report.py: Job Search Summary Report Generator"
author: ai
created_at: 2026-04-10T21:25:35.616Z
last_ai_edit: 2026-04-10T21:25:35.616Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-weekly-reportpy-auto-generated-job-search-s-8ee74f.md]]"
tags:
  - python
  - script
  - automation
  - job search
  - reporting
  - markdown
  - analytics
  - career-datacenter
---

# weekly_report.py: Job Search Summary Report Generator

The `weekly_report.py` script automates the generation of a detailed Markdown report summarizing job search activity over the last N days. It provides insights into jobs scraped, applications, fit scores, daily activity, top opportunities, and source breakdowns.
This script is part of the `rahilsinghi/Career-Datacenter` repository and saves its output to a dated Markdown file.

## Key Concepts

- **Automated Reporting**: Generates summaries programmatically.,- **Job Search Analytics**: Provides metrics like jobs scraped, applications, fit score distribution.,- **Markdown Output**: Formats reports for easy readability and sharing.,- **Command-Line Interface**: Supports a `--print` option for quick terminal summaries.

## Details

The `weekly_report.py` script is a crucial component within the `rahilsinghi/Career-Datacenter` project, designed to provide comprehensive, auto-generated summaries of job search progress.

**Functionality:**
The script processes collected job search data to produce a detailed Markdown report. Key metrics and sections included in the report are:
- Jobs scraped (total and unique)
- High-fit count
- Applications generated/submitted
- Fit score distribution (e.g., histogram or ranges)
- Daily activity breakdown
- Top 5 opportunities identified
- Source breakdown (where jobs were found)
- Top companies of interest

**Output:**
The generated report is saved to `outputs/weekly_reports/week_YYYYMMDD.md`, where `YYYYMMDD` corresponds to the week's date. This structured output facilitates easy tracking and review of job search efforts over time.

**Usage:**
For a quick overview directly in the terminal, the script can be run with the `--print` flag:
`python weekly_report.py --print`

**Development Context:**
- **Repository:** `rahilsinghi/Career-Datacenter`
- **Commit SHA:** `01c72dc`
- **Date:** `2026-02-17T22:43:53Z`
- **Author:** Rahil Singhi
- **Co-Author:** Claude Sonnet 4.5 <noreply@anthropic.com>
- **Files Changed:** 1
- **Additions:** +320 lines

## Related

[[Career-Datacenter Project]],[[Job Search Automation]],[[Data Visualization for Job Search]],[[Claude Sonnet 4.5]]
