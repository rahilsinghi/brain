---
title: "Data Layer for Gaze-Diffuse: GECO Corpus Loader and Prompt Seeds"
author: ai
created_at: 2026-04-11T00:15:39.371Z
last_ai_edit: 2026-04-11T00:15:39.371Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-data-layer-geco-eye-tracking-corpus-loader-291ea1.md]]"
tags:
  - gaze-diffuse
  - data layer
  - eye-tracking
  - geco corpus
  - prompt seeds
  - pytorch
  - data processing
  - research
---

# Data Layer for Gaze-Diffuse: GECO Corpus Loader and Prompt Seeds

This update introduces a critical data layer to the `gaze-diffuse` repository, enabling the loading of the GECO eye-tracking corpus with subject-level cross-validation splits and integration with PyTorch DataLoaders. It also adds a collection of 50 diverse prompt seeds to ensure consistent and fair comparisons across different experiments and methods.

## Key Concepts

GECO corpus,Eye-tracking data,Prompt seeds,PyTorch DataLoader,Fixation duration,Context window

## Details

This commit (SHA: `2327001`) by Rahil Singhi on 2026-03-12 enhances the `rahilsinghi/gaze-diffuse` repository by adding a foundational data layer. The changes involve two main components:

- **`src/data/geco.py`**: This file introduces a robust GECO corpus loader. It facilitates the processing of eye-tracking data, offering subject-level cross-validation (CV) splits. Key dataclasses like `GazeExample` and `GazeDataConfig` are defined, and a `GazeDataset` is provided for seamless integration with PyTorch's `DataLoader`. The loader is designed to extract fixation durations per word-in-context, with a configurable context window (defaulting to 5 tokens on each side of the target word).

- **`src/data/prompts.py`**: This file contains 50 diverse prompt seeds. These seeds are intended to be shared consistently across all experiments conducted within the `gaze-diffuse` project, ensuring a fair basis for comparing different methods and models.

## Related

[[rahilsinghi/gaze-diffuse]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]],[[EMNLP 2026 LaTeX Paper Scaffold – gaze-diffuse]],[[EMNLP 2026 Paper Structure Scaffold (gaze-diffuse)]],[[Docs: Add Project History and Session Log for gaze-diffuse]],[[AR Baseline Test Strengthening in Gaze-Diffuse]]
