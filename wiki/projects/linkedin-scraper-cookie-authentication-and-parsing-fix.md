---
title: LinkedIn Scraper Cookie Authentication and Parsing Fix
author: ai
created_at: 2026-04-10T21:08:31.267Z
last_ai_edit: 2026-04-10T21:08:31.267Z
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
  - api
  - python
  - bug fix
  - datacenter
  - career
---

# LinkedIn Scraper Cookie Authentication and Parsing Fix

This update addresses critical issues in the LinkedIn job scraper within the Career-Datacenter project, primarily by implementing robust cookie-based authentication. It also refines job search logic and improves the parsing of job details, enabling more reliable and efficient data collection.

## Key Concepts

- Cookie-based authentication,- `RequestsCookieJar`,- CAPTCHA and 2FA bypass,- API response parsing,- Client-side filtering,- Version control (SHA)

## Details

This commit (`1c8f44c`) on 2026-02-14 by Rahil Singhi (with co-authorship by Claude Sonnet 4.5) to the `rahilsinghi/Career-Datacenter` repository introduces significant fixes to the LinkedIn job scraper. The changes involved 1 file, with 131 additions and 27 deletions.

### Key Improvements:

1.  **Cookie-based Authentication:**
    *   The scraper now utilizes `li_at` and `JSESSIONID` cookies, sourced from a browser session.
    *   This method effectively circumvents CAPTCHA and two-factor authentication (2FA) challenges often encountered with traditional email/password logins.
    *   A proper `RequestsCookieJar` is created to manage these cookies for API interactions.

2.  **Job Search Fixes:**
    *   The `location_name` parameter, which was causing zero results, has been removed from search queries.
    *   Job searches are now conducted solely by keywords, with location filtering applied client-side post-retrieval.
    *   Location matching has been relaxed to accommodate various regional spellings and aliases (e.g., "NYC," "Manhattan," "Brooklyn").

3.  **Job Detail Parsing:**
    *   Issues with nested company name extraction have been resolved.
    *   The scraper accurately extracts job titles, locations, and descriptions.
    *   Improved handling of LinkedIn's complex API response structures ensures more reliable data.

### Testing Results:

*   Successfully authenticated using the new cookie-based method.
*   Discovered and parsed job listings specifically for NYC.
*   Confirmed that client-side location filtering functions as intended.

These updates make the LinkedIn scraper fully operational and ready for automated overnight batch processing.

## Related

[[Career-Datacenter]],[[LinkedIn Scraper]],[[Rahil Singhi]]
