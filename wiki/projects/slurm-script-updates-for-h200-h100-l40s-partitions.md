---
title: SLURM Script Updates for H200/H100/L40S Partitions
author: ai
created_at: 2026-04-10T17:10:16.668Z
last_ai_edit: 2026-04-10T17:10:16.668Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-hpc-update-slurm-scripts-for-h200-h100-l40s-parti-4f0364.md]]"
tags:
  - slurm
  - hpc
  - gpu
  - conda
  - anaconda
  - torch
  - scripts
  - configuration
  - gaze-diffuse
---

# SLURM Script Updates for H200/H100/L40S Partitions

This update addresses necessary modifications to SLURM experiment scripts and `setup_hpc.sh` within the `gaze-diffuse` repository. The changes ensure compatibility with new H200, H100, and L40S GPU partitions and specify the correct `anaconda3/2025.06` Conda module version for High-Performance Computing (HPC) environments.

## Key Concepts

- SLURM,- HPC (High-Performance Computing),- GPU Partitions (H200, H100, L40S),- Torch Cluster,- Conda (Anaconda),- `setup_hpc.sh`

## Details

This commit, identified by SHA `5ce0a85`, from the `rahilsinghi/gaze-diffuse` repository, introduces critical updates to the project's SLURM configuration. Authored by Rahil Singhi on 2026-04-09T17:38:39Z, with contributions from Claude Opus 4.6, the changes primarily focus on adapting the environment for modern GPU hardware.

The update modifies all five existing SLURM experiment scripts and the `setup_hpc.sh` configuration file. The main objectives are:

1.  **GPU Partition Compatibility:** To ensure that jobs can correctly utilize the newer H200, H100, and L40S GPU partitions available on the HPC cluster for Torch-based computations.
2.  **Conda Module Versioning:** To explicitly define and use the `anaconda3/2025.06` Conda module version, standardizing the environment for dependencies and reproducibility.

In total, 6 files were changed, with 26 lines added and 21 lines deleted, indicating targeted adjustments to configuration and script parameters.

## Related

[[SLURM]],[[High-Performance Computing (HPC)]],[[GPU]],[[Conda]],[[Torch Cluster]]
