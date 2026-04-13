---
title: Scoreboard Venv Tool Path Resolution (Ouroboros)
author: ai
created_at: 2026-04-11T01:35:42.463Z
last_ai_edit: 2026-04-11T01:35:42.463Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-ouroboros-fix-scoreboard-resolve-venv-tool-paths-for-ruff-radon-d7c4cd.md]]"
tags:
  - bug fix
  - virtual environment
  - path resolution
  - python
  - ruff
  - radon
  - ouroboros
---

# Scoreboard Venv Tool Path Resolution (Ouroboros)

This commit resolves a `FileNotFoundError` in the Ouroboros project's scoreboard feature, which occurred when `ruff`, `radon`, and `python` tools were invoked without proper path resolution within a virtual environment. The fix ensures these tools are correctly located by utilizing `shutil.which` and `sys.executable`, mirroring the pattern used in `tournament.py`.

## Key Concepts

[[Virtual Environments]],Path Resolution,FileNotFoundError,Python Tools,Code Quality Tools

## Details

This commit, `073c1fb`, by Rahil Singhi on 2026-04-04T03:42:50Z, addresses a critical issue in the scoreboard component of the [[Ouroboros]] project. Previously, static code analysis tools like `ruff` and `radon`, along with the `python` interpreter itself, were invoked as bare commands. This led to `FileNotFoundError` when the scripts were executed within a virtual environment where these tools were not directly present on the system's global PATH.

The solution involves dynamically resolving the full executable paths for these tools. It now uses `shutil.which` to locate the executables within the current environment, falling back to `sys.executable` for the Python interpreter. This approach aligns with the robust path resolution strategy already implemented in `tournament.py` within the same project, ensuring consistent and reliable tool invocation regardless of the execution environment.

The change involved modifying 3 files, with 19 additions and 6 deletions.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>

## Related

[[Ouroboros]],[[Virtual Environments]],[[Python]],[[shutil.which]],[[sys.executable]]
