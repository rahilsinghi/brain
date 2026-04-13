---
title: Experience Data Transformation with Metrics Merge and Cross-Referencing
author: ai
created_at: 2026-04-12T21:05:09.847Z
last_ai_edit: 2026-04-12T21:05:09.847Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-seed-experience-transform-with-metrics-merge-and-cross-fbe395.md]]"
tags:
  - experience
  - metrics
  - wiki
  - data transformation
  - yaml
  - automation
  - brain project
  - knowledge management
---

# Experience Data Transformation with Metrics Merge and Cross-Referencing

This feature processes ExperienceEntry YAML data to generate structured wiki articles under `wiki/experience/`. It integrates MetricEntry data by merging relevant metrics directly into the article content, while intelligently skipping metrics already present in existing bullet points. The transformation also includes cross-referencing, linking to other experience entries from the same company.

## Key Concepts

ExperienceEntry,MetricEntry,YAML to Wiki Article Conversion,Data Merging,Cross-Referencing,Automated Data Ingestion

## Details

This commit (`4985d52`) introduces a significant data transformation process within the [[Brain Project]]. Authored by Rahil Singhi and co-authored by Claude Sonnet 4.6 on 2026-04-08, it modifies 2 files, adding 186 lines of code.

The core functionality involves mapping `ExperienceEntry` YAML structures directly into wiki articles, populating the `wiki/experience/` directory. A key aspect is the intelligent merging of `MetricEntry` data. This process ensures that quantitative metrics are embedded inline within the experience descriptions, but only if they are not already explicitly mentioned in the bullet points, preventing redundancy. Furthermore, the system automatically generates `[[ref:]]` links to sibling `ExperienceEntry` articles that pertain to the same company, enhancing navigability and contextual understanding within the wiki.

## Related

[[Brain Project]],[[Automated Data Ingestion and Wiki Maintenance]],[[Professional Experience Entries (Career-Datacenter)]],[[CLAUDE.md for Claude Code Vault Integration]]
