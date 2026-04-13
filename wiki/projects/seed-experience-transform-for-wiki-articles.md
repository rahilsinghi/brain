---
title: "Seed: Experience Transform for Wiki Articles"
author: ai
created_at: 2026-04-10T22:04:15.546Z
last_ai_edit: 2026-04-10T22:04:15.546Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-seed-experience-transform-with-metrics-merge-and-cross-fbe395.md]]"
tags:
  - seed
  - experience
  - metrics
  - cross-referencing
  - wiki
  - automation
  - data-transformation
  - brain
  - feature
---

# Seed: Experience Transform for Wiki Articles

This feature introduces an automated process within the `brain` repository to transform `ExperienceEntry` YAML data into structured wiki articles under `wiki/experience/`. It merges `MetricEntry` data directly into these articles, intelligently skipping redundant metrics, and generates cross-reference links to related entries from the same company.

## Key Concepts

- [[ExperienceEntry]] YAML,- [[MetricEntry]] data,- Wiki article generation,- Data merging,- Cross-referencing ([[ref:]] links)

## Details

The `feat(seed)` commit, identified by SHA `4985d52` and authored by Rahil Singhi on 2026-04-08, implements a significant data transformation pipeline within the `rahilsinghi/brain` repository. This process automates the conversion of `ExperienceEntry` YAML files into dedicated wiki articles, which are then stored in the `wiki/experience/` directory.

A key aspect of this transformation is the intelligent integration of `MetricEntry` data. The system merges relevant metric information directly into the experience wiki articles. To avoid redundancy, it checks if metrics are already present within the bullet text of the experience entry and skips merging them if found. This ensures a clean and concise presentation of data.

Furthermore, the feature enhances navigability by emitting `[[ref:]]` links. These links automatically connect sibling `ExperienceEntry` articles that pertain to the same company, facilitating easy cross-referencing and providing a more integrated view of related experiences. This change involved 2 file modifications, adding 186 lines of code with no deletions, indicating a pure addition of functionality.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>

## Related

[[Brain (Repository)]],[[Rahil Singhi]],[[ExperienceEntry]],[[MetricEntry]],[[YAML]],[[Wiki Articles]],[[Data Transformation]]
