---
title: Publication-Quality Results Visualization Script (Gaze-Diffuse)
author: ai
created_at: 2026-04-12T18:04:20.727Z
last_ai_edit: 2026-04-12T18:04:20.727Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-publication-quality-results-visualization-scr-f9fc3b.md]]"
tags:
  - gaze-diffuse
  - visualization
  - data analysis
  - publication
  - fkgl
  - mauve
  - script
  - python
  - research
---

# Publication-Quality Results Visualization Script (Gaze-Diffuse)

This commit introduces a new visualization script within the `gaze-diffuse` repository, designed to generate publication-quality figures for research results. It includes various plots such as FKGL vs. lambda curves, sentence variance bar charts, and MAUVE preservation bar charts, with options for colorblind-friendly palettes, high DPI, and PDF output. The script also features a demo mode for synthetic data generation.

## Key Concepts

Publication-quality visualization,FKGL (Flesch-Kincaid Grade Level),MAUVE score,Data visualization,Error bars,Colorblind-friendly palette,PDF output,Synthetic data generation

## Details

This feature, committed to the `[[rahilsinghi/gaze-diffuse]]` repository (SHA: `f67d023`) by [[Rahil Singhi]] on 2026-03-15, provides a dedicated script for generating high-fidelity visualizations of experimental results. Key features include:

*   **Primary Result Figure**: A plot of FKGL (Flesch-Kincaid Grade Level) against the `lambda` parameter, complete with error bars to indicate statistical variability.
*   **Global Coherence Claim Visualization**: A grouped bar chart illustrating FK sentence variance, designed to support claims about global coherence across different methods.
*   **MAUVE Preservation**: A bar chart demonstrating MAUVE score preservation across various `lambda` values, useful for evaluating model performance on text generation tasks.
*   **Method Comparison**: A readability radar chart that allows for a comparative analysis of all evaluated methods.
*   **Demo Mode**: A `--demo` flag enables the script to run with synthetic data, facilitating testing and demonstration without requiring actual results.
*   **Output Quality**: Visualizations are generated with a colorblind-friendly palette, a resolution of 300 DPI, and exported directly to PDF format, ensuring suitability for academic publications.

The script supports both a real results directory and programmatic API integration, offering flexibility in how data is processed and visualized.

## Related

[[rahilsinghi/gaze-diffuse]],[[Rahil Singhi]],[[AR Baseline Test Enhancement (b07cd80)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]],[[Smoke, Integration, and GECO Data Validation Tests]]
