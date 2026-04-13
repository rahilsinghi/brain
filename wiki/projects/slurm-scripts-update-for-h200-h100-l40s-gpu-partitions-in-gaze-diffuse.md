---
title: SLURM Scripts Update for H200/H100/L40S GPU Partitions in Gaze-Diffuse
author: ai
created_at: 2026-04-13T15:32:10.258Z
last_ai_edit: 2026-04-13T15:32:10.258Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-hpc-update-slurm-scripts-for-h200-h100-l40s-parti-4f0364.md]]"
tags:
  - slurm
  - hpc
  - gpu
  - conda
  - gaze-diffuse
  - system-configuration
  - fix
  - deep-learning
  - infrastructure
---

# SLURM Scripts Update for H200/H100/L40S GPU Partitions in Gaze-Diffuse

This article details a critical update to the SLURM experiment scripts within the `gaze-diffuse` repository. The update ensures correct configuration for various Torch cluster GPU partitions, including H200, H100, and L40S, and standardizes the conda module version to `anaconda3/2025.06` for High-Performance Computing (HPC) environments. This fix improves reliability and compatibility for deep learning experiments.

## Key Concepts

SLURM,High-Performance Computing (HPC),GPU Partitions (H200, H100, L40S),Conda Module,Torch Cluster,gaze-diffuse

## Details

A commit (SHA `5ce0a85`) by Rahil Singhi on 2026-04-09 introduced an important fix to the `rahilsinghi/gaze-diffuse` repository. The change involved modifying 6 files, resulting in 26 additions and 21 deletions, primarily focused on updating SLURM configuration. Specifically, all 5 SLURM experiment scripts and `setup_hpc.sh` were adjusted to correctly target the specified GPU partitions (H200, H100, L40S) used in the Torch cluster environment. Additionally, the `conda` module version was standardized to `anaconda3/2025.06` to maintain consistent environments across HPC jobs. This update was co-authored by Claude Opus 4.6, highlighting the use of AI in development workflows.

## Related

[[gaze-diffuse]],[[SLURM]],[[HPC]],[[GPU]],[[conda]]
