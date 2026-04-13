---
title: Apollo Browser Automation with LLM-powered Contact Selection
author: ai
created_at: 2026-04-13T01:04:01.160Z
last_ai_edit: 2026-04-13T01:04:01.160Z
last_human_edit: null
last_embedded_hash: 0772aef86347a1dc
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-phase-61-apollo-browser-automation-with-llm-powe-80415e.md]]"
tags:
  - automation
  - llm
  - web scraping
  - job search
  - career-datacenter
  - apollo
  - playwright
  - contact management
---


# Apollo Browser Automation with LLM-powered Contact Selection

This article details the implementation of Apollo browser automation within the Career-Datacenter project, utilizing Playwright and an LLM for intelligent contact discovery. It describes a workflow that navigates company pages, scrapes employee lists, and employs an LLM to identify high-value contacts (like recruiters or engineering managers) for targeted email revelation. This sophisticated approach optimizes credit usage and effectively adapts to diverse role titles, enhancing job outreach efficiency.

## Key Concepts

Apollo browser automation,LLM-powered contact selection,Playwright,Persistent Chrome context,Session management,Credit tracking,Employee scraping,Email revelation,Career-Datacenter,Haiku (LLM),CLI flags

## Details

This implementation, part of **Phase 6.1** of the `rahilsinghi/Career-Datacenter` project (SHA: `163826a`, 2026-02-25), introduces intelligent contact discovery using a combination of Playwright for browser automation and an LLM for smart selection.

### Core Features
-   **Persistent Chrome Context**: Bypasses common obstacles like Google OAuth blocks, maintaining a consistent browser session.
-   **Session Management**: Allows for single login and subsequent reuse of cookies, streamlining repeated operations.
-   **Credit Tracking**: Manages the usage of Apollo's limited free credits (120), with tracking handled via JSON.
-   **LLM-powered Contact Selection**: Employs the Haiku LLM to intelligently select the most relevant 3-5 contacts from a scraped list.

### Workflow
1.  **Navigate to Company Page**: Uses a top search function to find and select the target company, including handling dropdown menus.
2.  **Click Company People Tab**: Navigates to the 'People' section of the company page, ensuring it's not a sidebar element.
3.  **Scrape All Employees**: Extracts a comprehensive list of employees, including their names and titles, from the displayed table.
4.  **LLM Selects Best Contacts**: The Haiku LLM analyzes the scraped list to identify and prioritize high-value contacts such as recruiters, engineering managers, and CTOs.
5.  **Reveal Emails for Selected Contacts**: Only for the LLM-selected contacts, their email addresses are revealed, significantly saving credits.
6.  **Extract and Save**: The gathered contact information is then extracted and saved into a CSV file.

### Key Methods
-   `_navigate_to_company()`: Handles searching for and selecting a company, including interaction with search dropdowns.
-   `_click_people_tab()`: Locates and clicks the 'People' tab on a company's profile.
-   `_scrape_people_list()`: Responsible for extracting employee data from the displayed lists.
-   `_select_best_contacts_with_llm()`: Orchestrates the LLM-driven intelligent selection of contacts.
-   `_reveal_and_extract_email()`: Manages the 'Access email' action and subsequent extraction of the email address.

### Integration
-   The `contact_finder.py` script has been enhanced with a `--apollo-search` flag.
-   The system automatically detects contact types based on their job titles.
-   Scraped data is converted into structured `Contact` objects and saved to a CSV file.

### CLI Usage
```bash
  python cli/apollo_browser.py --setup
  python cli/apollo_browser.py --search "Company" --titles "Recruiter,Eng Manager" --max 3
  python cli/contact_finder.py --apollo-search "Company" --max 2
```

### Advantages over Keyword Filtering
-   **LLM Role Recognition**: The LLM can interpret and recognize variations in job roles (e.g., 'Talent Acquisition' as 'Recruiter').
-   **Adaptability**: Adapts to unique company organizational structures and naming conventions.
-   **Contextual Prioritization**: Prioritizes contacts based on the specific job search context.
-   **Credit Efficiency**: Reduces credit consumption by only revealing emails for genuinely high-value contacts.

### Status
Testing is currently in progress with companies like Selfbook, Cloudbeds, and Atomize.

## Related

[[Career-Datacenter]],[[Apollo Session Storage and Chrome User Data Exclusion]],[[Agentic Job Application System: Multi-Agent Workflow Architecture]],[[Application Tracking System (ATS) in Career-Datacenter]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]],[[LLM]]
