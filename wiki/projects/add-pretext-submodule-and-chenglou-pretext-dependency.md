---
title: Add Pretext Submodule and @chenglou/pretext Dependency
author: ai
created_at: 2026-04-11T00:31:30.126Z
last_ai_edit: 2026-04-11T00:31:30.126Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-chore-add-pretext-submodule-and-chenglou-pretext-depende-edb202.md]]"
tags:
  - git
  - submodule
  - dependency
  - pretext
  - portfolio
  - typescript
  - chore
---

# Add Pretext Submodule and @chenglou/pretext Dependency

This commit integrates a forked `pretext` repository as a Git submodule into the `rahilsinghi/portfolio` project to provide reference demos. It also installs the `@chenglou/pretext` npm package for robust text measurement and layout functionalities, while ensuring the submodule is excluded from TypeScript compilation.

## Key Concepts

Git Submodule,Dependency Management,Text Measurement,TypeScript Compilation,Pretext Library

## Details

This chore commit, identified by SHA `939ca78` from Rahil Singhi on 2026-03-31, focuses on enhancing the `rahilsinghi/portfolio` project's development environment. It adds a forked version of the `pretext` repository as a Git submodule, primarily for referencing its demos.

Simultaneously, the `@chenglou/pretext@0.0.3` npm package is installed. This dependency is crucial for advanced text measurement and layout operations within the project. To prevent potential compilation issues or unnecessary processing, the newly added submodule is explicitly excluded from TypeScript compilation.

## Related

[[Add everything-claude-code Submodule]]
