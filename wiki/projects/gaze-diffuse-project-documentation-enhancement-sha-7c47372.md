---
title: "Gaze-Diffuse Project Documentation Enhancement (SHA: 7c47372)"
author: ai
created_at: 2026-04-10T22:09:18.117Z
last_ai_edit: 2026-04-10T22:09:18.117Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-add-comprehensive-readme-with-method-experiments-528176.md]]"
tags:
  - documentation
  - readme
  - gaze-guided generation
  - diffusion models
  - language models
  - natural language generation
  - denoising
  - hpc
  - emnlp
  - project overview
  - experiments
---

# Gaze-Diffuse Project Documentation Enhancement (SHA: 7c47372)

This commit significantly enhances the README for the `rahilsinghi/gaze-diffuse` project, providing comprehensive documentation for its novel gaze-guided generation approach for masked diffusion language models. It details the core algorithm, experimental setup, and positions the work against relevant prior research. The documentation aims to facilitate understanding and replication of the project.

## Key Concepts

Gaze-guided generation,Masked Diffusion Language Models (LMs),Parallel denoising,λ-controlled readability,FKGL (Flesch-Kincaid Grade Level),MAUVE score,Self-PPL (Self-Perplexity),FK Variance

## Details

This commit (SHA: 7c47372) by Rahil Singhi, dated 2026-03-12, introduces a comprehensive `README.md` file to the `rahilsinghi/gaze-diffuse` repository. The update involves 182 additions across a single file, establishing a robust overview of the project.

The core innovation presented by Gaze-Diffuse is the first system for gaze-guided generation tailored for masked diffusion LMs. The README elaborates on the central algorithm, which employs parallel denoising combined with λ-controlled readability to influence the generation process.

Key documentation points include:

*   **Algorithm Description**: Detailed explanation of the parallel denoising approach and the role of λ-controlled readability.
*   **Experimental Design**: An outline of 5 planned experiments and a template for reporting results, including metrics such as FKGL, MAUVE, self-PPL, and FK variance.
*   **Setup Instructions**: Comprehensive guides for setting up the project both for local development and on NYU Torch HPC clusters.
*   **Project Structure & Timeline**: An overview of the repository's organization and a proposed timeline for development and experimentation.
*   **Related Work**: A section dedicated to positioning Gaze-Diffuse within the existing landscape of research, contrasting it with projects like Sauberli, MDLM, LLaDA, and Diffusion-LM.
*   **Citation Target**: The project is slated for submission to EMNLP 2026.

## Related

[[Rahil Singhi]],[[Gaze-Diffuse]],[[Masked Diffusion LMs]],[[Parallel Denoising]],[[Sauberli (Research)]],[[MDLM (Research)]],[[LLaDA (Research)]],[[Diffusion-LM (Research)]],[[NYU Torch HPC]],[[EMNLP 2026]]
