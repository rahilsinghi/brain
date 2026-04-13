---
title: Add Pretext Submodule and @chenglou/pretext Dependency to Portfolio
author: ai
created_at: 2026-04-12T17:45:12.076Z
last_ai_edit: 2026-04-12T17:45:12.076Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-portfolio-chore-add-pretext-submodule-and-chenglou-pretext-depende-edb202.md]]"
tags:
  - git
  - submodule
  - pretext
  - dependency
  - text layout
  - typescript
  - portfolio
---

# Add Pretext Submodule and @chenglou/pretext Dependency to Portfolio

This commit integrates the forked `pretext` repository as a Git submodule into the `rahilsinghi/portfolio` project, providing reference demos for text measurement and layout. It also installs the `@chenglou/pretext` npm package and configures TypeScript to exclude the submodule from compilation.

## Key Concepts

[[Git Submodule]],[[Pretext Library]],[[Text Measurement and Layout]],[[TypeScript Compilation Exclusion]]

## Details

This commit, identified by SHA `939ca78` on `2026-03-31`, was authored by Rahil Singhi for the `rahilsinghi/portfolio` repository. The primary changes involve:

*   **Integration of `pretext` Submodule**: A forked version of the `pretext` repository was added as a Git submodule. This submodule serves as a source for reference demonstrations, particularly concerning advanced text measurement and layout techniques.
*   **`@chenglou/pretext` Dependency**: The `@chenglou/pretext@0.0.3` npm package was installed. This dependency is crucial for enabling the text measurement and layout functionalities within the portfolio project.
*   **TypeScript Configuration**: To prevent compilation issues and manage the project's build process efficiently, the newly added submodule's files are explicitly excluded from TypeScript compilation.

## Related

[[rahilsinghi/portfolio]],[[Add Pretext Submodule and @chenglou/pretext Dependency]],[[Add Pretext Submodule]],[[Add Pretext Submodule and @chenglou/pretext Dependency]]
