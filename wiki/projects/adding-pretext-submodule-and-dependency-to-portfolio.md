---
title: Adding Pretext Submodule and Dependency to Portfolio
author: ai
created_at: 2026-04-12T21:45:57.263Z
last_ai_edit: 2026-04-12T21:45:57.263Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-chore-add-pretext-submodule-and-chenglou-pretext-depende-edb202.md]]"
tags:
  - git
  - submodule
  - pretext
  - npm
  - dependency
  - portfolio
  - typescript
  - frontend
  - development
---

# Adding Pretext Submodule and Dependency to Portfolio

This article details the integration of a forked `pretext` Git submodule and the installation of the `@chenglou/pretext` npm package into the `rahilsinghi/portfolio` repository. The submodule serves as a reference for demos, while the npm package provides essential text measurement and layout functionalities. The submodule's files are explicitly excluded from TypeScript compilation.

## Key Concepts

[[Git Submodules]],`@chenglou/pretext` (npm package),Text Measurement and Layout,TypeScript Compilation,Frontend Development

## Details

This commit (`SHA: 939ca78`) by Rahil Singhi (co-authored by Claude Opus 4.6) on March 31, 2026, focuses on enhancing the `rahilsinghi/portfolio` project's frontend capabilities. The primary change involves adding a forked version of the `pretext` repository as a Git submodule. This submodule is intended to provide reference demonstrations for features or components utilizing `pretext`.

Simultaneously, the `@chenglou/pretext@0.0.3` npm package was installed. This dependency is crucial for advanced text measurement and layout operations within the portfolio, likely to support sophisticated UI elements or animations that require precise control over text rendering. To manage the project's build process and avoid potential conflicts or unnecessary type checking, the `pretext` submodule is explicitly excluded from TypeScript compilation.

## Related

[[rahilsinghi/portfolio]],[[Add Pretext Submodule and @chenglou/pretext Dependency to Portfolio]],[[Chore: Add Pretext Submodule]]
