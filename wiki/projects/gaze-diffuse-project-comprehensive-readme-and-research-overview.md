---
title: "Gaze-Diffuse Project: Comprehensive README and Research Overview"
author: ai
created_at: 2026-04-13T15:38:29.644Z
last_ai_edit: 2026-04-13T15:38:29.644Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-add-comprehensive-readme-with-method-experiments-528176.md]]"
tags:
  - documentation
  - readme
  - gaze-diffuse
  - diffusion models
  - natural language generation
  - research
  - experiments
  - emnlp
  - nyu torch hpc
---

# Gaze-Diffuse Project: Comprehensive README and Research Overview

This update introduces a comprehensive README to the `gaze-diffuse` repository, detailing the project's core methodology, experimental plan, and positioning within existing research. It outlines the first gaze-guided generation approach for masked diffusion language models using parallel denoising with λ-controlled readability. The README also includes setup instructions for local development and NYU Torch HPC, along with a target timeline for EMNLP 2026.

## Key Concepts

[[gaze-diffuse]],Gaze-guided generation,Masked Diffusion LMs,Parallel denoising,λ-controlled readability,FKGL (Flesch-Kincaid Grade Level),MAUVE score,Self-PPL (Self-Perplexity),NYU Torch HPC,[[EMNLP 2026]]

## Details

This documentation update for the `gaze-diffuse` project (SHA: `7c47372`) provides a detailed overview of the research and its implementation. The core innovation lies in achieving the first gaze-guided generation for masked diffusion LMs, employing a **parallel denoising** strategy with a parameter `λ` to control readability.

### Key Components of the README:

*   **Core Algorithm**: Focuses on parallel denoising, a novel approach for generating text guided by gaze data, ensuring `λ`-controlled readability in the output.
*   **Evaluation Metrics**: A results table template is provided, anticipating evaluation using metrics such as [[FKGL]], [[MAUVE]], [[Self-PPL]], and FK variance to assess text quality and readability.
*   **Installation Guide**: Comprehensive instructions are included for setting up the project environment for both local development and deployment on the [[NYU Torch HPC]] cluster.
*   **Project Structure and Experiment Plan**: Details the repository's organization and outlines five specific experiments designed to validate the model's performance and capabilities.
*   **Timeline**: Sets a target for submission to [[EMNLP 2026]], indicating the project's research ambitions.
*   **Related Work Positioning**: Clearly differentiates `gaze-diffuse` from existing models and research, including [[Sauberli]], [[MDLM]], [[LLaDA]], and [[Diffusion-LM]], highlighting its unique contributions.

## Related

[[gaze-diffuse]],[[NYU Torch HPC]],[[EMNLP 2026]],AR Baseline Test Enhancement (Gaze-Diffuse),AR Baseline Test Strengthening in Gaze-Diffuse,Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse
