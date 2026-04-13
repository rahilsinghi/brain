---
title: Experience Transform with Metrics Merge and Cross-referencing
author: ai
created_at: 2026-04-10T18:05:04.446Z
last_ai_edit: 2026-04-10T18:05:04.446Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-seed-experience-transform-with-metrics-merge-and-cross-fbe395.md]]"
tags:
  - seed
  - experience
  - metrics
  - wiki
  - automation
  - data-transformation
  - cross-referencing
---

# Experience Transform with Metrics Merge and Cross-referencing

This feature introduces an automated process to transform `ExperienceEntry` YAML data into wiki articles, merging relevant `MetricEntry` data and generating cross-reference links. It streamlines the creation and maintenance of experience-related content within the knowledge base.

## Key Concepts

* ExperienceEntry YAML,* MetricEntry data,* Wiki articles,* Data transformation,* Cross-referencing,* Internal linking (`[[ref:]]`)

## Details

This commit (`4985d52`) from `rahilsinghi/brain` implements a `feat(seed)` functionality focused on transforming experience data. The core process involves mapping `ExperienceEntry` YAML files directly into wiki articles, specifically under the `wiki/experience/` directory.

A key aspect of this transformation is the intelligent merging of `MetricEntry` data. The system is designed to incorporate metric information inline, but it intelligently skips any metrics that are already explicitly present within the bullet text of the `ExperienceEntry`. This prevents duplication and ensures a clean integration of quantitative data.

Furthermore, the feature enhances navigability and context by emitting `[[ref:]]` links. These links are generated to point to sibling experience entries from the same company, facilitating easy cross-referencing and providing a richer context for each experience article.

**Commit Details:**
*   **Repository:** `rahilsinghi/brain`
*   **SHA:** `4985d52`
*   **Date:** `2026-04-08T12:30:03Z`
*   **Author:** Rahil Singhi
*   **Co-Authored-By:** Claude Sonnet 4.6
*   **Files Changed:** 2
*   **Additions:** +186 lines
*   **Deletions:** -0 lines

## Related

[[ExperienceEntry]],[[MetricEntry]],[[Data Transformation]],[[Wiki Automation]],[[Cross-referencing]],[[rahilsinghi/brain]]
