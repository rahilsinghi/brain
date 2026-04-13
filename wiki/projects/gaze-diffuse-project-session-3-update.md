---
title: "Gaze-diffuse Project: Session 3 Update"
author: ai
created_at: 2026-04-10T18:08:28.680Z
last_ai_edit: 2026-04-10T18:08:28.680Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-add-session-3-local-training-ar-baseline-resul-c24efa.md]]"
tags:
  - gaze-diffuse
  - session 3
  - gaze predictor
  - training
  - ar baseline
  - lambda sweep
  - gpt-2
  - pytorch
  - mps
  - rahil singhi
  - claude opus
  - "2026"
---

# Gaze-diffuse Project: Session 3 Update

This update covers Session 3 (March 26-27, 2026) of the Gaze-diffuse project, focusing on local environment setup, gaze predictor training, and AR baseline lambda sweep results. The local gaze predictor achieved a Spearman r of 0.241, and preliminary AR baseline tests with GPT-2 small showed positive FKGL changes for lambda=+1. Several bugs were also addressed.

## Key Concepts

Local environment setup,Gaze predictor,Spearman correlation coefficient,AR baseline,Lambda sweep,GPT-2 small,FKGL (Flesch-Kincaid Grade Level),PyTorch,MPS (Metal Performance Shaders)

## Details

This entry documents the progress made during Session 3 of the `rahilsinghi/gaze-diffuse` project, spanning March 26th-27th, 2026. This commit (SHA: `bb922df`) involved 1 file change, with +73 additions and -3 deletions, authored by Rahil Singhi and co-authored by Claude Opus 4.6.

**Key Activities and Outcomes of Session 3:**

*   **Local Environment Setup:** The development environment was successfully configured locally, utilizing Python 3.14, PyTorch 2.11, and Apple's Metal Performance Shaders (MPS) for accelerated computing.
*   **Experiment 2: Local Gaze Predictor Training:**
    *   A gaze predictor model was trained locally.
    *   The model achieved a Spearman correlation coefficient (r) of **0.241**, indicating a moderate positive monotonic relationship.
*   **Experiment 3: AR Baseline Lambda Sweep:**
    *   A sweep of the lambda parameter for the AR baseline was conducted.
    *   The experiment involved 20 samples and utilized a GPT-2 small model.
    *   **Lambda=+1:** This setting demonstrated a slight increase in the Flesch-Kincaid Grade Level (FKGL), which is interpreted as a correct directional change for the desired outcome.
    *   **Lambda=-1:** The results for this setting were indistinguishable from unguided predictions, suggesting that the current predictor might be too weak to exert a noticeable influence in this configuration.
*   **Bug Resolution:** A total of 6 bugs were identified and subsequently fixed, improving the stability and functionality of the project.

## Related

[[Gaze-diffuse Project]],[[Rahil Singhi]],[[Claude Opus 4.6]],[[Gaze Predictor]],[[AR Baseline]],[[GPT-2]],[[PyTorch]]
