---
title: Add Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)
author: ai
created_at: 2026-04-12T18:02:21.774Z
last_ai_edit: 2026-04-12T18:02:21.774Z
last_human_edit: null
last_embedded_hash: d369bb635d027314
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-board-scrapers-phase-22-part-2-01e626.md]]"
tags:
  - job scraping
  - career-datacenter
  - python
  - web scraping
  - ycombinator
  - indeed
  - wellfound
  - api
  - automation
---


# Add Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)

This commit details the implementation of three production-ready job board scrapers for the Career-Datacenter project: YCombinator, Indeed, and Wellfound. These scrapers leverage a common base class with features like user agent rotation, rate limiting, and exponential backoff for robust and ethical data extraction.

## Key Concepts

Job Scrapers,Web Scraping,Base Scraper Class,HTTP Requests,User Agent Rotation,Rate Limiting,Exponential Backoff,Error Handling,Logging,ScrapeResult Tracking,YCombinator Jobs,Indeed,Wellfound (AngelList),CAPTCHA Detection,JSON Data Extraction,HTML Parsing

## Details

This implementation, part of the `rahilsinghi/Career-Datacenter` repository (SHA: `cad44c0`, dated 2026-02-14), introduces robust job board scrapers.

### 1. Base Scraper Class (`job_scraper_base.py`)
An abstract base class designed to centralize common scraping logic. Key features include:
*   Handles HTTP requests with dynamic user agent rotation to mimic real browser behavior.
*   Implements rate limiting (10 requests per minute with 6-second delays) to prevent IP bans and respect website policies.
*   Incorporates retries with exponential backoff for transient network issues or server errors.
*   Provides comprehensive error handling and logging for debugging and operational visibility.
*   Tracks scraping outcomes using a `ScrapeResult` object for consistent reporting.

### 2. YCombinator Jobs Scraper (`scraper_ycombinator.py`)
Targets `https://www.ycombinator.com/jobs`. This scraper is relatively simple due to the site's lack of aggressive anti-scraping measures. It extracts job details such as title, company, location, tags, company size/stage, parses salary information from job descriptions, and detects mentions of visa sponsorship.

### 3. Indeed Scraper (`scraper_indeed.py`)
Designed to scrape Indeed.com, including measures to handle anti-CAPTCHA challenges. It navigates paginated search results (up to a maximum of 5 pages) and extracts job title, company, location, salary, and description. It can parse relative dates (e.g., "3 days ago") and will gracefully stop if a CAPTCHA is detected. This scraper strictly adheres to rate limits to avoid being blocked.

### 4. Wellfound Scraper (`scraper_wellfound.py`)
Focuses on Wellfound.com (formerly AngelList), a platform popular for startup jobs. This scraper prioritizes extracting JSON data embedded within HTML scripts. If JSON data is unavailable, it falls back to parsing HTML directly. It is capable of extracting equity ranges and company stage/size information.

### General Features
*   All newly implemented scrapers inherit from `JobScraperBase`, ensuring consistency in error handling and core functionalities.
*   Built-in rate limiting and user agent rotation are critical for preventing IP bans and ensuring long-term scraping viability.
*   Detailed logging is provided for all operations, aiding in debugging and performance monitoring.

### Testing
Each scraper module includes a `main()` function, allowing for standalone execution and testing of individual scrapers.

### Next Steps
The immediate next phase involves building the [[Job Tracker]] system and developing the integration scripts to orchestrate these scrapers.

## Related

[[Career-Datacenter]],[[Add Job Scraper Foundation (Phase 2.2 - Part 1)]],[[Career Datacenter: Job Scraper Foundation (Phase 2.2 - Part 1)]],[[Career Datacenter: Job Tracker and Scraper Orchestrator (Phase 2.2 - Part 3)]],[[Career Datacenter: Phase 2.2 Job Scraping System Completion]],[[Job Tracker]],[[Application Tracking System (Career-Datacenter)]]
