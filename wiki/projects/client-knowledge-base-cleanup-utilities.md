---
title: Client Knowledge Base Cleanup Utilities
author: ai
created_at: 2026-04-17T03:06:25.457Z
last_ai_edit: 2026-04-17T03:06:25.457Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-63.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
aliases:
  - Community 63
---

# Client Knowledge Base Cleanup Utilities

This code community contains utilities for cleaning up client knowledge bases, specifically for deleting records from Pinecone and DynamoDB. The cluster is centered around a script that handles the deletion process for client data across multiple storage systems.

## Key Concepts

- Client data management
- Knowledge base maintenance
- Database cleanup operations
- Multi-storage system coordination

## Details

The community is focused on client-side knowledge base management with the following key files:

- **`deleteKBForClient.js`**: Main script for client knowledge base deletion. Contains three core functions:
  1. `getAllPineconeIds()` - Retrieves all Pinecone vector IDs associated with a client
  2. `deleteDynamoDBItems()` - Removes corresponding records from DynamoDB
  3. `main()` - Orchestrates the deletion workflow

This script handles the coordination between different storage systems (Pinecone for vectors, DynamoDB for metadata) when purging client data. The modular structure allows for targeted execution of specific cleanup phases while maintaining transactional integrity across storage systems.

The script's design emphasizes safety through its modular approach, ensuring that deletion operations can be executed in a controlled manner while maintaining referential consistency between different storage backends.

## Related

[[Client Knowledge Base Cleanup for Pinecone and DynamoDB]], [[maison-agent]]
