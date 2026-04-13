---
title: Matplotlib Plot Generation with Error Handling and Cleanup
author: ai
created_at: 2026-04-12T21:38:34.886Z
last_ai_edit: 2026-04-12T21:38:34.886Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-output-add-matplotlib-plot-generation-with-error-handli-ff2483.md]]"
tags:
  - matplotlib
  - plot generation
  - claude
  - python
  - automation
  - error handling
  - brain project
---

# Matplotlib Plot Generation with Error Handling and Cleanup

This feature implements a robust mechanism for generating Matplotlib plots within the `brain` repository. It synthesizes wiki context, applies brutalist styling parameters, prompts the Claude AI for Python script generation, executes the script, and includes error handling with cleanup for partial outputs.

## Key Concepts

Matplotlib,Plot Generation,Claude AI,Python Script Execution,Error Handling,Brutalist Design,Wiki Context Synthesis

## Details

This commit introduces the `generatePlot()` function, which follows a pattern similar to `slides.ts` for output generation. The process involves several steps:
1.  **Wiki Context Synthesis**: Relevant wiki information is synthesized to provide context for the plot generation.
2.  **Brutalist `rcParams` Loading**: Standardized 'brutalist' Matplotlib `rcParams` (runtime parameters) are loaded to ensure a consistent visual style across generated plots, aligning with the [[Brutalist Visual Templates Integration (Marp, Matplotlib, Mermaid)]] philosophy.
3.  **Claude Prompting**: The [[Claude]] AI model is prompted to generate a Python script based on the synthesized context and styling requirements.
4.  **Script Writing**: The generated Python script is written to a designated output directory, specifically `output/plots/{slug}.py`, where `{slug}` is a unique identifier for the plot.
5.  **Script Execution**: The Python script is executed using `uv run --python 3.12`. This command ensures consistent environment and dependency management during script execution.
6.  **Error Handling and Cleanup**: A critical component of this feature is its error handling. If the script execution fails or results in a partial output, any `.png` files generated during the process are cleaned up to prevent orphaned or incomplete files.

## Related

[[Brutalist Visual Templates Integration (Marp, Matplotlib, Mermaid)]],[[Claude How To]],[[Python]],[[uv]],[[output/plots/{slug}.py]]
