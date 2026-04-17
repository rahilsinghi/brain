---
title: "`weekly_report.py` Script for Job Search Summary"
author: ai
created_at: 2026-04-12T17:47:04.663Z
last_ai_edit: 2026-04-12T17:47:04.663Z
last_human_edit: null
last_embedded_hash: 5047feb1cf443b8e
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-weekly-reportpy-auto-generated-job-search-s-8ee74f.md]]"
tags:
  - python
  - script
  - reporting
  - job search
  - automation
  - cli
  - career-datacenter
---


# `weekly_report.py` Script for Job Search Summary

This Python script automatically generates a detailed Markdown report summarizing job search activity within the `Career-Datacenter` project. It provides insights into jobs scraped, applications submitted, fit score distribution, and top opportunities over a specified period. The report can be saved to a file or viewed directly in the terminal.

## Key Concepts

`weekly_report.py`,Automated Reporting,Job Search Summary,Markdown Report Generation,Fit Score Analysis

## Details

The `weekly_report.py` script is a component of the `rahilsinghi/Career-Datacenter` repository (SHA: `01c72dc`, dated 2026-02-17). Authored by Rahil Singhi and co-authored by Claude Sonnet 4.5, its primary function is to produce an auto-generated summary report of job search activities.

The script processes data from the last 'N' days (configurable) to compile a comprehensive Markdown report. Key information presented in the report includes:

*   Total number of jobs scraped.
*   Count of high-fit job opportunities.
*   Number of applications generated and submitted.
*   Distribution of job fit scores.
*   A breakdown of daily activity.
*   Identification of the top 5 opportunities.
*   Source breakdown of job listings.
*   Overview of top companies engaged.

By default, the generated report is saved to `outputs/weekly_reports/week_YYYYMMDD.md`. For a quick overview, users can execute the script with the `--print` flag to display the summary directly in the terminal.

## Related

[[Career-Datacenter — Git Activity]],[[Career Datacenter: Job Search Automation Platform]],[[Agentic Job Application System: Multi-Agent Workflow Architecture]]
