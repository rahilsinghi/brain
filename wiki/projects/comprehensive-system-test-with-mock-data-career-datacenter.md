---
title: Comprehensive System Test with Mock Data (Career-Datacenter)
author: ai
created_at: 2026-04-12T17:46:34.681Z
last_ai_edit: 2026-04-12T17:46:34.681Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-comprehensive-system-test-with-mock-data-d1a1cd.md]]"
tags:
  - testing
  - system test
  - mock data
  - career-datacenter
  - job search automation
  - pipeline
  - scoring
  - filtering
  - deduplication
---

# Comprehensive System Test with Mock Data (Career-Datacenter)

This article details the implementation of a comprehensive end-to-end system test for the [[Career-Datacenter]] project. It demonstrates the full job application pipeline, including filtering, scoring, and tracking with deduplication, using 8 mock job entries to validate functionality without live web scraping.

## Key Concepts

End-to-end testing,Mock data,Job filtering,Job scoring,Deduplication,System validation

## Details

A comprehensive end-to-end system test was implemented for the [[Career-Datacenter]] project using mock data. This test validates the entire job application pipeline, from initial data processing through filtering, scoring, and persistent tracking, ensuring core functionality without relying on live web scraping.

The test suite utilized 8 mock job entries, carefully crafted to include a mix of both good and bad matches for the simulated applicant profile. Upon execution, the system correctly filtered 3 jobs as passing and rejected 5, demonstrating accurate filtering logic. All passing jobs received a high compatibility score of 8.0 or above, indicating a strong fit. The tracking mechanism also successfully saved the processed jobs to a CSV file, incorporating deduplication to prevent redundant entries.

### Test Results:

**Successfully Processed & Highly Scored:**
*   Backend Engineer, NYC, -170k, Python, BigQuery → 8.8/10 ✅
*   ML Engineer, Remote, -150k, LLM, FastAPI → 8.2/10 ✅
*   Full Stack, NYC, hospitality tech, TypeScript → 9.1/10 ✅

**Correctly Rejected:**
*   PhD required, 10+ years, C++ only, salary <k

This test confirms the robust functionality of the [[Career-Datacenter]] pipeline's core components.

**Repository Information:**
*   **Repo:** `rahilsinghi/Career-Datacenter`
*   **SHA:** `5fa09be`
*   **Date:** 2026-02-14T16:54:18Z
*   **Author:** Rahil Singhi
*   **Files changed:** 2
*   **Additions:** +373
*   **Deletions:** -0

## Related

[[Career-Datacenter]],[[Comprehensive System Test with Mock Data (Career-Datacenter)]],[[Job Deduplicator]],[[Career Datacenter: Job Tracker and Scraper Orchestrator]],[[Comprehensive Job Scraper Documentation (Career-Datacenter)]]
