---
title: "Phase 6.1: Apollo Browser Automation with LLM Contact Selection"
author: ai
created_at: 2026-04-10T21:04:19.010Z
last_ai_edit: 2026-04-10T21:04:19.010Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-phase-61-apollo-browser-automation-with-llm-powe-80415e.md]]"
tags:
  - apollo
  - browser automation
  - playwright
  - llm
  - contact discovery
  - python
  - career datacenter
  - automation
  - web scraping
  - claude haiku
  - ai
  - credit efficiency
---

# Phase 6.1: Apollo Browser Automation with LLM Contact Selection

This project phase details the implementation of an intelligent contact discovery system using Playwright for browser automation on Apollo.io. It leverages an LLM (Claude Haiku) to select high-value contacts from scraped employee lists, optimizing credit usage for email reveals and improving discovery accuracy.

## Key Concepts

Playwright,Large Language Model (LLM),Browser Automation,Apollo.io,Contact Discovery,Session Management,Credit Tracking,Web Scraping

## Details

This phase focuses on developing an automated system for intelligent contact discovery within Apollo.io, addressing limitations of manual or keyword-based searches.

### Repository Information
*   **Repo:** `rahilsinghi/Career-Datacenter`
*   **SHA:** `163826a`
*   **Date:** `2026-02-25T19:04:23Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 2
*   **Additions:** +1770
*   **Deletions:** -0

### Core Features
*   **Persistent Chrome Context:** Bypasses Google OAuth blocks, ensuring stable browsing sessions.
*   **Session Management:** Logs in once and reuses cookies for subsequent operations, streamlining the process.
*   **Credit Tracking:** Implements JSON-based tracking for Apollo's 120 free credits, ensuring efficient usage.
*   **LLM-powered Contact Selection:** Utilizes Claude Haiku to intelligently select the best 3-5 contacts from a full list of scraped employees.

### Workflow
1.  **Navigate to Company Page:** Uses top search functionality to find and access a company's profile.
2.  **Click People Tab:** Navigates to the 'People' section of the company page (distinguished from sidebar links).
3.  **Scrape Employees:** Extracts all visible employees, including their names and titles, from the page.
4.  **LLM Selection:** The Large Language Model (Haiku) analyzes the scraped list and identifies high-value contacts such as recruiters, engineering managers, or CTOs.
5.  **Reveal Emails:** Only reveals emails for the selected high-value contacts, conserving Apollo.io credits.
6.  **Extract and Save:** Extracts revealed email addresses and other contact details, then saves them to a CSV file.

### Key Methods Implemented
*   `_navigate_to_company()`: Handles searching for a company and selecting it from a dropdown.
*   `_click_people_tab()`: Specifically clicks the 'People' tab on the company's page.
*   `_scrape_people_list()`: Responsible for extracting employee names and titles from tables.
*   `_select_best_contacts_with_llm()`: Orchestrates the LLM's role in contact prioritization.
*   `_reveal_and_extract_email()`: Manages the 'Access email' click and subsequent data extraction.

### Integration
*   An `--apollo-search` flag was added to `contact_finder.py` for direct integration.
*   The system auto-detects contact types from job titles.
*   Converted raw data into `Contact` objects for structured handling.
*   Results are saved to CSV files for easy data management.

### CLI Usage Examples
```bash
python cli/apollo_browser.py --setup
python cli/apollo_browser.py --search "Company" --titles "Recruiter,Eng Manager" --max 3
python cli/contact_finder.py --apollo-search "Company" --max 2
```

### Advantages over Keyword Filtering
*   **Role Variation Recognition:** LLM intelligently recognizes variations of roles (e.g., "Talent Acquisition" as "Recruiter").
*   **Adaptability:** Adapts to unique company-specific organizational structures and titles.
*   **Contextual Prioritization:** Prioritizes contacts based on the broader job search context provided.
*   **Credit Efficiency:** Significantly more credit-efficient as only high-value contacts have their emails revealed.

### Status
Testing is currently in progress with companies such as Selfbook, Cloudbeds, and Atomize.

### Co-Authored-By
Claude Sonnet 4.5 <noreply@anthropic.com>

## Related

[[Apollo.io]],[[Playwright]],[[Large Language Models (LLM)]],[[Browser Automation]],[[Contact Discovery]],[[Career Datacenter Project]],[[Claude Haiku]]
