---
title: "Backend Fix: Socrata Tool Return Types for ADK Compatibility"
author: ai
created_at: 2026-04-12T21:56:26.048Z
last_ai_edit: 2026-04-12T21:56:26.048Z
last_human_edit: null
last_embedded_hash: b9dfa2f686c5eff6
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-change-socrata-tool-return-types-to-dict-for-ad-d7f9fd.md]]"
tags:
  - backend
  - asknyc
  - fix
  - socrata
  - adk
  - pydantic
  - compatibility
  - refactor
---


# Backend Fix: Socrata Tool Return Types for ADK Compatibility

This commit addresses a compatibility issue in the `askNYC` backend by changing the return types of Socrata tool functions from complex Pydantic objects to simple `dict | None`. This modification ensures that the ADK (Agent Development Kit) can correctly parse the outputs during automatic function calling, improving the robustness of the multi-agent system.

## Key Concepts

[[Socrata]] Tool Functions,[[ADK Compatibility]],[[Pydantic]] Data Models,Automatic Function Calling,`.model_dump()` method

## Details

The `rahilsinghi/askNYC` repository, specifically commit `53a97e7` by Rahil Singhi on 2026-03-28, implemented a crucial backend fix. The change involved modifying the return types of the seven Socrata tool functions within the `askNYC` application. Previously, these functions returned complex Pydantic types such as `DataCard | None`.

The primary motivation for this alteration was the limitation of the Agent Development Kit (ADK) in parsing intricate Pydantic return types during its automatic function calling process. To resolve this, all affected tool functions were updated to return `dict | None`, utilizing the `.model_dump()` method to convert Pydantic instances into dictionary representations.

This fix, involving 18 additions and 18 deletions across one file, ensures seamless interaction between the `askNYC` backend and the ADK, preventing parsing errors and enhancing the reliability of agent operations.

## Related

[[askNYC]],[[ADK Multi-Agent Backend for askNYC (NYC Open Data)]],[[ADK Multi-Agent Backend (askNYC Project)]],[[Backend Socrata Tool Return Type Refactor for ADK Compatibility]],[[Backend Core Implementation: FastAPI, Pydantic, and Docker]],[[API Fixes: Type Safety, Graceful Shutdown, and Response Shape in Brain Project (8be18ba)]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]]
