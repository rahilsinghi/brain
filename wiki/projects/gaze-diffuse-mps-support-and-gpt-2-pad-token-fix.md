---
title: "Gaze-Diffuse: MPS Support and GPT-2 Pad Token Fix"
author: ai
created_at: 2026-04-10T22:23:36.999Z
last_ai_edit: 2026-04-10T22:23:36.999Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-ar-baseline-add-mps-device-support-and-gpt-2-pad-9f0b66.md]]"
tags:
  - fix
  - mps
  - applesilicon
  - gpt-2
  - tokenization
  - guided generation
  - bugfix
  - gaze-diffuse
  - performance
  - commit
---

# Gaze-Diffuse: MPS Support and GPT-2 Pad Token Fix

This commit for the `rahilsinghi/gaze-diffuse` repository introduces support for Apple's Metal Performance Shaders (MPS) on Apple Silicon, improving local execution performance. It also resolves a `ValueError` during guided generation with GPT-2 models by explicitly setting a pad token.

## Key Concepts

Metal Performance Shaders (MPS),Apple Silicon,GPT-2,Pad Token,End-of-Sentence (EOS) Token,Guided Generation,ValueError,Repository Management,Commit (Version Control)

## Details

This commit, identified by SHA `7b36d65`, was authored by Rahil Singhi on 2026-03-27 for the `rahilsinghi/gaze-diffuse` project. It addresses two primary areas:

1.  **Apple Silicon MPS Support**: Adds a fallback mechanism to utilize Apple's Metal Performance Shaders (MPS) for local runs on devices equipped with Apple Silicon. This enhancement aims to improve the computational efficiency and compatibility of the project on these specific hardware platforms.

2.  **GPT-2 Pad Token Handling**: Resolves a `ValueError` encountered within the `score_vocabulary` function during guided generation when using GPT-2 models. GPT-2 models typically do not have a `pad_token` defined by default, which can cause issues in certain text generation or processing pipelines. The fix explicitly sets the `pad_token` to be equivalent to the `eos_token` (end-of-sentence token), thereby mitigating the error and ensuring smooth operation during guided generation tasks.

The change involved modifications to a single file, with a net increase of 7 lines of code (8 additions, 1 deletion). This commit was co-authored with Claude Opus 4.6.

## Related

[[rahilsinghi/gaze-diffuse]],[[Apple Silicon]],[[Metal Performance Shaders (MPS)]],[[GPT-2]],[[Tokenization]],[[Guided Generation]],[[ValueError]]
