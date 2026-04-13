---
title: Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)
author: ai
created_at: 2026-04-12T22:03:09.219Z
last_ai_edit: 2026-04-12T22:03:09.219Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-board-scrapers-phase-22-part-2-01e626.md]]"
tags:
  - job scraping
  - career-datacenter
  - python
  - web scraping
  - automation
  - indeed
  - ycombinator
  - wellfound
---

# Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)

This commit details the implementation of three production-ready job board scrapers for Career-Datacenter: YCombinator, Indeed, and Wellfound. These scrapers utilize a robust base class handling common scraping logic, including rate limiting, retries, and user agent rotation, to efficiently extract job details while avoiding detection.

## Key Concepts

Job Scraper Base Class,Web Scraping,Rate Limiting,User Agent Rotation,Exponential Backoff,CAPTCHA Detection,JSON Data Extraction,Automated Job Search

## Details

This commit (`cad44c0`) for the `rahilsinghi/Career-Datacenter` repository, authored by Rahil Singhi on 2026-02-14, introduced the second part of Phase 2.2, focusing on production-ready job board scrapers. The implementation involved significant additions across four files, totaling +1417 lines of code.

### Implemented Scrapers:

1.  **`job_scraper_base.py` (Base Scraper Class)**
    *   Provides an abstract base for common scraping functionalities.
    *   Handles HTTP requests with dynamic user agent rotation to mimic real browser behavior.
    *   Implements a strict rate-limiting mechanism (10 requests per minute, with 6-second delays) to prevent IP bans.
    *   Incorporates retries with exponential backoff for handling transient network or server errors.
    *   Includes comprehensive error handling and logging for debugging and operational insights.
    *   Uses a `ScrapeResult` object for consistent tracking of scraping outcomes.

2.  **`scraper_ycombinator.py` (YCombinator Jobs Scraper)**
    *   Designed to scrape `https://www.ycombinator.com/jobs`.
    *   Noted as the simplest scraper due to minimal anti-scraping measures on the target site.
    *   Extracts key job information including title, company, location, tags, and company size/stage.
    *   Capable of parsing salary information directly from job descriptions.
    *   Identifies and extracts mentions of visa sponsorship.

3.  **`scraper_indeed.py` (Indeed Scraper)**
    *   Targets Indeed.com, incorporating measures against anti-CAPTCHA systems.
    *   Navigates paginated search results, limited to a maximum of 5 pages.
    *   Extracts job title, company, location, salary, and full job description.
    *   Parses relative date formats (e.g., "3 days ago") for job postings.
    *   Features CAPTCHA detection, pausing operations if a CAPTCHA is encountered.
    *   Adheres to strict rate limits to avoid being blocked by Indeed.

4.  **`scraper_wellfound.py` (Wellfound Scraper)**
    *   Scrapes Wellfound.com (formerly AngelList), focusing on startup-centric job listings.
    *   Primarily extracts structured JSON data embedded within HTML scripts for efficiency.
    *   Includes a fallback mechanism for HTML parsing if embedded JSON data is not available.
    *   Parses equity ranges, a common compensation component in startup roles.
    *   Extracts company stage and size information.

### General Features and Testing:

*   All specialized scrapers (YCombinator, Indeed, Wellfound) inherit from the `JobScraperBase`, ensuring consistent behavior and robust error handling.
*   The implemented rate limiting and user agent rotation are critical for sustained scraping operations without encountering IP bans.
*   Detailed logging facilitates debugging and monitoring of scraping activities.
*   Each individual scraper is equipped with a `main()` function, allowing for standalone testing and development.

### Next Steps:

The immediate next steps after this implementation involve building the [[Job Tracker and Scraper Orchestrator]] and the integration script to consolidate and manage the scraped job data.

## Related

[[Career-Datacenter]],[[Job Scraper Foundation (Career-Datacenter Phase 2.2 - Part 1)]],[[Career Datacenter: Job Search Automation Platform]],[[Job Tracker and Scraper Orchestrator]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]]
