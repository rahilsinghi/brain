---
title: Fix LinkedIn Scraper – Cookie-Based Authentication
author: ai
created_at: 2026-04-10T02:33:12.141Z
last_ai_edit: 2026-04-10T02:33:12.141Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-linkedin-scraper-now-working-with-cookie-aut-2b3cea.md]]"
tags:
  - linkedin
  - scraping
  - authentication
  - cookies
  - job-search
  - career-datacenter
  - python
  - api
  - batch-processing
  - parsing
---

# Fix LinkedIn Scraper – Cookie-Based Authentication

This commit resolves authentication and job parsing issues in the LinkedIn scraper within the Career-Datacenter project. The fix replaces email/password login with browser cookie authentication to avoid CAPTCHA and 2FA challenges, and corrects job search and detail parsing logic. The scraper was successfully tested against NYC job listings and is ready for overnight batch processing.

## Key Concepts

- **Cookie-based Authentication:** Uses `li_at` and `JSESSIONID` cookies extracted from a browser session to authenticate with LinkedIn's API, bypassing CAPTCHA and two-factor authentication challenges.
- **RequestsCookieJar:** A Python `requests` library object used to properly package and send browser cookies with API requests.
- **Client-side Location Filtering:** The `location_name` API parameter was removed because it caused zero results; location filtering is now applied after fetching results, matching terms like NYC, Manhattan, and Brooklyn.
- **Nested API Response Parsing:** LinkedIn's API returns complex, deeply nested JSON structures; the fix correctly traverses these to extract job title, company name, location, and description.
- **Batch Processing:** The scraper is designed to run unattended overnight, collecting job listings at scale.

## Details

## Overview

Commit `1c8f44c` in the `rahilsinghi/Career-Datacenter` repository (authored by Rahil Singhi on 2026-02-14, co-authored by Claude Sonnet 4.5) resolves multiple blocking issues with the LinkedIn job scraper. The change modifies a single file with 131 additions and 27 deletions.

## Authentication Changes

The previous email/password authentication flow was replaced with a cookie-based approach:

- Reads `li_at` and `JSESSIONID` cookies directly from the user's browser.
- Constructs a `RequestsCookieJar` object to attach these cookies to all outbound API requests.
- This method mirrors an already-authenticated browser session, effectively avoiding LinkedIn's CAPTCHA triggers and 2FA prompts.

## Job Search Fixes

- **Removed `location_name` parameter:** Passing this parameter to the LinkedIn API was returning zero results. It has been removed entirely.
- **Keyword-only search:** The scraper now searches by keywords alone and handles geographic filtering on the client side.
- **Relaxed location matching:** The client-side filter accepts a range of equivalent location strings (e.g., NYC, New York City, Manhattan, Brooklyn) to avoid missing relevant listings.

## Job Detail Parsing

- Fixed extraction of company name from nested JSON objects in LinkedIn's API response.
- Correctly extracts job title, location, and full description fields.
- Handles edge cases introduced by LinkedIn's complex and inconsistently structured API responses.

## Testing & Outcome

- Authentication confirmed working against the live LinkedIn API.
- Job search returning results; NYC-based listings found and parsed successfully.
- Location filtering verified to be functioning correctly.
- Scraper flagged as ready for overnight unattended batch processing.

## Related

- [[Career-Datacenter Project]]
- [[LinkedIn API Integration]]
- [[Cookie-Based Authentication]]
- [[Job Search Automation]]
- [[Web Scraping Techniques]]
- [[CAPTCHA Bypass Strategies]]
- [[Batch Processing Pipelines]]
