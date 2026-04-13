---
title: "AR Baseline Fixes: MPS Support and GPT-2 Pad Token"
author: ai
created_at: 2026-04-12T22:14:28.451Z
last_ai_edit: 2026-04-12T22:14:28.451Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-ar-baseline-add-mps-device-support-and-gpt-2-pad-9f0b66.md]]"
tags:
  - ar-baseline
  - mps
  - gpt-2
  - bugfix
  - gaze-diffuse
  - apple-silicon
  - llm
  - device-support
  - tokenization
  - guided-generation
---

# AR Baseline Fixes: MPS Support and GPT-2 Pad Token

This commit addresses two key issues in the `gaze-diffuse` repository: adding Metal Performance Shaders (MPS) device support for Apple Silicon and resolving a `ValueError` during GPT-2 guided generation. The GPT-2 fix involves setting the `pad_token` to `eos_token` to prevent errors in vocabulary scoring.

## Key Concepts

[[MPS (Metal Performance Shaders)]] device support,[[GPT-2]] pad token handling,[[Guided Generation]],[[ValueError]],[[Apple Silicon]] compatibility

## Details

This commit (`7b36d65`) within the `rahilsinghi/gaze-diffuse` repository implements two significant fixes:

1.  **MPS Device Support:** It introduces fallback support for Apple Silicon's Metal Performance Shaders (MPS) device. This enhancement allows for local execution of the AR baseline tests and related processes on Apple Silicon hardware, leveraging its GPU capabilities for improved performance.
2.  **GPT-2 Pad Token Fix:** The commit resolves a `ValueError` that occurred during `score_vocabulary` in the context of [[guided generation]] with [[GPT-2]] models. GPT-2 models do not inherently define a `pad_token`. To circumvent this, the fix explicitly sets the `pad_token` to be equal to the `eos_token` (end-of-sentence token) for GPT-2, which is a common practice to ensure proper tokenization and prevent errors in downstream processing.

## Related

[[Gaze-Diffuse]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Apple Silicon]],[[GPT-2]],[[MPS (Metal Performance Shaders)]]
