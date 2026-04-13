---
title: GECO Eye-Tracking Corpus Loader and Prompt Seeds (gaze-diffuse)
author: ai
created_at: 2026-04-11T00:14:57.589Z
last_ai_edit: 2026-04-11T00:14:57.589Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-data-layer-geco-eye-tracking-corpus-loader-291ea1.md]]"
tags:
  - data layer
  - eye-tracking
  - geco
  - corpus
  - pytorch
  - dataloader
  - fixation duration
  - prompts
  - machine learning
  - nlp
---

# GECO Eye-Tracking Corpus Loader and Prompt Seeds (gaze-diffuse)

This feature introduces a comprehensive data layer to the `gaze-diffuse` project, integrating a GECO eye-tracking corpus loader and a set of diverse prompt seeds. It facilitates the preparation of eye-tracking data for machine learning models, specifically for PyTorch integration.

## Key Concepts

GECO corpus loader,GazeExample dataclass,GazeDataConfig dataclass,GazeDataset,PyTorch DataLoader,Fixation duration,Context window,Prompt seeds,Cross-validation splits

## Details

This commit (`2327001`) to the `rahilsinghi/gaze-diffuse` repository introduces a critical data layer, enhancing the project's ability to work with eye-tracking data and standardized prompts.

### `src/data/geco.py`
This module implements a GECO corpus loader, designed to process and prepare eye-tracking data. Key components include:

*   **Subject-level CV splits**: Enables robust [[Cross-Validation]] by dividing data based on individual subjects.
*   **GazeExample and GazeDataConfig dataclasses**: Provides structured representations for individual gaze instances and their configuration.
*   **GazeDataset**: A custom [[PyTorch]] `Dataset` implementation, allowing seamless integration with PyTorch's `DataLoader` for efficient batch processing.
*   **Fixation duration extraction**: Calculates and extracts fixation duration for words within their linguistic context. The context window is configurable, defaulting to 5 tokens on each side of the target word.

### `src/data/prompts.py`
This module defines a collection of 50 diverse prompt seeds. These seeds are intended to be used consistently across all experiments, ensuring a fair and comparable evaluation of different methods and models within the project.

## Related

[[gaze-diffuse]],[[PyTorch]],[[Cross-Validation]],[[GECO Corpus]],[[Eye-Tracking Metrics]],[[Prompt Engineering]],[[Add Comprehensive System Test with Mock Data (Career-Datacenter)]],[[Add Smoke, Integration, and GECO Data Validation Tests]]
