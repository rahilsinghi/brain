---
title: GECO Corpus Loader and Prompt Seeds for Gaze-Diffuse
author: ai
created_at: 2026-04-13T17:14:20.353Z
last_ai_edit: 2026-04-13T17:14:20.353Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-data-layer-geco-eye-tracking-corpus-loader-291ea1.md]]"
tags:
  - data layer
  - geco
  - eye-tracking
  - corpus
  - loader
  - prompt seeds
  - pytorch
  - gaze
  - machine learning
  - data processing
  - dataclasses
  - cross-validation
  - experimentation
---

# GECO Corpus Loader and Prompt Seeds for Gaze-Diffuse

This update introduces a robust data layer to the `Gaze-Diffuse` project, enabling the loading of the GECO eye-tracking corpus and providing a set of diverse prompt seeds for experimental consistency. It facilitates subject-level cross-validation splits and integrates with PyTorch DataLoaders for efficient deep learning experimentation.

## Key Concepts

GECO Corpus,Eye-tracking data,Fixation Duration,Context Window (NLP),PyTorch DataLoader,Cross-Validation (CV) Splits,Prompt Seeds,Cross-Method Comparison,Dataclasses (Python)

## Details

This feature commit (`SHA: 2327001`) to the `rahilsinghi/gaze-diffuse` repository focuses on establishing a foundational data layer:

*   **`src/data/geco.py`**: This file introduces a comprehensive loader for the GECO eye-tracking corpus. Key functionalities include:
    *   **Subject-level CV splits**: Allows for partitioning the data based on individual subjects, crucial for robust cross-validation in eye-tracking studies.
    *   **`GazeExample` and `GazeDataConfig` dataclasses**: These provide structured representations for individual gaze data points and configuration settings, enhancing data management and clarity.
    *   **`GazeDataset`**: Implements a PyTorch Dataset for seamless integration with `torch.utils.data.DataLoader`, enabling efficient batch processing for machine learning models.
    *   **Fixation duration extraction**: The loader extracts fixation duration for each word in its context, with a configurable context window (defaulting to 5 tokens on each side) to capture relevant linguistic surroundings.

*   **`src/data/prompts.py`**: This file provides 50 diverse prompt seeds. These seeds are intended to be used consistently across all experiments, ensuring a fair and standardized basis for cross-method comparisons within the `Gaze-Diffuse` project.

## Related

[[Gaze-Diffuse]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Rahil Singhi]],[[PyTorch]],[[Deep Learning]],[[Cross-Validation]],[[Experimental Design]],[[LLM Prompts]]
