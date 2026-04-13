---
title: "HPC Findings Update: GPU Hardware and Access Requirements"
author: ai
created_at: 2026-04-12T17:48:16.081Z
last_ai_edit: 2026-04-12T17:48:16.081Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-docs-update-hpc-findings-h200-h100-l40s-gpus-projec-48821f.md]]"
tags:
  - hpc
  - gpu
  - h200
  - h100
  - l40s
  - project account
  - conda
  - nyu
  - gaze-diffuse
  - documentation
---

# HPC Findings Update: GPU Hardware and Access Requirements

This document updates findings regarding the Torch cluster's hardware and access requirements for the Gaze-Diffuse project. It clarifies that the cluster features H200, H100, and L40S GPUs instead of previously assumed models and outlines the need for a specific project account, correct portal URL, and Conda module for job submission.

## Key Concepts

High-Performance Computing (HPC),Graphics Processing Unit (GPU),HPC Project Account,Conda Module,Torch Cluster

## Details

An update on the High-Performance Computing (HPC) environment for the [[Gaze-Diffuse]] project reveals crucial differences from initial assumptions:

*   **GPU Hardware**: The Torch cluster does not utilize RTX8000 or A100 GPUs. Instead, it is equipped with more recent and powerful GPU models, specifically H200, H100, and L40S.
*   **Project Account Requirement**: To submit jobs to the cluster, a dedicated `torch_pr_xxx` project account is mandatory.
*   **Portal URL Correction**: The correct portal for accessing projects on the NYU HPC system is `projects.hpc.nyu.edu`, not `projects.rit.nyu.edu`.
*   **Conda Module**: The specified Conda module for this environment is `anaconda3/2025.06`.

## Related

[[Gaze-Diffuse]],[[Add Smoke, Integration, and GECO Data Validation Tests]],[[AR Baseline Test Enhancement (b07cd80)]],[[AR Baseline Test Strengthening in Gaze-Diffuse]],[[Comprehensive README for Gaze-Diffuse Project]]
