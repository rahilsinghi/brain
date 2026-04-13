---
title: "Gaze-Diffuse: Session 3 Report on Local Training and AR Baseline Results"
author: ai
created_at: 2026-04-13T15:30:41.282Z
last_ai_edit: 2026-04-13T15:30:41.282Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-add-session-3-local-training-ar-baseline-resul-c24efa.md]]"
tags:
  - gaze-diffuse
  - machine learning
  - nlp
  - training
  - experiments
  - ar baseline
  - gaze predictor
  - fkgl
  - pytorch
  - python
  - mps
  - gpt-2
  - development
  - bug fix
---

# Gaze-Diffuse: Session 3 Report on Local Training and AR Baseline Results

Session 3 of the Gaze-Diffuse project focused on setting up a local development environment, training a gaze predictor, and conducting an AR baseline lambda sweep. The local gaze predictor achieved a Spearman r of 0.241, while the AR baseline experiment demonstrated a slight FKGL increase with lambda=+1 using GPT-2 small. The session also successfully identified and resolved six bugs.

## Key Concepts

Local Training Environment,AR Baseline,Gaze Predictor,Spearman Correlation,Flesch-Kincaid Grade Level (FKGL),Lambda Sweep,GPT-2 small,MPS (Metal Performance Shaders),PyTorch,Python 3.14

## Details

This document summarizes the activities and findings from Session 3 of the [[Gaze-Diffuse]] project, conducted on March 26-27, 2026.

**Local Environment Setup**

The local development environment was successfully configured with [[Python]] 3.14 and [[PyTorch]] 2.11, leveraging [[MPS]] (Metal Performance Shaders) for accelerated computation.

**Experiment 2: Gaze Predictor Training**

A gaze predictor model was trained locally, achieving a [[Spearman correlation]] coefficient of r=0.241. This indicates a moderate positive correlation between predicted and actual gaze.

**Experiment 3: AR Baseline Lambda Sweep**

An [[AR Baseline]] experiment was conducted, involving a lambda sweep across 20 samples using a [[GPT-2]] small model. The primary objective was to observe the impact of different lambda values on the generated text's complexity, measured by [[Flesch-Kincaid Grade Level (FKGL)]].

*   **Lambda = +1**: Showed a slight increase in FKGL, indicating that the manipulation was moving in the desired direction (towards more complex text).
*   **Lambda = -1**: The results were indistinguishable from the unguided baseline. This suggests that the predictor might currently be too weak to induce a noticeable effect when attempting to decrease text complexity.

**Bug Fixes**

During this session, six bugs were identified and successfully fixed, contributing to the overall stability and reliability of the project. This work contributes to the ongoing [[AR Baseline Test Enhancement (Gaze-Diffuse)]] and incorporates learnings from [[AR Baseline Fixes: MPS Support and GPT-2 Pad Token]].

*Co-Authored by [[Claude Opus 4.6]]*

## Related

[[Gaze-Diffuse]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Fixes: MPS Support and GPT-2 Pad Token]],[[Python]],[[PyTorch]],[[GPT-2]],[[Claude Opus]]
