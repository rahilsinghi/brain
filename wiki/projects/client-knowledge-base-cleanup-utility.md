---
title: Client Knowledge Base Cleanup Utility
author: ai
created_at: 2026-04-17T03:16:07.029Z
last_ai_edit: 2026-04-17T03:16:07.029Z
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

# Client Knowledge Base Cleanup Utility

This code community implements a utility for deleting client knowledge base entries from both Pinecone vector database and DynamoDB. The utility provides a coordinated approach to remove associated data across these storage systems.

## Key Concepts

- Client data management
- Vector database cleanup
- NoSQL database operations
- Cross-database transaction coordination

## Details

The community centers around the `deleteKBForClient.js` script which implements a client knowledge base deletion utility. This script contains three main functions:

- `getAllPineconeIds()`: Retrieves vector IDs from Pinecone database
- `deleteDynamoDBItems()`: Removes corresponding records from DynamoDB
- `main()`: Coordinates the deletion process

The implementation establishes a workflow where Pinecone vector IDs are first retrieved, then corresponding DynamoDB items are deleted, with the main function orchestrating this sequence. This utility provides a critical data management capability for maintaining client knowledge bases by ensuring consistent deletion across both vector and document storage systems.

The script is implemented entirely in JavaScript and appears to be part of a local utilities collection for database maintenance operations.

## Related

[[maison-agent]], [[Client Knowledge Base Cleanup Utilities]], [[Client Knowledge Base Cleanup for Pinecone and DynamoDB]]
