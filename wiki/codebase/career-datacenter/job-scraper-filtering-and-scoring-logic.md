---
title: Job Scraper Filtering and Scoring Logic
author: ai
created_at: 2026-04-13T22:30:03.924Z
last_ai_edit: 2026-04-13T22:30:03.924Z
last_human_edit: null
last_embedded_hash: 3cdebf76296d7c2b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/career-datacenter/career-datacenter-community-19.md]]"
tags:
  - code-community
  - career-datacenter
  - graphify
  - job-scraper
  - filtering
  - scoring
aliases:
  - Community 19
---



# Job Scraper Filtering and Scoring Logic

This community encapsulates the core logic for filtering and scoring job listings within the [[career-datacenter]]'s job scraper. It defines how potential job opportunities are evaluated based on various criteria, including dealbreakers and missing requirements, to determine their suitability and adjust their relevance score.

## Key Concepts

Job Scraping,Job Filtering,Job Scoring,Dealbreaker Criteria,Missing Requirements,FilterResult

## Details

The primary file associated with this community is `cli/job_scraper_models.py`. This file contains the implementation for evaluating and modifying `FilterResult` objects, which represent the outcome of a job filtering process.

Key functions within this module include:
- `job_scraper_models_filterresult_add_reason`: A central method responsible for applying various filtering reasons. It orchestrates calls to more specific filtering and scoring functions.
- `job_scraper_models_filterresult_add_dealbreaker`: Used to mark a job listing as unsuitable if it violates a critical, non-negotiable criterion. This action is associated with a specific rationale (`rationale_152`), indicating a predefined rule for dealbreakers.
- `job_scraper_models_filterresult_add_missing_required`: Identifies and records instances where a job listing fails to meet essential requirements, linking to `rationale_158` for explanation.
- `job_scraper_models_filterresult_adjust_score`: Modifies the overall relevance score of a job posting based on positive or negative factors, with its rationale documented as `rationale_164`.

These methods collectively ensure that scraped job data is systematically evaluated, flagged for issues, and assigned a relevance score before further processing in the [[Application Tracking System (Career-Datacenter)]].

## Related

[[career-datacenter]],[[Comprehensive Job Scraper Documentation (Career-Datacenter)]],[[Application Tracking System (Career-Datacenter)]]
