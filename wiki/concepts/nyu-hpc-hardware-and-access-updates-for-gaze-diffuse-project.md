---
title: NYU HPC Hardware and Access Updates for Gaze-Diffuse Project
author: ai
created_at: 2026-04-13T17:26:54.805Z
last_ai_edit: 2026-04-13T17:26:54.805Z
last_human_edit: null
last_embedded_hash: 3a80df14b0402f35
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-update-hpc-findings-h200-h100-l40s-gpus-projec-48821f.md]]"
tags:
  - hpc
  - gpu
  - h200
  - h100
  - l40s
  - nvidia
  - nyu
  - gaze-diffuse
  - project account
  - conda
  - hardware
  - infrastructure
  - deployment
---


# NYU HPC Hardware and Access Updates for Gaze-Diffuse Project

This document details updated findings concerning the High-Performance Computing (HPC) cluster at NYU, specifically for the `rahilsinghi/gaze-diffuse` project. It clarifies that the cluster provides H200, H100, and L40S GPUs, diverging from previous assumptions of RTX8000 or A100. Access requires a `torch_pr_xxx` project account and utilization of the `projects.hpc.nyu.edu` portal.

## Key Concepts

HPC (High-Performance Computing),GPU (Graphics Processing Unit),Project Accounts,Conda,NYU

## Details

This document outlines updated findings regarding the High-Performance Computing (HPC) cluster available for projects like [[Gaze-Diffuse]]. These findings are crucial for proper job submission and resource utilization.

### Hardware Reassessment

Initial assumptions about the available [[GPU]] hardware were incorrect. The cluster *does not* feature [[NVIDIA RTX 8000]] or [[NVIDIA A100]] GPUs as previously thought. Instead, the following GPU types are available:

*   **[[NVIDIA H200]]**
*   **[[NVIDIA H100]]**
*   **[[NVIDIA L40S]]**

### Project Account Requirement

To submit jobs to the [[HPC]] cluster, a specific project account is required. Users must obtain a `torch_pr_xxx` project account to gain access.

### Portal URL Correction

The correct portal URL for managing HPC projects is `projects.hpc.nyu.edu`. This differs from `projects.rit.nyu.edu`.

### Conda Module

The relevant [[Conda]] module to use on the HPC system is `anaconda3/2025.06`.

---
*This update was made in the `rahilsinghi/gaze-diffuse` repository (SHA: dde3257) on 2026-03-27 by Rahil Singhi, with contributions from [[Claude Opus 4.6]].*

## Related

[[Gaze-Diffuse]],[[High-Performance Computing]],[[NYU]],[[GPU]],[[Conda]],[[NVIDIA RTX 8000]],[[NVIDIA A100]],[[NVIDIA H100]],[[NVIDIA H200]],[[NVIDIA L40S]],[[Claude Opus 4.6]]
