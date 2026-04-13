---
title: GazeDiffuse HPC Setup and SLURM Experiment Templates
author: ai
created_at: 2026-04-10T22:08:32.221Z
last_ai_edit: 2026-04-10T22:08:32.221Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-feat-add-hpc-setup-scripts-and-slurm-experiment-templa-7ccfe2.md]]"
tags:
  - hpc
  - slurm
  - scripts
  - experiment-automation
  - gaze-diffuse
  - pytorch
  - cuda
  - flash-attention
  - eye-tracking
  - machine-learning
  - mdlm
  - llada
  - bert
  - nyu
  - setup
---

# GazeDiffuse HPC Setup and SLURM Experiment Templates

This entry describes the addition of crucial scripts and SLURM templates to the `gaze-diffuse` repository, enabling efficient setup of the project's environment on High-Performance Computing (HPC) systems and automated execution of various gaze diffusion experiments. These tools streamline research workflows for the GazeDiffuse project, particularly at NYU's HPC facility.

## Key Concepts

HPC (High-Performance Computing),SLURM (Simple Linux Utility for Resource Management),GazeDiffuse,PyTorch,CUDA,Flash-attention,GECO eye-tracking corpus,MDLM-OWT,LLaDA-8B,Perplexity (PPL),BERT (Bidirectional Encoder Representations from Transformers),Autoregressive (AR) gaze models,NVIDIA RTX 8000,NVIDIA A100

## Details

The `gaze-diffuse` repository (SHA: `612fa5f`, dated `2026-03-12T18:39:17Z`, authored by [[Rahil Singhi]]) received significant updates, introducing scripts and SLURM templates for streamlined High-Performance Computing (HPC) setup and experiment execution. This commit involved 8 file changes, adding 535 lines of code.

### Key Setup and Data Scripts:
*   **`scripts/setup_hpc.sh`**: A one-time setup script designed for the NYU Torch HPC environment. It creates a Conda environment in `$SCRATCH`, installs PyTorch 2.2 with CUDA 12.1, all necessary dependencies, and flash-attention.
*   **`scripts/download_data.sh`**: Facilitates the download of the [[GECO Eye-Tracking Corpus]], a critical dataset for the project.
*   **`scripts/download_checkpoints.sh`**: Handles the download of pre-trained models. This includes the [[MDLM-OWT]] model (~1.2GB) from HuggingFace, with an optional `--llada` flag to download the larger [[LLaDA-8B]] model (~16GB).

### SLURM Experiment Templates:
A set of SLURM batch scripts (`scripts/slurm/exp{1-5}`) were added to automate the execution of five distinct experiments on the `torch_pr_111_general` account. Each template specifies resource requirements and the experiment to be run:
*   **Exp1 (MDLM Baseline PPL)**: Calculates the perplexity (PPL) of the [[MDLM-OWT]] baseline model.
    *   Resources: NVIDIA RTX 8000 GPU, 4 hours.
*   **Exp2 (Gaze Predictor BERT Training)**: Trains a [[BERT]]-based gaze predictor.
    *   Resources: NVIDIA RTX 8000 GPU, 2 hours.
*   **Exp3 (AR Gaze Baseline Full λ Sweep)**: Conducts a full sweep of the `λ` parameter for an autoregressive (AR) gaze baseline model.
    *   Resources: NVIDIA RTX 8000 GPU, 8 hours.
*   **Exp4 (GazeDiffuse MDLM λ×steps Grid)**: Explores a grid of `λ` and `steps` parameters for the [[GazeDiffuse]] model with [[MDLM-OWT]].
    *   Resources: NVIDIA RTX 8000 GPU, 12 hours.
*   **Exp5 (GazeDiffuse LLaDA 8B Subset)**: Runs [[GazeDiffuse]] experiments on a subset using the [[LLaDA-8B]] model.
    *   Resources: NVIDIA A100 GPU, 12 hours.

## Related

[[GazeDiffuse]],[[HPC]],[[SLURM]],[[PyTorch]],[[CUDA]],[[Flash-attention]],[[GECO Eye-Tracking Corpus]],[[MDLM-OWT]],[[LLaDA-8B]],[[BERT]],[[Rahil Singhi]]
