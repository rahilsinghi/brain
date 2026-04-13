---
title: Publication-Quality Results Visualization Script
author: ai
created_at: 2026-04-10T18:18:40.793Z
last_ai_edit: 2026-04-10T18:18:40.793Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-publication-quality-results-visualization-scr-f9fc3b.md]]"
tags:
  - visualization
  - results
  - analysis
  - gaze-diffuse
  - python
  - scientific computing
  - readability
  - mauve
  - script
  - tool
---

# Publication-Quality Results Visualization Script

This script provides robust visualization tools for analyzing results from the Gaze-Diffuse project, generating publication-quality figures. It includes various charts for readability, coherence, and model output preservation, offering both direct directory processing and a programmatic API.

## Key Concepts

Publication-Quality Visualizations,FKGL vs. Lambda Curve,FK Sentence Variance (Global Coherence),MAUVE Preservation,Readability Radar Chart,Demo Mode for Synthetic Data,Colorblind-Friendly Palette,High-Resolution PDF Output,Programmatic API Support

## Details

The `publication_quality_results_visualization_script` was introduced into the `rahilsinghi/gaze-diffuse` repository via commit `f67d023` on March 15, 2026, by Rahil Singhi. This addition significantly enhances the project's analytical capabilities by providing a dedicated tool for generating high-quality visualizations suitable for scientific publications.

**Key Visualizations:**
*   **FKGL vs. Lambda Curve:** Displays the Flesch-Kincaid Grade Level (FKGL) metric against varying lambda values, complete with error bars to illustrate the stability and primary trends of results.
*   **FK Sentence Variance Bar Chart:** A grouped bar chart that visualizes the Flesch-Kincaid sentence variance, a key indicator for assessing global coherence across different configurations.
*   **MAUVE Preservation Bar Chart:** Illustrates MAUVE preservation metrics across a range of lambda values, offering insights into how well the model maintains certain characteristics of the input.
*   **Readability Radar Chart:** Provides a comprehensive comparison of all evaluated methods based on multiple readability metrics, presented in an easy-to-digest radar chart format.

**Features for Publication Readiness:**
*   **Demo Mode:** An `--demo` flag allows users to generate visualizations using synthetic data, enabling quick testing and demonstration without requiring a full set of real results.
*   **Output Quality:** All figures are generated using a colorblind-friendly palette, ensuring accessibility. The output is produced at 300 DPI and can be saved directly as PDF files, ideal for print and high-resolution digital viewing.
*   **Flexibility:** The script supports processing results directly from a specified directory and also offers a programmatic API, allowing for seamless integration into custom analysis workflows.

## Related

[[Gaze-Diffuse]],[[Data Visualization]],[[Scientific Computing]],[[Readability Metrics]],[[MAUVE]]
