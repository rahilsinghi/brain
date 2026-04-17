---
title: Experience Entry to Wiki Transformation with Metrics and Cross-referencing
author: ai
created_at: 2026-04-12T17:04:46.892Z
last_ai_edit: 2026-04-12T17:04:46.892Z
last_human_edit: null
last_embedded_hash: 8fd12cba0253b2df
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-seed-experience-transform-with-metrics-merge-and-cross-fbe395.md]]"
tags:
  - seed
  - experience
  - metrics
  - cross-referencing
  - wiki
  - data transformation
  - yaml
  - automation
  - content generation
---


# Experience Entry to Wiki Transformation with Metrics and Cross-referencing

This feature processes `ExperienceEntry` YAML files from the `rahilsinghi/brain` repository, transforming them into structured wiki articles. It integrates `MetricEntry` data, intelligently preventing duplication, and generates cross-reference links between related entries from the same company.

## Key Concepts

ExperienceEntry,MetricEntry,YAML to Wiki Transformation,Data Merging,Cross-referencing

## Details

The commit `4985d52` in the `[[rahilsinghi/brain]]` repository introduces a significant feature for content generation. It implements a transformation process that maps `[[ExperienceEntry]]` YAML data into individual wiki articles, which are then stored under the `wiki/experience/` directory. A core part of this functionality is the merging of `[[MetricEntry]]` data directly into these wiki articles. To ensure content quality and prevent redundancy, the system is designed to skip any metrics that are already explicitly present within the bullet point text of the experience entry.

Furthermore, this feature enhances the navigability and contextual richness of the wiki by automatically emitting `[[ref:]]` links. These links create cross-references to other sibling experience entries that pertain to the same company, thereby connecting related work experiences and providing a more comprehensive view within the wiki structure.

## Related

[[Automated Data Ingestion and Wiki Maintenance]],[[Brain Project Content Seeding]],[[rahilsinghi/brain]],[[ExperienceEntry]],[[MetricEntry]],[[YAML]],[[Wiki Articles]],[[Data Transformation]]
