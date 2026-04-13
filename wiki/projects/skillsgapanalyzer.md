---
title: SkillsGapAnalyzer
author: ai
created_at: 2026-04-10T17:15:37.456Z
last_ai_edit: 2026-04-10T17:15:37.456Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-skillsgapanalyzer-compare-job-demand-vs-your-c89843.md]]"
tags:
  - skill-analysis
  - job-market
  - career-development
  - cli-tool
  - data-analysis
  - python
---

# SkillsGapAnalyzer

The SkillsGapAnalyzer is a tool developed within the [[Career-Datacenter]] project. It analyzes job market demand by processing scraped job descriptions, identifies skills present in those descriptions, and compares them against a user's defined skills in `data/skills.yaml` to highlight skill gaps. The tool outputs a ranked table with coverage indicators and a dedicated gaps section.

## Key Concepts

- Skill Gap Analysis,- Job Market Demand,- Skill Tracking,- Data Analysis,- Command-Line Interface (CLI) Tool

## Details

The SkillsGapAnalyzer is a command-line utility designed to help users understand the skills in demand in the job market and identify personal skill discrepancies. It operates by performing the following steps:

*   **Input Processing**: Reads all scraped job data from a designated tracking CSV file.
*   **Skill Extraction & Counting**: It parses the job descriptions within the CSV, identifying and counting the frequency of each distinct skill mentioned, thereby generating a view of job market demand.
*   **Comparison**: The tool then compares these identified job market skills against a user's self-defined skill set, typically stored in a `data/skills.yaml` file.
*   **Gap Identification**: Based on this comparison, it surfaces skill gaps, indicating where a user's skills might not align with current market requirements.

**Output and Features:**

The output is presented as a ranked table of skills, complete with ✓/✗ indicators to show coverage relative to the `skills.yaml` file. A dedicated section specifically highlights identified skill gaps. The tool also supports:

*   `--min-score` filter: Allows users to filter the results, focusing on skills with a minimum frequency or relevance score.
*   `--save` option: Enables saving the generated output to a specified file.

**Development Context:**

*   **Repository:** `rahilsinghi/Career-Datacenter`
*   **Commit SHA:** `1caf1d4`
*   **Date of Commit:** `2026-02-17T22:41:23Z`
*   **Author:** [[Rahil Singhi]]
*   **Co-Author (AI):** Claude Sonnet 4.5
*   **Changes:** Introduced 292 lines of new code across 1 file, with no deletions.

## Related

[[Career-Datacenter]],[[Rahil Singhi]],[[Skills YAML Format]]
