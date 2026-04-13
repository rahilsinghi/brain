---
title: Publication-Quality Results Visualization Script for Gaze-Diffuse
author: ai
created_at: 2026-04-12T22:05:07.542Z
last_ai_edit: 2026-04-12T22:05:07.542Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-publication-quality-results-visualization-scr-f9fc3b.md]]"
tags:
  - visualization
  - gaze-diffuse
  - results
  - script
  - python
  - data-analysis
  - readability
  - mauve
  - fkgl
  - cli
  - publication
---

# Publication-Quality Results Visualization Script for Gaze-Diffuse

This script provides advanced visualization capabilities for the Gaze-Diffuse project, generating publication-quality figures from experimental results. It includes plots for FKGL, MAUVE, and general readability, supporting both direct result directory input and programmatic API integration. The script emphasizes scientific rigor with features like error bars, colorblind-friendly palettes, and high-resolution PDF output.

## Key Concepts

[[Results Visualization]],[[Publication Quality]],[[FKGL (Flesch-Kincaid Grade Level)]],[[MAUVE Score]],[[Readability Metrics]],[[Error Bars]],[[Data Visualization]],[[Colorblind-Friendly Palette]],[[High-Resolution Output]],[[CLI Tools]]

## Details

A new visualization script was added to the `rahilsinghi/gaze-diffuse` repository (commit `f67d023`) to produce publication-quality figures for research findings. Authored by [[Rahil Singhi]] on March 15, 2026, this script offers several key visualizations:

*   **FKGL vs Lambda Curve:** A primary results figure displaying the Flesch-Kincaid Grade Level against a lambda parameter, complete with error bars for statistical significance.
*   **FK Sentence Variance Grouped Bar Chart:** Illustrates sentence variance based on FK scores, supporting claims about global coherence.
*   **MAUVE Preservation Bar Chart:** Visualizes MAUVE scores across different lambda values to assess preservation.
*   **Readability Radar Chart:** A comparative radar chart evaluating the readability of various methods.

The script includes a `--demo` flag for running with synthetic data, facilitating testing and demonstration without requiring real experimental outputs. It outputs graphics in PDF format at 300 DPI, utilizing a colorblind-friendly palette to ensure accessibility. The tool is designed for flexibility, capable of processing results directly from a specified directory or integrating programmatically via an API.

## Related

[[Gaze-Diffuse]],[[Rahil Singhi]]
