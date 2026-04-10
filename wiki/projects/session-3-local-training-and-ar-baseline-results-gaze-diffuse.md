---
title: "Session 3: Local Training and AR Baseline Results — gaze-diffuse"
author: ai
created_at: 2026-04-10T02:50:47.760Z
last_ai_edit: 2026-04-10T02:50:47.760Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-add-session-3-local-training-ar-baseline-resul-c24efa.md]]"
tags:
  - gaze-diffuse
  - machine-learning
  - nlp
  - gaze-prediction
  - autoregressive-generation
  - gpt-2
  - pytorch
  - experiment-results
  - readability
  - mps
  - local-training
  - session-notes
---

# Session 3: Local Training and AR Baseline Results — gaze-diffuse

Session 3 of the gaze-diffuse project covers local environment setup and two experiments: training a gaze predictor locally and running an autoregressive baseline with a lambda sweep. Results show limited but directionally correct guidance effects, with the gaze predictor identified as a bottleneck.

## Key Concepts

- **Gaze Predictor**: A model trained to predict gaze patterns, evaluated using Spearman rank correlation (r=0.241 in local training)
- **AR Baseline (Autoregressive Baseline)**: A GPT-2 small model used as a baseline for guided text generation
- **Lambda Sweep**: Experiment varying the guidance strength parameter (lambda) to assess its effect on output text
- **FKGL (Flesch-Kincaid Grade Level)**: Readability metric used to evaluate the effect of gaze-guided generation
- **MPS (Metal Performance Shaders)**: Apple GPU acceleration backend used in the local PyTorch environment
- **Spearman Correlation**: Rank-based correlation metric used to evaluate gaze predictor performance

## Details

## Session Overview

**Date:** 2026-03-26/27  
**Commit:** `bb922df` on [rahilsinghi/gaze-diffuse](https://github.com/rahilsinghi/gaze-diffuse)  
**Author:** Rahil Singhi (co-authored with Claude Opus 4.6)

---

## Environment Setup

The local development environment was configured with:
- **Python** 3.14
- **PyTorch** 2.11
- **Backend:** MPS (Apple Metal Performance Shaders for GPU acceleration)

---

## Experiment 2: Local Gaze Predictor Training

The gaze predictor was trained locally, yielding a **Spearman r = 0.241**. This relatively low correlation indicates the predictor has limited strength, which directly impacts downstream guidance quality.

---

## Experiment 3: AR Baseline Lambda Sweep

An autoregressive baseline was evaluated using **GPT-2 small** across 20 samples, sweeping the guidance lambda parameter:

| Lambda | Outcome |
|--------|------------------------------------------|
| +1 | Slight FKGL increase (correct direction) |
| -1 | Indistinguishable from unguided baseline |

### Key Findings
- A positive lambda (+1) nudges generation in the intended direction, as indicated by an increase in FKGL scores.
- A negative lambda (-1) fails to produce a measurable effect, attributed to the weakness of the current gaze predictor.
- The predictor's low Spearman correlation (r=0.241) is identified as the primary limiting factor for guidance effectiveness.

---

## Bug Fixes

A total of **6 bugs** were identified and resolved during this session.

---

## Code Changes

- **Files changed:** 1
- **Additions:** +73 lines
- **Deletions:** -3 lines

## Related

- [[gaze-diffuse Project]]
- [[Rahil Singhi]]
- [[Gaze Predictor Training]]
- [[Autoregressive Text Generation]]
- [[GPT-2 Baseline]]
- [[Lambda Guidance Sweep]]
- [[Flesch-Kincaid Grade Level]]
- [[Spearman Correlation]]
- [[Session 2: gaze-diffuse]]
- [[Session 4: gaze-diffuse]]
