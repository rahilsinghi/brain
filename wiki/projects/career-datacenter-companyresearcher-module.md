---
title: "Career Datacenter: CompanyResearcher Module"
author: ai
created_at: 2026-04-10T17:28:52.566Z
last_ai_edit: 2026-04-10T17:28:52.566Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-companyresearcher-enrich-company-data-for-hi-b3ef34.md]]"
tags:
  - company data
  - web scraping
  - data enrichment
  - caching
  - python
  - job search
  - career-datacenter
---

# Career Datacenter: CompanyResearcher Module

The CompanyResearcher module integrates into the Career-Datacenter project to enrich scraped job data with additional company information. It automatically gathers details like employee count, funding stage, founding year, and Glassdoor ratings from public web sources. The module includes caching with a 30-day TTL to optimize performance and prevent redundant scraping.

## Key Concepts

Web Scraping,Data Enrichment,Company Data,Data Caching,Job Data Processing

## Details

The `CompanyResearcher` module, identified by commit `0e28655` in the `rahilsinghi/Career-Datacenter` repository, was authored by Rahil Singhi on 2026-02-17. This addition involved 306 lines of code.

Its primary function is to enrich company profiles associated with scraped job postings by extracting publicly available information. Key data points collected include:
- Employee count
- Funding stage
- Founding year
- Glassdoor rating

To manage efficiency and reduce redundant requests, the module implements a caching mechanism. Results are stored in `tracking/companies.yaml` with a Time-To-Live (TTL) of 30 days.

**Operational Modes:**
- `--from-jobs`: Processes companies found within a batch of scraped jobs.
- `--company [NAME]`: Scrapes information for a specific, single company.
- `--list`: Displays the currently cached company data.

This module was co-authored by Claude Sonnet 4.5.

## Related

[[Career-Datacenter]],[[Web Scraping]],[[Data Enrichment]],[[Job Scraping]],[[Data Caching]]
