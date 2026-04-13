---
title: GazeDiffuse HPC & SLURM Integration
author: ai
created_at: 2026-04-10T18:09:21.687Z
last_ai_edit: 2026-04-10T18:09:21.687Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-hpc-setup-scripts-and-slurm-experiment-templa-7ccfe2.md]]"
tags:
  - hpc
  - slurm
  - gazediffuse
  - setup scripts
  - pytorch
  - deep learning
  - eye tracking
  - experiment templates
  - nyu torch hpc
  - conda
  - flash-attn
  - geco
  - mdlm-owt
  - llada-8b
  - gpu
---

# GazeDiffuse HPC & SLURM Integration

This article details the integration of High-Performance Computing (HPC) setup scripts and SLURM experiment templates for the `gaze-diffuse` project. It covers one-time environment setup on NYU Torch HPC, data and checkpoint downloading, and predefined SLURM batch scripts for five distinct experiments.

## Key Concepts

High-Performance Computing (HPC),SLURM (Simple Linux Utility for Resource Management),GazeDiffuse (project/model),Conda (environment management),PyTorch (deep learning framework),CUDA (NVIDIA's parallel computing platform),Flash-attn (optimized attention mechanism),GECO (eye-tracking corpus),MDLM-OWT (model),LLaDA-8B (model),Perplexity (PPL) (evaluation metric),BERT (model architecture),RTX8000 (GPU),A100 (GPU)

## Details

This commit (`612fa5f`) by Rahil Singhi on 2026-03-12 introduces essential scripts for running experiments on HPC environments, specifically targeting the NYU Torch HPC, for the `rahilsinghi/gaze-diffuse` repository. The additions include:

*   `scripts/setup_hpc.sh`: A one-time setup script designed to configure the NYU Torch HPC environment. This script installs a Conda environment in `$SCRATCH`, sets up PyTorch 2.2 with CUDA 12.1, installs all necessary dependencies, and includes `flash-attn` for optimized attention computation.

*   `scripts/download_data.sh`: Facilitates the download of the GECO eye-tracking corpus, which is crucial for the gaze-related experiments.

*   `scripts/download_checkpoints.sh`: Manages the download of pre-trained model checkpoints. It downloads the MDLM-OWT model (approximately 1.2GB) from HuggingFace and offers an optional download of LLaDA-8B (approximately 16GB) when invoked with the `--llada` flag.

*   `scripts/slurm/exp{1-5}`: A set of five SLURM batch templates, each configured to run a specific experiment on the `torch_pr_111_general` account:
    *   **Exp1: MDLM baseline PPL**: Computes the perplexity baseline for the MDLM model. This experiment is configured to run on an RTX8000 GPU for 4 hours.
    *   **Exp2: Gaze predictor BERT training**: Trains a BERT-based gaze predictor. This experiment is configured to run on an RTX8000 GPU for 2 hours.
    *   **Exp3: AR gaze baseline full λ sweep**: Performs a full lambda (λ) sweep for the autoregressive gaze baseline. This experiment is configured to run on an RTX8000 GPU for 8 hours.
    *   **Exp4: GazeDiffuse MDLM λ×steps grid**: Executes a grid search over lambda (λ) and steps for the GazeDiffuse model with MDLM. This experiment is configured to run on an RTX8000 GPU for 12 hours.
    *   **Exp5: GazeDiffuse LLaDA 8B subset**: Runs a subset experiment for GazeDiffuse using the LLaDA 8B model. This experiment is configured to run on an A100 GPU for 12 hours.

## Related

[[GazeDiffuse]],[[NYU Torch HPC]],[[SLURM]],[[GECO Dataset]],[[MDLM-OWT]],[[LLaDA-8B]]
