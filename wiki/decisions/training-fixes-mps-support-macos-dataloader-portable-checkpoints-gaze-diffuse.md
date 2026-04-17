---
title: "Training Fixes: MPS Support, macOS DataLoader, Portable Checkpoints (gaze-diffuse)"
author: ai
created_at: 2026-04-10T22:13:14.753Z
last_ai_edit: 2026-04-10T22:13:14.753Z
last_human_edit: null
last_embedded_hash: 636fcc990f2133bf
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-training-add-mps-support-fix-macos-dataloader-p-bc0630.md]]"
tags:
  - training
  - mps
  - macos
  - dataloader
  - checkpoints
  - cuda
  - cpu
  - gaze-diffuse
  - fix
  - development
  - portability
---


# Training Fixes: MPS Support, macOS DataLoader, Portable Checkpoints (gaze-diffuse)

This update to the `gaze-diffuse` repository introduces support for Apple Silicon's MPS framework, fixes a potential hang issue with DataLoaders on macOS, and enhances checkpoint portability. These changes improve hardware compatibility and cross-module loading reliability for the training pipeline.

## Key Concepts

- **MPS (Metal Performance Shaders):** Apple's framework for high-performance computation on Apple Silicon.,- **CUDA:** NVIDIA's parallel computing platform and API for GPUs.,- **DataLoader:** A utility in deep learning frameworks (like PyTorch) for efficiently loading data.,- **Checkpoints:** Saved states of a model and training process, allowing training to resume or models to be deployed.,- **Dataclass:** A Python decorator used to automatically generate methods for classes, often for data storage.,- **asdict():** A function to convert a dataclass instance to a dictionary, often for serialization.

## Details

This commit (`43d9fed`) by [[Rahil Singhi]] on 2026-03-27 introduces several critical improvements to the training pipeline of the `gaze-diffuse` project:

*   **Apple MPS Support:** A device fallback mechanism has been implemented for training and model loading. The system will now prioritize CUDA, then fall back to Apple's MPS (Metal Performance Shaders) for Apple Silicon devices, and finally to CPU if neither GPU option is available. This significantly expands hardware compatibility.

*   **macOS DataLoader Fix:** The `num_workers` parameter for DataLoaders has been changed from `2` to `0`. This addresses an issue where the `gaze-diffuse` training fork could hang specifically on macOS systems, likely due to multiprocessing interactions with the DataLoader.

*   **Portable Checkpoints:** To improve compatibility and reliability when loading checkpoints across different modules or environments, the training configuration is now saved using `asdict()` instead of pickling the dataclass directly. This change prevents potential deserialization issues that can arise with pickled dataclasses when module structures change or are used in different contexts.

This commit involved 1 file change, with 22 additions and 8 deletions, enhancing the robustness and accessibility of the `gaze-diffuse` training process.

## Related

[[Rahil Singhi]],[[gaze-diffuse Project]]
