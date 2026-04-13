---
title: "Gaze-Diffuse: Publication-Quality Results Visualization Script"
author: ai
created_at: 2026-04-10T22:20:52.333Z
last_ai_edit: 2026-04-10T22:20:52.333Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-publication-quality-results-visualization-scr-f9fc3b.md]]"
tags:
  - visualization
  - results
  - publication
  - gaze-diffuse
  - script
  - data analysis
  - plotting
  - fkgl
  - mauve
  - readability
  - commit
---

# Gaze-Diffuse: Publication-Quality Results Visualization Script

This entry details the addition of a comprehensive visualization script to the gaze-diffuse repository. The script generates publication-quality figures, including FKGL vs. lambda curves, sentence variance bar charts, MAUVE preservation plots, and readability radar charts. It supports both real data and a demo mode, featuring a colorblind-friendly palette and high-resolution PDF output.

## Key Concepts

FKGL vs lambda curve visualization,FK sentence variance visualization,MAUVE preservation visualization,Readability radar chart,Demo mode for synthetic data,Colorblind-friendly design,High-resolution PDF output,Support for results directory,Programmatic API for integration

## Details

A significant feature commit (SHA: `f67d023`) by Rahil Singhi on 2026-03-15 introduced a new, extensive script for visualizing results within the `rahilsinghi/gaze-diffuse` repository. This commit involved 1 file change, adding 838 lines of code.

The script is designed to produce publication-quality figures for various aspects of the gaze-diffuse project's results, ensuring clarity and scientific rigor. Key visualization types include:

*   **FKGL vs lambda curve with error bars**: A primary result figure illustrating the relationship between Flesch-Kincaid Grade Level (FKGL) and the `lambda` parameter, complete with error bars for statistical significance.
*   **FK sentence variance grouped bar chart**: A visualization supporting the global coherence claim by displaying Flesch-Kincaid (FK) sentence variance across different groups.
*   **MAUVE preservation bar chart across lambda values**: A bar chart demonstrating the preservation of MAUVE scores across various `lambda` values.
*   **Readability radar chart**: A comprehensive radar chart comparing readability metrics across all tested methods.

To facilitate ease of use and broad application, the script incorporates several utility features:

*   **Demo mode**: An `--demo` flag allows the script to run with synthetic data, enabling users to explore its capabilities without needing real results.
*   **Output Quality**: Figures are generated with a colorblind-friendly palette, set to 300 DPI for high-resolution, and outputted directly as PDF files, suitable for academic publications.
*   **Data Input Flexibility**: The script supports processing results directly from a specified results directory or through a programmatic API for integrated workflows.

## Related

[[Gaze-Diffuse Project]],[[Rahil Singhi]]
