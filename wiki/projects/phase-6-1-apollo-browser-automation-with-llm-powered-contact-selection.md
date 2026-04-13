---
title: "Phase 6.1: Apollo Browser Automation with LLM-Powered Contact Selection"
author: ai
created_at: 2026-04-11T00:04:53.464Z
last_ai_edit: 2026-04-11T00:04:53.464Z
last_human_edit: null
last_embedded_hash: bedf2d3119863fb3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-phase-61-apollo-browser-automation-with-llm-powe-80415e.md]]"
tags:
  - apollo
  - browser automation
  - llm
  - contact selection
  - web scraping
  - career datacenter
  - playwright
  - recruitment
  - sales
  - lead generation
  - python
  - haiku
  - cli
---


# Phase 6.1: Apollo Browser Automation with LLM-Powered Contact Selection

This project phase introduces an intelligent contact discovery system within Career-Datacenter, leveraging Playwright for browser automation and an LLM (Haiku) for smart contact selection. It manages persistent Chrome contexts and session cookies to bypass login blocks on Apollo, efficiently tracking credits by only revealing emails for high-value contacts. The system automates company page navigation, employee scraping, and targeted email extraction, saving the results to a CSV.

## Key Concepts

[[Playwright]],[[Large Language Model (LLM)]],Apollo (Contact Database),Browser Automation,Session Management,Credit Tracking,Contact Selection,Web Scraping,Career Datacenter Workflow

## Details

This phase implements a robust system for automating contact discovery on Apollo using Playwright and an LLM for intelligent selection. It's integrated into the [[Career-Datacenter]] project to streamline lead generation and outreach.

### Core Features
*   **Persistent Chrome Context**: Bypasses common Google OAuth and login blocks by maintaining a persistent browser session.
*   **Session Management**: Logs in once and reuses session cookies for subsequent operations.
*   **Credit Tracking**: Implements a JSON-based credit tracking system to monitor usage against a 120-free-credit limit, ensuring efficient resource consumption.
*   **LLM-Powered Contact Selection**: Utilizes an LLM (specifically Haiku) to intelligently select the most relevant 3-5 contacts from a full list of employees based on predefined criteria.

### Workflow
1.  **Navigate to Company Page**: The system searches for and navigates to a specified company's profile page on Apollo, handling search dropdowns.
2.  **Click 'People' Tab**: Locates and clicks the 'People' tab (not sidebar) to access the employee directory.
3.  **Scrape Employee List**: Extracts all available employee names and titles from the displayed table.
4.  **LLM Contact Selection**: The LLM analyzes the scraped list and identifies the 'best' contacts (e.g., recruiters, engineering managers, CTOs) based on job search context.
5.  **Reveal and Extract Emails**: Only for the LLM-selected contacts, the system clicks to reveal their emails, significantly saving credits.
6.  **Save to CSV**: The extracted contact information is then saved into a CSV file.

### Key Methods
*   `_navigate_to_company()`: Handles searching for a company and selecting it from results.
*   `_click_people_tab()`: Navigates to the company's 'People' section.
*   `_scrape_people_list()`: Extracts employee data from the page.
*   `_select_best_contacts_with_llm()`: Orchestrates LLM interaction for contact filtering.
*   `_reveal_and_extract_email()`: Manages the process of accessing and retrieving email addresses.

### Integration
*   The `contact_finder.py` script now supports an `--apollo-search` flag.
*   Automatically detects contact types from titles.
*   Converts extracted data into `Contact` objects for standardized processing and CSV saving.

### CLI Usage Examples
```bash
python cli/apollo_browser.py --setup
python cli/apollo_browser.py --search "Company" --titles "Recruiter,Eng Manager" --max 3
python cli/contact_finder.py --apollo-search "Company" --max 2
```

### Advantages over Keyword Filtering
*   **Role Variation Recognition**: The LLM can understand and recognize variations of roles (e.g., "Talent Acquisition" = "Recruiter"), which keyword filtering might miss.
*   **Adapts to Org Structures**: Flexibility to adapt to different company organizational structures.
*   **Contextual Prioritization**: Prioritizes contacts based on the specific job search context or desired outreach.
*   **Credit Efficiency**: By revealing emails only for pre-selected, high-value contacts, it significantly reduces credit usage.

### Status
Currently undergoing testing with companies like [[Selfbook]], [[Cloudbeds]], and [[Atomize]].

## Related

[[Career-Datacenter]],[[Apollo Session Storage and Chrome User Data Exclusion]],[[LLM Model Constants and Company Info Helper (Commit a9513cd)]],[[Selfbook]],[[Cloudbeds]],[[Atomize]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]]
