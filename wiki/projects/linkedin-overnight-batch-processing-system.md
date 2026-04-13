---
title: LinkedIn Overnight Batch Processing System
author: ai
created_at: 2026-04-13T15:51:02.837Z
last_ai_edit: 2026-04-13T15:51:02.837Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-linkedin-overnight-batch-processing-system-99e4f9.md]]"
tags:
  - linkedin
  - automation
  - job search
  - batch processing
  - scraper
  - resume generation
  - cover letter
  - career-datacenter
  - python
  - cron
---

# LinkedIn Overnight Batch Processing System

This system implements an automated workflow for LinkedIn job applications within the [[Career-Datacenter]] project. It features a dedicated scraper for LinkedIn jobs and an overnight batch processor that searches, filters, scores, and auto-generates applications and supporting documents for high-fit roles, delivering a daily summary.

## Key Concepts

[[LinkedIn Scraper]],[[Automated Job Application]],[[Batch Processing]],[[Easy Apply]],[[Resume Generation]],[[Cover Letter Generation]],[[Daily Summary Report]],Cron Automation

## Details

This commit introduces a comprehensive system for automating LinkedIn job applications, designed to run overnight.

**Repository:** `rahilsinghi/Career-Datacenter`
**Commit SHA:** `d0d57f2`
**Date:** 2026-02-14T17:02:53Z
**Author:** Rahil Singhi
**Files Changed:** 2 (740 additions, 0 deletions)

### Components:

1.  **`scraper_linkedin.py` (LinkedIn Scraper)**
    *   Utilizes the `linkedin-api` package for authentication and interaction.
    *   Searches for recent job postings (within the last 24 hours).
    *   Specifically targets `Easy Apply` jobs.
    *   Supports time-based filtering (day, week, month).
    *   Extracts complete job details, including full job descriptions.

2.  **`batch_process_overnight.py` (Overnight Batch Processor)**
    *   Provides a complete end-to-end automation workflow for job applications.
    *   **Workflow Steps:** Scrapes LinkedIn jobs → filters according to criteria → scores job fit → generates applications.
    *   **Application Generation:** Automatically generates a resume and cover letter for jobs with a fit score of 8.0 or higher.
    *   **Output:** Saves generated applications to `outputs/batch_generated/YYYYMMDD/`.
    *   **Reporting:** Produces a daily summary report of processed jobs and applications.
    *   **Automation:** Designed to be `Cron`-ready for daily execution at 2 AM.

### Workflow Overview:

The system runs automatically overnight (e.g., at 2 AM). Users wake up to a CSV file containing a list of relevant jobs and pre-generated application materials, ready for review and submission.

### Requirements:

The system requires `LINKEDIN_EMAIL` and `LINKEDIN_PASSWORD` to be set in the `.env` file for authentication with LinkedIn.

**Co-Authored-By:** Claude Sonnet 4.5

## Related

[[Career-Datacenter]],[[batch_process_overnight.py Enhancements: Job Description Parsing and CLI Flags]],[[ApplicationBatchRunner for Automated Job Application Generation]],[[Automated Job Application Workflow Script (apply_workflow.py)]],[[Add Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]],[[Add Job Scraper Foundation (Career-Datacenter Phase 2.2 - Part 1)]],[[weekly_report.py Script for Job Search Summary]],[[Anti-Hallucination Constraints in Resume Generation]],[[SMTP Send Capability and Update Signature URLs in Career-Datacenter]],[[Bullet Bank: Reusable Resume Bullets by Engineering Domain]],[[Application Tracking System (ATS) in Career-Datacenter]],[[Job Search Automation Platform]]
