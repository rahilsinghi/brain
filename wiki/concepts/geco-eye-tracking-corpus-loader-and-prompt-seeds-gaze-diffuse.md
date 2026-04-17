---
title: GECO Eye-Tracking Corpus Loader and Prompt Seeds (Gaze-Diffuse)
author: ai
created_at: 2026-04-12T17:22:13.644Z
last_ai_edit: 2026-04-12T17:22:13.644Z
last_human_edit: null
last_embedded_hash: fb8aa36fab7a82e4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-data-layer-geco-eye-tracking-corpus-loader-291ea1.md]]"
tags:
  - data layer
  - geco
  - eye-tracking
  - pytorch
  - data loader
  - prompts
  - gaze-diffuse
  - experimental setup
---


# GECO Eye-Tracking Corpus Loader and Prompt Seeds (Gaze-Diffuse)

This commit introduces a data layer to the `gaze-diffuse` repository, enabling the loading and processing of the GECO eye-tracking corpus. It includes a PyTorch-compatible data loader and a set of diverse prompt seeds for consistent cross-method experimental comparison.

## Key Concepts

GECO corpus,Eye-tracking data,PyTorch DataLoader,Context window,Prompt engineering,Experimental comparison

## Details

This feature, identified by commit `2327001` in the `[[Gaze-Diffuse]]` repository, significantly enhances the project's data handling capabilities.

### `src/data/geco.py`
This file implements a robust GECO corpus loader. It supports subject-level Cross-Validation (CV) splits and defines `GazeExample` and `GazeDataConfig` dataclasses for structured data representation. A `GazeDataset` class is provided for seamless integration with PyTorch's `DataLoader`, enabling efficient batch processing. The loader extracts fixation duration per word-in-context, with a configurable context window (defaulting to 5 tokens on each side of the target word).

### `src/data/prompts.py`
This file contains 50 diverse prompt seeds. These seeds are designed to be shared across all experiments conducted within the project, ensuring fair and consistent cross-method comparison by standardizing the input prompts used for different models or techniques.

## Related

[[Gaze-Diffuse]]
