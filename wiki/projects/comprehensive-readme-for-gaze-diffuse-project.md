---
title: Comprehensive README for Gaze-Diffuse Project
author: ai
created_at: 2026-04-13T17:15:47.060Z
last_ai_edit: 2026-04-13T17:15:47.060Z
last_human_edit: null
last_embedded_hash: 0c5be53be5ee0340
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-add-comprehensive-readme-with-method-experiments-528176.md]]"
tags:
  - documentation
  - readme
  - gaze-diffuse
  - llm
  - diffusion models
  - natural language generation
  - experimentation
  - metrics
  - nyu torch hpc
  - rahil singhi
---


# Comprehensive README for Gaze-Diffuse Project

This document outlines the first gaze-guided generation for masked diffusion language models within the `gaze-diffuse` project. It details the core algorithm, parallel denoising with λ-controlled readability, and provides a template for result metrics like FKGL, MAUVE, and self-PPL. The README also covers installation, project structure, experiment plans, and positions the work against related research.

## Key Concepts

Gaze-guided generation,Masked diffusion LMs,Parallel denoising,λ-controlled readability,FKGL (Flesch-Kincaid Grade Level),MAUVE score,Self-PPL (Self-Perplexity),NYU Torch HPC,Experiment plan,Related work positioning

## Details

A comprehensive `README.md` file has been added to the `rahilsinghi/gaze-diffuse` repository (SHA: `7c47372`). This documentation serves as a foundational guide for understanding, setting up, and experimenting with the project.

**Key Aspects Covered:**

*   **Core Algorithm**: The document highlights the project's central innovation: the first implementation of gaze-guided generation specifically for masked diffusion language models. The algorithm employs parallel denoising, incorporating λ-controlled readability to influence the generated text's complexity and style.
*   **Result Metrics**: A standardized template for reporting results is provided, focusing on key linguistic and generation quality metrics such as Flesch-Kincaid Grade Level (FKGL), MAUVE score, self-perplexity (self-PPL), and FK variance. This ensures consistent evaluation across experiments.
*   **Installation Guide**: Detailed instructions are included for setting up the project environment, catering to both local development setups and deployment on the NYU Torch High-Performance Computing (HPC) cluster.
*   **Project Structure and Experimentation**: The README delineates the overall project structure, offering clarity on module organization. It also outlines a five-experiment plan, providing a roadmap for future research and development, complete with a timeline.
*   **Related Work and Positioning**: The document strategically positions `gaze-diffuse` by discussing its relationship to and differentiation from existing work in the field, including projects like Sauberli, MDLM (Masked Diffusion Language Models), LLaDA, and Diffusion-LM.
*   **Citation Target**: The work is being prepared for submission, with EMNLP 2026 targeted as the publication venue.

## Related

[[Gaze-Diffuse]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]],[[NYU Torch HPC]],[[Masked Diffusion Language Models]],[[EMNLP]]
