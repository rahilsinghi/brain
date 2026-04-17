---
title: GECO Eye-Tracking Data Layer and Prompt Seeds
author: ai
created_at: 2026-04-10T19:09:41.911Z
last_ai_edit: 2026-04-10T19:09:41.911Z
last_human_edit: null
last_embedded_hash: 24c39ec59e590d7b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-data-layer-geco-eye-tracking-corpus-loader-291ea1.md]]"
tags:
  - eye-tracking
  - data-loading
  - geco-corpus
  - pytorch
  - data-layer
  - prompt-engineering
  - gaze-diffuse
  - machine-learning
  - data-preparation
---


# GECO Eye-Tracking Data Layer and Prompt Seeds

This feature introduces a new data layer for the `gaze-diffuse` project, including a loader for the GECO eye-tracking corpus and a set of 50 diverse prompt seeds. It facilitates the integration of eye-tracking data into machine learning models and ensures fair comparison across experiments.

## Key Concepts

GECO Corpus,Eye-tracking data,Data loader,PyTorch DataLoader,Fixation duration,Subject-level cross-validation splits,Prompt engineering,Machine learning experiments,Dataclasses

## Details

This commit, identified by SHA `2327001` and authored by [[Rahil Singhi]] on `2026-03-12T18:38:31Z`, introduces a crucial data layer to the `[[rahilsinghi/gaze-diffuse]]` repository. It involved changes across 3 files, adding 331 lines of code without any deletions.

### `src/data/geco.py`
This file implements a robust loader for the GECO eye-tracking corpus. Key features include:
*   **Subject-level Cross-Validation Splits**: Enables robust model evaluation by ensuring subjects are consistently partitioned across training and validation sets.
*   **Data Structures**: Defines `GazeExample` and `GazeDataConfig` dataclasses for structured handling of gaze data and configuration.
*   **PyTorch Integration**: Provides a `GazeDataset` class designed for seamless integration with PyTorch's `DataLoader`, streamlining batch processing for neural networks.
*   **Fixation Duration Extraction**: Extracts fixation duration specifically for "word-in-context," allowing configuration of a context window (defaulting to 5 tokens on each side) to capture surrounding linguistic information.

### `src/data/prompts.py`
This module provides a standardized set of 50 diverse prompt seeds. These prompts are intended to be shared across all experiments within the project, ensuring a fair and consistent basis for cross-method comparison.

### Metadata
*   **Repository**: [[rahilsinghi/gaze-diffuse]]
*   **Commit SHA**: `2327001`
*   **Author**: [[Rahil Singhi]]
*   **Date**: `2026-03-12T18:38:31Z`
*   **Files Changed**: 3
*   **Additions**: +331 lines
*   **Deletions**: -0 lines

## Related

[[Rahil Singhi]],[[rahilsinghi/gaze-diffuse]],[[GECO Corpus]],[[PyTorch DataLoader]]
