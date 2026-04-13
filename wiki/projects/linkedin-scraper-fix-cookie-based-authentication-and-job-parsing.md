---
title: "LinkedIn Scraper Fix: Cookie-Based Authentication and Job Parsing"
author: ai
created_at: 2026-04-13T18:10:50.191Z
last_ai_edit: 2026-04-13T18:10:50.191Z
last_human_edit: null
last_embedded_hash: 96eb6410a6072ed1
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-fix-linkedin-scraper-now-working-with-cookie-aut-2b3cea.md]]"
tags:
  - linkedin
  - scraper
  - authentication
  - cookies
  - job search
  - parsing
  - api
  - career-datacenter
  - python
  - automation
---


# LinkedIn Scraper Fix: Cookie-Based Authentication and Job Parsing

This update addresses critical issues in the LinkedIn scraper within the Career-Datacenter project, enabling successful authentication via browser cookies and improving job search and detail parsing. By leveraging `li_at` and `JSESSIONID` cookies, the scraper now bypasses CAPTCHA/2FA challenges, facilitating reliable overnight batch processing for job applications.

## Key Concepts

Cookie-based Authentication,RequestsCookieJar,LinkedIn API,Job Parsing,Client-side Location Filtering,API Response Structure,Automated Job Application

## Details

This commit (`1c8f44c`) details significant fixes and enhancements to the [[LinkedIn Scraper]] component of the [[Career-Datacenter]] project. The primary goal was to improve the reliability and robustness of scraping LinkedIn for job information, particularly in authentication and data extraction.

### Key Improvements:

1.  **Cookie-based Authentication**:
    *   The scraper now utilizes `li_at` and `JSESSIONID` cookies obtained directly from a browser session.
    *   This approach circumvents common challenges like CAPTCHA and two-factor authentication (2FA) that arise with traditional email/password login methods.
    *   A `RequestsCookieJar` is properly constructed to manage these cookies for subsequent API requests.

2.  **Job Search Functionality**:
    *   The `location_name` parameter, which was previously causing zero results, has been removed from the search query.
    *   Job searches are now conducted using keywords, with location filtering applied client-side after initial results are fetched.
    *   Location matching has been made more flexible, accommodating various formats such as "NYC", "Manhattan", and "Brooklyn" to ensure broader coverage.

3.  **Job Detail Parsing**:
    *   Resolved an issue with nested company name extraction, ensuring accurate identification of the hiring organization.
    *   Improved extraction logic for job title, location, and description fields.
    *   The parser is now more adept at handling the complex and varied structure of LinkedIn's API responses.

### Testing and Validation:
Extensive testing was conducted to confirm the efficacy of these changes:
*   Successful authentication against the LinkedIn platform.
*   Ability to search for and retrieve jobs specifically located in NYC.
*   Verification of the client-side location filtering mechanism.

These updates ensure the [[LinkedIn Scraper]] is fully functional and prepared for integration into the automated [[batch_process_overnight.py]] system for job applications.

## Related

[[Career-Datacenter]],[[batch_process_overnight.py]],[[LinkedIn Scraper]],[[Cookie-based Authentication]],[[Job Parsing]],[[API]],[[Automated Job Application]],[[Claude Sonnet 4.5]]
