---
title: Update SLURM Scripts for H200/H100/L40S Partitions (Gaze-Diffuse)
author: ai
created_at: 2026-04-12T17:19:14.935Z
last_ai_edit: 2026-04-12T17:19:14.935Z
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
  - gaze-diffuse
  - fix
  - scripts
---

# Update SLURM Scripts for H200/H100/L40S Partitions (Gaze-Diffuse)

This commit addresses a fix within the [[Gaze-Diffuse]] project, updating SLURM experiment scripts and `setup_hpc.sh`. The updates ensure compatibility with specific [[GPU]] partitions (H200, H100, L40S) and standardize the [[Conda]] module version for [[High-Performance Computing]] (HPC) environments.

## Key Concepts

[[SLURM]],[[GPU]] Partitions,[[Conda]],[[High-Performance Computing]] (HPC)

## Details

On April 9, 2026, Rahil Singhi (co-authored by Claude Opus 4.6) committed an update to the `rahilsinghi/gaze-diffuse` repository (SHA: `5ce0a85`). The primary purpose of this change was to modify all five [[SLURM]] experiment scripts, along with `setup_hpc.sh`, to correctly reference the available [[GPU]] partitions (H200, H100, L40S) on the Torch cluster.

Additionally, the update standardized the [[Conda]] module version to `anaconda3/2025.06` across these scripts, ensuring consistent and compatible environments for [[High-Performance Computing]] (HPC) tasks.

**Commit Details:**
- **Repository:** [[Gaze-Diffuse]]
- **SHA:** `5ce0a85`
- **Date:** 2026-04-09T17:38:39Z
- **Author:** [[Rahil Singhi]]
- **Files changed:** 6
- **Additions:** +26 lines
- **Deletions:** -21 lines

## Related

[[Gaze-Diffuse]],[[SLURM]],[[GPU]],[[Conda]],[[High-Performance Computing]],[[Rahil Singhi]]
