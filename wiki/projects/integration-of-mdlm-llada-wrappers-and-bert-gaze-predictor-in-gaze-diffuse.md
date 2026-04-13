---
title: Integration of MDLM/LLaDA Wrappers and BERT Gaze Predictor in Gaze-Diffuse
author: ai
created_at: 2026-04-13T17:41:55.246Z
last_ai_edit: 2026-04-13T17:41:55.246Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-mdlm-llada-model-wrappers-and-bert-gaze-predi-709df3.md]]"
tags:
  - gaze-diffuse
  - nlp
  - machine learning
  - models
  - diffusion
  - bert
  - mdlm
  - llada
  - gaze prediction
  - commit
---

# Integration of MDLM/LLaDA Wrappers and BERT Gaze Predictor in Gaze-Diffuse

This commit introduces new model wrappers for MDLM and LLaDA diffusion models, enabling unified inference within the `gaze-diffuse` project. Additionally, it integrates a BERT-base gaze predictor, fine-tuned on the GECO corpus, to enhance the project's capabilities in predicting fixation durations. These additions provide advanced language modeling and gaze prediction features.

## Key Concepts

- MDLM (Masked Diffusion Language Model),- LLaDA (Latent Language Diffusion Model),- BERT (Bidirectional Encoder Representations from Transformers),- Gaze Prediction,- Diffusion Models,- GECO corpus,- `MDLMWrapper`,- `LLaDAWrapper`,- `GazePredictor`,- Token Scoring,- Masked Language Modeling

## Details

On March 12, 2026, Rahil Singhi committed an update (SHA: 765f3fc) to the `rahilsinghi/gaze-diffuse` repository, primarily focusing on adding new model wrappers and a gaze predictor.

Key additions include:
- **`src/models/mdlm_wrapper.py`**: This file introduces two new wrappers:
    - `MDLMWrapper`: Designed to load MDLM checkpoints and provide essential functionalities such as `get_log_probs`, `get_timesteps`, and `create_masked_input` for consistent diffusion model inference.
    - `LLaDAWrapper`: Leverages HuggingFace's `AutoModel`, configured with a `mask_id` of 126336, and offers a `get_logits` method for similar unified inference.
- **`src/gaze_predictor.py`**: This file integrates a BERT-base fixation duration predictor. This predictor has been fine-tuned on the GECO corpus to accurately predict gaze patterns. It exposes `score_tokens()` and `score_vocabulary()` methods, supports training loops, and handles checkpoint loading. The expected input format for this predictor is `[CLS] left_ctx [SEP] target [SEP] right_ctx [SEP]`.

## Related

[[Gaze-Diffuse]],[[BERT]],[[MDLM]],[[LLaDA]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]],[[Rahil Singhi]]
