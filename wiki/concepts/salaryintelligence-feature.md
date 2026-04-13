---
title: SalaryIntelligence Feature
author: ai
created_at: 2026-04-10T17:19:10.242Z
last_ai_edit: 2026-04-10T17:19:10.242Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-salaryintelligence-market-rate-analysis-from-ba24e7.md]]"
tags:
  - salary analysis
  - market rate
  - job data
  - career datacenter
  - data aggregation
  - statistics
  - remote work
  - experience level
  - role type
  - feature
---

# SalaryIntelligence Feature

SalaryIntelligence is a feature within the Career-Datacenter project that performs market rate analysis by aggregating salary data from scraped job postings. It calculates P25, median, and P75 salary breakdowns by role type and experience level, and highlights remote vs. on-site salary premiums. The tool also identifies top-paying opportunities with fit scores.

## Key Concepts

- Market Rate Analysis,- Salary Aggregation,- Role Type Breakdown,- Experience Level Breakdown,- Remote vs. On-site Premium,- Fit Scores,- Data Scraping

## Details

The SalaryIntelligence feature, implemented within the [[Career-Datacenter]] repository (SHA: `4551656`), was added on 2026-02-17 by Rahil Singhi. This addition involved significant new code (+314 lines) to enable comprehensive salary analysis from previously [[Job Scraping|scraped job data]].

**Core Functionality:**
*   **Salary Aggregation:** Collects `salary_min` and `salary_max` from all available job postings.
*   **Statistical Breakdown:** Computes P25 (25th percentile), median, and P75 (75th percentile) salary figures.
*   **Categorization:** Provides breakdowns by:
    *   **Role Type:** Examples include Machine Learning (ML), Data Engineering, Backend Development, etc.
    *   **Experience Level:** Differentiates between Junior, Mid, and Senior positions.
*   **Premium Analysis:** Highlights the salary premium or discount for remote versus on-site roles.
*   **Top Openings:** Lists the top 10 highest-paying job openings, enhanced with 'fit scores' to help users identify relevant opportunities.

**Usage:**
The feature supports command-line flags such as `--role` to filter analysis by a specific role type and `--save` to store the generated reports or data. The initial development involved [[Claude Sonnet 4.5]] as a co-author.

## Related

[[Career-Datacenter]],[[Job Scraping]],[[Rahil Singhi]],[[Claude Sonnet 4.5]]
