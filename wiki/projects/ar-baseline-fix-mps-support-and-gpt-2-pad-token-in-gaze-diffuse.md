---
title: "AR Baseline Fix: MPS Support and GPT-2 Pad Token in Gaze-Diffuse"
author: ai
created_at: 2026-04-13T17:43:36.224Z
last_ai_edit: 2026-04-13T17:43:36.224Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-ar-baseline-add-mps-device-support-and-gpt-2-pad-9f0b66.md]]"
tags:
  - fix
  - ar-baseline
  - mps
  - apple silicon
  - gpt-2
  - pad token
  - gaze-diffuse
  - compatibility
  - bugfix
  - guided generation
---

# AR Baseline Fix: MPS Support and GPT-2 Pad Token in Gaze-Diffuse

This commit addresses two key issues in the `gaze-diffuse` repository: adding Apple Silicon (MPS) device support for local runs and resolving a `ValueError` in GPT-2's `score_vocabulary` by explicitly setting its padding token. These fixes enhance compatibility and stability, particularly for guided generation tasks.

## Key Concepts

Apple Silicon (MPS),GPT-2,Padding Token,Guided Generation,ValueError,Gaze-Diffuse

## Details

This commit, identified by SHA `7b36d65`, introduces crucial fixes to the `rahilsinghi/gaze-diffuse` repository. The primary changes address device compatibility and model configuration:

1.  **Apple Silicon (MPS) Fallback**: Support for Apple Silicon's Metal Performance Shaders (MPS) was added. This enables users with Apple Silicon Macs to run the baseline models locally, improving performance and accessibility on these devices.
2.  **GPT-2 Pad Token Fix**: A `ValueError` occurring in the `score_vocabulary` function during guided generation with GPT-2 models was resolved. GPT-2 models do not have a default padding token, which can cause issues in certain tokenization and scoring scenarios. The fix explicitly sets `pad_token = eos_token` (end-of-sequence token) for GPT-2, thereby preventing the `ValueError` and ensuring proper functioning of guided generation.

## Related

[[AR Baseline Fixes: MPS Support and GPT-2 Pad Token]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Gaze-Diffuse]]
