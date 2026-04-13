---
title: HPC Setup Scripts and SLURM Experiment Templates for Gaze-Diffuse
author: ai
created_at: 2026-04-13T17:13:28.231Z
last_ai_edit: 2026-04-13T17:13:28.231Z
last_human_edit: null
last_embedded_hash: f508780056e732d6
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-hpc-setup-scripts-and-slurm-experiment-templa-7ccfe2.md]]"
tags:
  - hpc
  - slurm
  - gaze-diffuse
  - pytorch
  - cuda
  - deep-learning
  - eye-tracking
  - model-training
  - scripts
  - huggingface
---


# HPC Setup Scripts and SLURM Experiment Templates for Gaze-Diffuse

This commit introduces a comprehensive set of scripts and SLURM templates to facilitate High-Performance Computing (HPC) environment setup and execution of five distinct experiments for the `gaze-diffuse` project. It includes scripts for setting up the NYU Torch HPC environment, downloading the GECO eye-tracking corpus, and fetching pre-trained models like MDLM-OWT and LLaDA-8B from HuggingFace.

## Key Concepts

High-Performance Computing (HPC),SLURM (Simple Linux Utility for Resource Management),Gaze-Diffuse Project,PyTorch,CUDA,Flash-Attention,MDLM-OWT,LLaDA-8B,BERT,Eye-tracking Corpus

## Details

This commit (`612fa5f`) by Rahil Singhi on 2026-03-12 provides essential tools for running experiments on the NYU Torch HPC environment for the `rahilsinghi/gaze-diffuse` repository.

### Setup Scripts:
*   **`scripts/setup_hpc.sh`**: A one-time setup script for the NYU Torch HPC environment. It configures a conda environment in `$SCRATCH`, installs PyTorch 2.2 with CUDA 12.1, all necessary dependencies, and flash-attention.
*   **`scripts/download_data.sh`**: Script to download the GECO eye-tracking corpus, crucial for the project's data requirements.
*   **`scripts/download_checkpoints.sh`**: Handles the download of pre-trained models. It fetches MDLM-OWT (~1.2GB) from HuggingFace and offers an optional download for LLaDA-8B (~16GB) via the `--llada` flag.

### SLURM Experiment Templates:
The commit includes five SLURM batch templates (`scripts/slurm/exp{1-5}`) designed to run experiments on the `torch_pr_111_general` account:
*   **Exp1**: MDLM baseline Perplexity (PPL) calculation, estimated to run on an RTX8000 GPU for 4 hours.
*   **Exp2**: Training of a BERT-based gaze predictor, estimated to run on an RTX8000 GPU for 2 hours.
*   **Exp3**: Full λ sweep for AR gaze baseline, estimated to run on an RTX8000 GPU for 8 hours.
*   **Exp4**: `GazeDiffuse` MDLM with a λ×steps grid search, estimated to run on an RTX8000 GPU for 12 hours.
*   **Exp5**: `GazeDiffuse` LLaDA 8B subset, requiring an A100 GPU and estimated to run for 12 hours.

## Related

[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]]
