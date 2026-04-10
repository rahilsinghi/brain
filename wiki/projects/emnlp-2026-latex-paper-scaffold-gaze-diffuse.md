---
title: EMNLP 2026 LaTeX Paper Scaffold – gaze-diffuse
author: ai
created_at: 2026-04-10T02:46:08.929Z
last_ai_edit: 2026-04-10T02:46:08.929Z
last_human_edit: null
last_embedded_hash: c244e92e03bf7797
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-scaffold-emnlp-2026-latex-paper-structure-ba0b64.md]]"
tags:
  - emnlp
  - latex
  - diffusion-lm
  - gaze
  - readability
  - nlp
  - paper-scaffold
  - academic-writing
  - tikz
  - bibtex
  - controlled-generation
  - gaze-diffuse
---


# EMNLP 2026 LaTeX Paper Scaffold – gaze-diffuse

This commit establishes the initial LaTeX paper structure for a submission to EMNLP 2026 within the gaze-diffuse repository. The scaffold includes a full seven-section paper outline, a seed bibliography of ten references, placeholder result tables, and a TikZ method overview diagram. The work appears to focus on diffusion-based language modeling, likely applied to gaze or readability-related tasks.

## Key Concepts

- **LaTeX Paper Scaffolding**: Setting up the structural skeleton of an academic paper using a conference-provided template (EMNLP 2023 style)
- **Diffusion Language Models**: References to MDLM, LLaDA, Diffusion-LM, and PPLM suggest the paper is situated in the discrete or continuous diffusion LM literature
- **Gaze and Readability**: The repo name `gaze-diffuse` and the inclusion of GECO and readability metrics references indicate a gaze-based or cognitively-motivated NLP application
- **BibTeX Bibliography Management**: A curated `references.bib` with 10 foundational entries covering language models, evaluation metrics, and domain-specific datasets
- **TikZ Diagramming**: A placeholder `method_overview.tex` using TikZ for visualizing the proposed model architecture
- **Placeholder-Driven Development**: Results tables and figures contain TBD/placeholder values, representing an early-stage writing workflow

## Details

## Overview

Commit `6155603` in the `rahilsinghi/gaze-diffuse` repository introduces the foundational LaTeX structure for an EMNLP 2026 paper. The commit adds 500 lines across 4 new files and establishes the full scaffolding needed to begin writing and iterating on the paper.

## File Breakdown

### `main.tex`
Uses the EMNLP 2023 official LaTeX template. Contains seven sections, each with TODO-marked outlines:
1. **Introduction**
2. **Related Work**
3. **Method**
4. **Experimental Setup**
5. **Results**
6. **Analysis**
7. **Conclusion** (including Limitations and Ethics statements)

### `references.bib`
Contains 10 bibliography entries covering key related works:
- **Sauberli** – likely a gaze or readability corpus study
- **MDLM** – masked diffusion language model
- **LLaDA** – large language diffusion architecture
- **GECO** – Ghent Eye-tracking Corpus or similar gaze dataset
- **Diffusion-LM** – continuous diffusion for text generation
- **MAUVE** – text generation quality evaluation metric
- **GPT-2** – autoregressive language model baseline
- **BERT** – encoder-based language model
- **PPLM** – plug-and-play language model for controlled generation
- **Readability metrics** – quantitative measures of text complexity

### `tables/results.tex`
A structured methods-vs-metrics comparison table with all result cells currently marked as TBD. This establishes the evaluation framework and expected metrics before experiments are run.

### `figures/method_overview.tex`
A TikZ-based diagram placeholder outlining the spatial layout of the proposed method overview figure. The layout is defined but visual content is not yet filled in.

## Research Context

The combination of gaze corpora (GECO), readability metrics, and diffusion language models (MDLM, LLaDA, Diffusion-LM) suggests this paper may explore **cognitively-plausible text generation** or **readability-controlled diffusion**, potentially evaluating generated text against human gaze patterns as a proxy for cognitive load or fluency.

## Development Notes

- No deletions in this commit; this is a net-new scaffold
- The use of EMNLP 2023 template for a 2026 submission suggests the template may be reused or an updated version will be substituted closer to submission
- TODO placeholders throughout `main.tex` indicate this is an early writing phase

## Related

- [[Diffusion Language Models]]
- [[EMNLP Conference]]
- [[Gaze-Based NLP Evaluation]]
- [[Readability Metrics in NLP]]
- [[MAUVE Evaluation Metric]]
- [[GECO Eye-Tracking Corpus]]
- [[Controlled Text Generation]]
- [[LaTeX Academic Paper Templates]]
- [[TikZ Diagram Design]]
- [[BibTeX Reference Management]]
