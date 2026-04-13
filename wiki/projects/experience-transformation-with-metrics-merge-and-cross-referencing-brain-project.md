---
title: Experience Transformation with Metrics Merge and Cross-referencing (Brain Project)
author: ai
created_at: 2026-04-13T16:05:28.932Z
last_ai_edit: 2026-04-13T16:05:28.932Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-seed-experience-transform-with-metrics-merge-and-cross-fbe395.md]]"
tags:
  - brain
  - experience
  - transformation
  - metrics
  - cross-referencing
  - yaml
  - wiki
  - automation
  - knowledge management
---

# Experience Transformation with Metrics Merge and Cross-referencing (Brain Project)

This feature in the Brain project transforms `ExperienceEntry` YAML data into structured wiki articles, specifically under the `wiki/experience/` directory. It integrates `MetricEntry` data directly into the experience descriptions, intelligently avoiding duplication, and generates cross-reference links (`[[ref:]]`) to related entries within the same company.

## Key Concepts

ExperienceEntry YAML,MetricEntry Data Integration,Wiki Article Generation,Cross-referencing,Knowledge Graph,Data Transformation

## Details

The `feat(seed)` commit introduces a significant enhancement to how experience data is managed and presented within the Brain project. It automates the process of converting `ExperienceEntry` YAML files into individual wiki articles, ensuring a consistent and structured representation of professional experiences.

A core aspect of this transformation is the intelligent merging of `MetricEntry` data. For each experience entry, associated metrics are parsed and inserted inline into the article content. A crucial detail is the logic to skip metrics that are already explicitly mentioned within the existing bullet points, preventing redundancy and improving readability.

Furthermore, the system automatically generates `[[ref:]]` links. These wikilinks point to 'sibling' experience entries, meaning other positions or roles held at the same company. This creates a rich network of interconnected information, enhancing navigation and understanding of career progression within a single organization. The generated articles are stored under the `wiki/experience/` path.

This feature significantly contributes to the overall [[Automated Knowledge System Maintenance]] and the development of the [[Brain Project]]'s structured data foundation.

## Related

[[brain — Git Activity]],[[ExperienceEntry YAML]],[[Professional Experience Entries (Career-Datacenter)]],[[Career-Datacenter]],[[Brain Project: Wiki Article Compilation and Embedding Enhancement]],[[Automated Knowledge System Maintenance (d145456)]],[[Brain Explorer Completion: Deep-Linking and Wikilink Navigation]],[[Brain Explorer: Deep-Linking & Wikilink Navigation Feature]],[[Backfill Script for Broken Wikilinks]],[[Brain Explorer Update: Wikilink Rendering]],[[Brain Explorer: Wikilink Rendering, Palette Filtering, and Code Cleanup]],[[Resume Generation]],[[MetricEntry]]
