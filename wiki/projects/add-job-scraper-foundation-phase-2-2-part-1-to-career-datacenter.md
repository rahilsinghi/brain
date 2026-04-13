---
title: Add Job Scraper Foundation (Phase 2.2 - Part 1) to Career-Datacenter
author: ai
created_at: 2026-04-12T22:07:30.444Z
last_ai_edit: 2026-04-12T22:07:30.444Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-scraper-foundation-phase-22-part-1-c5e4d7.md]]"
tags:
  - job scraping
  - career-datacenter
  - automation
  - data models
  - configuration
  - job filter
  - workflow
  - phase 2.2
---

# Add Job Scraper Foundation (Phase 2.2 - Part 1) to Career-Datacenter

This commit established the foundational infrastructure for automated job board scraping within the [[Career-Datacenter]] project. It introduced comprehensive scraper configuration, robust data models for job representation and tracking, and an intelligent job filtering system to process and score job postings based on defined criteria. This lays the groundwork for subsequent integration of specific job board scrapers.

## Key Concepts

Scraper Configuration,Data Models,Job Filtering,Job Board Scraping,Application Tracking Workflow,Career-Datacenter

## Details

This commit (`950091f`) to the `rahilsinghi/Career-Datacenter` repository on 2026-02-14 implemented the core infrastructure necessary for automated job board scraping.

### Scraper Configuration (`config/scraper_config.yaml`)

A comprehensive YAML-based configuration file was introduced to define detailed search criteria and preferences for job scraping. Key elements include:

*   **Target Job Titles:** 14 specific job titles to focus searches.
*   **MUST-HAVE Filters:** Essential keywords such as programming languages (Python, TypeScript, Java, Go) and core signals (Backend, API, ML, Data Pipeline).
*   **Hard/Soft Dealbreaker Keywords:** Terms that would automatically disqualify a job or reduce its score (e.g., "PhD", "8+ years experience", "security clearance").
*   **Visa/Sponsorship Preferences:** Criteria for identifying jobs that offer visa sponsorship.
*   **Location, Salary, Industry Preferences:** Parameters to narrow down job searches.
*   **Job Board Priorities:** Prioritization of specific job boards like Indeed, YC Jobs, and Wellfound.
*   **Automation Settings:** Configuration for daily scraping schedules and weekly summary generation.

### Data Models (`cli/job_scraper_models.py`)

New data models were defined to standardize the representation and tracking of job-related information:

*   **`Job` class:** Represents a scraped job with all its associated metadata.
*   **`JobSource` enum:** Enumerates various job boards (e.g., Indeed, YC Jobs, Wellfound).
*   **`JobStatus` enum:** Defines stages in the [[Application Tracking System (Career-Datacenter)]] workflow.
*   **`FilterResult`:** Captures the outcome of applying filters to a job posting.
*   **`ScrapeResult`:** Summarizes the results of a scraping session.
*   **`ScraperConfig`:** Provides type-safe loading of the scraper configuration.

### Job Filter (`cli/job_filter.py`)

A robust job filtering module was implemented to evaluate job postings against the defined configuration. It performs several checks:

*   **MUST-HAVE Keyword Requirements:** Ensures at least one language (Python/TypeScript/Java/Go) and one core signal (Backend/API/ML/Data Pipeline) are present.
*   **Dealbreaker Checks:** Identifies and filters out jobs based on disqualifying keywords (e.g., "PhD", "8+ years experience", "clearance").
*   **Salary Validation:** Filters jobs below a minimum salary ($90k) and applies a score boost for preferred salary ranges ($120k-180k).
*   **Visa/Sponsorship Mentions:** Checks for keywords indicating visa sponsorship availability.
*   **Bonus Keyword Scoring:** Assigns additional scores for desirable keywords (e.g., BigQuery, GCP, LLM).
*   **Location Preference Matching:** Evaluates job locations against user preferences.

### Test Results

An example job (Backend Engineer, Python, NYC, $130-160k) successfully passed all filters, receiving a `+2.10` score boost due to matching salary, visa mentions, location, and keywords.

### User Profile Updated

The user profile was updated to include detailed role targeting with Tier 1/2/3 prioritization, a positioning statement, and key differentiators to align with the refined job search strategy.

### Next Steps

The immediate next step following this foundational work is to [[Add Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]] for each of the target job boards to actively pull data into the system.

## Related

[[Career-Datacenter]],[[Career Datacenter: Job Scraper Foundation (Phase 2.2 - Part 1)]],[[Application Tracking System (Career-Datacenter)]],[[Add Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]],[[Job Search Configuration Templates to Career-Datacenter]],[[weekly_report.py Script for Job Search Summary]],[[Career Datacenter: Job Tracker and Scraper Orchestrator (Phase 2.2 - Part 3)]],[[Automated Job Application Workflow Script (apply_workflow.py)]]
