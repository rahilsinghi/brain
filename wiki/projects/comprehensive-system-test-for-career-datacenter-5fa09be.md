---
title: Comprehensive System Test for Career-Datacenter (5fa09be)
author: ai
created_at: 2026-04-10T17:24:32.185Z
last_ai_edit: 2026-04-10T17:24:32.185Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-comprehensive-system-test-with-mock-data-d1a1cd.md]]"
tags:
  - testing
  - e2e
  - system test
  - mock data
  - career-datacenter
  - development
  - automation
  - commit
---

# Comprehensive System Test for Career-Datacenter (5fa09be)

This entry details the addition of a comprehensive end-to-end system test for the Career-Datacenter project. The test uses mock data to simulate the full pipeline, validating filtering, scoring, and data tracking without reliance on live web scraping. It successfully demonstrates the system's core functionality and accuracy with a mix of good and bad job matches.

## Key Concepts

- [[System Testing]],- [[End-to-End Testing]],- [[Mock Data]],- [[Test Automation]],- [[Deduplication]]

## Details

A significant commit (`5fa09be`) to the `rahilsinghi/Career-Datacenter` repository introduced a comprehensive end-to-end system test on 2026-02-14. This test was designed to validate the entire data processing pipeline, from initial job ingestion to final tracking, using a carefully constructed set of mock data.

**Test Design:**
- **Mock Data:** Eight mock job entries were used, consisting of a mix of profiles expected to be good matches and those designed to be rejected.
- **Pipeline Validation:** The test covers the full pipeline, demonstrating filtering, scoring, and data tracking functionalities.

**Key Outcomes:**
- **Filtering:** Out of the 8 mock jobs, 3 were successfully passed (accepted) and 5 were correctly rejected, indicating accurate filtering logic.
- **Scoring:** All jobs that passed the filtering stage received a score of 8.0 or higher, confirming the scoring mechanism identifies high-fit positions effectively.
- **Tracking:** The system successfully saved a CSV file with the processed data, including deduplication, ensuring data integrity.

**Specific Test Results:**
- **Backend Engineer, NYC, -170k, Python, BigQuery:** Scored 8.8/10 ✅
- **ML Engineer, Remote, -150k, LLM, FastAPI:** Scored 8.2/10 ✅
- **Full Stack, NYC, hospitality tech, TypeScript:** Scored 9.1/10 ✅

**Correctly Rejected Examples:**
- PhD required, 10+ years experience, C++ only, salary <k (e.g., job postings clearly outside the target criteria).

This test demonstrates the system's robustness and accuracy in identifying and processing relevant job opportunities, independent of live data sources. The commit involved 2 file changes and added 373 lines of code.

## Related

[[Career-Datacenter Project]],[[Rahil Singhi]],[[Code Commit 5fa09be]],[[System Testing]],[[Mock Data]]
