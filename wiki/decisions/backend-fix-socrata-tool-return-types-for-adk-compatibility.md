---
title: "Backend Fix: Socrata Tool Return Types for ADK Compatibility"
author: ai
created_at: 2026-04-11T01:26:25.130Z
last_ai_edit: 2026-04-11T01:26:25.130Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-change-socrata-tool-return-types-to-dict-for-ad-d7f9fd.md]]"
tags:
  - backend
  - fix
  - socrata
  - adk
  - pydantic
  - asknyc
  - commit
  - return-types
---

# Backend Fix: Socrata Tool Return Types for ADK Compatibility

This commit addresses an incompatibility issue where the ADK (Agent Development Kit) could not parse complex Pydantic return types from Socrata tool functions in the askNYC backend. The fix involved modifying all seven Socrata tool functions to return simpler `dict | None` types, leveraging Pydantic's `.model_dump()` method for compatibility.

## Key Concepts

[[Socrata tool]],[[ADK Multi-Agent Backend for AskNYC (NYC Open Data)]],[[Pydantic]] return types,`dict | None`,`.model_dump()`

## Details

This commit, with SHA `53a97e7`, dated 2026-03-28T02:44:39Z by Rahil Singhi, introduces a critical backend fix for the [[askNYC]] project. The primary issue was that the [[ADK Multi-Agent Backend (askNYC Project)]] (Agent Development Kit) was unable to correctly parse complex Pydantic return types, such as `DataCard | None`, from the various [[Socrata tool]] functions.

To resolve this, all seven affected tool functions were updated. Instead of returning Pydantic models directly, they now return `dict | None`. This conversion is achieved by calling the `.model_dump()` method on the Pydantic instances before returning, ensuring that the output is easily consumable by the ADK's automatic function calling mechanism. This change involved 18 additions and 18 deletions across one file in the `rahilsinghi/askNYC` repository, standardizing the output for better interoperability.

## Related

[[askNYC]],[[Backend Socrata Tool Return Type Refactor for ADK Compatibility]],[[ADK Multi-Agent Backend (askNYC Project)]],[[Pydantic]],[[Pydantic model_dump]]
