---
title: "Gaze-Diffuse Project: Session 3 Report (Local Training & AR Baseline)"
author: ai
created_at: 2026-04-10T22:07:40.757Z
last_ai_edit: 2026-04-10T22:07:40.757Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-add-session-3-local-training-ar-baseline-resul-c24efa.md]]"
tags:
  - gaze
  - predictor
  - ar baseline
  - lambda sweep
  - local training
  - pytorch
  - mps
  - gpt-2
  - fkgl
  - bug fix
  - rahil singhi
  - gaze-diffuse
---

# Gaze-Diffuse Project: Session 3 Report (Local Training & AR Baseline)

This wiki article details Session 3 of the Gaze-Diffuse project, which focused on local environment setup, training a gaze predictor, and conducting an AR baseline lambda sweep. Key outcomes include initial gaze predictor performance and observations from the lambda sweep indicating directional improvements with positive lambda values.

## Key Concepts

- [[Gaze Predictor]],- [[AR Baseline]],- [[Lambda Sweep]],- [[FKGL]] (Flesch-Kincaid Grade Level),- [[MPS]] (Metal Performance Shaders),- [[GPT-2]]

## Details

### Gaze-Diffuse Project: Session 3 (2026-03-26/27)

This session, captured in commit `bb922df` by Rahil Singhi on March 27, 2026, involved significant development and testing for the `rahilsinghi/gaze-diffuse` repository. The commit introduced 73 additions and 3 deletions across 1 file.

#### Key Activities and Experiments:

1.  **Local Environment Setup**: A development environment was established locally, utilizing Python 3.14, PyTorch 2.11, and leveraging Apple's Metal Performance Shaders (MPS) for accelerated computation.

2.  **Experiment 2: Gaze Predictor Training**: A gaze predictor model was trained locally. Initial results showed a Spearman's rank correlation coefficient (r) of 0.241, providing a preliminary benchmark for gaze prediction performance.

3.  **Experiment 3: AR Baseline Lambda Sweep**: A sweep of the `lambda` parameter was conducted for the AR baseline, involving 20 samples with a GPT-2 small model. The observations were as follows:
    *   **Lambda = +1**: Showed a slight increase in the Flesch-Kincaid Grade Level (FKGL), which is interpreted as moving in the correct direction (e.g., towards more complex or appropriate language features depending on the objective of the AR baseline).
    *   **Lambda = -1**: The output was largely indistinguishable from unguided generation, suggesting that the current predictor might be too weak to exert a significant influence with a negative lambda.

#### Bug Fixes:

During the session, 6 bugs were identified and subsequently fixed, improving the stability and functionality of the codebase.

#### Contributors:

This session's work was co-authored with Claude Opus 4.6.

## Related

[[Gaze Predictor]],[[AR Baseline]],[[Rahil Singhi]],[[Gaze-Diffuse Project]]
