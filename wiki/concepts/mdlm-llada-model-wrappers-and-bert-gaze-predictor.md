---
title: MDLM/LLaDA Model Wrappers and BERT Gaze Predictor
author: ai
created_at: 2026-04-12T22:10:37.227Z
last_ai_edit: 2026-04-12T22:10:37.227Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-mdlm-llada-model-wrappers-and-bert-gaze-predi-709df3.md]]"
tags:
  - diffusion models
  - natural language processing
  - gaze prediction
  - machine learning
  - deep learning
  - bert
  - llada
  - mdlm
  - gaze-diffuse
---

# MDLM/LLaDA Model Wrappers and BERT Gaze Predictor

This content describes the addition of `MDLMWrapper` and `LLaDAWrapper` for unified diffusion model inference, alongside a `GazePredictor` based on BERT-base. These components are designed for handling specific language models and predicting fixation durations, fine-tuned on the GECO corpus.

## Key Concepts

MDLM (Masked Diffusion Language Model),LLaDA (Large Language Diffusion Model for Attention),BERT (Bidirectional Encoder Representations from Transformers),Gaze Prediction,Diffusion Models,Model Wrappers,GECO Corpus,Token Scoring

## Details

This update introduces new model wrappers and a gaze predictor within the [[Gaze-Diffuse]] repository.

### `src/models/mdlm_wrapper.py`
This file implements two crucial wrappers:

*   **`MDLMWrapper`**: Designed to load MDLM checkpoints. It provides functionalities such as `get_log_probs` (for retrieving log probabilities), `get_timesteps` (for diffusion timesteps), and `create_masked_input` (for generating masked inputs), enabling unified diffusion model inference.
*   **`LLaDAWrapper`**: Utilizes HuggingFace's `AutoModel` to interface with LLaDA models. It's configured with a `mask_id` of `126336` and offers a `get_logits` method for obtaining model predictions.

These wrappers streamline the interaction with different diffusion-based language models, providing a consistent API for their use.

### `src/gaze_predictor.py`
This module contains the **`GazePredictor`**, a BERT-base model fine-tuned specifically for predicting fixation durations. The fine-tuning was performed using the [[GECO Corpus]].

The `GazePredictor` includes:

*   **`score_tokens()`**: A method for scoring individual tokens based on predicted gaze fixations.
*   **`score_vocabulary()`**: A method for scoring an entire vocabulary.
*   A training loop and functionality for loading pre-trained checkpoints.

The input format expected by the `GazePredictor` is a sequence structured as: `[CLS] left_ctx [SEP] target [SEP] right_ctx [SEP]`, where `left_ctx`, `target`, and `right_ctx` represent the left context, target word, and right context, respectively, surrounded by special BERT tokens.

## Related

[[Gaze-Diffuse]],[[GECO Corpus]],[[MDLM]],[[LLaDA]],[[BERT]]
