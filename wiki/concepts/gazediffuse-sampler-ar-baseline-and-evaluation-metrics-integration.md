---
title: GazeDiffuse Sampler, AR Baseline, and Evaluation Metrics Integration
author: ai
created_at: 2026-04-13T17:21:56.251Z
last_ai_edit: 2026-04-13T17:21:56.251Z
last_human_edit: null
last_embedded_hash: fb86e3f61ede92d9
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-gazediffuse-sampler-ar-baseline-and-evaluat-3611db.md]]"
tags:
  - gazediffuse
  - ar baseline
  - masked diffusion lms
  - nlp
  - evaluation metrics
  - gpt-2
  - gaze guidance
  - denoising
  - natural language generation
---


# GazeDiffuse Sampler, AR Baseline, and Evaluation Metrics Integration

This update introduces the GazeDiffuse sampler, an AR baseline for masked diffusion language models (MDLMs), and a comprehensive suite of evaluation metrics. It enhances the `gaze-diffuse` repository by providing novel gaze-guided parallel denoising, a sequential gaze guidance baseline, and tools to evaluate coherence, fluency, and distributional similarity.

## Key Concepts

Gaze-guided parallel denoising,Masked Diffusion Language Models (MDLMs),Confidence-based unmasking,Gaze scoring,Sequential token-by-token gaze guidance (AR Baseline),FKGL (Flesch-Kincaid Grade Level),ARI (Automated Readability Index),Sentence-level FK variance,MAUVE (Measure of Automatic Unsupervised Evaluation),Self-perplexity

## Details

This commit, originating from the `rahilsinghi/gaze-diffuse` repository (SHA: `9bc0330`), significantly enhances the project's capabilities by introducing a novel gaze-guided sampler, a robust autoregressive (AR) baseline, and a comprehensive evaluation pipeline.

### Core Contributions:

*   **`src/gaze_guidance.py`**: This file implements the core novel contribution: **gaze-guided parallel denoising** for masked diffusion language models (MDLMs). It introduces a confidence-based unmasking mechanism, where tokens are scored using a combination of the language model's probability and a gaze score (`score = log P_LM(token) + λ · gaze(token)`). This allows for a more focused and context-aware generation process. The implementation supports both generic and native MDLM API variants.

*   **`src/ar_baseline.py`**: This module establishes an autoregressive baseline, replicating the sequential token-by-token gaze guidance approach described by Sauberli et al. (EACL 2026). It is specifically implemented and tested on a `GPT-2-medium` model, providing a point of comparison for the novel parallel denoising method.

*   **`src/metrics.py`**: A full evaluation pipeline is integrated to assess the performance of the language models. This includes metrics such as:
    *   **FKGL** (Flesch-Kincaid Grade Level) and **ARI** (Automated Readability Index) for readability.
    *   **Sentence-level FK variance** to test a key paper claim that parallel denoising offers advantages over sequential methods in terms of fluency and naturalness.
    *   **MAUVE** for distributional similarity, comparing generated text distributions to reference distributions.
    *   **Self-perplexity** for measuring the coherence and fluency of the generated text.

These additions lay the groundwork for advanced research and development in gaze-guided text generation and evaluation.

## Related

[[Gaze-Diffuse]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Fixes: MPS Support and GPT-2 Pad Token]],[[GPT-2]],[[Rahil Singhi]]
