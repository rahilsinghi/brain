---
title: SkillsGapAnalyzer for Career-Datacenter
author: ai
created_at: 2026-04-13T15:41:34.728Z
last_ai_edit: 2026-04-13T15:41:34.728Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-skillsgapanalyzer-compare-job-demand-vs-your-c89843.md]]"
tags:
  - career-datacenter
  - skill-analysis
  - job-search
  - data-processing
  - cli
  - yaml
  - csv
  - automation
  - ai-assisted-development
---

# SkillsGapAnalyzer for Career-Datacenter

The SkillsGapAnalyzer is a new feature added to the Career-Datacenter project, designed to compare demanded skills from scraped job descriptions against a user's defined skills in `data/skills.yaml`. It analyzes job data from tracking CSVs to identify skill gaps, providing a ranked table with coverage indicators and a dedicated gaps section. The tool supports filtering by minimum score and saving the output to a file.

## Key Concepts

SkillsGapAnalyzer,Job Description Parsing,Skill Gap Analysis,Career-Datacenter,YAML Configuration,CSV Data Processing,Command Line Interface (CLI)

## Details

The SkillsGapAnalyzer, introduced in commit `1caf1d4` to the [[Career-Datacenter]] repository by Rahil Singhi, is a utility designed to automate the process of identifying skill discrepancies between job market demands and a candidate's existing skillset. It operates by:

1.  **Reading Scraped Job Data**: It ingests data from tracking CSV files, which contain information about previously scraped job postings.
2.  **Skill Extraction and Frequency Counting**: The tool processes the job descriptions to identify and count the frequency of various skills mentioned across all job listings.
3.  **Comparison with User Skills**: It then compares these identified job demand skills against the skills defined by the user in `data/skills.yaml`.
4.  **Gap Identification and Reporting**: The primary output is a ranked table that clearly indicates skill coverage using ✓/✗ indicators, highlighting specific skill gaps. A dedicated section is provided for quick review of these gaps.

**Key Features and Options**:
*   **`--min-score` filter**: Allows users to filter the output based on a minimum relevance or demand score for skills.
*   **`--save` option**: Enables saving the generated analysis report to a specified file.

This feature was co-authored by Claude Sonnet 4.5, indicating an AI-assisted development process.

## Related

[[Career-Datacenter]],[[batch_process_overnight.py Enhancements: Job Description Parsing and CLI Flags]],[[Add Job Scraper Foundation (Phase 2.2 - Part 1)]],[[Career Datacenter: Comprehensive Job Scraper Documentation]],[[Career Datacenter: Job Search Automation Platform]],[[Anti-Hallucination Constraints in Resume Generation]]
