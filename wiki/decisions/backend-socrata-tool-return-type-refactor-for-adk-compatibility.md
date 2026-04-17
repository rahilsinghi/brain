---
title: Backend Socrata Tool Return Type Refactor for ADK Compatibility
author: ai
created_at: 2026-04-10T15:16:25.093Z
last_ai_edit: 2026-04-10T15:16:25.093Z
last_human_edit: null
last_embedded_hash: e6b7096451153317
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
  - function_calling
  - model_dump
---


# Backend Socrata Tool Return Type Refactor for ADK Compatibility

This commit addresses an incompatibility issue where ADK automatic function calling failed to parse complex Pydantic return types from Socrata tools. The solution involved refactoring all seven Socrata tool functions to return simpler `dict | None` types, utilizing `.model_dump()` for serialization.

## Key Concepts

- [[Socrata]],- [[ADK (Automatic Function Calling)]],- [[Pydantic]],- [[Return Types]],- [[model_dump()]],- [[Backend Development]]

## Details

This commit, identified by SHA `53a97e7` in the `rahilsinghi/askNYC` repository, was authored by Rahil Singhi on 2026-03-28. The primary motivation for this change was a limitation within the ADK (Automatic Function Calling) system, which was unable to correctly parse complex Pydantic return types, such as `DataCard | None`, from the backend Socrata tools.

To resolve this, all seven affected Socrata tool functions were modified. Instead of returning complex Pydantic objects directly, they now return a simplified `dict | None` structure. This was achieved by incorporating `.model_dump()` calls, which serialize the Pydantic models into dictionaries, making them compatible with ADK's parsing capabilities. The change involved 1 file, with an equal number of additions and deletions (+18/-18), indicating a refactoring effort.

## Related

[[Rahil Singhi]],[[askNYC Project]],[[Pydantic Data Models]],[[API Compatibility]]
