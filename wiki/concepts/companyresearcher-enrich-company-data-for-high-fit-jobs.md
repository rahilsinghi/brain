---
title: "CompanyResearcher: Enrich Company Data for High-Fit Jobs"
author: ai
created_at: 2026-04-12T17:56:11.590Z
last_ai_edit: 2026-04-12T17:56:11.590Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-companyresearcher-enrich-company-data-for-hi-b3ef34.md]]"
tags:
  - web scraping
  - company data
  - job search
  - automation
  - caching
  - cli
  - python
  - career-datacenter
---

# CompanyResearcher: Enrich Company Data for High-Fit Jobs

The CompanyResearcher is a module within the [[Career-Datacenter]] project designed to enrich company data for scraped job listings. It extracts key information like employee count, funding stage, founding year, and Glassdoor ratings from public web results. This data is cached for 30 days to optimize performance and prevent redundant scraping.

## Key Concepts

Company data enrichment,Web scraping,Data caching,Command Line Interface (CLI) modes,Job search automation

## Details

The `CompanyResearcher` module, developed as part of the [[Career-Datacenter]] project, aims to enhance the job search process by providing detailed insights into companies associated with scraped job opportunities. It achieves this by performing targeted web scraping to gather specific data points for each company:

*   **Employee Count**: Size of the company's workforce.
*   **Funding Stage**: Current stage of investment (e.g., Seed, Series A, Public).
*   **Founding Year**: The year the company was established.
*   **Glassdoor Rating**: Employee reviews and satisfaction scores from Glassdoor.

This extracted information is crucial for identifying 'high-fit' jobs, allowing users to prioritize applications to companies that align with their preferences and career goals.

To manage and optimize data retrieval, the `CompanyResearcher` implements a caching mechanism. Scraped company data is stored in `tracking/companies.yaml` and is subject to a 30-day Time-To-Live (TTL). This ensures that frequently accessed company information is readily available without repeated web requests, while also keeping the data reasonably fresh.

The module supports several operational modes via command-line arguments:

*   `--from-jobs`: Processes companies identified in a batch of recently scraped jobs, allowing for bulk data enrichment.
*   `--company [Company Name]`: Enriches data for a specific company name provided by the user.
*   `--list`: Displays the current contents of the cached company data, providing an overview of already enriched companies.

## Related

[[Career-Datacenter]],[[CompanyResearcher Module]],[[Job Search Automation Platform]],[[Job Board Scrapers]],[[Automated Job Application Workflow Script (apply_workflow.py)]]
