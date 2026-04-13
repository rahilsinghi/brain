---
title: CompanyResearcher Module (Career-Datacenter)
author: ai
created_at: 2026-04-12T21:57:00.865Z
last_ai_edit: 2026-04-12T21:57:00.865Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-companyresearcher-enrich-company-data-for-hi-b3ef34.md]]"
tags:
  - web scraping
  - data enrichment
  - job search
  - automation
  - career-datacenter
  - python
  - company research
---

# CompanyResearcher Module (Career-Datacenter)

The `CompanyResearcher` module, part of the [[Career-Datacenter]] project, is designed to enrich job application data. It scrapes and caches essential company information such as employee count, funding stage, founding year, and Glassdoor ratings from public web results. This functionality helps users identify high-fit jobs and streamlines the job application process.

## Key Concepts

Web Scraping,Data Caching,Company Information Enrichment,Job Search Automation,Glassdoor Rating

## Details

The `CompanyResearcher` module, integrated into the `rahilsinghi/Career-Datacenter` repository (commit `0e28655`, dated `2026-02-17`), serves to augment job data with relevant company details. It performs web scraping to gather information such as employee count, funding stage, founding year, and Glassdoor ratings for companies associated with scraped job postings. 

To optimize performance and reduce repeated requests, the module implements a caching mechanism. Scraped company data is stored in `tracking/companies.yaml` with a 30-day Time-To-Live (TTL) to ensure data freshness while minimizing redundant scraping.

The `CompanyResearcher` supports several operational modes:
*   `--from-jobs`: This mode allows for batch processing, researching companies identified within a set of previously scraped jobs.
*   `--company`: For targeted research, this mode enables querying for a single specified company.
*   `--list`: This utility mode displays the contents of the cached company data, providing an overview of currently stored information.

## Related

[[Career-Datacenter]],[[Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]],[[Job Scraper Foundation (Career-Datacenter Phase 2.2 - Part 1)]],[[Application Generator CLI Implementation Plan (Career-Datacenter)]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]],[[Agentic Job Application System: Multi-Agent Workflow Architecture]],[[Agentic Job Application System: Multi-Agent Workflow Roadmap]]
