---
title: Add Job Scraper Foundation (Career-Datacenter Phase 2.2 - Part 1)
author: ai
created_at: 2026-04-12T18:06:58.141Z
last_ai_edit: 2026-04-12T18:06:58.141Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-scraper-foundation-phase-22-part-1-c5e4d7.md]]"
tags:
  - job scraping
  - automation
  - career-datacenter
  - configuration
  - data models
  - job filter
  - python
  - indeed
  - yc jobs
  - wellfound
---

# Add Job Scraper Foundation (Career-Datacenter Phase 2.2 - Part 1)

This commit establishes the foundational infrastructure for automated job board scraping within the [[Career-Datacenter]] project. It introduces a comprehensive configuration system for search criteria, defines essential data models for jobs and scraping results, and implements a robust job filtering mechanism based on keywords, salary, visa requirements, and location preferences. This lays the groundwork for developing dedicated scrapers for various job boards.

## Key Concepts

Scraper Configuration,Data Models,Job Filtering,Automated Job Application System,Job Board Scraping

## Details

This commit (`950091f`) to the [[Career-Datacenter]] repository by Rahil Singhi on 2026-02-14 implements the core infrastructure for automated job board scraping. It involved changes to 4 files, adding 943 lines and deleting 6.

### 1. Scraper Configuration (`config/scraper_config.yaml`)
The `scraper_config.yaml` file was introduced to define comprehensive search criteria, including:
*   14 target job titles.
*   MUST-HAVE filters for programming languages (Python, TypeScript, Java, Go) and core signals (Backend, API, ML, Data Pipeline).
*   Hard and soft dealbreaker keywords.
*   Visa/sponsorship preferences.
*   Location, salary, and industry preferences.
*   Prioritized job boards (Indeed, YC Jobs, Wellfound).
*   Automation settings, such as daily scraping at 9 AM and weekly summaries.

### 2. Data Models (`cli/job_scraper_models.py`)
New data models were defined to structure the scraped information and workflow:
*   `Job` class: Represents a scraped job with all associated metadata.
*   `JobSource` enum: Enumerates supported job boards (Indeed, YC Jobs, Wellfound, etc.).
*   `JobStatus` enum: Tracks the application workflow status.
*   `FilterResult`: Stores the outcomes of applying filters to a job.
*   `ScrapeResult`: Summarizes a scraping session.
*   `ScraperConfig`: Provides type-safe loading for the scraper configuration.

### 3. Job Filter (`cli/job_filter.py`)
A `Job Filter` component was implemented to evaluate job postings against defined criteria:
*   Applies MUST-HAVE keyword requirements: at least one language (Python/TypeScript/Java/Go) and at least one core signal (Backend/API/ML/Data Pipeline).
*   Checks for dealbreakers (e.g., requiring a PhD, 8+ years of experience, security clearance).
*   Validates salary expectations (minimum $90k, with a boost for $120k-$180k range).
*   Checks for visa/sponsorship mentions.
*   Scores bonus keywords (e.g., BigQuery, GCP, LLM).
*   Performs location preference matching.

### Test Results
An example job (Backend Engineer, Python, NYC, $130-160k) successfully passed all implemented filters, receiving a +2.10 score boost due to salary, visa, location, and bonus keywords.

### User Profile Updated
The user's profile was updated to include detailed role targeting (Tier 1/2/3 prioritization), a positioning statement, and key differentiators, enhancing the specificity of job searches.

### Next Steps
The immediate next steps involve building the actual scraping logic for each targeted job board.

## Related

[[Career-Datacenter — Git Activity]],[[Career Datacenter: Job Scraper Foundation (Phase 2.2 - Part 1)]],[[Career Datacenter: Agentic Job Application System Roadmap]],[[Career Datacenter: Job Search Automation Platform]],[[Career Datacenter: Job Tracker and Scraper Orchestrator]],[[Add Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]],[[Add Core Identity and Education Data]],[[CLAUDE.md for Claude Code Vault Integration]]
