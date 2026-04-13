---
title: GECO Eye-Tracking Corpus Loader and Prompt Seeds Data Layer (Gaze-Diffuse)
author: ai
created_at: 2026-04-12T21:23:05.847Z
last_ai_edit: 2026-04-12T21:23:05.847Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-data-layer-geco-eye-tracking-corpus-loader-291ea1.md]]"
tags:
  - data layer
  - geco corpus
  - eye-tracking
  - pytorch
  - data loading
  - prompt seeds
  - gaze-diffuse
  - experimentation
  - machine learning
  - data processing
---

# GECO Eye-Tracking Corpus Loader and Prompt Seeds Data Layer (Gaze-Diffuse)

This commit introduces a new data layer to the `gaze-diffuse` repository, integrating the GECO eye-tracking corpus and a set of 50 diverse prompt seeds. This layer facilitates standardized experimentation and robust cross-method comparison by providing structured gaze data and consistent prompts for various models.

## Key Concepts

GECO corpus,Eye-tracking data,Data layer,PyTorch DataLoader,Prompt engineering,Cross-method comparison,Fixation duration,Context window

## Details

This feature adds a crucial data layer to the `gaze-diffuse` project, essential for handling eye-tracking data and standardizing experimental prompts. The implementation primarily consists of two files:

*   **`src/data/geco.py`**: This module is dedicated to loading and processing the GECO eye-tracking corpus. It includes functionality for generating subject-level cross-validation splits, which is vital for unbiased model evaluation. The data is structured using `GazeExample` and `GazeDataConfig` dataclasses, defining the format and parameters for the gaze data. A `GazeDataset` class is also provided, ensuring seamless integration with `PyTorch DataLoader` for efficient batch processing during model training. A key function of this loader is its ability to extract fixation duration for words within their linguistic context, with a configurable context window (defaulting to 5 tokens on either side of the target word).

*   **`src/data/prompts.py`**: This file contains 50 carefully selected and diverse prompt seeds. These seeds are designed to be used consistently across all experiments conducted within the `gaze-diffuse` project. Their purpose is to ensure a fair and consistent basis for comparing different models or methodologies, thereby enhancing the scientific rigor of the research.

## Related

[[Gaze-Diffuse]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[PyTorch DataLoader]],[[Eye-tracking]]
