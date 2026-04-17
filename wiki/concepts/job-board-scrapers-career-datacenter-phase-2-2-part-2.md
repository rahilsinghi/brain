---
title: Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)
author: ai
created_at: 2026-04-13T18:38:17.407Z
last_ai_edit: 2026-04-13T18:38:17.407Z
last_human_edit: null
last_embedded_hash: b01fb4fb8193b791
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-board-scrapers-phase-22-part-2-01e626.md]]"
tags:
  - python
  - web scraping
  - job boards
  - automation
  - indeed
  - ycombinator
  - wellfound
  - career-datacenter
  - development
---


# Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)

This article details the implementation of three production-ready job board scrapers for the [[Career-Datacenter]] project, building upon a robust `JobScraperBase` class. These scrapers target YCombinator, Indeed, and Wellfound, incorporating features like rate limiting, user agent rotation, and anti-CAPTCHA measures.

## Key Concepts

JobScraperBase (Base Scraper Class),YCombinator Jobs Scraper,Indeed Scraper,Wellfound Scraper,Rate Limiting,User Agent Rotation,Exponential Backoff,CAPTCHA Detection,Job Description Parsing,Salary Extraction,Visa Sponsorship Detection,Equity Range Parsing

## Details

This commit (`cad44c0`) within the `rahilsinghi/Career-Datacenter` repository marks the completion of **Phase 2.2 - Part 2** of the job application workflow, focusing on the development of resilient job board scrapers.

### Core Scraper Architecture

A **[[JobScraperBase]]** class (`job_scraper_base.py`) was developed as an abstract foundation for all specific job board scrapers. It centralizes common scraping logic and implements critical features for reliable and ethical scraping:

*   **HTTP Requests**: Utilizes a mechanism for user agent rotation to mimic real browser activity.
*   **Rate Limiting**: Enforces a strict rate limit of 10 requests per minute with 6-second delays between requests to avoid IP bans and respect server load.
*   **Retries**: Implements retries with exponential backoff for transient network issues.
*   **Error Handling**: Comprehensive error handling and logging capabilities.
*   **Result Tracking**: Standardized `ScrapeResult` object for consistent output.

### Implemented Job Board Scrapers

Three production-ready scrapers were developed, each inheriting from `JobScraperBase`:

1.  **YCombinator Jobs Scraper** (`scraper_ycombinator.py`)
    *   **Target**: `https://www.ycombinator.com/jobs`
    *   **Features**: Simplest scraper due to lack of aggressive anti-scraping measures.
    *   **Data Extracted**: Job title, company name, location, tags, company size/stage.
    *   **Parsing**: Extracts salary information and detects mentions of visa sponsorship from job descriptions.

2.  **Indeed Scraper** (`scraper_indeed.py`)
    *   **Target**: `Indeed.com`
    *   **Features**: Includes specific measures to handle anti-CAPTCHA systems.
    *   **Search**: Supports paginated search results, limited to a maximum of 5 pages.
    *   **Data Extracted**: Job title, company name, location, salary, full description.
    *   **Parsing**: Handles relative date formats (e.g., "3 days ago").
    *   **Resilience**: Stops scraping if a CAPTCHA is detected to prevent blocking; respects rate limits.

3.  **Wellfound Scraper** (`scraper_wellfound.py`)
    *   **Target**: `Wellfound.com` (formerly AngelList)
    *   **Features**: Specifically designed for startup-focused job listings.
    *   **Data Extraction**: Prioritizes extracting structured JSON data embedded within scripts; falls back to HTML parsing if JSON is unavailable.
    *   **Parsing**: Extracts equity ranges, company stage, and size information.

### General Features Across Scrapers

*   **Inheritance**: All scrapers benefit from the robust `JobScraperBase`.
*   **Consistency**: Uniform error handling and logging.
*   **Evasion**: Rate limiting and user agent rotation enhance stealth and reliability.
*   **Debugging**: Detailed logging assists in troubleshooting.

### Testing

Each individual scraper includes a `main()` function, allowing for standalone testing and verification of functionality.

### Next Steps

The immediate future work involves building the [[JobDeduplicator]] (job tracker) and an [[apply_workflow.py - Complete Application Workflow with Pipeline Tracking]] (integration script) to orchestrate the entire application process.

## Related

[[Career-Datacenter]],[[Add Job Scraper Foundation (Phase 2.2 - Part 1)]],[[JobScraperBase]],[[JobDeduplicator]],[[apply_workflow.py - Complete Application Workflow with Pipeline Tracking]],[[Claude Sonnet 4.5]]
