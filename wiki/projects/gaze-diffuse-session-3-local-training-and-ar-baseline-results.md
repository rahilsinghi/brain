---
title: "Gaze-Diffuse Session 3: Local Training and AR Baseline Results"
author: ai
created_at: 2026-04-10T02:53:35.363Z
last_ai_edit: 2026-04-10T02:53:35.363Z
last_human_edit: null
last_embedded_hash: 8eee1d74c580846a
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-add-session-3-local-training-ar-baseline-resul-c24efa.md]]"
tags:
  - gaze-diffuse
  - machine-learning
  - gaze-prediction
  - autoregressive-generation
  - gpt-2
  - pytorch
  - mps
  - readability
  - fkgl
  - lambda-sweep
  - experiment-tracking
  - nlp
  - session-notes
---


# Gaze-Diffuse Session 3: Local Training and AR Baseline Results

Session 3 of the gaze-diffuse project covers local environment setup and two key experiments: training a gaze predictor locally and running an autoregressive baseline lambda sweep. Results show a weak gaze predictor (Spearman r=0.241) and mixed AR baseline performance, with positive lambda showing directionally correct FKGL increases but negative lambda indistinguishable from unguided generation.

## Key Concepts

- **Local Environment Setup**: Python 3.14, PyTorch 2.11, and MPS (Apple Metal Performance Shaders) backend
- **Gaze Predictor**: A model trained to predict gaze patterns, evaluated with Spearman rank correlation (r=0.241)
- **AR Baseline**: Autoregressive baseline using GPT-2 small with lambda-guided generation over 20 samples
- **Lambda Sweep**: Hyperparameter search over lambda values (+1, -1) to control gaze-guided text generation
- **FKGL (Flesch-Kincaid Grade Level)**: Readability metric used to assess the effect of gaze guidance on generated text
- **Spearman Correlation**: Non-parametric measure of rank correlation used to evaluate predictor quality

## Details

## Overview

Session 3 was conducted on 2026-03-26/27 and documented in commit `bb922df` to the `rahilsinghi/gaze-diffuse` repository. The session involved 73 additions and 3 deletions across 1 file, with 6 bugs found and fixed.

## Environment Setup

A local development environment was configured with the following stack:
- **Python**: 3.14
- **PyTorch**: 2.11
- **Backend**: MPS (Apple Metal Performance Shaders) for GPU acceleration on Apple Silicon

## Experiment 2: Local Gaze Predictor Training

The gaze predictor was trained locally in this session. Evaluation using Spearman rank correlation yielded **r=0.241**, indicating a weak but positive correlation between predicted and actual gaze patterns. This limited predictive power has downstream implications for guided generation quality.

## Experiment 3: AR Baseline Lambda Sweep

An autoregressive baseline was evaluated using GPT-2 small across 20 samples, with a sweep over lambda values:

| Lambda | Observation |
|--------|-------------|
| +1 | Slight FKGL increase observed — directionally correct, suggesting gaze guidance influences readability |
| -1 | Indistinguishable from unguided generation — attributed to the predictor being too weak |

### Key Takeaways
- The positive lambda result is encouraging but modest, suggesting gaze-conditioning has a real but small effect.
- The failure of lambda=-1 to produce a distinguishable result highlights the bottleneck of predictor quality (r=0.241).
- Improving the gaze predictor is a likely prerequisite for stronger lambda-guided effects in either direction.

## Bug Fixes

Six bugs were identified and resolved during this session. Specific details are not documented in the commit message.

## Collaboration

This session was co-authored with Claude Opus 4.6 (Anthropic).

## Related

- [[Gaze-Diffuse Project]]
- [[Rahil Singhi]]
- [[Gaze Predictor Training]]
- [[Autoregressive Baseline]]
- [[GPT-2 Small]]
- [[Lambda-Guided Text Generation]]
- [[Flesch-Kincaid Grade Level]]
- [[Spearman Correlation]]
- [[Apple MPS Backend]]
- [[Session 2 Gaze-Diffuse]]
