---
title: "Gaze-Diffuse Project: Session 3 - Local Training and AR Baseline Results"
author: ai
created_at: 2026-04-13T17:11:41.660Z
last_ai_edit: 2026-04-13T17:11:41.660Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-add-session-3-local-training-ar-baseline-resul-c24efa.md]]"
tags:
  - gaze-diffuse
  - ar-baseline
  - machine-learning
  - pytorch
  - gpt-2
  - development-log
  - experiment
  - mps
  - gaze-predictor
  - lambda-sweep
  - fkgl
  - spearman-correlation
---

# Gaze-Diffuse Project: Session 3 - Local Training and AR Baseline Results

Session 3 of the Gaze-Diffuse project concentrated on establishing the local development environment, training a gaze predictor, and conducting an AR baseline lambda sweep. The team configured Python 3.14, PyTorch 2.11, and MPS, achieving a Spearman correlation of 0.241 for the gaze predictor. Experiments with the AR baseline, utilizing GPT-2 small, indicated a slight FKGL increase with Lambda=+1, but also highlighted the gaze predictor's weakness with Lambda=-1.

## Key Concepts

Local Environment Setup,Gaze Predictor,AR Baseline,Lambda Sweep,Spearman Correlation,Flesch-Kincaid Grade Level (FKGL),MPS (Metal Performance Shaders),GPT-2,PyTorch,Python

## Details

This document outlines the activities and findings from Session 3 of the [[Gaze-Diffuse]] project, conducted from March 26-27, 2026. The session focused on critical infrastructure setup and initial experimental runs.

### Local Environment Setup

**Environment Details:**
*   **Python Version:** 3.14
*   **PyTorch Version:** 2.11
*   **Hardware Acceleration:** [[MPS Support]] (Metal Performance Shaders) enabled for local processing.

### Experimental Runs

**Experiment 2: Gaze Predictor Training**
*   A gaze predictor model was trained locally within the newly established environment.
*   **Result:** Achieved a Spearman correlation coefficient (`r`) of 0.241, indicating a moderate positive correlation.

**Experiment 3: AR Baseline Lambda Sweep**
*   A lambda sweep was performed on the [[AR Baseline]] using 20 samples.
*   The experiment utilized a [[GPT-2]] small model.
*   **Observations:**
    *   **Lambda = +1:** Showed a slight increase in Flesch-Kincaid Grade Level (FKGL), which was considered the correct direction for the desired effect.
    *   **Lambda = -1:** The results were indistinguishable from an unguided baseline, suggesting that the current gaze predictor was too weak to have a noticeable impact under these conditions.

### Bug Fixes

Throughout the session, 6 bugs were identified and successfully resolved, contributing to the stability and functionality of the project.

### Collaborators

This session involved collaborative efforts, co-authored by [[Rahil Singhi]] and [[Claude Opus 4.6]].

## Related

[[Gaze-Diffuse]],[[AR Baseline Fixes: MPS Support and GPT-2 Pad Token]],[[AR Baseline Test Enhancement (b07cd80)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Test Enhancement (b07cd80)]],[[MPS Support]],[[GPT-2]],[[Python]],[[PyTorch]],[[Rahil Singhi]],[[Claude Opus]]
