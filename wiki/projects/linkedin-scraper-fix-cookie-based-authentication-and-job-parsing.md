---
title: "LinkedIn Scraper Fix: Cookie-Based Authentication and Job Parsing"
author: ai
created_at: 2026-04-10T02:32:33.841Z
last_ai_edit: 2026-04-10T02:32:33.841Z
last_human_edit: null
last_embedded_hash: "8602e84151715555"
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-linkedin-scraper-now-working-with-cookie-aut-2b3cea.md]]"
tags:
  - linkedin
  - scraper
  - authentication
  - cookies
  - job-search
  - python
  - api
  - career-datacenter
  - batch-processing
  - nyc
  - web-scraping
  - captcha-bypass
---


# LinkedIn Scraper Fix: Cookie-Based Authentication and Job Parsing

A commit to the Career-Datacenter repository resolved LinkedIn scraper issues by implementing cookie-based authentication using li_at and JSESSIONID tokens, fixing job search parameters, and improving job detail parsing. The changes avoid CAPTCHA and 2FA challenges associated with email/password login and enable reliable batch processing of NYC job listings.

## Key Concepts

- **Cookie-Based Authentication**: Uses browser-extracted `li_at` and `JSESSIONID` cookies via a `RequestsCookieJar` to authenticate with LinkedIn's API, bypassing CAPTCHA and 2FA
- **Job Search Parameter Fix**: Removed `location_name` from API query (which caused zero results) in favor of keyword-only search with client-side location filtering
- **Client-Side Location Filtering**: Relaxed location matching logic to accept NYC metro area variants (NYC, Manhattan, Brooklyn, etc.)
- **Nested API Response Parsing**: Fixed extraction of company name and other fields from LinkedIn's complex, nested API response structure
- **Batch Processing Readiness**: Changes validated through successful authentication, search, and parsing tests in preparation for overnight batch runs

## Details

## Overview

This commit (SHA: `1c8f44c`) to the `rahilsinghi/Career-Datacenter` repository, authored by Rahil Singhi on 2026-02-14, resolves multiple issues with the LinkedIn job scraper. The fix involved 131 additions and 27 deletions across 1 file.

## Authentication Changes

The previous email/password authentication approach triggered CAPTCHA and 2FA challenges, making automated scraping unreliable. The new approach:

- Reads `li_at` and `JSESSIONID` cookies directly from the user's browser session
- Constructs a proper `RequestsCookieJar` object for use with the LinkedIn API
- Eliminates interactive authentication challenges during automated runs

## Job Search Fixes

The `location_name` parameter was identified as the root cause of zero search results. The fix:

- Removes `location_name` from the API request entirely
- Searches by keywords only at the API level
- Applies location filtering on the client side after results are returned
- Uses relaxed string matching to capture NYC metro area variants including NYC, Manhattan, and Brooklyn

## Job Detail Parsing

LinkedIn's API returns deeply nested JSON structures. Improvements include:

- Fixed traversal path for extracting company name from nested objects
- Correct extraction of job title, location, and description fields
- Robust handling of varying response structures across different job listings

## Testing and Validation

Prior to merging, the scraper was validated end-to-end:

- Successfully authenticated using cookie method
- Executed keyword searches and received non-empty results
- Parsed NYC-area job listings correctly
- Location filtering confirmed working as expected
- Deemed ready for overnight batch processing

## Co-Authorship

This commit was co-authored with Claude Sonnet 4.5 (`noreply@anthropic.com`).

## Related

- [[Career-Datacenter Repository]]
- [[LinkedIn API Integration]]
- [[Cookie-Based Authentication]]
- [[Job Scraping Pipeline]]
- [[Batch Processing Workflow]]
- [[Client-Side Data Filtering]]
- [[NYC Job Market Data Collection]]
