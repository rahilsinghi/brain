---
title: SLURM Script Updates for H200/H100/L40S Partitions (gaze-diffuse)
author: ai
created_at: 2026-04-11T00:13:16.484Z
last_ai_edit: 2026-04-11T00:13:16.484Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-hpc-update-slurm-scripts-for-h200-h100-l40s-parti-4f0364.md]]"
tags:
  - hpc
  - slurm
  - gpu
  - conda
  - gaze-diffuse
  - fix
  - infrastructure
  - deep learning
---

# SLURM Script Updates for H200/H100/L40S Partitions (gaze-diffuse)

This commit updates SLURM experiment scripts and `setup_hpc.sh` within the [[gaze-diffuse]] repository. The changes ensure correct configuration for Torch cluster GPU partitions (H200, H100, L40S) and specify the `anaconda3/2025.06` Conda module version, improving compatibility and performance on [[HPC]] systems.

## Key Concepts

SLURM Workload Manager,High-Performance Computing (HPC),GPU Partitions (H200, H100, L40S),Conda Environment Management,Torch Cluster Configuration

## Details

This commit, with SHA `5ce0a85`, by Rahil Singhi (co-authored by [[Claude Opus 4.6]]), focuses on essential infrastructure updates for the [[gaze-diffuse]] project's [[HPC]] operations. The primary goal was to modify all five existing [[SLURM]] experiment scripts and the `setup_hpc.sh` script to correctly allocate resources on various [[GPU]] partitions, specifically H200, H100, and L40S architectures. Additionally, the `conda` module version was standardized to `anaconda3/2025.06` to ensure consistent and compatible software environments for experiments.

The update involved changes across 6 files, resulting in 26 additions and 21 deletions, indicating a targeted refactoring of the configuration scripts. This fix is crucial for leveraging the specified [[GPU]] hardware efficiently and maintaining a stable environment for deep learning and scientific computing tasks within the `gaze-diffuse` project.

**Commit Details:**
- **Repo:** [[gaze-diffuse]]
- **SHA:** `5ce0a85`
- **Date:** `2026-04-09T17:38:39Z`
- **Author:** Rahil Singhi
- **Co-Author:** [[Claude Opus 4.6]]
- **Files changed:** 6
- **Additions:** +26
- **Deletions:** -21

## Related

[[gaze-diffuse]],[[SLURM]],[[HPC]],[[GPU]],[[Conda]],[[Claude]]
