---
title: "fix(hpc): Update SLURM Scripts for H200/H100/L40S Partitions"
author: ai
created_at: 2026-04-10T02:54:20.627Z
last_ai_edit: 2026-04-10T02:54:20.627Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-hpc-update-slurm-scripts-for-h200-h100-l40s-parti-4f0364.md]]"
tags:
  - slurm
  - hpc
  - gpu
  - h200
  - h100
  - l40s
  - conda
  - cluster
  - gaze-diffuse
  - infrastructure
  - devops
  - bugfix
---

# fix(hpc): Update SLURM Scripts for H200/H100/L40S Partitions

This commit updates all SLURM experiment scripts and the HPC setup script in the gaze-diffuse repository to target correct GPU partitions (H200, H100, L40S) on the Torch cluster. It also updates the conda module version to anaconda3/2025.06. The change was authored by Rahil Singhi with assistance from Claude Opus 4.6.

## Key Concepts

- **SLURM**: A workload manager and job scheduler used in high-performance computing (HPC) environments
- **GPU Partitions**: Logical groupings of GPU nodes in a cluster; here targeting H200, H100, and L40S hardware
- **HPC Setup Script**: `setup_hpc.sh` used to configure the computing environment on the cluster
- **Conda Module**: Environment and package manager; version updated to `anaconda3/2025.06`
- **Experiment Scripts**: Five SLURM job scripts used to run machine learning experiments on the cluster

## Details

## Overview

Commit `5ce0a85` in the `rahilsinghi/gaze-diffuse` repository addresses configuration issues in SLURM job submission scripts used for running HPC workloads.

## Changes Made

- **Files Changed:** 6
- **Additions:** +26 lines
- **Deletions:** -21 lines

### Updated Files
- 5 SLURM experiment scripts (corrected GPU partition targets)
- `setup_hpc.sh` (updated conda module version)

## Motivation

The scripts were previously configured with incorrect or outdated GPU partition names for the Torch cluster. This fix ensures jobs are submitted to the correct partitions supporting NVIDIA H200, H100, and L40S GPUs.

Additionally, the conda module version was outdated and has been updated to `anaconda3/2025.06` to reflect the currently available module on the cluster.

## Impact

- Ensures SLURM jobs are correctly routed to available GPU hardware
- Prevents job submission failures due to invalid partition names
- Aligns the environment setup with the latest available conda distribution

## Authorship

- **Primary Author:** Rahil Singhi
- **Date:** 2026-04-09
- **Co-Author:** Claude Opus 4.6 (AI assistance)

## Related

- [[SLURM Job Scheduling]]
- [[HPC GPU Cluster Configuration]]
- [[gaze-diffuse Project]]
- [[NVIDIA H100 GPU]]
- [[NVIDIA H200 GPU]]
- [[NVIDIA L40S GPU]]
- [[Conda Environment Management]]
- [[Rahil Singhi]]
