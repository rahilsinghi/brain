---
title: LinkedIn Scraper with Cookie Authentication Fixes (Career-Datacenter)
author: ai
created_at: 2026-04-12T21:14:42.572Z
last_ai_edit: 2026-04-12T21:14:42.572Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-linkedin-scraper-now-working-with-cookie-aut-2b3cea.md]]"
tags:
  - linkedin
  - scraper
  - authentication
  - cookies
  - job search
  - api parsing
  - career-datacenter
  - bug fix
---

# LinkedIn Scraper with Cookie Authentication Fixes (Career-Datacenter)

This update to the [[Career-Datacenter]] project significantly enhances the LinkedIn job scraper by implementing robust cookie-based authentication, bypassing CAPTCHA and 2FA challenges. It also addresses critical issues in job search parameter handling and job detail parsing, ensuring more accurate and reliable data extraction. The scraper is now fully functional and ready for [[batch_process_overnight.py: Job Description Parsing and CLI Flags Update (b9a5d8d)]] processing.

## Key Concepts

Cookie-based authentication,`li_at` cookie,`JSESSIONID` cookie,CAPTCHA/2FA bypass,RequestsCookieJar,Job search parameters,Client-side location filtering,Job detail parsing,API response structure,Overnight batch processing

## Details

This commit (`1c8f44c`) on `2026-02-14` by Rahil Singhi resolves critical issues within the [[Career-Datacenter]] LinkedIn job scraper.

### Key Fixes Implemented:

1.  **Cookie-based Authentication:**
    *   The scraper now leverages `li_at` and `JSESSIONID` cookies directly obtained from the browser. This method effectively circumvents persistent CAPTCHA and 2FA authentication challenges associated with email/password logins.
    *   A proper `RequestsCookieJar` is constructed for seamless API interaction.

2.  **Job Search Optimizations:**
    *   The problematic `location_name` parameter, which previously resulted in zero search results, has been removed.
    *   Job searches are now conducted using keywords only, with location filtering applied client-side post-retrieval.
    *   Relaxed location matching rules have been implemented to correctly identify jobs in variations like 'NYC', 'Manhattan', and 'Brooklyn'.

3.  **Job Detail Parsing Enhancements:**
    *   Fixed issues with nested company name extraction, ensuring accurate company identification.
    *   Improved parsing logic for correctly extracting job title, location, and description fields.
    *   The system now reliably handles LinkedIn's often complex and dynamic API response structures.

### Testing Results:

*   Successfully authenticated using the new cookie-based method.
*   Discovered and parsed numerous jobs located in NYC.
*   Confirmed that client-side location filtering functions as expected.

The LinkedIn scraper is now fully operational and integrated into the workflow, ready for nightly automated batch processing.

## Related

[[Career-Datacenter]],[[batch_process_overnight.py: Job Description Parsing and CLI Flags Update (b9a5d8d)]],[[Career Datacenter: Job Search Automation Platform]],[[Career Datacenter: Job Scraper Foundation (Phase 2.2 - Part 1)]],[[Career Datacenter: Job Tracker and Scraper Orchestrator]]
