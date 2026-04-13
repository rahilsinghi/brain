---
title: "Training Fixes: MPS Support, macOS DataLoader, and Portable Checkpoints (Gaze-Diffuse)"
author: ai
created_at: 2026-04-12T17:36:57.758Z
last_ai_edit: 2026-04-12T17:36:57.758Z
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
  - cuda
  - gaze-diffuse
  - bugfix
  - portability
  - development
---

# Training Fixes: MPS Support, macOS DataLoader, and Portable Checkpoints (Gaze-Diffuse)

This commit (`43d9fed`) in the `rahilsinghi/gaze-diffuse` repository introduces support for Apple's Metal Performance Shaders (MPS) device, ensuring better compatibility and performance across different hardware configurations. It also resolves a DataLoader hang issue specifically on macOS by adjusting worker settings and enhances the portability of training checkpoints for cross-module compatibility.

## Key Concepts

[[MPS]] (Metal Performance Shaders),[[CUDA]],CPU fallback,[[DataLoader]],num_workers,[[Checkpoints]] (portable checkpoints),dataclass,asdict(),macOS compatibility,[[Training]]

## Details

This set of training fixes was implemented in the `rahilsinghi/gaze-diffuse` repository with commit SHA `43d9fed` by Rahil Singhi on 2026-03-27. The changes, co-authored by Claude Opus 4.6, involved modifications to a single file, adding 22 lines and deleting 8.

Key updates include:

*   **MPS Device Fallback**: Added support for Apple's Metal Performance Shaders (MPS) as a fallback device. The device selection now prioritizes CUDA, then MPS, and finally CPU, enhancing hardware compatibility and leveraging available GPU acceleration on Apple Silicon Macs.
*   **macOS DataLoader Fix**: The `num_workers` parameter in `DataLoaders` was changed from `2` to `0`. This addresses a specific issue where the `DataLoader` would hang on macOS systems, likely due to multiprocessing intricacies.
*   **Portable Checkpoints**: To improve cross-module compatibility when loading saved checkpoints, the training configuration is now saved using `asdict()` instead of a pickled dataclass. This change ensures that checkpoints can be loaded more reliably across different environments and code versions.

## Related

[[Gaze-Diffuse]],[[Add Smoke, Integration, and GECO Data Validation Tests]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]],[[AR Baseline Test Enhancement (b07cd80)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Comprehensive README for Gaze-Diffuse Project]],[[Training]],[[DataLoader]],[[Checkpoints]]
