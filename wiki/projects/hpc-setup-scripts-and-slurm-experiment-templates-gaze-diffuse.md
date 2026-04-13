---
title: HPC Setup Scripts and SLURM Experiment Templates (Gaze-Diffuse)
author: ai
created_at: 2026-04-12T21:22:23.479Z
last_ai_edit: 2026-04-12T21:22:23.479Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-hpc-setup-scripts-and-slurm-experiment-templa-7ccfe2.md]]"
tags:
  - hpc
  - slurm
  - gaze-diffuse
  - machine-learning
  - deep-learning
  - pytorch
  - cuda
  - gpu
  - experiment-automation
  - environment-setup
  - data-download
  - model-checkpoints
  - eye-tracking
  - nlp
---

# HPC Setup Scripts and SLURM Experiment Templates (Gaze-Diffuse)

This feature introduces a comprehensive set of scripts and SLURM templates to facilitate High-Performance Computing (HPC) environment setup and experiment execution for the Gaze-Diffuse project. It streamlines the process of preparing the NYU Torch HPC environment, downloading necessary datasets and models, and running five distinct machine learning experiments on dedicated GPU resources.

## Key Concepts

High-Performance Computing (HPC),SLURM,Gaze-Diffuse,MDLM (Masked Document Language Model),LLaDA-8B,GECO eye-tracking corpus,PyTorch,CUDA,Flash-Attention,BERT training,Perplexity (PPL),RTX8000 GPU,A100 GPU

## Details

This commit for the [[Gaze-Diffuse]] project introduces several utility scripts and SLURM batch templates designed to standardize and automate the setup and execution of experiments on a High-Performance Computing (HPC) environment, specifically targeting the NYU Torch HPC cluster.

### Setup Scripts
*   `scripts/setup_hpc.sh`: This script is intended for one-time setup of the NYU Torch HPC environment. It configures a Conda environment in `$SCRATCH`, installs PyTorch 2.2 with CUDA 12.1 compatibility, sets up all necessary dependencies, and includes [[Flash-Attention]].
*   `scripts/download_data.sh`: Manages the download of the [[GECO eye-tracking corpus]], a crucial dataset for the project's experiments.
*   `scripts/download_checkpoints.sh`: Handles the download of pre-trained models. It downloads the MDLM-OWT model (approximately 1.2GB) from HuggingFace by default and offers an optional `--llada` flag to download the larger LLaDA-8B model (around 16GB).

### SLURM Experiment Templates
The repository includes five distinct SLURM batch templates (`scripts/slurm/exp{1-5}`) configured for the `torch_pr_111_general` account, covering various experimental setups:
*   **Exp1: MDLM Baseline PPL**: Focuses on evaluating the perplexity of the MDLM baseline model. This experiment is configured to run on an NVIDIA RTX8000 GPU for 4 hours.
*   **Exp2: Gaze Predictor BERT Training**: Involves training a BERT-based gaze predictor. It utilizes an NVIDIA RTX8000 GPU for a duration of 2 hours.
*   **Exp3: AR Gaze Baseline Full λ Sweep**: Conducts a full sweep of the λ parameter for the AR gaze baseline. This experiment requires an NVIDIA RTX8000 GPU and is allocated 8 hours.
*   **Exp4: GazeDiffuse MDLM λ×steps Grid**: Explores a grid search over λ and steps for the GazeDiffuse MDLM model. This demanding experiment runs on an NVIDIA RTX8000 GPU for 12 hours.
*   **Exp5: GazeDiffuse LLaDA 8B Subset**: Focuses on a subset of the GazeDiffuse experiments using the LLaDA 8B model. Due to the model's size and computational requirements, this experiment is allocated an NVIDIA A100 GPU for 12 hours.

## Related

[[Gaze-Diffuse]],[[AR Baseline Test Enhancement (Gaze-Diffuse)]],[[Adding Smoke, Integration, and GECO Data Validation Tests to Gaze-Diffuse]]
