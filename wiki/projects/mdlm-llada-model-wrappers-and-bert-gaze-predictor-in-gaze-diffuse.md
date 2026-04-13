---
title: MDLM/LLaDA Model Wrappers and BERT Gaze Predictor in Gaze-Diffuse
author: ai
created_at: 2026-04-12T18:10:38.153Z
last_ai_edit: 2026-04-12T18:10:38.153Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-mdlm-llada-model-wrappers-and-bert-gaze-predi-709df3.md]]"
tags:
  - gaze-diffuse
  - mdlm
  - llada
  - bert
  - gaze prediction
  - diffusion models
  - nlp
  - model wrappers
  - geco corpus
---

# MDLM/LLaDA Model Wrappers and BERT Gaze Predictor in Gaze-Diffuse

This feature introduces model wrappers for MDLM and LLaDA, facilitating unified diffusion model inference, alongside a BERT-based gaze predictor. The gaze predictor, fine-tuned on the GECO corpus, offers methods for scoring token fixation durations.

## Key Concepts

MDLM (Masked Diffusion Language Model),LLaDA (Large Language Diffusion Model for Articulation),BERT (Bidirectional Encoder Representations from Transformers),Diffusion Models,Natural Language Processing (NLP),Gaze Prediction,GECO Corpus,HuggingFace AutoModel

## Details

This commit to the `rahilsinghi/gaze-diffuse` repository introduces two main components:

### MDLM/LLaDA Model Wrappers
Located in `src/models/mdlm_wrapper.py`, this module provides wrappers for diffusion models to enable unified inference:
*   **`MDLMWrapper`**: Handles loading of MDLM checkpoints and exposes methods such as `get_log_probs()`, `get_timesteps()`, and `create_masked_input()`.
*   **`LLaDAWrapper`**: Utilizes HuggingFace's `AutoModel` for LLaDA, configured with a `mask_id=126336`, and provides a `get_logits()` method.

These wrappers abstract the specifics of each model, offering a consistent interface for diffusion model inference within the project.

### BERT Gaze Predictor
The `src/gaze_predictor.py` file implements a `GazePredictor` class based on a `BERT-base` model. This predictor is specifically fine-tuned on the **[[GECO Corpus]]** to predict fixation durations.

Key features of the `GazePredictor` include:
*   **`score_tokens()`**: Method to evaluate fixation scores for individual tokens.
*   **`score_vocabulary()`**: Method to score the entire vocabulary.
*   Includes a training loop for fine-tuning and robust checkpoint loading.
*   The expected input format for the model is: `[CLS] left_context [SEP] target_word [SEP] right_context [SEP]`, allowing the model to analyze a target word within its surrounding linguistic context.

## Related

[[Gaze-Diffuse]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[GECO Corpus]]
