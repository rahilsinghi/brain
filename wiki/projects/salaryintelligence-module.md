---
title: SalaryIntelligence Module
author: ai
created_at: 2026-04-12T17:35:46.142Z
last_ai_edit: 2026-04-12T17:35:46.142Z
last_human_edit: null
last_embedded_hash: f021ccd344f52ad5
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-salaryintelligence-market-rate-analysis-from-ba24e7.md]]"
tags:
  - salary analysis
  - market rates
  - job search
  - career datacenter
  - data analysis
  - cli tool
  - job scraping
  - compensation
---


# SalaryIntelligence Module

The SalaryIntelligence module, part of the [[Career-Datacenter]] project, provides comprehensive market rate analysis from scraped job data. It calculates percentile breakdowns (P25/median/P75) by role type and experience level, highlighting remote vs. on-site salary premiums. Additionally, it ranks the top 10 highest-paying openings based on fit scores and supports command-line flags for customized analysis.

## Key Concepts

Market Rate Analysis,Salary Data Aggregation,Percentile Breakdown (P25, Median, P75),Role-Based Salary Analysis (ML, Data Eng, Backend),Experience Level Salary Analysis (Junior, Mid, Senior),Remote vs. On-site Salary Premium,Top Paying Openings Ranking,CLI Flags

## Details

The `SalaryIntelligence` module is a core component within the [[Career-Datacenter]] project, designed to perform in-depth market rate analysis of job salaries. It processes `salary_min` and `salary_max` data aggregated from all scraped job listings, providing valuable insights into compensation trends.

Key functionalities include:
- **Percentile Breakdowns**: Computes P25, median, and P75 salary percentiles.
- **Role-Based Analysis**: Breaks down salary data by specific role types, such as Machine Learning (ML), Data Engineering, and Backend development.
- **Experience Level Analysis**: Segments salary insights by experience levels, including Junior, Mid, and Senior positions.
- **Remote vs. On-site Premium**: Identifies and quantifies the salary difference or premium associated with remote work compared to on-site roles.
- **Top Openings List**: Ranks and lists the top 10 highest-paying job openings, incorporating a 'fit score' for relevance.

The module supports command-line interface (CLI) interaction, allowing users to specify analysis parameters using flags such as `--role` for filtering by role type and `--save` for persisting analysis results. It was introduced in commit `4551656` to the `rahilsinghi/Career-Datacenter` repository.

## Related

[[Career-Datacenter]],[[Add Job Board Scrapers (Career-Datacenter Phase 2.2 - Part 2)]],[[Add Job Scraper Foundation (Phase 2.2 - Part 1)]],[[JobDeduplicator - Persistent Job ID Tracking]],[[weekly_report.py Script for Job Search Summary]],[[Automated Job Application Workflow Script (`apply_workflow.py`)]]
