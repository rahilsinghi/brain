---
title: MDLM/LLaDA Model Wrappers and BERT Gaze Predictor in gaze-diffuse
author: ai
created_at: 2026-04-11T01:34:53.354Z
last_ai_edit: 2026-04-11T01:34:53.354Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-mdlm-llada-model-wrappers-and-bert-gaze-predi-709df3.md]]"
tags:
  - mdlm
  - llada
  - bert
  - gaze prediction
  - diffusion models
  - model wrappers
  - nlp
  - gaze-diffuse
  - geco corpus
  - machine learning
---

# MDLM/LLaDA Model Wrappers and BERT Gaze Predictor in gaze-diffuse

This feature introduces wrappers for MDLM and LLaDA models to enable unified diffusion model inference within the [[gaze-diffuse]] project. It also adds a BERT-based gaze predictor, fine-tuned on the [[GECO Corpus]], designed to estimate fixation durations for text processing tasks.

## Key Concepts

[[MDLM]] (Masked Diffusion Language Model),[[LLaDA]] (Language-Latent Diffusion Model),[[BERT]] (Bidirectional Encoder Representations from Transformers),Diffusion Models,Model Wrappers,Gaze Prediction,Fixation Duration,[[GECO Corpus]],Natural Language Processing (NLP),Fine-tuning

## Details

This commit (`765f3fc`) in the `rahilsinghi/gaze-diffuse` repository integrates key components for advanced language and gaze processing, contributing to the project's capabilities in understanding human reading patterns and language generation.

### MDLM and LLaDA Model Wrappers
Located in `src/models/mdlm_wrapper.py`, these wrappers (`MDLMWrapper` and `LLaDAWrapper`) provide a unified interface for diffusion model inference. This abstraction simplifies the integration and utilization of different diffusion models within the [[gaze-diffuse]] pipeline.

-   The `MDLMWrapper` handles loading [[MDLM]] checkpoints and offers core methods such as `get_log_probs()`, `get_timesteps()`, and `create_masked_input()`, essential for managing masked inputs and diffusion timesteps.
-   The `LLaDAWrapper` utilizes [[HuggingFace]]'s `AutoModel` to support [[LLaDA]] models. It specifically manages a `mask_id` of `126336` and provides `get_logits()` for extracting model outputs, facilitating consistent interaction with LLaDA models.

### BERT Gaze Predictor
Implemented in `src/gaze_predictor.py`, this component introduces a [[BERT]]-base model fine-tuned for predicting fixation durations based on text input. The model is specifically trained on the [[GECO Corpus]], a dataset rich in eye-tracking data, to enhance its accuracy in simulating human reading.

-   The `GazePredictor` class includes `score_tokens()` and `score_vocabulary()` methods. These methods enable the model to evaluate token-level and vocabulary-wide gaze-related metrics, providing insights into how individual words or the entire vocabulary might be processed during reading.
-   The predictor supports a training loop and checkpoint loading, allowing for continuous improvement and persistence of trained models.
-   The expected input format for the predictor is `[CLS] left_context [SEP] target_word [SEP] right_context [SEP]`, enabling contextual gaze prediction by considering the surrounding words of a target word.

## Related

[[gaze-diffuse]],[[MDLM]],[[LLaDA]],[[BERT]],Data Layer for Gaze-Diffuse: GECO Corpus Loader and Prompt Seeds,[[HuggingFace]],[[Diffusion Models]],[[Fine-tuning]]
