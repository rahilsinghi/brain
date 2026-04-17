---
title: SalaryIntelligence - Job Market Rate Analysis
author: ai
created_at: 2026-04-12T21:36:51.970Z
last_ai_edit: 2026-04-12T21:36:51.970Z
last_human_edit: null
last_embedded_hash: ca3a41653c6af897
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-salaryintelligence-market-rate-analysis-from-ba24e7.md]]"
tags:
  - career-datacenter
  - job search
  - salary analysis
  - market intelligence
  - data analysis
  - cli
  - python
---


# SalaryIntelligence - Job Market Rate Analysis

SalaryIntelligence is a feature within the Career-Datacenter project that performs market rate analysis using scraped job data. It aggregates salary ranges, computes percentile breakdowns by role and experience level, highlights remote vs. on-site premiums, and identifies top-paying job openings with fit scores. This tool supports various command-line flags for role-specific analysis and data saving.

## Key Concepts

Market Rate Analysis,Salary Analysis,Job Scraper,Data Aggregation,Statistical Analysis,CLI Tool

## Details

The SalaryIntelligence component is integrated into the [[Career-Datacenter: Job Search Automation Platform]] and designed to provide comprehensive insights into job market salaries. It processes data collected by the [[Career Datacenter: Comprehensive Job Scraper Documentation]] to extract `salary_min` and `salary_max` values.

Key functionalities include:
*   **Percentile Breakdowns**: Calculates P25, median, and P75 salary ranges for different role types (e.g., ML Engineer, Data Engineer, Backend Developer) and experience levels (Junior, Mid, Senior).
*   **Remote vs. On-Site Premium**: Analyzes and highlights salary differences between remote and on-site positions.
*   **Top Openings**: Identifies and lists the top 10 highest-paying job openings, accompanied by their respective fit scores, which are likely derived from the same logic used for the [[Application Generator CLI Implementation Plan (Career-Datacenter)]].
*   **Command-Line Interface**: Supports `--role` flag for filtering analysis by specific job roles and a `--save` flag for persistent storage of results.

The development of this feature involved collaboration with [[Claude]], as indicated by the co-authorship.

## Related

[[Career-Datacenter: Job Search Automation Platform]],[[Career Datacenter: Comprehensive Job Scraper Documentation]],[[Application Generator CLI Implementation Plan (Career-Datacenter)]],[[Claude]]
