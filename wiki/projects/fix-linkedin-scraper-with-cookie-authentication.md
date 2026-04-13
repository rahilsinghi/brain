---
title: Fix LinkedIn Scraper with Cookie Authentication
author: ai
created_at: 2026-04-12T17:14:03.062Z
last_ai_edit: 2026-04-12T17:14:03.062Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-linkedin-scraper-now-working-with-cookie-aut-2b3cea.md]]"
tags:
  - linkedin
  - scraper
  - authentication
  - cookies
  - job-parsing
  - career-datacenter
  - automation
  - web-scraping
  - bugfix
---

# Fix LinkedIn Scraper with Cookie Authentication

This update addresses critical issues in the `Career-Datacenter` LinkedIn scraper by implementing cookie-based authentication, thereby bypassing common CAPTCHA and 2FA challenges. It also refines job search logic, improves job detail parsing, and includes successful testing for NYC-based job searches. The scraper is now working correctly for overnight batch processing.

## Key Concepts

- LinkedIn Scraper,- Cookie-based Authentication,- `li_at` cookie,- `JSESSIONID` cookie,- `RequestsCookieJar`,- Job Parsing,- Client-side Filtering,- Overnight Batch Processing,- CAPTCHA/2FA Bypass

## Details

This commit (`1c8f44c`) for the `rahilsinghi/Career-Datacenter` repository, authored by Rahil Singhi on 2026-02-14, resolved significant issues with the LinkedIn job scraper. The fix involved modifying 1 file, resulting in 131 additions and 27 deletions.

Key improvements include:

1.  **Cookie-based Authentication**: The scraper now leverages `li_at` and `JSESSIONID` cookies, typically extracted from a browser session. This method effectively bypasses LinkedIn's CAPTCHA and 2FA challenges that arise with traditional email/password login. A `RequestsCookieJar` is created to manage these cookies for API requests.

2.  **Job Search Fixes**: The `location_name` parameter, which was causing zero results, has been removed from the search query. Jobs are now searched primarily by keywords, with location filtering (e.g., NYC, Manhattan, Brooklyn) handled client-side for greater flexibility and accuracy.

3.  **Job Detail Parsing**: Enhanced logic ensures proper extraction of nested company names, job titles, locations, and descriptions, accommodating LinkedIn's complex API response structure.

4.  **Testing**: Comprehensive testing confirmed that the scraper can successfully authenticate, search for, and parse jobs, with location filtering functioning as intended. The system is now ready for scheduled overnight batch processing.

Co-Authored-By: Claude Sonnet 4.5

## Related

[[Career-Datacenter]],[[LinkedIn Scraper]],[[Cookie Authentication]],[[Job Parsing]],[[Career Datacenter: Job Search Automation Platform]],[[Add Job Scraper Foundation (Phase 2.2 - Part 1)]],[[batch_process_overnight.py: Job Description Parsing and CLI Flags Update (b9a5d8d)]],[[Career Datacenter: Job Tracker and Scraper Orchestrator]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]],[[Application Tracking System (ATS) Implementation]]
