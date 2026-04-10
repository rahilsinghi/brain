---
title: "Experience Transform: Metrics Merge and Cross-Referencing"
author: ai
created_at: 2026-04-09T02:05:43.188Z
last_ai_edit: 2026-04-09T02:05:43.188Z
last_human_edit: null
last_embedded_hash: 9157f1aeb6eb2190
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-seed-experience-transform-with-metrics-merge-and-cross-fbe395.md]]"
tags:
  - experience
  - transform
  - metrics
  - cross-referencing
  - yaml
  - wiki
  - seed
  - pipeline
  - automation
  - knowledge-graph
---


# Experience Transform: Metrics Merge and Cross-Referencing

A seed transform that maps ExperienceEntry YAML data to structured wiki articles under wiki/experience/. The transform merges MetricEntry data inline while avoiding duplication, and automatically emits cross-reference links between sibling entries at the same company.

## Key Concepts

- **ExperienceEntry YAML**: Source data format representing professional experience records
- **MetricEntry Merge**: Inline merging of metric data into experience articles, with deduplication logic to skip metrics already present in bullet text
- **Cross-Referencing**: Automatic emission of `[[ref:]]` links connecting sibling entries that share the same company
- **Wiki Transform Pipeline**: A seed-stage process that converts structured YAML into navigable wiki articles
- **Output Path**: Generated articles are placed under the `wiki/experience/` directory

## Details

## Overview

This feature introduces an experience transform as part of the brain repository's seed pipeline. The transform takes `ExperienceEntry` YAML definitions and converts them into fully formed wiki articles stored under `wiki/experience/`.

## Metrics Merge Logic

During the transform, `MetricEntry` data is merged inline into the generated article content. To prevent duplication, the system inspects existing bullet text and skips any metric that is already represented. This ensures clean, non-redundant output even when source data overlaps.

## Cross-Reference Emission

The transform automatically identifies sibling experience entries that belong to the same company and emits `[[ref:]]` links between them. This creates a navigable graph of related roles and positions within a single organization.

## Implementation Details

- **Files Changed:** 2
- **Additions:** +186 lines
- **Deletions:** 0 lines
- **Commit SHA:** 4985d52
- **Date:** 2026-04-08
- **Author:** Rahil Singhi
- **Co-Author:** Claude Sonnet 4.6

## Output Structure

Generated wiki articles are written to `wiki/experience/`, organized to reflect the structure of the input YAML and enriched with merged metrics and cross-reference links.

## Related

- [[Experience Entry]]
- [[Metric Entry]]
- [[Wiki Transform Pipeline]]
- [[Seed Pipeline]]
- [[Cross-Reference System]]
- [[YAML to Wiki Conversion]]
- [[Brain Repository]]
