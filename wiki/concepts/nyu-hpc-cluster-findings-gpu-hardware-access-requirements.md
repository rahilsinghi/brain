---
title: "NYU HPC Cluster Findings: GPU Hardware & Access Requirements"
author: ai
created_at: 2026-04-10T22:15:24.429Z
last_ai_edit: 2026-04-10T22:15:24.429Z
last_human_edit: null
last_embedded_hash: 598d4a55c42b5dc3
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-update-hpc-findings-h200-h100-l40s-gpus-projec-48821f.md]]"
tags:
  - hpc
  - gpu
  - nvidia
  - h200
  - h100
  - l40s
  - anaconda
  - conda
  - nyu
  - cluster
  - project account
  - gaze-diffuse
  - rahilsinghi
  - torch cluster
  - documentation
  - update
---


# NYU HPC Cluster Findings: GPU Hardware & Access Requirements

This article documents updated findings for accessing the NYU High-Performance Computing (HPC) cluster, relevant to the `rahilsinghi/gaze-diffuse` project. The cluster utilizes H200, H100, and L40S GPUs, requiring specific `torch_pr_xxx` project accounts and the correct portal URL: `projects.hpc.nyu.edu`. Users should also use the `anaconda3/2025.06` Conda module.

## Key Concepts

HPC (High-Performance Computing),GPU (Graphics Processing Unit),Conda Module,Project Accounts,NYU HPC Cluster,NVIDIA H200 GPU,NVIDIA H100 GPU,NVIDIA L40S GPU,Torch Cluster

## Details

This document outlines updated findings regarding the NYU High-Performance Computing (HPC) cluster, specifically relevant for the `rahilsinghi/gaze-diffuse` project. These details were recorded in a commit (SHA: `dde3257`) by Rahil Singhi on 2026-03-27.

Key updates include:

*   **GPU Hardware:** The Torch cluster's hardware configuration differs from previous assumptions. Instead of RTX8000 or A100 GPUs, the cluster is now equipped with NVIDIA H200, H100, and L40S GPUs.
*   **Project Account:** To submit jobs, users must now use a `torch_pr_xxx` project account.
*   **Portal URL:** The correct portal for projects is `projects.hpc.nyu.edu`, not `projects.rit.nyu.edu`.
*   **Conda Module:** The required Conda module for environments is `anaconda3/2025.06`.

This information is crucial for correctly configuring and submitting jobs to the NYU HPC cluster for projects like `gaze-diffuse`.

## Related

[[gaze-diffuse]],[[Rahil Singhi]],[[NYU HPC Cluster]],[[H200 GPU]],[[H100 GPU]],[[L40S GPU]],[[Torch Cluster]]
