---
title: Experience Entry Transformation with Metrics and Cross-referencing in Brain Project
author: ai
created_at: 2026-04-13T18:06:08.837Z
last_ai_edit: 2026-04-13T18:06:08.837Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-seed-experience-transform-with-metrics-merge-and-cross-fbe395.md]]"
tags:
  - brain
  - seed
  - data transformation
  - wiki
  - experience
  - metrics
  - cross-referencing
  - automation
---

# Experience Entry Transformation with Metrics and Cross-referencing in Brain Project

This feature within the Brain Project automates the conversion of `ExperienceEntry` YAML data into structured wiki articles. It intelligently merges associated `MetricEntry` data, skipping duplicates, and creates internal cross-reference links to related experience entries from the same company.

## Key Concepts

Experience Entry Transformation,Metrics Merging,Cross-referencing (internal links),Wiki Article Generation from YAML,Redundancy avoidance in metric display

## Details

The `feat(seed): experience transform with metrics merge and cross-referencing` commit (SHA: 4985d52) introduces a core data processing capability within the `[[Brain Project]]` repository (`rahilsinghi/brain`). This functionality is designed to streamline the creation of wiki articles from structured `ExperienceEntry` YAML data. These generated articles are stored under the `wiki/experience/` directory.

A key aspect of this transformation is the intelligent integration of `MetricEntry` data. The system is engineered to merge metric information directly into the generated wiki articles. To prevent information redundancy, it first checks if a specific metric is already explicitly present within the bullet text of the experience entry. If a match is found, that metric is gracefully skipped during the merging process.

Furthermore, this feature significantly enhances the navigability and contextual richness of the knowledge base by emitting `[[ref:]]` links. These links serve as internal cross-references, connecting sibling experience entries that pertain to the same company. This mechanism allows users to easily navigate between different roles or projects undertaken at a single organization, providing a comprehensive view of an individual's professional trajectory.

## Related

[[Brain Project]],[[Career-Datacenter]],[[Automated Knowledge System Maintenance]],[[Wiki Article Generation]],[[ExperienceEntry YAML]],[[MetricEntry data]]
