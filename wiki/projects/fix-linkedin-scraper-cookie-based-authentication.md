---
title: Fix LinkedIn Scraper - Cookie-Based Authentication
author: ai
created_at: 2026-04-13T15:20:28.841Z
last_ai_edit: 2026-04-13T15:20:28.841Z
last_human_edit: null
last_embedded_hash: 69c800f84d86793a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-linkedin-scraper-now-working-with-cookie-aut-2b3cea.md]]"
tags:
  - linkedin
  - scraper
  - authentication
  - cookies
  - job search
  - job parsing
  - career-datacenter
  - automation
  - api
---


# Fix LinkedIn Scraper - Cookie-Based Authentication

This article details a significant fix to the LinkedIn job scraper within the [[Career-Datacenter]] project. The update implements cookie-based authentication to bypass CAPTCHA/2FA, refines job search parameters for better results, and accurately parses job details from LinkedIn's API responses. This enhancement enables reliable overnight batch processing of job applications.

## Key Concepts

Cookie-based authentication,RequestsCookieJar,LinkedIn API,Job parsing,Location filtering,Batch processing

## Details

This commit (`1c8f44c`) for the [[Career-Datacenter]] project addresses critical issues in the LinkedIn job scraper, primarily focusing on authentication and job data parsing. The fixes ensure robust and reliable operation, allowing for automated job application workflows.

### Authentication Improvements
The most significant change involves moving to **[[Cookie-based Authentication]]**.

1.  **Cookie-based Authentication**: Instead of relying on traditional email/password login, the scraper now uses `li_at` and `JSESSIONID` cookies extracted from a browser session. This method effectively bypasses common authentication challenges such as CAPTCHA and 2FA, which previously hindered automated scraping.
2.  **RequestsCookieJar**: A proper `RequestsCookieJar` is now constructed to manage these cookies, ensuring they are correctly sent with API requests.

### Job Search and Filtering Refinements
Several adjustments were made to the job search logic to improve accuracy and relevance.

1.  **Removed `location_name` parameter**: The `location_name` parameter, previously used in API requests, was found to cause zero results. It has been removed.
2.  **Keyword-only search**: Job searches are now performed using keywords exclusively, with location filtering handled client-side after the initial API response.
3.  **Relaxed location matching**: The client-side location matching has been made more flexible to correctly identify jobs in various permutations of a city (e.g., 'NYC', 'Manhattan', 'Brooklyn', etc.) within the retrieved job data.

### Job Detail Parsing Enhancements
Improvements were also made to reliably extract detailed information from job listings.

1.  **Company name extraction**: The logic for extracting the nested company name from LinkedIn's complex API response structure has been fixed.
2.  **Accurate data extraction**: The scraper now correctly extracts the job title, location, and description, addressing previous inconsistencies.
3.  **Handles API response structure**: The parsing mechanism is robust enough to navigate and correctly interpret the intricate JSON structure returned by LinkedIn's job API.

### Testing and Validation
Comprehensive testing was conducted to validate the fixes:

*   Successful authentication and job searching were confirmed.
*   NYC-based jobs were successfully found and parsed.
*   The new client-side location filtering mechanism was verified to be working correctly.

This updated scraper is now ready for integration into the automated [[batch_process_overnight.py` Enhancements: Job Description Parsing and CLI Flags]] workflow.

## Related

[[Career-Datacenter]],[[LinkedIn Scraper]],[[Cookie-based Authentication]],[[Job Parsing]],[[Location Filtering]],[[batch_process_overnight.py` Enhancements: Job Description Parsing and CLI Flags]]
