---
title: Socrata Tool Return Type Refactor for ADK Compatibility
author: ai
created_at: 2026-04-10T21:29:30.219Z
last_ai_edit: 2026-04-10T21:29:30.219Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-change-socrata-tool-return-types-to-dict-for-ad-d7f9fd.md]]"
tags:
  - backend
  - socrata
  - adk
  - pydantic
  - refactor
  - compatibility
  - python
  - commit
  - asknyc
---

# Socrata Tool Return Type Refactor for ADK Compatibility

This commit addresses compatibility issues with ADK automatic function calling by refactoring Socrata tool return types in the `askNYC` backend. Complex Pydantic return types were replaced with `dict | None` using `.model_dump()` to ensure proper parsing by ADK.

## Key Concepts

*   Automatic Function Calling (ADK),*   Pydantic Return Types,*   `model_dump()` method,*   Socrata Tools,*   Backend Compatibility

## Details

ADK (Automatic Function Calling) was unable to correctly parse complex Pydantic return types, specifically examples like `DataCard | None`. This limitation hindered the automatic function calling mechanism.

To address this, all seven Socrata tool functions within the `askNYC` backend were modified. Their return types were standardized to `dict | None` by incorporating `.model_dump()` calls for Pydantic objects. This change ensures that ADK can properly interpret the function outputs.

**Commit Details:**
*   **Repository:** `rahilsinghi/askNYC`
*   **SHA:** `53a97e7`
*   **Date:** `2026-03-28T02:44:39Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 1
*   **Additions:** +18
*   **Deletions:** -18

## Related

[[ADK]],[[Pydantic]],[[Socrata]],[[rahilsinghi/askNYC Project]],[[Rahil Singhi]]
