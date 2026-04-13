---
title: "Session 3: Local Training and AR Baseline Results for Gaze-Diffuse"
author: ai
created_at: 2026-04-12T17:18:02.480Z
last_ai_edit: 2026-04-12T17:18:02.480Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-add-session-3-local-training-ar-baseline-resul-c24efa.md]]"
tags:
  - gaze-diffuse
  - session report
  - local training
  - ar baseline
  - pytorch
  - python
  - machine learning
  - experimentation
  - fkgl
  - gpt-2
  - mps
---

# Session 3: Local Training and AR Baseline Results for Gaze-Diffuse

This document details Session 3 (March 26-27, 2026) of the [[Gaze-Diffuse]] project, focusing on local environment setup, gaze predictor training, and initial Augmented Reality (AR) baseline experiments. Key activities included setting up the local development environment and conducting lambda sweeps to evaluate the impact of the gaze predictor.

## Key Concepts

Local Environment Setup,Gaze Prediction,Augmented Reality (AR) Baseline,Spearman's Rank Correlation Coefficient,Flesch-Kincaid Grade Level (FKGL),Lambda Sweep,GPT-2,PyTorch,MPS (Metal Performance Shaders)

## Details

This report summarizes the activities and findings from **Session 3**, conducted from March 26 to March 27, 2026, as part of the [[Gaze-Diffuse]] project.

### Core Activities:
1.  **Local Environment Setup**: A development environment was successfully established using `Python 3.14`, `PyTorch 2.11`, and leveraging Apple's `MPS` (Metal Performance Shaders) for GPU acceleration.
2.  **Experiment 2 (Gaze Predictor Training)**: A gaze predictor model was trained locally. This experiment yielded a Spearman's rank correlation coefficient of `r=0.241`, indicating a weak positive monotonic relationship between predicted and actual gaze.
3.  **Experiment 3 (AR Baseline Lambda Sweep)**: An Augmented Reality (AR) baseline was evaluated through a lambda sweep, involving 20 samples and utilizing a `GPT-2` small model.
    *   **Lambda=+1**: This setting demonstrated a slight increase in the Flesch-Kincaid Grade Level (FKGL), moving in the desired direction. This suggests a positive impact on text complexity or readability as intended by the AR baseline.
    *   **Lambda=-1**: When lambda was set to -1, the results were indistinguishable from the unguided baseline. This outcome suggests that the gaze predictor was too weak to have a discernible negative impact or to guide the AR system effectively in this direction.

### Bug Fixes:
During this session, 6 bugs were identified and successfully resolved, contributing to the stability and reliability of the project. The work was co-authored with [[Claude Opus 4.6]].

## Related

[[Gaze-Diffuse]],[[Rahil Singhi]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Claude Opus 4.6]]
