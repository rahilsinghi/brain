---
title: "Gaze-Diffuse: MPS Support, macOS DataLoader Fix, and Portable Checkpoints"
author: ai
created_at: 2026-04-12T21:38:06.993Z
last_ai_edit: 2026-04-12T21:38:06.993Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-training-add-mps-support-fix-macos-dataloader-p-bc0630.md]]"
tags:
  - gaze-diffuse
  - training
  - mps
  - macOS
  - dataloader
  - checkpoint
  - bugfix
  - performance
  - portability
---

# Gaze-Diffuse: MPS Support, macOS DataLoader Fix, and Portable Checkpoints

This update to the [[Gaze-Diffuse]] project introduces Apple Silicon (MPS) device support for training and model loading, resolving a hanging issue with macOS DataLoaders by setting `num_workers=0`. It also enhances checkpoint portability by saving the configuration as a dictionary instead of a pickled dataclass, ensuring cross-module compatibility.

## Key Concepts

[[MPS (Metal Performance Shaders)]] support,[[DataLoader]] configuration,[[Checkpoint portability]],Cross-module compatibility,CUDA fallback,macOS compatibility

## Details

This commit (`43d9fed`) in the `rahilsinghi/gaze-diffuse` repository implements several crucial fixes and enhancements for the training pipeline:

*   **MPS Device Support:** Added a fallback mechanism for device selection, prioritizing CUDA, then [[MPS (Metal Performance Shaders)]] (for Apple Silicon), and finally CPU. This allows for training and model loading on Apple Silicon devices.
*   **macOS DataLoader Fix:** The `num_workers` parameter for [[DataLoader]]s was changed from `2` to `0`. This addresses a known issue where DataLoaders with multiple workers would cause the process to hang on macOS systems.
*   **Portable Checkpoints:** The configuration is now saved as an `asdict()` representation instead of a pickled dataclass. This change significantly improves the portability of checkpoints, enabling easier loading across different modules or environments without encountering serialization issues.

## Related

[[Gaze-Diffuse]],[[CUDA]],[[macOS]],[[Apple Silicon]],[[DataLoader]]
