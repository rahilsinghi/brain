---
title: Job Board Scrapers (Phase 2.2 - Part 2)
author: ai
created_at: 2026-04-10T21:33:23.085Z
last_ai_edit: 2026-04-10T21:33:23.085Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-board-scrapers-phase-22-part-2-01e626.md]]"
tags:
  - job scraping
  - web scraping
  - python
  - ycombinator
  - indeed
  - wellfound
  - angelist
  - rate limiting
  - user agent rotation
  - error handling
  - exponential backoff
  - project update
  - software development
  - data collection
---

# Job Board Scrapers (Phase 2.2 - Part 2)

This update details the implementation of three production-ready job board scrapers for YCombinator, Indeed, and Wellfound. All scrapers leverage a shared base class providing common features like rate limiting, user agent rotation, and robust error handling to efficiently extract job data.

## Key Concepts

**Job Board Scrapers:** Automated tools designed to extract job listings from online job platforms.,**Base Scraper Class (job_scraper_base.py):** An abstract class providing common scraping utilities, including HTTP request handling, rate limiting, retries with exponential backoff, error handling, and result tracking.,**YCombinator Jobs Scraper (scraper_ycombinator.py):** A specific scraper targeting `ycombinator.com/jobs`, designed for simpler scraping without advanced anti-scraping measures.,**Indeed Scraper (scraper_indeed.py):** A scraper for `indeed.com`, incorporating anti-CAPTCHA measures and handling paginated results.,**Wellfound Scraper (scraper_wellfound.py):** A scraper for `wellfound.com` (formerly AngelList), capable of extracting data from embedded JSON scripts with HTML parsing as a fallback.,**Rate Limiting:** A technique to control the frequency of requests to a server to avoid being blocked or overwhelming the server (e.g., 10 req/min, 6s delays).,**User Agent Rotation:** Changing the HTTP User-Agent header with each request to mimic different browsers and evade detection by anti-scraping systems.,**Exponential Backoff:** A strategy for retrying failed operations with progressively longer delays between attempts.,**CAPTCHA Detection:** Mechanisms to identify and stop scraping if a CAPTCHA challenge is encountered, preventing IP bans.,**ScrapeResult:** An object or structure used to track and store the outcomes of a scraping operation.

## Details

This commit (`cad44c0` by Rahil Singhi on 2026-02-14) in the `rahilsinghi/Career-Datacenter` repository introduces significant enhancements to the job data collection capabilities. The update involved 4 file changes with 1417 additions.

### Implemented Job Scrapers

1.  **Base Scraper Class (`job_scraper_base.py`)**
    *   Serves as an abstract base class encapsulating common scraping logic.
    *   Handles HTTP requests, incorporating user agent rotation for stealth.
    *   Implements rate limiting at 10 requests per minute with 6-second delays to respect server policies.
    *   Includes retry mechanisms with exponential backoff for transient failures.
    *   Provides robust error handling and comprehensive logging.
    *   Utilizes a `ScrapeResult` object for tracking scrape outcomes.

2.  **YCombinator Jobs Scraper (`scraper_ycombinator.py`)**
    *   Designed to scrape job listings from `https://www.ycombinator.com/jobs`.
    *   Identified as the simplest scraper due to fewer anti-scraping complexities.
    *   Extracts key information: job title, company name, location, associated tags, and company size/stage.
    *   Capable of parsing salary information from job descriptions.
    *   Detects mentions of visa sponsorship in job postings.

3.  **Indeed Scraper (`scraper_indeed.py`)**
    *   Targets `Indeed.com`, incorporating measures to mitigate anti-CAPTCHA challenges.
    *   Navigates paginated search results, limited to a maximum of 5 pages.
    *   Extracts job title, company, location, salary, and full job description.
    *   Parses relative date strings (e.g., "3 days ago") for posting age.
    *   Includes CAPTCHA detection logic, which stops scraping if a CAPTCHA is encountered to prevent blocking.
    *   Strictly adheres to defined rate limits.

4.  **Wellfound Scraper (`scraper_wellfound.py`)**
    *   Scrapes `Wellfound.com` (formerly AngelList), focusing on startup job listings.
    *   Prioritizes extracting rich JSON data embedded within script tags.
    *   Provides a fallback mechanism to HTML parsing if embedded JSON is not available.
    *   Parses equity ranges offered in compensation.
    *   Extracts company stage and size information.

### General Features

*   All new scrapers are built upon and inherit functionalities from the `JobScraperBase` class.
*   Ensures consistent and centralized error handling across all integrated job boards.
*   Integrated rate limiting actively prevents IP bans by controlling request frequency.
*   User agent rotation simulates diverse browser requests, enhancing scraping resilience.
*   Detailed logging is implemented across all components for effective debugging and monitoring.

### Testing
Each individual scraper module includes a `main()` function, allowing for standalone execution and testing of its specific functionality.

### Next Steps
Future work will focus on building a job tracker and an integration script to consolidate and manage the scraped data.

## Related

[[Career-Datacenter]],[[Job Tracker]],[[Integration Script]],[[Phase 2.2]]
