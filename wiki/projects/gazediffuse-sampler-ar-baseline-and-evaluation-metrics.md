---
title: GazeDiffuse Sampler, AR Baseline, and Evaluation Metrics
author: ai
created_at: 2026-04-13T15:59:49.773Z
last_ai_edit: 2026-04-13T15:59:49.773Z
last_human_edit: null
last_embedded_hash: 6c71c694b5ce1e50
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-gazediffuse-sampler-ar-baseline-and-evaluat-3611db.md]]"
tags:
  - gazediffuse
  - diffusion models
  - language models
  - nlp
  - evaluation
  - metrics
  - deep learning
  - research
  - gpt-2
  - commit
---


# GazeDiffuse Sampler, AR Baseline, and Evaluation Metrics

This commit introduces the `GazeDiffuse` sampler, a novel approach for gaze-guided parallel denoising in masked diffusion language models. It also includes a replication of the Sauberli et al. AR baseline using GPT-2-medium, alongside a comprehensive evaluation pipeline with metrics like FKGL, ARI, MAUVE, and self-perplexity. This enhancement significantly expands the research capabilities and evaluation framework of the `gaze-diffuse` repository.

## Key Concepts

GazeDiffuse sampler,Gaze-guided parallel denoising,Masked Diffusion Language Models (MDLMs),Confidence-based unmasking,Gaze scoring,AR baseline,Sequential token-by-token gaze guidance,GPT-2-medium,Evaluation pipeline,FKGL (Flesch-Kincaid Grade Level),ARI (Automated Readability Index),Sentence-level FK variance,MAUVE (Measure for Automatic Unsupervised Evaluation of Language Generation),Self-perplexity

## Details

This commit (SHA: `9bc0330`) by [[Rahil Singhi]] on 2026-03-12 introduces key components to the `rahilsinghi/gaze-diffuse` repository, with 3 files changed and 939 additions.

-   **`src/gaze_guidance.py`**: This file contains the core novel contribution of the `GazeDiffuse` sampler. It implements gaze-guided parallel denoising for masked diffusion language models, featuring confidence-based unmasking. The gaze scoring mechanism is defined as `log P_LM(token) + λ · gaze(token)`, and includes both generic and native MDLM API variants.
-   **`src/ar_baseline.py`**: This module provides a replication of the Sauberli et al. (EACL 2026) AR baseline, applied to `GPT-2-medium`. This baseline performs sequential token-by-token gaze guidance, allowing for comparative analysis with the parallel denoising approach.
-   **`src/metrics.py`**: This script establishes a full evaluation pipeline for the models. It incorporates several key metrics: FKGL (Flesch-Kincaid Grade Level) and ARI (Automated Readability Index) for readability, sentence-level FK variance to test the claim that parallel methods differ from sequential, MAUVE for distributional similarity, and self-perplexity for coherence.

## Related

[[Rahil Singhi]],[[AR Baseline Fixes: MPS Support and GPT-2 Pad Token]],[[AR Baseline Test Enhancement (b07cd80)]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]]
