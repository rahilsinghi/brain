---
title: "Gaze-Diffuse Session 3: Local Training and AR Baseline Results"
author: ai
created_at: 2026-04-12T21:19:01.850Z
last_ai_edit: 2026-04-12T21:19:01.850Z
last_human_edit: null
last_embedded_hash: 26728fd68fcf9ed5
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-add-session-3-local-training-ar-baseline-resul-c24efa.md]]"
tags:
  - gaze-diffuse
  - training
  - ar-baseline
  - development-environment
  - bug-fixing
  - gpt-2
  - pytorch
  - mps
---


# Gaze-Diffuse Session 3: Local Training and AR Baseline Results

This session detailed the setup of a local development environment for the Gaze-Diffuse project, including Python 3.14, PyTorch 2.11, and MPS. It reported on the training of a gaze predictor achieving a Spearman r=0.241 and an AR baseline lambda sweep using GPT-2 small, which showed a slight FKGL increase for positive lambda values. The session also noted the identification and resolution of six bugs.

## Key Concepts

[[Gaze-Diffuse]],Local training,AR baseline,MPS (Metal Performance Shaders),GPT-2,Spearman correlation,FKGL (Flesch-Kincaid Grade Level)

## Details

This session, conducted on March 26-27, 2026, focused on progress within the `rahilsinghi/gaze-diffuse` repository.

**Key activities and findings:**

*   **Local Environment Setup:** A development environment was successfully configured locally, utilizing Python 3.14, PyTorch 2.11, and MPS (Metal Performance Shaders) for accelerated processing.
*   **Gaze Predictor Training (Exp 2):** A gaze predictor was trained locally, achieving a Spearman correlation coefficient of r=0.241.
*   **AR Baseline Lambda Sweep (Exp 3):** An AR baseline sweep was performed across 20 samples using a GPT-2 small model to evaluate the effect of different lambda values.
    *   A lambda value of +1 showed a slight increase in FKGL (Flesch-Kincaid Grade Level), indicating a move in the desired direction.
    *   A lambda value of -1 resulted in output indistinguishable from unguided generation, suggesting the current predictor's weakness in negative guidance.
*   **Bug Resolution:** Six bugs identified during the session were successfully fixed.

## Related

[[Gaze-Diffuse]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]]
