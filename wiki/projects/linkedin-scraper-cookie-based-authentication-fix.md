---
title: "LinkedIn Scraper: Cookie-Based Authentication Fix"
author: ai
created_at: 2026-04-10T02:31:13.394Z
last_ai_edit: 2026-04-10T02:31:13.394Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-linkedin-scraper-now-working-with-cookie-aut-2b3cea.md]]"
tags:
  - linkedin
  - scraper
  - authentication
  - cookies
  - job-search
  - api
  - parsing
  - career-datacenter
  - python
  - batch-processing
  - nyc
---

# LinkedIn Scraper: Cookie-Based Authentication Fix

A fix was applied to the LinkedIn scraper in the Career-Datacenter repository, replacing email/password authentication with cookie-based authentication using `li_at` and `JSESSIONID` tokens. Additional fixes addressed job search parameters and job detail parsing to correctly retrieve and filter NYC-area job listings. The scraper was successfully tested and deemed ready for overnight batch processing.

## Key Concepts

- **Cookie-Based Authentication:** Uses `li_at` and `JSESSIONID` browser cookies via a `RequestsCookieJar` to authenticate with LinkedIn's API, bypassing CAPTCHA and 2FA challenges
- **Job Search Parameter Fix:** Removed the `location_name` parameter from the API query (which caused zero results) in favor of keyword-only search with client-side location filtering
- **Relaxed Location Matching:** Client-side filtering accepts multiple NYC-area location variants including NYC, Manhattan, and Brooklyn
- **Job Detail Parsing:** Fixed nested company name extraction and improved handling of LinkedIn's complex API response structure to reliably extract title, location, and description fields
- **Batch Processing Readiness:** Scraper was validated end-to-end and prepared for automated overnight job data collection

## Details

## Overview

Commit `1c8f44c` in the `rahilsinghi/Career-Datacenter` repository, authored by Rahil Singhi on 2026-02-14, resolves several critical issues with the LinkedIn job scraper. The change involved 131 additions and 27 deletions across a single file.

## Authentication Change

The previous email/password authentication flow was replaced with cookie-based authentication. The scraper now reads `li_at` and `JSESSIONID` cookies directly from the user's browser session and constructs a `RequestsCookieJar` object for use with the LinkedIn API. This approach avoids triggering CAPTCHA or two-factor authentication (2FA) challenges that are commonly encountered with programmatic credential-based login.

## Job Search Fixes

The `location_name` parameter was identified as the root cause of zero search results being returned from the API. This parameter has been removed, and the scraper now performs searches using keywords only. Location-based filtering is applied client-side after results are retrieved, using a relaxed matching strategy that recognizes multiple representations of the New York City metro area (e.g., NYC, Manhattan, Brooklyn).

## Job Detail Parsing

Parsing logic was updated to correctly navigate LinkedIn's nested API response structure. Key fixes include:
- Proper extraction of company names from nested JSON fields
- Reliable extraction of job title, location, and description fields
- Graceful handling of variations in LinkedIn's API response format

## Testing

The scraper was tested end-to-end, confirming successful authentication, job search execution, NYC job retrieval, and correct client-side location filtering. It was marked ready for overnight batch processing following this validation.

## Collaboration

This commit was co-authored by Claude Sonnet 4.5.

## Related

- [[Career-Datacenter Repository]]
- [[LinkedIn API Integration]]
- [[Cookie-Based Authentication]]
- [[Job Scraping Pipeline]]
- [[NYC Job Market Data Collection]]
- [[Batch Processing Automation]]
