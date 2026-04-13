---
title: Matplotlib Plot Generation with Claude in Brain Project
author: ai
created_at: 2026-04-12T17:37:36.377Z
last_ai_edit: 2026-04-12T17:37:36.377Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-output-add-matplotlib-plot-generation-with-error-handli-ff2483.md]]"
tags:
  - matplotlib
  - plot generation
  - python
  - claude
  - error handling
  - brain project
  - automation
  - visualization
---

# Matplotlib Plot Generation with Claude in Brain Project

This feature implements a `generatePlot()` function within the `rahilsinghi/brain` repository, following a `slides.ts`-like pattern. It synthesizes wiki context, uses Claude to generate Python scripts for Matplotlib plots, executes them, and includes robust error handling and cleanup for partial output files.

## Key Concepts

Matplotlib plot generation,Claude LLM integration,Python scripting,Error handling,File cleanup,Wiki context synthesis,Brutalist rcParams

## Details

The `generatePlot()` function, residing in the `rahilsinghi/brain` repository, automates the creation of Matplotlib plots. Its workflow mirrors the pattern established by `slides.ts`, emphasizing a structured approach to content generation.

The process begins by synthesizing relevant wiki context, which provides Claude with the necessary information to generate a meaningful plot. Following this, it loads 'brutalist rcParams' – configuration parameters likely designed for a specific aesthetic or style of visualization. Claude is then prompted to generate a Python script tailored for Matplotlib, based on the provided context.

This generated Python script is subsequently written to the `output/plots/{slug}.py` directory. Execution is handled via `uv run --python 3.12`, ensuring a controlled environment for script execution. A critical aspect of this implementation is its robust error handling: in the event of a failure during script execution, any partially generated `.png` output files are automatically cleaned up, preventing clutter and ensuring system integrity. This feature was co-authored with Claude Sonnet 4.6.

## Related

[[Brain Project]],[[Claude How To]],[[CLAUDE.md]],[[Brutalist Visual Templates Integration (Marp, Matplotlib, Mermaid)]],[[Error Handling]],[[Python Scripting]],[[Wiki Context Synthesis]],[[Matplotlib]]
