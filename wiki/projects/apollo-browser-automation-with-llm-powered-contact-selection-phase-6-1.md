---
title: Apollo Browser Automation with LLM-Powered Contact Selection (Phase 6.1)
author: ai
created_at: 2026-04-13T18:06:29.580Z
last_ai_edit: 2026-04-13T18:06:29.580Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-phase-61-apollo-browser-automation-with-llm-powe-80415e.md]]"
tags:
  - browser automation
  - llm
  - contact selection
  - apollo
  - career-datacenter
  - playwright
  - session management
  - credit tracking
  - python
  - job search
  - automation
---

# Apollo Browser Automation with LLM-Powered Contact Selection (Phase 6.1)

This article details the implementation of intelligent contact discovery within the Career-Datacenter project, leveraging Playwright for browser automation and an LLM (Haiku) for sophisticated contact selection. The system automates the process of navigating company pages, scraping employee data, and intelligently identifying high-value contacts while optimizing credit usage for email revelation.

## Key Concepts

Browser Automation,LLM-powered Contact Selection,Session Management,Credit Tracking,Resume Generation Context,Career-Datacenter Workflow,Playwright,Haiku (LLM)

## Details

This implementation, part of Phase 6.1 of the [[Career-Datacenter]] project, focuses on automating contact discovery on the Apollo platform using [[Playwright]] for browser interaction and a Large Language Model (LLM) for intelligent decision-making.

### Core Features
-   **Persistent Chrome Context:** Bypasses Google OAuth blocks, ensuring smooth operation.
-   **Session Management:** Allows for single login and reuse of cookies across sessions.
-   **Credit Tracking:** Integrates a JSON-based system to track and manage the usage of 120 free credits, primarily for email revelation.
-   **LLM-powered Contact Selection:** Utilizes [[Haiku]] to select the 3-5 most relevant contacts (e.g., recruiters, engineering managers, CTOs) from a comprehensive list.

### Workflow
1.  **Navigate to Company Page:** The system navigates to a specified company page via a top search function.
2.  **Click People Tab:** Automatically clicks the 'People' tab on the company page.
3.  **Scrape All Employees:** Extracts all visible employee names and titles from the page.
4.  **LLM Selection:** The integrated LLM intelligently filters and selects the most suitable contacts based on predefined criteria and job search context.
5.  **Reveal and Extract Emails:** Emails are revealed only for the LLM-selected contacts, conserving credits.
6.  **Save to CSV:** Extracted contact information is saved to a CSV file.

### Key Methods
-   `_navigate_to_company()`: Handles searching for and selecting a company, including dropdown interactions.
-   `_click_people_tab()`: Clicks the designated 'People' tab on the company's profile.
-   `_scrape_people_list()`: Extracts all employee data (name + title) from the displayed table.
-   `_select_best_contacts_with_llm()`: Performs smart contact selection using the [[Haiku]] LLM.
-   `_reveal_and_extract_email()`: Manages clicking 'Access email' and subsequently extracting the email address.

### Integration
-   **`contact_finder.py`:** Enhanced with an `--apollo-search` flag to initiate this workflow.
-   **Auto-detection:** Automatically detects contact types from job titles.
-   **Object Conversion:** Converts scraped data into `Contact` objects for structured storage and saving to CSV.

### CLI Usage Examples
```bash
python cli/apollo_browser.py --setup
python cli/apollo_browser.py --search "Company" --titles "Recruiter,Eng Manager" --max 3
python cli/contact_finder.py --apollo-search "Company" --max 2
```

### Advantages over Keyword Filtering
-   **Role Variation Recognition:** The LLM can recognize variations in job titles (e.g., "Talent Acquisition" as "Recruiter").
-   **Adaptability:** Adapts to unique company organizational structures.
-   **Contextual Prioritization:** Prioritizes contacts based on the specific job search context.
-   **Credit Efficiency:** Only high-value contacts have their emails revealed, significantly saving on platform credits.

### Status
Testing is currently in progress with companies such as [[Selfbook]], [[Cloudbeds]], and [[Atomize]].

Co-Authored-By: [[Claude Sonnet 4.5]]

## Related

[[Career-Datacenter]],[[Apollo Session Storage and Chrome User Data Exclusion in Career-Datacenter]],[[LLM]],[[Playwright]],[[Haiku]],[[Selfbook]],[[Cloudbeds]],[[Atomize]],[[Claude Sonnet 4.5]]
