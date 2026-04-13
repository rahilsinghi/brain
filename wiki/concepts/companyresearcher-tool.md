---
title: CompanyResearcher Tool
author: ai
created_at: 2026-04-10T21:30:11.352Z
last_ai_edit: 2026-04-10T21:30:11.352Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-companyresearcher-enrich-company-data-for-hi-b3ef34.md]]"
tags:
  - company data
  - enrichment
  - web scraping
  - caching
  - job data
  - python
  - tool
  - datacenter
  - automation
---

# CompanyResearcher Tool

The CompanyResearcher is a tool within the Career-Datacenter project designed to enrich company data for scraped job listings. It scrapes basic company information from public web results, such as employee count, funding stage, founding year, and Glassdoor rating, and caches it for 30 days.

## Key Concepts

**Company Data Enrichment**: Process of adding supplementary information to existing company profiles.,**Web Scraping**: Automated extraction of data from websites.,**Data Caching**: Storing frequently accessed data for faster retrieval and reduced external queries.,**Job Data Analysis**: Leveraging enhanced company data to identify high-fit jobs.

## Details

The CompanyResearcher tool is a component of the `rahilsinghi/Career-Datacenter` repository, introduced in commit `0e28655` on 2026-02-17 by Rahil Singhi (with co-authorship by Claude Sonnet 4.5).

Its primary function is to enrich company profiles associated with scraped job postings by gathering key data points from public web sources. This includes:
*   **Employee Count**
*   **Funding Stage**
*   **Founding Year**
*   **Glassdoor Rating**

To optimize performance and reduce redundant web requests, the tool implements a caching mechanism. Results are stored in `tracking/companies.yaml` with a Time-To-Live (TTL) of 30 days, meaning cached data older than 30 days will be refreshed upon the next request.

The CompanyResearcher supports several operational modes:
*   `--from-jobs`: Processes companies found in a batch of scraped jobs.
*   `--company`: Enriches data for a single specified company.
*   `--list`: Displays the current contents of the company cache.

## Related

[[Career-Datacenter]],[[Web Scraping]],[[Data Caching Strategies]],[[Job Data Pipeline]]
