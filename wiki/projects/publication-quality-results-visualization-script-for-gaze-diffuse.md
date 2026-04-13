---
title: Publication-Quality Results Visualization Script for Gaze-Diffuse
author: ai
created_at: 2026-04-13T17:38:43.118Z
last_ai_edit: 2026-04-13T17:38:43.118Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-publication-quality-results-visualization-scr-f9fc3b.md]]"
tags:
  - gaze-diffuse
  - visualization
  - results
  - publication-quality
  - fkgl
  - mauve
  - python
  - script
  - feature
---

# Publication-Quality Results Visualization Script for Gaze-Diffuse

This commit introduces a new script for generating publication-quality visualizations of results within the `rahilsinghi/gaze-diffuse` repository. It produces several key figures, including FKGL vs. lambda curves, sentence variance bar charts, MAUVE preservation bar charts, and readability radar charts. The script supports a demo mode with synthetic data and outputs colorblind-friendly, high-resolution PDFs.

## Key Concepts

[[Results Visualization]],[[Gaze-Diffuse]],[[Publication-Quality Graphics]],[[FKGL (Flesch-Kincaid Grade Level)]],[[MAUVE Score]],[[Colorblind-Friendly Palette]],[[CLI Flags]]

## Details

This feature (`feat:`) commit adds a dedicated script to the `rahilsinghi/gaze-diffuse` repository for generating advanced visualizations of experimental results. The script is designed to produce publication-quality figures, ensuring high resolution (300 DPI) and PDF output, while utilizing a colorblind-friendly palette.

**Key Visualizations Generated:**
*   **FKGL vs. Lambda Curve:** A primary result figure displaying the Flesch-Kincaid Grade Level against lambda values, complete with error bars.
*   **FK Sentence Variance Bar Chart:** Illustrates global coherence claims by showing sentence variance, grouped for comparative analysis.
*   **MAUVE Preservation Bar Chart:** Visualizes MAUVE scores across different lambda values, indicating how well properties are preserved.
*   **Readability Radar Chart:** Provides a comprehensive comparison of readability metrics across all evaluated methods.

**Features:**
*   **Demo Mode:** Includes a `--demo` flag to generate visualizations using synthetic data, facilitating testing and demonstration without requiring real experimental runs.
*   **Input Flexibility:** The script can process results from a specified directory or accept data programmatically via its API.

**Commit Details:**
*   **Repository:** `rahilsinghi/gaze-diffuse`
*   **SHA:** `f67d023`
*   **Date:** 2026-03-15T23:37:13Z
*   **Author:** Rahil Singhi
*   **Files Changed:** 1
*   **Additions:** +838 lines
*   **Deletions:** -0 lines

## Related

[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]]
