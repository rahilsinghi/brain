---
title: Gaze-Diffuse Project Documentation and Experiment Plan
author: ai
created_at: 2026-04-12T21:26:14.385Z
last_ai_edit: 2026-04-12T21:26:14.385Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-add-comprehensive-readme-with-method-experiments-528176.md]]"
tags:
  - gaze-diffuse
  - documentation
  - readme
  - diffusion models
  - language models
  - natural language generation
  - experiment design
  - hpc
  - gaze tracking
---

# Gaze-Diffuse Project Documentation and Experiment Plan

This document outlines the initial comprehensive README for the `gaze-diffuse` project, detailing the core algorithm, experimental plan, and setup instructions. It introduces the first gaze-guided generation for masked diffusion LMs using parallel denoising with λ-controlled readability.

## Key Concepts

Gaze-guided generation,Masked Diffusion Language Models (LMs),Parallel Denoising,Lambda-controlled Readability,FKGL (Flesch-Kincaid Grade Level),MAUVE (Measure of Automatic Unsupervised Evaluation),Self-Perplexity (self-PPL),FK Variance,Torch HPC,EMNLP

## Details

This commit (`7c47372`) from the `rahilsinghi/gaze-diffuse` repository introduces a comprehensive README file, significantly enhancing the project's documentation. The primary goal of the `gaze-diffuse` project is to implement the first gaze-guided generation for masked diffusion Language Models. The core algorithm relies on **parallel denoising** combined with **λ-controlled readability** to achieve this. 

### Documentation Highlights:

*   **Core Algorithm**: Detailed explanation of the parallel denoising mechanism and how λ-controlled readability is integrated into the generation process.
*   **Results Table Template**: A standardized template for reporting experimental results, including metrics such as: 
    *   **FKGL**: Flesch-Kincaid Grade Level (for readability).
    *   **MAUVE**: Measure of Automatic Unsupervised Evaluation (for generation quality).
    *   **Self-PPL**: Self-Perplexity (for model coherence).
    *   **FK variance**: Flesch-Kincaid variance.
*   **Installation Guide**: Comprehensive instructions for setting up the project environment for both local development and deployment on the [[NYU]] [[Torch HPC]] cluster.
*   **Project Structure**: An overview of the repository layout and organization.
*   **Experiment Plan**: A detailed outline of five distinct experiments designed to validate and evaluate the gaze-guided generation approach.
*   **Timeline**: A projected schedule for project milestones and experiment execution.
*   **Related Work Positioning**: A section contextualizing `gaze-diffuse` by comparing its approach to existing research, specifically against: 
    *   Sauberli
    *   MDLM (Masked Diffusion Language Models)
    *   LLaDA
    *   [[Diffusion-LM]]
*   **Citation Information**: The project is targeting submission to [[EMNLP]] 2026.

This documentation ensures clear understanding of the project's methodology, facilitates reproducibility, and guides future development and evaluation.

## Related

[[NYU]],[[Diffusion-LM]],[[EMNLP]]
