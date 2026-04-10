---
title: "Gaze-Diffuse Session 3: Local Training & AR Baseline Results"
author: ai
created_at: 2026-04-10T02:51:51.805Z
last_ai_edit: 2026-04-10T02:51:51.805Z
last_human_edit: null
last_embedded_hash: d4e2ee8c2623e5d2
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
  - mps
  - experiment-log
  - readability
  - fkgl
  - lambda-sweep
  - session-notes
---


# Gaze-Diffuse Session 3: Local Training & AR Baseline Results

Session 3 of the gaze-diffuse project focused on local environment setup and early experimental results for gaze-guided text generation. Experiments included training a gaze predictor locally and running an autoregressive baseline with lambda sweeps using GPT-2 small. Results showed weak but directionally correct guidance signals, with six bugs identified and resolved.

## Key Concepts

- **Gaze Predictor**: A model trained to predict gaze patterns, evaluated using Spearman rank correlation (r=0.241), indicating weak but non-zero predictive signal
- **AR Baseline (Autoregressive Baseline)**: A GPT-2 small-based generation approach guided by a lambda-weighted gaze signal
- **Lambda Sweep**: Experiment varying the guidance strength parameter (lambda) to assess its effect on generated text properties
- **FKGL (Flesch-Kincaid Grade Level)**: A readability metric used to evaluate the effect of gaze guidance on text complexity
- **MPS (Metal Performance Shaders)**: Apple's GPU acceleration backend used for local PyTorch training
- **Spearman Correlation**: Non-parametric rank correlation metric used to evaluate gaze predictor performance

## Details

## Session Overview

**Date:** 2026-03-26 to 2026-03-27
**Repository:** rahilsinghi/gaze-diffuse
**Commit:** bb922df
**Author:** Rahil Singhi (co-authored with Claude Opus 4.6)

---

## Environment Setup

A local development environment was configured with the following stack:
- **Python** 3.14
- **PyTorch** 2.11
- **Acceleration:** MPS (Apple Metal Performance Shaders)

---

## Experiment 2: Local Gaze Predictor Training

A gaze predictor model was trained locally on the MPS backend. Performance was evaluated using Spearman rank correlation:

- **Spearman r = 0.241**

This result indicates a weak but statistically meaningful correlation, suggesting the predictor captures some signal but is not yet strong enough to robustly guide generation.

---

## Experiment 3: AR Baseline Lambda Sweep

An autoregressive (AR) baseline was tested using GPT-2 small over 20 samples with varying lambda values:

| Lambda | Outcome |
|--------|--------|
| +1 | Slight FKGL increase observed — correct direction of guidance |
| -1 | Indistinguishable from unguided generation — predictor signal too weak |

### Interpretation
- The **lambda=+1** result confirms the guidance mechanism is functioning in the intended direction, increasing text complexity as measured by FKGL.
- The **lambda=-1** result highlights a core limitation: the gaze predictor's weak correlation (r=0.241) is insufficient to produce a detectable negative guidance effect.
- Improving predictor strength is a clear next step before further lambda tuning is meaningful.

---

## Bug Fixes

Six bugs were identified and resolved during this session. Specific details are not enumerated in the commit summary but were incorporated into the +73 line additions to the documentation.

## Related

- [[Gaze-Diffuse Project]]
- [[Gaze Predictor Model]]
- [[Autoregressive Text Generation]]
- [[GPT-2]]
- [[Flesch-Kincaid Grade Level]]
- [[Spearman Rank Correlation]]
- [[PyTorch MPS Backend]]
- [[Rahil Singhi]]
- [[Claude Opus 4.6]]
