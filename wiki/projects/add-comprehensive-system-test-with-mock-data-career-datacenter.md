---
title: Add Comprehensive System Test with Mock Data (Career-Datacenter)
author: ai
created_at: 2026-04-12T21:47:30.758Z
last_ai_edit: 2026-04-12T21:47:30.758Z
last_human_edit: null
last_embedded_hash: 6e5678fd3e9b06f1
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-comprehensive-system-test-with-mock-data-d1a1cd.md]]"
tags:
  - career-datacenter
  - testing
  - end-to-end
  - mock-data
  - job-pipeline
  - filtering
  - scoring
  - deduplication
  - python
  - fastapi
  - llm
---


# Add Comprehensive System Test with Mock Data (Career-Datacenter)

A comprehensive end-to-end system test was implemented for the [[Career-Datacenter]] project using mock data. This test validates the entire job application pipeline, including filtering, scoring, and tracking, without relying on live web scraping. The results demonstrate correct functionality for both good and bad job matches.

## Key Concepts

End-to-End Testing,Mock Data,Job Filtering,Job Scoring,Job Deduplication,Pipeline Validation

## Details

A new, comprehensive end-to-end test was added to the `rahilsinghi/Career-Datacenter` repository (SHA: `5fa09be`, Date: `2026-02-14`). This test is designed to validate the full job application pipeline's functionality using predefined mock data, thereby eliminating the dependency on [[Web Scraping]] for testing purposes.

**Test Components and Validation:**

*   **Mock Jobs**: Eight mock job entries were used, consisting of a mix of ideal and unsuitable matches.
*   **Filtering**: The test successfully filtered these jobs, with 3 jobs passing and 5 correctly rejected, demonstrating accurate filtering logic.
*   **Scoring**: All passing jobs received a score of 8.0 or higher, indicating a high fit according to the scoring algorithm.
*   **Tracking**: The system correctly saved the job data to a CSV file, incorporating [[Job Deduplication]] to prevent redundant entries.

This test confirms the core system's functionality operates as expected.

**Example Test Results:**

*   **Passed Jobs:**
    *   Backend Engineer, NYC, ~170k, [[Python]], [[BigQuery]] → 8.8/10 ✅
    *   ML Engineer, Remote, ~150k, [[LLM]], [[FastAPI]] → 8.2/10 ✅
    *   Full Stack, NYC, hospitality tech, [[TypeScript]] → 9.1/10 ✅
*   **Correctly Rejected Jobs:**
    *   PhD required, 10+ years experience, C++ only, salary <k (e.g., indicating low salary or unsuitable tech stack/requirements)

## Related

[[Career-Datacenter]],[[Web Scraping]],[[Job Deduplication]],[[Python]],[[BigQuery]],[[LLM]],[[FastAPI]],[[TypeScript]],[[Add Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]],[[Add Job Scraper Foundation (Career-Datacenter Phase 2.2 - Part 1)]],[[Add Comprehensive System Test with Mock Data (Career-Datacenter)]],[[Application Generator CLI Implementation Plan (Career-Datacenter)]]
