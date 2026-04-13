---
title: "Gaze-Diffuse: SLURM Script Updates for H200/H100/L40S Partitions"
author: ai
created_at: 2026-04-12T21:20:30.838Z
last_ai_edit: 2026-04-12T21:20:30.838Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-hpc-update-slurm-scripts-for-h200-h100-l40s-parti-4f0364.md]]"
tags:
  - hpc
  - slurm
  - gpu
  - gaze-diffuse
  - conda
  - torch
  - fix
  - automation
  - development
---

# Gaze-Diffuse: SLURM Script Updates for H200/H100/L40S Partitions

This commit updates SLURM experiment and setup scripts within the `gaze-diffuse` repository to ensure compatibility with H200, H100, and L40S GPU partitions on the Torch cluster. It also standardizes the `anaconda3/2025.06` conda module version, improving reliability for High-Performance Computing (HPC) experiments.

## Key Concepts

- SLURM (Simple Linux Utility for Resource Management),- High-Performance Computing (HPC),- GPU Partitions (H200, H100, L40S),- Conda (Package, dependency, and environment management for any language),- Torch (Open-source machine learning framework),- Code Co-authorship (including AI)

## Details

This commit (SHA: `5ce0a85`) in the `rahilsinghi/gaze-diffuse` repository addresses a critical update for running experiments on High-Performance Computing (HPC) clusters. The primary goal was to ensure that the SLURM experiment scripts and the `setup_hpc.sh` script correctly target and utilize available GPU partitions.

Specifically, the update modifies 5 SLURM experiment scripts and `setup_hpc.sh` to support H200, H100, and L40S GPU partitions, which are common in advanced Torch clusters. This ensures that experiments can be scheduled and executed efficiently on the correct hardware. Furthermore, the scripts were updated to consistently use the `anaconda3/2025.06` conda module version, providing a standardized and stable environment for all HPC jobs.

The changes, consisting of +26 additions and -21 deletions across 6 files, were authored by [[Rahil Singhi]] and co-authored by [[Claude Opus 4.6]], indicating an AI-assisted development process.

## Related

[[Gaze-Diffuse]],[[SLURM]],[[High-Performance Computing]],[[Torch Cluster]],[[Conda]],[[GPU]],[[Rahil Singhi]],[[Claude Opus 4.6]]
