---
title: MPS Device Support and GPT-2 Pad Token Fix for Gaze-Diffuse
author: ai
created_at: 2026-04-10T18:20:29.254Z
last_ai_edit: 2026-04-10T18:20:29.254Z
last_human_edit: null
last_embedded_hash: 3be842c729fcb48f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-ar-baseline-add-mps-device-support-and-gpt-2-pad-9f0b66.md]]"
tags:
  - mps
  - apple-silicon
  - gpt-2
  - padding-token
  - eos-token
  - gaze-diffuse
  - bugfix
  - device-support
  - ai
  - machine-learning
  - fix
---


# MPS Device Support and GPT-2 Pad Token Fix for Gaze-Diffuse

This article details a commit for the `gaze-diffuse` repository, implementing Metal Performance Shaders (MPS) fallback for Apple Silicon devices and resolving a `ValueError` in GPT-2 guided generation by explicitly setting the `pad_token`.

## Key Concepts

- [[MPS (Metal Performance Shaders)]],- [[Apple Silicon]],- [[GPT-2]],- [[Padding Token]] (`pad_token`),- [[End-of-Sentence Token]] (`eos_token`),- [[Guided Generation]],- [[score_vocabulary]] function

## Details

This commit, identified by SHA `7b36d65` in the `rahilsinghi/gaze-diffuse` repository, was authored by Rahil Singhi on 2026-03-27. It involved changes to 1 file, with 8 additions and 1 deletion.

The primary contributions are:

1.  **MPS Device Support**: Added fallback support for Metal Performance Shaders (MPS) to enable efficient execution on Apple Silicon devices during local runs. This enhances compatibility and performance for users with Apple's M-series chips.

2.  **GPT-2 Pad Token Fix**: Addressed a `ValueError` that occurred in the `score_vocabulary` function during guided generation when using the GPT-2 model. GPT-2 models do not define a `pad_token` by default, which can lead to issues in certain generation processes. The fix involves explicitly setting `pad_token = eos_token` (end-of-sentence token), aligning its behavior with models that expect a padding token.

This commit was co-authored by Claude Opus 4.6.

## Related

[[rahilsinghi/gaze-diffuse]],[[Metal Performance Shaders]],[[Apple Silicon]],[[GPT-2]],[[Tokenization]],[[Guided Generation]],[[ValueError]]
