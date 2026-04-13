---
title: "Career-Datacenter: Job Scraper Foundation (Phase 2.2 - Part 1)"
author: ai
created_at: 2026-04-10T21:36:33.725Z
last_ai_edit: 2026-04-10T21:36:33.725Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-job-scraper-foundation-phase-22-part-1-c5e4d7.md]]"
tags:
  - job scraping
  - automation
  - python
  - data models
  - configuration
  - filtering
  - career datacenter
  - phase 2.2
  - backend
  - ml
---

# Career-Datacenter: Job Scraper Foundation (Phase 2.2 - Part 1)

This entry details the initial implementation of the core infrastructure for an automated job board scraper within the Career-Datacenter project. It establishes essential components, including a comprehensive configuration system, robust data models for job representation and tracking, and a sophisticated job filtering mechanism to identify suitable opportunities.

## Key Concepts

Scraper Configuration,Data Models for Job Scraping,Job Filtering,Keyword Filtering,Application Tracking Workflow,Type-Safe Configuration,Job Scoring

## Details

This implementation marks Phase 2.2 - Part 1 of the Career-Datacenter project, focusing on building the foundational components for automated job board scraping. The work is captured in commit `950091f` on `2026-02-14` by [[Rahil Singhi]]. It involved changing 4 files, adding 943 lines, and deleting 6 lines.

The core infrastructure comprises three main components:

### 1. Scraper Configuration (`config/scraper_config.yaml`)
This comprehensive YAML file defines all search criteria and automation settings:
*   **Target Job Titles:** 14 specific job titles to search for.
*   **MUST-HAVE Filters:** Essential keywords covering languages (Python, TypeScript, Java, Go) and core signals (Backend, API, ML, Data Pipeline).
*   **Dealbreaker Keywords:** Hard and soft keywords that would disqualify a job.
*   **Preferences:** Visa/sponsorship, location, salary ranges, and industry.
*   **Job Board Priorities:** Ranked preference for Indeed, YC Jobs, and Wellfound.
*   **Automation Settings:** Daily scraping scheduled for 9 am, with weekly summary reports.

### 2. Data Models (`cli/job_scraper_models.py`)
Type-safe Python models to represent and manage scraped data:
*   **`Job` class:** Encapsulates all metadata for a scraped job.
*   **`JobSource` enum:** Defines supported job boards (Indeed, YC Jobs, Wellfound, etc.).
*   **`JobStatus` enum:** Tracks the application workflow (e.g., applied, rejected, interviewed).
*   **`FilterResult`:** Stores the outcome of applying filters to a job.
*   **`ScrapeResult`:** Summarizes the statistics and outcomes of a scraping session.
*   **`ScraperConfig`:** Facilitates type-safe loading of the scraper configuration.

### 3. Job Filter (`cli/job_filter.py`)
A robust filtering system designed to evaluate and score jobs based on predefined criteria:
*   **MUST-HAVE Keyword Requirements:** Ensures jobs contain at least one specified language (Python/TypeScript/Java/Go) and one core signal (Backend/API/ML/Data Pipeline).
*   **Dealbreaker Checks:** Filters out jobs based on disqualifying keywords (e.g., requiring a PhD, 8+ years experience, security clearance).
*   **Salary Validation:** Validates against a minimum salary ($90k) and applies a boost for desirable ranges ($120k-180k).
*   **Visa/Sponsorship Check:** Identifies mentions of visa or sponsorship availability.
*   **Bonus Keyword Scoring:** Awards points for desirable keywords (e.g., BigQuery, GCP, LLM).
*   **Location Preference Matching:** Prioritizes jobs in preferred geographical areas.

**Test Results:**
An example job (Backend Engineer, Python, NYC, $130-160k) successfully passed all filters, receiving a +2.10 score boost due to favorable salary, visa mentions, location, and keywords.

**User Profile Updated:**
Alongside these technical implementations, the user profile was updated to include detailed role targeting (Tier 1/2/3 prioritization), a positioning statement, and key differentiators.

**Next Steps:**
The immediate next step involves building the actual scraping logic for each targeted job board.

## Related

[[Career-Datacenter Project]],[[Job Scraping Automation]],[[Indeed]],[[YC Jobs]],[[Wellfound]],[[Scraper Configuration]],[[Job Data Models]],[[Job Filtering Logic]],[[Rahil Singhi]],[[Claude Sonnet 4.5]]
