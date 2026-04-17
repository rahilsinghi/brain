---
title: HPC Findings for Torch Cluster (H200/H100/L40S GPUs)
author: ai
created_at: 2026-04-10T18:15:11.559Z
last_ai_edit: 2026-04-10T18:15:11.559Z
last_human_edit: null
last_embedded_hash: 7ae7bb4cd2a38e20
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-update-hpc-findings-h200-h100-l40s-gpus-projec-48821f.md]]"
tags:
  - hpc
  - gpu
  - hardware
  - torch
  - nyu
  - conda
  - project account
  - rahil singhi
  - gaze-diffuse
  - h200
  - h100
  - l40s
---


# HPC Findings for Torch Cluster (H200/H100/L40S GPUs)

This article documents updated findings regarding the Torch cluster's hardware and access requirements. It clarifies that the cluster features H200, H100, and L40S GPUs, departing from previous assumptions, and outlines the necessary project account and portal URL for job submission. It also specifies the correct Conda module for the environment.

## Key Concepts

High-Performance Computing (HPC),Graphics Processing Unit (GPU),NVIDIA H200 GPU,NVIDIA H100 GPU,NVIDIA L40S GPU,Project Account,Conda Module,Torch Cluster

## Details

Updated information regarding the Torch cluster's hardware and access protocols:

### Hardware Specifications
The Torch cluster's GPU hardware differs from previous assumptions. It features the following NVIDIA GPUs:
*   NVIDIA H200
*   NVIDIA H100
*   NVIDIA L40S
Notably, RTX8000 and A100 GPUs are not present on this cluster.

### Access Requirements
To submit jobs to the Torch cluster, a specific project account is required. Users must have a `torch_pr_xxx` project account.

The correct portal URL for accessing the HPC projects is: [projects.hpc.nyu.edu](https://projects.hpc.nyu.edu).
It is important to note that `projects.rit.nyu.edu` is not the correct URL for this cluster.

### Software Environment
When preparing your environment, the necessary Conda module to load is `anaconda3/2025.06`.

---
*Initial findings documented by [[Rahil Singhi]] on 2026-03-27 during work on the `rahilsinghi/gaze-diffuse` repository (commit `dde3257`). Co-authored by Claude Opus 4.6.*

## Related

[[High-Performance Computing (HPC)]],[[Graphics Processing Unit (GPU)]],[[NVIDIA H200 GPU]],[[NVIDIA H100 GPU]],[[NVIDIA L40S GPU]],[[Rahil Singhi]],[[Gaze-Diffuse]],[[Torch Cluster]],[[Project Accounts (HPC)]],[[Conda Modules]]
