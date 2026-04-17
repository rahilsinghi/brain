---
title: "Fix: AR Baseline - MPS Device Support and GPT-2 Pad Token"
author: ai
created_at: 2026-04-12T18:14:29.325Z
last_ai_edit: 2026-04-12T18:14:29.325Z
last_human_edit: null
last_embedded_hash: f6a64ae946ff7a5d
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-ar-baseline-add-mps-device-support-and-gpt-2-pad-9f0b66.md]]"
tags:
  - fix
  - ar baseline
  - mps
  - gpt-2
  - pad token
  - eos token
  - bug fix
  - gaze-diffuse
  - apple silicon
---


# Fix: AR Baseline - MPS Device Support and GPT-2 Pad Token

This commit introduces MPS (Apple Silicon) device support as a fallback for local runs and resolves a `ValueError` in GPT-2 guided generation by explicitly setting the `pad_token` to `eos_token`. These changes enhance the robustness and compatibility of the `gaze-diffuse` repository.

## Key Concepts

[[MPS (Apple Silicon)]],[[GPT-2]],[[Pad Token]],[[EOS Token]],[[ValueError]],[[Guided Generation]],[[AR Baseline]]

## Details

This commit (`7b36d65`) in the `rahilsinghi/gaze-diffuse` repository addresses two key issues:

1.  **MPS Device Support**: Added an MPS (Metal Performance Shaders) fallback mechanism, specifically designed for Apple Silicon environments. This ensures that the application can run locally on Apple hardware, utilizing its GPU capabilities, even if other CUDA devices are not available.
2.  **GPT-2 Pad Token Fix**: GPT-2 models do not have a `pad_token` defined by default. This commit explicitly sets the `pad_token` to `eos_token` (end-of-sequence token). This change resolves a `ValueError` that occurred in `score_vocabulary` during guided generation tasks, enabling proper handling of token padding for the GPT-2 model.

**Commit Details:**
- **Repo:** `rahilsinghi/gaze-diffuse`
- **SHA:** `7b36d65`
- **Date:** `2026-03-27T16:09:27Z`
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +8
- **Deletions:** -1

## Related

[[Gaze-diffuse]],[[AR Baseline Test Enhancement (b07cd60)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]]
