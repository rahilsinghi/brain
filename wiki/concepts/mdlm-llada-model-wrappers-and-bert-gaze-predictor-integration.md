---
title: MDLM/LLaDA Model Wrappers and BERT Gaze Predictor Integration
author: ai
created_at: 2026-04-11T01:30:57.101Z
last_ai_edit: 2026-04-11T01:30:57.101Z
last_human_edit: null
last_embedded_hash: f67d359ba291e48f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-mdlm-llada-model-wrappers-and-bert-gaze-predi-709df3.md]]"
tags:
  - mdlm
  - llada
  - bert
  - gaze prediction
  - diffusion models
  - huggingface
  - natural language processing
  - machine learning
  - gaze-diffuse
---


# MDLM/LLaDA Model Wrappers and BERT Gaze Predictor Integration

This update to the `gaze-diffuse` repository introduces new model wrappers for MDLM and LLaDA diffusion models, providing a unified interface for inference. It also integrates a BERT-base gaze predictor, fine-tuned on the GECO corpus, to estimate fixation durations based on contextual information.

## Key Concepts

MDLM (Masked Diffusion Language Models),LLaDA (Latent Diffusion Language Models),BERT (Bidirectional Encoder Representations from Transformers),Gaze Prediction,Diffusion Models,HuggingFace AutoModel,GECO Corpus,Fixation Duration

## Details

This commit (`765f3fc`) in the `rahilsinghi/gaze-diffuse` repository, authored by Rahil Singhi on 2026-03-12, adds crucial components for advanced gaze prediction and language model integration, with a total of 724 additions across three files.

### MDLM and LLaDA Model Wrappers
- **`src/models/mdlm_wrapper.py`**: This file introduces two primary classes:
  - `MDLMWrapper`: Designed to load MDLM checkpoints and provides methods such as `get_log_probs`, `get_timesteps`, and `create_masked_input`. These methods facilitate unified inference for Masked Diffusion Language Models.
  - `LLaDAWrapper`: Implements support for LLaDA models using `HuggingFace AutoModel`. It handles a specific `mask_id` (126336) and offers a `get_logits` method, enabling consistent interaction with Latent Diffusion Language Models.

### BERT-based Gaze Predictor
- **`src/gaze_predictor.py`**: This file integrates a `BERT`-base model specifically fine-tuned for predicting fixation durations. The training was conducted using the [[Data Layer for Gaze-Diffuse: GECO Corpus Loader and Prompt Seeds]], ensuring its relevance to eye-tracking data.
  - The `GazePredictor` class includes core functionalities like `score_tokens()` and `score_vocabulary()` for evaluating language units in terms of gaze behavior.
  - It also encapsulates a training loop and mechanisms for loading pre-trained checkpoints.
  - The model expects input in a specific format: `[CLS] left_ctx [SEP] target [SEP] right_ctx [SEP]`, allowing it to leverage surrounding linguistic context for more accurate gaze predictions.

## Related

[[Gaze-Diffuse]],[[Data Layer for Gaze-Diffuse: GECO Corpus Loader and Prompt Seeds]],[[BERT]],[[Diffusion Models]],[[HuggingFace AutoModel]]
