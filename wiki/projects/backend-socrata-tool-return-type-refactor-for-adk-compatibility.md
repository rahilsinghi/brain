---
title: Backend Socrata Tool Return Type Refactor for ADK Compatibility
author: ai
created_at: 2026-04-11T00:33:47.862Z
last_ai_edit: 2026-04-11T00:33:47.862Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-change-socrata-tool-return-types-to-dict-for-ad-d7f9fd.md]]"
tags:
  - backend
  - asknyc
  - fix
  - pydantic
  - adk
  - refactor
  - socrata
---

# Backend Socrata Tool Return Type Refactor for ADK Compatibility

This commit addresses an incompatibility issue where the ADK (Agent Development Kit) automatic function calling could not parse complex Pydantic return types from Socrata tool functions. The fix involved modifying all affected Socrata tool functions in the `askNYC` backend to return simple `dict | None` types using `.model_dump()` for improved compatibility.

## Key Concepts

Socrata tool functions,ADK (Agent Development Kit),Pydantic return types,model_dump(),Backend compatibility

## Details

The commit `53a97e7` in the `rahilsinghi/askNYC` repository, authored by Rahil Singhi on 2026-03-28, implements a crucial fix for the backend. The primary issue was that the ADK's automatic function calling mechanism was unable to correctly parse complex Pydantic return types, such as `DataCard | None`, from the Socrata-related tool functions.

To resolve this, all seven affected tool functions were refactored. Instead of their original Pydantic return types, they now explicitly return `dict | None`. This change was achieved by incorporating `.model_dump()` calls, which serializes Pydantic models into standard Python dictionaries, making them compatible with the ADK's parsing capabilities. This ensures smoother integration and functionality of the Socrata tools within the ADK framework.

## Related

[[askNYC — Git Activity]],[[ADK Multi-Agent Backend (askNYC Project)]],[[ADK Multi-Agent Backend for AskNYC (NYC Open Data)]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]],[[Backend Core Implementation: FastAPI, Pydantic, and Docker]],[[Backend Foundation for raag project with FastAPI, Pydantic, and Celery]]
