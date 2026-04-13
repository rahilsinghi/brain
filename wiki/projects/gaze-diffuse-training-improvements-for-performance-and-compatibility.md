---
title: "Gaze Diffuse: Training Improvements for Performance and Compatibility"
author: ai
created_at: 2026-04-10T18:13:31.334Z
last_ai_edit: 2026-04-10T18:13:31.334Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-training-add-mps-support-fix-macos-dataloader-p-bc0630.md]]"
tags:
  - training
  - mps
  - macos
  - dataloader
  - checkpoints
  - portability
  - gaze-diffuse
  - pytorch
  - development
  - fix
  - enhancement
---

# Gaze Diffuse: Training Improvements for Performance and Compatibility

This commit to the `gaze-diffuse` project introduces significant enhancements to its training pipeline. Key updates include the addition of Apple Silicon (MPS) device support with a robust fallback mechanism and a fix for macOS DataLoader issues. Furthermore, checkpoint portability is improved by saving configurations as dictionaries rather than pickled dataclasses.

## Key Concepts

*   **MPS (Metal Performance Shaders):** Apple's framework for high-performance graphics and computation, enabling GPU acceleration on Apple Silicon.,*   **DataLoader:** A utility in deep learning frameworks, like PyTorch, designed for efficient data loading and batching during training.,*   **Checkpoints:** Saved states of a model and its training process, used for resuming training, fine-tuning, or deployment.,*   **PyTorch:** A popular open-source machine learning framework, implied by the use of DataLoaders and MPS integration.,*   **Dataclass:** A Python feature for creating classes primarily for storing data, often used for configuration objects.,*   **`asdict()`:** A utility function (often from the `dataclasses` module) to convert a dataclass instance into a dictionary, improving serialization compatibility.

## Details

This article documents a critical commit (`43d9fed`) to the `rahilsinghi/gaze-diffuse` repository, authored by [[Rahil Singhi]] on March 27, 2026. The commit focuses on enhancing the project's training infrastructure for improved performance, broader hardware compatibility, and increased portability of saved models.

The primary changes introduced in this commit include:

*   **MPS Device Fallback:** A new device selection mechanism has been implemented, establishing a priority order for training and loading: CUDA (for NVIDIA GPUs), then MPS (for Apple Silicon), and finally falling back to CPU. This significantly expands the hardware compatibility for the `gaze-diffuse` model, enabling efficient training on a wider range of machines, particularly macOS devices with M-series chips.
*   **macOS DataLoader Fix:** To resolve issues where `DataLoaders` would sometimes "hang" or freeze on macOS systems, the `num_workers` parameter has been adjusted from `2` to `0`. This change disables multi-process data loading, preventing deadlocks or instability specific to certain macOS environments.
*   **Portable Checkpoints:** For improved cross-module compatibility when loading saved model checkpoints, the training configuration (`config`) is now saved using `asdict()` (converting a dataclass instance to a dictionary) instead of directly pickling the `dataclass` instance. This modification makes checkpoints more robust and less prone to breaking due to changes in module structure or versions across different environments.

This commit involved modifications to 1 file, resulting in 22 additions and 8 deletions.

The work was co-authored by [[Claude Opus 4.6]].

## Related

[[Gaze Diffuse]],[[Rahil Singhi]],[[Apple Silicon]],[[PyTorch]],[[CUDA]],[[Claude Opus 4.6]],[[Machine Learning Training]]
