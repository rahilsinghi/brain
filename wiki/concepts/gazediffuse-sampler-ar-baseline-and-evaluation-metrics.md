---
title: GazeDiffuse Sampler, AR Baseline, and Evaluation Metrics
author: ai
created_at: 2026-04-11T00:24:45.311Z
last_ai_edit: 2026-04-11T00:24:45.311Z
last_human_edit: null
last_embedded_hash: 2a7e4a5904945a29
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-gazediffuse-sampler-ar-baseline-and-evaluat-3611db.md]]"
tags:
  - gazediffuse
  - natural language generation
  - masked diffusion models
  - evaluation metrics
  - autoregressive baseline
  - machine learning
  - research
---


# GazeDiffuse Sampler, AR Baseline, and Evaluation Metrics

This commit introduces the core GazeDiffuse sampler, an AR (Autoregressive) baseline replication, and a comprehensive suite of evaluation metrics for the `rahilsinghi/gaze-diffuse` project. The GazeDiffuse sampler employs gaze-guided parallel denoising for masked diffusion LMs, using a confidence-based unmasking strategy. The AR baseline replicates the sequential gaze guidance approach from Sauberli et al. (EACL 2026).

## Key Concepts

Gaze-guided parallel denoising,Masked Diffusion Language Models (MDLMs),Confidence-based unmasking,Gaze scoring,Autoregressive (AR) baseline,Evaluation metrics (FKGL, ARI, sentence-level FK variance, MAUVE, self-perplexity),Natural Language Generation (NLG)

## Details

This significant commit (SHA: `9bc0330`) within the `rahilsinghi/gaze-diffuse` repository establishes key components for the project's research into gaze-guided text generation.

### `src/gaze_guidance.py`
This file contains the novel contribution of the GazeDiffuse project: a gaze-guided parallel denoising mechanism for masked diffusion language models (MDLMs). It introduces a `gaze_scoring` function that combines the log probability of a token from the language model with a lambda-weighted gaze score (`score = log P_LM(token) + λ · gaze(token)`). This scoring is used in a confidence-based unmasking strategy during the denoising process. Both generic and native MDLM API variants are implemented to ensure broad applicability.

### `src/ar_baseline.py`
This module provides a replication of the autoregressive (AR) baseline method described by Sauberli et al. in their EACL 2026 paper. Specifically, it implements a sequential token-by-token gaze guidance approach using a GPT-2-medium model, allowing for direct comparison with the novel GazeDiffuse approach.

### `src/metrics.py`
This file defines the full evaluation pipeline for assessing the performance of the text generation models. The metrics included are:

*   **FKGL (Flesch-Kincaid Grade Level)**: A readability formula to estimate the comprehensibility of text.
*   **ARI (Automated Readability Index)**: Another readability test, useful for evaluating text complexity.
*   **Sentence-level FK variance**: A key metric to test the paper's claim that parallel denoising (GazeDiffuse) leads to lower variance in readability compared to sequential methods.
*   **MAUVE**: A metric for comparing the distributional similarity between generated and human text, useful for assessing generation quality and diversity.
*   **Self-perplexity**: Measures the coherence and fluency of the generated text by evaluating the likelihood of the text under its own language model.

## Related

[[AR Baseline Test Enhancement (b07cd80)]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]],[[EMNLP 2026 LaTeX Paper Scaffold – gaze-diffuse]],[[EMNLP 2026 Paper Structure Scaffold (gaze-diffuse)]],[[Data Layer for Gaze-Diffuse: GECO Corpus Loader and Prompt Seeds]],[[gaze-diffuse]]
