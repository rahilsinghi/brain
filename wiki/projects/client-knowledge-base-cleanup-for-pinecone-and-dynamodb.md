---
title: Client Knowledge Base Cleanup for Pinecone and DynamoDB
author: ai
created_at: 2026-04-15T19:49:50.966Z
last_ai_edit: 2026-04-15T19:49:50.966Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-58.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
  - knowledge-base
  - data-deletion
  - pinecone
  - dynamodb
  - utility-script
aliases:
  - Community 58
---

# Client Knowledge Base Cleanup for Pinecone and DynamoDB

This code community encompasses a utility script designed for the systematic deletion of a client's knowledge base. It orchestrates the removal of associated data from both the Pinecone vector database and the DynamoDB metadata store, ensuring a complete and consistent cleanup.

## Key Concepts

Knowledge Base (KB) management,Client data deletion,Data lifecycle management,Pinecone integration for vector deletion,DynamoDB integration for metadata cleanup,Local utility scripting

## Details

The core of this community is the `deleteKBForClient.js` script, located in `scripts/local-utils/`. This script provides a comprehensive mechanism to purge a client's knowledge base from the system. It is structured into several internal components that work together to achieve this:

*   `deletekbforclient_getallpineconeids`: This component is responsible for interacting with the [[Pinecone]] vector database to retrieve all identifiers (IDs) associated with the specific client's knowledge base. These IDs are crucial for targeting the correct data for deletion.
*   `deletekbforclient_deletedynamodbitems`: Following the identification of relevant IDs, this component handles the deletion of corresponding items from [[DynamoDB]]. This indicates that [[DynamoDB]] is used to store metadata or other structured information linked to the knowledge base entries in [[Pinecone]].
*   `deletekbforclient_main`: This acts as the central orchestration logic for the `deleteKBForClient.js` script. It coordinates the sequence of operations, ensuring that IDs are first retrieved from [[Pinecone]] and then used to systematically delete related data from [[DynamoDB]], thus providing a thorough cleanup.

This utility is an essential tool for administrative tasks within [[maison-agent]], particularly for managing data governance, privacy, and the lifecycle of client-specific knowledge bases by ensuring their complete removal from all integrated data stores.

## Related

[[maison-agent]],[[Pinecone]],[[DynamoDB]],[[Knowledge Base Management]],[[Data Deletion Policies]]
