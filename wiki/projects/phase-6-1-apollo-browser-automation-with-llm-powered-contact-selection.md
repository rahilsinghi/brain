---
title: "Phase 6.1: Apollo Browser Automation with LLM-Powered Contact Selection"
author: ai
created_at: 2026-04-10T02:01:27.162Z
last_ai_edit: 2026-04-10T02:01:27.162Z
last_human_edit: null
last_embedded_hash: 70fac828ddbc1982
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-phase-61-apollo-browser-automation-with-llm-powe-80415e.md]]"
tags:
  - apollo
  - playwright
  - browser-automation
  - llm
  - claude-haiku
  - contact-discovery
  - career-datacenter
  - web-scraping
  - credit-management
  - job-search
  - python
  - cli
  - csv
---


# Phase 6.1: Apollo Browser Automation with LLM-Powered Contact Selection

Phase 6.1 of the Career-Datacenter project implements intelligent contact discovery on Apollo using Playwright browser automation combined with an LLM (Claude Haiku) to intelligently select the most relevant contacts before revealing emails. This approach preserves Apollo free-tier credits by only revealing emails for high-value contacts identified by the LLM. The workflow integrates with the existing contact_finder.py CLI and outputs results to CSV.

## Key Concepts

- **Playwright Browser Automation**: Uses persistent Chrome context to navigate Apollo, bypassing Google OAuth blocks and reusing session cookies
- **LLM-Powered Contact Selection**: Claude Haiku reviews the full employee list and selects the best 3-5 contacts based on job search relevance (recruiters, engineering managers, CTOs)
- **Credit-Efficient Email Reveals**: Emails are only revealed for LLM-selected contacts, conserving Apollo free-tier credits (120 total tracked via JSON)
- **Session Persistence**: Login is performed once and cookies are reused across sessions to avoid repeated authentication
- **Role Normalization**: LLM recognizes role variations (e.g., Talent Acquisition = Recruiter) and adapts to company-specific org structures
- **Apollo People Tab Scraping**: Navigates to company pages, clicks the People tab, and extracts all employees (name + title) from the table before any email reveals

## Details

## Overview

Phase 6.1 introduces Apollo browser automation to the Career-Datacenter project, enabling intelligent contact discovery via Playwright and Claude Haiku. The implementation is contained in two files with 1,770 lines added (commit SHA `163826a`, dated 2026-02-25).

## Workflow

1. Navigate to the target company page using Apollo's top search bar
2. Click the company's **People** tab (distinct from the sidebar)
3. Scrape all visible employees, capturing name and title
4. Send the full employee list to Claude Haiku for intelligent selection
5. LLM returns the best 3-5 contacts based on recruiter/hiring manager relevance
6. Reveal emails **only** for selected contacts via the "Access email" button
7. Extract email addresses and save all contact data to CSV

## Key Methods

| Method | Description |
|---|---|
| `_navigate_to_company()` | Searches Apollo and selects the correct company from the dropdown |
| `_click_people_tab()` | Clicks the company-level People tab, not the sidebar tab |
| `_scrape_people_list()` | Extracts all employees from the People table |
| `_select_best_contacts_with_llm()` | Sends employee list to Claude Haiku for smart prioritization |
| `_reveal_and_extract_email()` | Clicks "Access email" and extracts the revealed address |

## CLI Usage

```
# Initial setup (configure persistent Chrome context)
python cli/apollo_browser.py --setup

# Search for contacts at a specific company
python cli/apollo_browser.py --search "Company" --titles "Recruiter,Eng Manager" --max 3

# Use via contact_finder integration
python cli/contact_finder.py --apollo-search "Company" --max 2
```

## Integration

- `contact_finder.py` was extended with an `--apollo-search` flag
- Contact type is auto-detected from job title
- Results are converted to `Contact` objects and saved to CSV

## Advantages Over Keyword Filtering

- Handles role name variations (e.g., "Talent Acquisition" recognized as recruiter)
- Adapts to non-standard org structures at different companies
- Prioritizes contacts based on job search context rather than exact keyword match
- More credit-efficient by only revealing emails for high-confidence targets

## Credit Tracking

- 120 free Apollo credits tracked via a JSON-based tracking file
- Credits are only consumed for LLM-selected contacts, maximizing value per credit

## Status

Testing in progress across companies: Selfbook, Cloudbeds, Atomize.

## Authorship

Authored by Rahil Singhi, co-authored with Claude Sonnet 4.5.

## Related

- [[Career-Datacenter Project]]
- [[Apollo Contact Discovery]]
- [[Playwright Browser Automation]]
- [[LLM-Powered Workflows]]
- [[Claude Haiku Integration]]
- [[Contact Finder CLI]]
- [[Session Management and Cookie Persistence]]
- [[Job Search Automation]]
- [[Phase 6: Contact Discovery Pipeline]]
