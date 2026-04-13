---
title: "Data Layer Implementation: GECO Eye-Tracking Corpus Loader and Prompt Seeds"
author: ai
created_at: 2026-04-13T15:35:06.695Z
last_ai_edit: 2026-04-13T15:35:06.695Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-data-layer-geco-eye-tracking-corpus-loader-291ea1.md]]"
tags:
  - data layer
  - geco
  - eye-tracking
  - corpus
  - prompts
  - pytorch
  - machine learning
  - gaze-diffuse
---

# Data Layer Implementation: GECO Eye-Tracking Corpus Loader and Prompt Seeds

This update introduces a new data layer to the Gaze-Diffuse project, featuring a GECO corpus loader for eye-tracking data and a set of 50 diverse prompt seeds. The GECO loader facilitates subject-level cross-validation splits and integrates with PyTorch DataLoaders, while the prompt seeds ensure fair comparison across experiments.

## Key Concepts

[[GECO Corpus]],Eye-tracking data,[[Prompt Seeds]],[[PyTorch DataLoader]],Fixation duration,Cross-validation splits,Data layer

## Details

This commit (SHA: `2327001`) from Rahil Singhi on March 12, 2026, focuses on establishing a robust data layer within the `rahilsinghi/gaze-diffuse` repository. It involves two primary components:

*   **`src/data/geco.py`**: This file implements a GECO corpus loader. It supports subject-level cross-validation (CV) splits, crucial for evaluating models fairly. The module includes `GazeExample` and `GazeDataConfig` dataclasses for structured data handling. A `GazeDataset` class is provided to ensure seamless integration with `[[PyTorch DataLoader]]`, enabling efficient batch processing of gaze data. A key feature is its ability to extract fixation duration per word-in-context, with a configurable context window (defaulting to 5 tokens on each side of the target word).

*   **`src/data/prompts.py`**: This file introduces a collection of 50 diverse prompt seeds. These seeds are designed to be shared consistently across all experiments conducted within the project, ensuring a fair and standardized basis for cross-method comparison.

## Related

[[Gaze-Diffuse]],[[GECO Corpus]],[[PyTorch DataLoader]],[[Prompt Seeds]],Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse
