---
title: Career Datacenter CLI Dashboard
author: ai
created_at: 2026-04-13T22:32:29.724Z
last_ai_edit: 2026-04-13T22:32:29.724Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/career-datacenter/career-datacenter-community-12.md]]"
tags:
  - code-community
  - career-datacenter
  - graphify
  - dashboard
  - cli
  - job-search-management
  - python
aliases:
  - Community 12
---

# Career Datacenter CLI Dashboard

This code community constitutes the command-line interface (CLI) dashboard for the [[Career Datacenter]] project. It enables users to interactively view, manage, and analyze job search data, including scraped jobs, applications, and review statuses, rendered as a comprehensive HTML report.

## Key Concepts

CLI-based Dashboard,Job Application Data Management,HTML Report Generation,Job Status Tracking,Data Loading and Persistence,Job Analytics and Overview

## Details

The core of this community is a single Python script, `/Users/rahilsinghi/Desktop/career-datacenter/cli/dashboard.py`, which serves as a comprehensive CLI dashboard for the [[Career Datacenter]]. It orchestrates the loading, processing, and display of various job search-related data.

### Key Components and Their Roles:

*   **`dashboard.py`**: This file encapsulates the entire dashboard functionality. It contains numerous sub-functions that collectively build an interactive, data-driven overview of the job search process.

#### Data Loading and Persistence:
*   `dashboard_load_scraped_jobs`: Responsible for fetching and preparing initially scraped job data for display and interaction.
*   `dashboard_load_applications`: Loads information about job applications that have been submitted or are in progress.
*   `dashboard_load_reviewed`: Retrieves previously reviewed job entries, allowing the dashboard to maintain state.
*   `dashboard_save_reviewed`: Handles the persistence of review actions or status updates made by the user on job entries.
*   `dashboard_update_job_status`: Modifies the status of a specific job, reflecting actions like 'applied', 'rejected', or 'interviewing'.

#### HTML Generation and UI Components:
*   `dashboard_html_page`: This is the central function for composing the complete HTML output of the dashboard, integrating various sections and data views.
*   `dashboard_overview`: Provides a high-level summary and statistics of the overall job search effort.
*   `dashboard_jobs_table`: Renders a detailed, tabular listing of jobs, likely with filtering and sorting capabilities.
*   `dashboard_job_detail`: Displays in-depth information for a selected job, including its score, status, and associated actions.
*   `dashboard_applications`: Manages and presents the list of submitted applications and their current states.
*   `dashboard_analytics`: Offers visual or statistical analytics derived from the job search data, such as success rates or application trends.
*   `dashboard_easy_apply_page`: A specific section dedicated to jobs that can be applied to with minimal effort.
*   `dashboard_score_badge`, `dashboard_status_badge`: Utility functions used to generate visual badges or indicators for job scores and statuses within the HTML output.

#### Utility Functions:
*   `dashboard_safe_float`: A helper to safely convert values to floating-point numbers, preventing errors from malformed data.
*   `dashboard_fmt_salary`: Formats salary figures for consistent and readable display within the dashboard.
*   `dashboard_main`: The primary entry point for the dashboard application, initiating the data loading, processing, and HTML generation workflow.

## Related

[[career-datacenter]],[[Career Datacenter: Job Search Automation Platform]],[[Dashboard Launch Script (start_dashboard.sh)]],[[Comprehensive Job Scraper Documentation (Career-Datacenter)]]
