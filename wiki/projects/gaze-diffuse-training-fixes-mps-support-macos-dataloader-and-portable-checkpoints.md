---
title: "Gaze-Diffuse Training Fixes: MPS Support, macOS DataLoader, and Portable Checkpoints"
author: ai
created_at: 2026-04-13T17:20:57.528Z
last_ai_edit: 2026-04-13T17:20:57.528Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-training-add-mps-support-fix-macos-dataloader-p-bc0630.md]]"
tags:
  - training
  - mps
  - macos
  - dataloader
  - checkpoint
  - portability
  - gazediffuse
  - fix
  - deep learning
  - python
---

# Gaze-Diffuse Training Fixes: MPS Support, macOS DataLoader, and Portable Checkpoints

This commit to the `gaze-diffuse` repository introduces crucial enhancements for training stability and compatibility. It adds support for Apple's Metal Performance Shaders (MPS), resolves a common `DataLoader` hang issue on macOS, and improves checkpoint portability by serializing configurations more robustly.

## Key Concepts

MPS (Metal Performance Shaders),DataLoader,Checkpointing,Cross-module compatibility,CUDA,CPU,Deep Learning Training

## Details

This commit (`43d9fed`) to the `rahilsinghi/gaze-diffuse` repository, authored by Rahil Singhi on 2026-03-27, implements several key fixes and enhancements related to the training pipeline:

*   **MPS Device Fallback**: A device fallback mechanism has been added for both training and model loading. The system now prioritizes `CUDA` (NVIDIA GPUs), then `MPS` (Apple's Metal Performance Shaders for Apple Silicon), and finally falls back to `CPU`. This ensures broader compatibility and optimized performance across different hardware configurations.
*   **macOS DataLoader Fix**: The `num_workers` parameter in `DataLoaders` has been set to 0. This change specifically addresses a known issue on macOS where using multiple worker processes (`num_workers=2` in previous configurations) could lead to the `DataLoader` hanging during operation, improving stability for macOS users.
*   **Portable Checkpoints**: The method for saving training configurations has been updated. Instead of pickling dataclass objects directly, configurations are now saved as `asdict()` (dictionary representation). This significantly enhances cross-module checkpoint loading compatibility, making saved models more resilient to changes in the codebase or module structure and preventing deserialization errors.

## Related

[[gaze-diffuse]],[[AR Baseline Fixes: MPS Support and GPT-2 Pad Token]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[CUDA]],[[CPU]],[[macOS]],[[DataLoader]],[[Checkpointing]],[[Metal Performance Shaders]]
