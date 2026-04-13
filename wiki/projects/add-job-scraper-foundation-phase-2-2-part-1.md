---
title: Add Job Scraper Foundation (Phase 2.2 - Part 1)
author: ai
created_at: 2026-04-10T17:33:34.408Z
last_ai_edit: 2026-04-10T17:33:34.408Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-scraper-foundation-phase-22-part-1-c5e4d7.md]]"
tags:
  - job scraping
  - scraper
  - configuration
  - data models
  - filtering
  - python
  - yaml
  - career-datacenter
  - automation
  - indeed
  - yc jobs
  - wellfound
  - job search
  - development
---

# Add Job Scraper Foundation (Phase 2.2 - Part 1)

This commit establishes the foundational infrastructure for the automated job scraper within the `rahilsinghi/Career-Datacenter` project. It introduces a comprehensive configuration system for search criteria and automation settings, defines key data models for jobs and scraping results, and implements a sophisticated job filtering engine to evaluate job postings based on detailed preferences.

## Key Concepts

Job Scraper Foundation,Scraper Configuration,Data Models,Job Filtering,Automated Job Scraping,Career-Datacenter

## Details

This commit, `950091f` by Rahil Singhi on 2026-02-14, implements the core infrastructure for automated job board scraping, involving 4 file changes, 943 additions, and 6 deletions. The key components introduced are:

### 1. Scraper Configuration (`config/scraper_config.yaml`)
This comprehensive configuration file defines various search and automation parameters:
-   **Search Criteria**: Includes 14 target job titles.
-   **MUST-HAVE Filters**: Specifies required languages (Python, TypeScript, Java, Go) and core signals (Backend, API, ML, Data Pipeline).
-   **Keywords**: Defines hard and soft dealbreaker keywords.
-   **Preferences**: Sets visa/sponsorship, location, salary, and industry preferences.
-   **Job Board Priorities**: Ranks job boards like Indeed, YC Jobs, and Wellfound.
-   **Automation Settings**: Configures daily scraping at 9 AM and weekly summaries.

### 2. Data Models (`cli/job_scraper_models.py`)
Type-safe data models are introduced to structure the scraped data and related entities:
-   **Job class**: Represents a scraped job with all its metadata.
-   **JobSource enum**: Enumerates job boards such as Indeed, YC Jobs, Wellfound.
-   **JobStatus enum**: Defines an application tracking workflow.
-   **FilterResult**: Stores the outcome of applying filters to a job.
-   **ScrapeResult**: Provides a summary of a scraping session.
-   **ScraperConfig**: Facilitates type-safe loading of the scraper configuration.

### 3. Job Filter (`cli/job_filter.py`)
The job filter applies predefined criteria to evaluate job postings:
-   **MUST-HAVE Keyword Requirements**: Ensures at least one language (Python/TypeScript/Java/Go) and at least one core signal (Backend/API/ML/Data Pipeline) are present.
-   **Dealbreakers**: Checks for dealbreaker keywords (e.g., PhD, 8+ years, security clearance).
-   **Salary Validation**: Validates salary against a minimum of $90k, with a boost for ranges between $120k-$180k.
-   **Visa/Sponsorship**: Checks for mentions of visa or sponsorship.
-   **Bonus Keywords**: Scores additional keywords like BigQuery, GCP, LLM.
-   **Location Matching**: Matches job locations against preferences.

### Test Results
An example job (Backend Engineer, Python, NYC, $130-160k) was tested:
-   **Result**: Passed all filters.
-   **Score Boost**: Received a +2.10 score boost due to salary, visa, location, and keywords.

### User Profile Updated
-   Added detailed role targeting with Tier 1/2/3 prioritization.
-   Included a positioning statement.
-   Added key differentiators.

### Next Steps
The subsequent phase involves building the actual scrapers for each specific job board.

## Related

[[Career-Datacenter]],[[Automated Job Scraping]],[[Phase 2.2 - Part 2: Build Actual Scrapers]]
