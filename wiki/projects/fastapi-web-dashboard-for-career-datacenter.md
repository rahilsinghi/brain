---
title: FastAPI Web Dashboard for Career-Datacenter
author: ai
created_at: 2026-04-13T15:41:02.130Z
last_ai_edit: 2026-04-13T15:41:02.130Z
last_human_edit: null
last_embedded_hash: 5461fbf5921835ad
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-fastapi-web-dashboard-overview-jobs-table-a-80a5cb.md]]"
tags:
  - fastapi
  - dashboard
  - web interface
  - career-datacenter
  - job search
  - application tracking
  - analytics
  - cli
---


# FastAPI Web Dashboard for Career-Datacenter

This update introduces a new web dashboard built with FastAPI and Uvicorn for the Career-Datacenter project. It provides a comprehensive interface to monitor job search activities, manage applications, and view analytics related to job fit, skill demand, and salary statistics. The dashboard features an intuitive dark theme, a sortable jobs table, Kanban-style application tracking, and an auto-opening browser experience.

## Key Concepts

[[FastAPI]],Uvicorn,Web Dashboard,Job Tracking,Application Management,Job Search Analytics,CLI Flags

## Details

A new command-line interface `cli/dashboard.py` has been implemented, leveraging FastAPI for the backend API and Uvicorn as the ASGI server, to provide a dynamic web dashboard for the [[Career-Datacenter]] project. This dashboard offers several key functionalities:

*   **`/` (Pipeline Overview):** Displays a high-level overview of the job search pipeline, including key statistics cards and a summary of top high-fit jobs.
*   **`/jobs` (Jobs Table):** Presents a sortable and filterable table of jobs. Users can filter by score, status, and keywords, making it easy to navigate through potential opportunities.
*   **`/jobs/{id}` (Job Detail Page):** Provides a detailed view for individual jobs, including the full description, associated metadata, and interactive buttons to approve, reject, or skip the job. Actions taken here update `reviewed_jobs.json` and relevant CSV files.
*   **`/applications` (Kanban Pipeline):** Visualizes the application workflow using a Kanban-style board, moving applications through stages such as 'Preparing', 'Applied', 'Interview', and 'Offer'. This aids in tracking progress.
*   **`/analytics` (Job Search Analytics):** Offers various analytical insights including skill demand bar charts, distributions of job fit scores, salary statistics, and a breakdown of job sources.
*   **`POST /jobs/{id}/action`:** An API endpoint to perform inline actions (approve, reject, skip) on jobs, updating relevant data stores.

The dashboard features a dark theme, color-coded fit scores for quick identification, and is built using pure CSS without reliance on external frameworks like Bootstrap. It is designed to automatically open in a browser upon launch, with a `--no-browser` flag available for headless operation. Additionally, `--port` and `--host` CLI flags allow for custom network configuration.

## Related

[[Career-Datacenter]],[[Application Tracking System (Career-Datacenter)]],[[Application Generator CLI Implementation Plan (Career-Datacenter)]],[[JobDeduplicator - Persistent Job ID Tracking]],[[Job Tracker and Scraper Orchestrator]],[[Add Professional Experience Entries (Career-Datacenter)]],[[Career-Datacenter: Production-Grade Architecture and Phase 1 Implementation]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]]
