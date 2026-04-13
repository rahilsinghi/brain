---
title: "Backend Fix: Socrata Tool Return Types for ADK Compatibility in askNYC"
author: ai
created_at: 2026-04-13T17:34:43.168Z
last_ai_edit: 2026-04-13T17:34:43.168Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-change-socrata-tool-return-types-to-dict-for-ad-d7f9fd.md]]"
tags:
  - backend
  - fix
  - asknyc
  - adk
  - pydantic
  - socrata
  - refactor
  - compatibility
---

# Backend Fix: Socrata Tool Return Types for ADK Compatibility in askNYC

This article details a backend fix for the `askNYC` project, addressing an incompatibility where the ADK (Automatic Function Calling) system could not parse complex Pydantic return types from Socrata tool functions. The solution involved refactoring all seven Socrata tool functions to explicitly return `dict | None` by utilizing Pydantic's `.model_dump()` method, ensuring seamless integration with ADK.

## Key Concepts

Socrata tool functions,ADK (Automatic Function Calling),Pydantic return types,Pydantic .model_dump() method,Dictionary (dict) return type,Backend compatibility

## Details

The `rahilsinghi/askNYC` repository underwent a critical backend fix (SHA: `53a97e7`) on March 28, 2026, to resolve a compatibility issue with its ADK (Automatic Function Calling) system. Previously, the Socrata tool functions, which are integral to data retrieval for `askNYC`, were returning complex Pydantic types (e.g., `DataCard | None`). The ADK system, however, was unable to reliably parse these intricate Pydantic objects for its automatic function calling mechanism.

To rectify this, all seven Socrata tool functions were modified. Instead of returning raw Pydantic models, they now explicitly convert their Pydantic output into a standard Python `dict` using the `.model_dump()` method. This change ensures that the return type is consistently `dict | None`, which is readily parsable and compatible with the ADK's requirements. This refactor involved 18 additions and 18 deletions across a single file, streamlining the data interface between the Socrata tools and the ADK multi-agent backend.

## Related

[[ADK Multi-Agent Backend (askNYC Project)]],[[askNYC Backend Hardening (ad6b409)]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]],[[Backend Socrata Tool Return Type Refactor for ADK Compatibility]],[[Pydantic]],[[Pydantic model_dump()]]
