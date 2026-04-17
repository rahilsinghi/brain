---
title: "HPC Hardware Update: H200/H100/L40S GPUs and Project Account Needs"
author: ai
created_at: 2026-04-12T21:49:16.538Z
last_ai_edit: 2026-04-12T21:49:16.538Z
last_human_edit: null
last_embedded_hash: 2027b3a353e97523
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-update-hpc-findings-h200-h100-l40s-gpus-projec-48821f.md]]"
tags:
  - hpc
  - gpu
  - h100
  - h200
  - l40s
  - nyu
  - cluster
  - torch
  - project account
  - conda
  - gaze-diffuse
---


# HPC Hardware Update: H200/H100/L40S GPUs and Project Account Needs

This document outlines updated findings regarding the High-Performance Computing (HPC) cluster hardware and necessary project account procedures. It specifies the availability of H200, H100, and L40S GPUs, replacing previously assumed hardware, and details the requirement for a `torch_pr_xxx` project account to submit jobs.

## Key Concepts

HPC (High-Performance Computing) Cluster,GPU (Graphics Processing Unit) Types (H200, H100, L40S),Project Account Requirements,Conda Module Management

## Details

An update on the High-Performance Computing (HPC) cluster findings reveals significant changes in available hardware and account requirements for job submission.

### Hardware Availability
Contrary to previous assumptions, the Torch cluster does *not* feature RTX8000 or A100 GPUs. Instead, the available hardware includes:

*   **H200 GPUs**
*   **H100 GPUs**
*   **L40S GPUs**

### Project Account Requirements
To submit jobs on the cluster, users will need a dedicated project account. This account must be of the format `torch_pr_xxx`.

### Portal URL
The correct portal URL for accessing project information and management is `projects.hpc.nyu.edu`. Note that `projects.rit.nyu.edu` is incorrect.

### Conda Module
The designated Conda module for use on the cluster is `anaconda3/2025.06`.

## Related

[[NYU]],[[GPU]],[[Conda]],[[Gaze-Diffuse]]
