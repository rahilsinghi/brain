---
title: Matplotlib Plot Generation Feature (brain repo)
author: ai
created_at: 2026-04-10T19:13:48.658Z
last_ai_edit: 2026-04-10T19:13:48.658Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-output-add-matplotlib-plot-generation-with-error-handli-ff2483.md]]"
tags:
  - feature
  - matplotlib
  - plot generation
  - automation
  - claude
  - python
  - error handling
  - brain repo
---

# Matplotlib Plot Generation Feature (brain repo)

This feature introduces a `generatePlot()` function within the `brain` repository, enabling the automatic generation of Matplotlib plots. It synthesizes context, uses `brutalist rcParams`, prompts Claude for Python scripts, executes them, and includes robust error handling with partial `.png` cleanup.

## Key Concepts

Matplotlib Plot Generation,Automated Script Generation,AI Code Generation (Claude),Error Handling,Context Synthesis,brutalist rcParams,uv run

## Details

The `generatePlot()` function, implemented following the `slides.ts` pattern, provides a robust mechanism for creating Matplotlib plots programmatically. The process involves several key steps:

1.  **Context Synthesis**: The function first synthesizes relevant wiki context to provide necessary information for plot generation.
2.  **Configuration Loading**: It loads 'brutalist' `rcParams` to ensure a consistent and opinionated visual style for the plots.
3.  **AI Script Prompting**: Claude is prompted to generate a Python script specifically designed to produce the desired plot, based on the synthesized context.
4.  **Script Writing**: The generated Python script is then written to a file located at `output/plots/{slug}.py`.
5.  **Execution**: The script is executed using `uv run --python 3.12`, ensuring a specific Python environment for execution.
6.  **Error Handling and Cleanup**: In the event of a failure during execution, the function includes cleanup logic to remove any partially generated `.png` files, preventing clutter and ensuring a clean state. This commit (SHA: `4f440eb`) was authored by Rahil Singhi on 2026-04-09, with contributions from Claude Sonnet 4.6.

## Related

[[brutalist rcParams]],[[Claude Sonnet 4.6]],[[Matplotlib]],[[slides.ts pattern]],[[AI Code Generation]],[[uv run]],[[Rahil Singhi]],[[brain repository]]
