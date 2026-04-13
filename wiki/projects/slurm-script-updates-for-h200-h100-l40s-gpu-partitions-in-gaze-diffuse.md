---
title: SLURM Script Updates for H200/H100/L40S GPU Partitions in gaze-diffuse
author: ai
created_at: 2026-04-11T00:13:33.348Z
last_ai_edit: 2026-04-11T00:13:33.348Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-gaze-diffuse-fix-hpc-update-slurm-scripts-for-h200-h100-l40s-parti-4f0364.md]]"
tags:
  - slurm
  - hpc
  - gpu
  - gaze-diffuse
  - conda
  - scripts
  - fix
  - update
---

# SLURM Script Updates for H200/H100/L40S GPU Partitions in gaze-diffuse

This commit updates SLURM experiment scripts and `setup_hpc.sh` within the [[gaze-diffuse]] repository. The changes ensure correct configuration for H200, H100, and L40S GPU partitions and an updated conda module version (anaconda3/2025.06) for high-performance computing environments.

## Key Concepts

[[SLURM]],[[High-Performance Computing]] (HPC),[[GPU]] partitions (H200, H100, L40S),Conda module,Scripting

## Details

This commit (`5ce0a85`) by Rahil Singhi, co-authored by Claude Opus 4.6, addresses updates to the [[gaze-diffuse]] repository. The primary objective was to adjust all five existing [[SLURM]] experiment scripts and the `setup_hpc.sh` script to correctly configure and utilize specific [[GPU]] partitions (H200, H100, L40S) for [[High-Performance Computing]] (HPC) environments. Additionally, the update ensures compatibility with the specified `anaconda3/2025.06` conda module version.

**Commit Details:**
*   **Repository:** [[gaze-diffuse]]
*   **SHA:** `5ce0a85`
*   **Date:** 2026-04-09T17:38:39Z
*   **Author:** Rahil Singhi
*   **Co-Authored-By:** Claude Opus 4.6
*   **Files changed:** 6
*   **Additions:** +26 lines
*   **Deletions:** -21 lines

## Related

[[gaze-diffuse]],[[High-Performance Computing]],[[SLURM]],[[GPU]]
