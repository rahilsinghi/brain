---
title: HPC Setup and SLURM Experiment Templates for Gaze-Diffuse
author: ai
created_at: 2026-04-12T17:21:23.339Z
last_ai_edit: 2026-04-12T17:21:23.339Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-hpc-setup-scripts-and-slurm-experiment-templa-7ccfe2.md]]"
tags:
  - hpc
  - slurm
  - pytorch
  - cuda
  - flash-attention
  - gaze-diffuse
  - experiment
  - deep learning
  - infrastructure
  - nyu
---

# HPC Setup and SLURM Experiment Templates for Gaze-Diffuse

This commit introduces High-Performance Computing (HPC) setup scripts and SLURM job templates for the Gaze-Diffuse project. It streamlines the deployment of the project's environment on NYU Torch HPC and defines batch scripts for five distinct experiments, ranging from baseline perplexity calculations to large-scale model evaluations.

## Key Concepts

High-Performance Computing (HPC),SLURM Workload Manager,PyTorch Environment Setup,Flash-Attention Optimization,GECO Eye-Tracking Corpus,MDLM-OWT Language Model,LLaDA-8B Language Model,BERT Gaze Predictor,Perplexity (PPL) Evaluation,Gaze-Diffuse Experiments

## Details

This feature commit (SHA: `612fa5f`) for the `rahilsinghi/gaze-diffuse` repository, authored by Rahil Singhi on 2026-03-12, integrates critical infrastructure for running experiments on HPC clusters.

**Key Scripts Added:**

*   `scripts/setup_hpc.sh`: A one-time setup script designed for the [[NYU Torch HPC]] environment. It configures a Conda environment within `$SCRATCH`, installs [[PyTorch]] 2.2 with [[CUDA]] 12.1, all necessary dependencies, and the `flash-attn` library for optimized attention mechanisms.
*   `scripts/download_data.sh`: Facilitates the download of the [[GECO eye-tracking corpus]], which is essential for the project's research.
*   `scripts/download_checkpoints.sh`: Downloads pre-trained models. It fetches [[MDLM-OWT]] (approximately 1.2GB) from HuggingFace and offers an optional `--llada` flag to download [[LLaDA-8B]] (approximately 16GB).

**SLURM Experiment Templates (`scripts/slurm/exp{1-5}`):**

Five dedicated SLURM batch templates are provided for executing experiments on the `torch_pr_111_general` account, optimized for specific GPU resources and runtimes:

*   **Exp1: MDLM baseline PPL**: Evaluates the perplexity of the [[MDLM-OWT]] baseline model. (RTX8000 GPU, 4 hours runtime)
*   **Exp2: Gaze predictor BERT training**: Trains a [[BERT]]-based gaze predictor. (RTX8000 GPU, 2 hours runtime)
*   **Exp3: AR gaze baseline full λ sweep**: Conducts a full lambda sweep for the autoregressive gaze baseline. (RTX8000 GPU, 8 hours runtime)
*   **Exp4: GazeDiffuse MDLM λ×steps grid**: Explores a grid of lambda and steps for the [[GazeDiffuse]] model with [[MDLM-OWT]]. (RTX8000 GPU, 12 hours runtime)
*   **Exp5: GazeDiffuse LLaDA 8B subset**: Runs [[GazeDiffuse]] experiments on a subset of data using the [[LLaDA-8B]] model. (A100 GPU, 12 hours runtime)

## Related

[[Gaze-Diffuse]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[NYU Torch HPC]],[[SLURM]],[[PyTorch]],[[CUDA]],[[Flash-attn]],[[GECO eye-tracking corpus]],[[MDLM-OWT]],[[LLaDA-8B]],[[BERT]]
