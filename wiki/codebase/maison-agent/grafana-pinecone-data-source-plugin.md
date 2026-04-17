---
title: Grafana Pinecone Data Source Plugin
author: ai
created_at: 2026-04-15T19:56:48.250Z
last_ai_edit: 2026-04-15T19:56:48.250Z
last_human_edit: null
last_embedded_hash: 73253a0d00df3bd5
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-16.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
  - grafana
  - pinecone
  - vector-database
  - plugin
  - go
aliases:
  - Community 16
---



# Grafana Pinecone Data Source Plugin

This code community implements the [[Grafana]] data source plugin for [[Pinecone]], enabling users to query, retrieve, and embed data within a Grafana dashboard. It provides functionalities for handling text searches, performing embeddings using various AI models like [[OpenAI]] and [[Google]], and managing Pinecone namespaces directly from Grafana.

## Key Concepts

Pinecone (vector database),Grafana plugin development,Data source management,Vector embeddings,Text search functionality,API integration (OpenAI, Google),Health checks for external services,Namespace management in Pinecone

## Details

The core functionality for integrating [[Pinecone]] as a data source within [[Grafana]] is entirely encapsulated within the `pinecone.go` file, located at `/Users/rahilsinghi/Desktop/maison-agent/plugins/grafana-maison-app/pkg/plugin/pinecone.go`. This single file defines the `PineconeDatasource` struct and its associated methods, which collectively manage the lifecycle and operations of the Pinecone data source plugin.

### Notable Files and Their Roles

*   **`pinecone.go`**: This file is the central hub for all [[Pinecone]] data source logic. It contains definitions for the data source itself, query structures, settings, and the implementation of various operations.
    *   `pinecone`: Represents the overall Pinecone package or module within the plugin.
    *   `plugin_pineconedatasource`: The main data source struct, responsible for the plugin's core functionality.
    *   `plugin_pineconequery`: Defines the data structure for queries directed at [[Pinecone]].
    *   `plugin_pineconesettings`: Manages configuration settings for the [[Pinecone]] data source.
    *   `pinecone_newpineconedatasource`: A constructor function for initializing new `PineconeDatasource` instances.
    *   `pinecone_modelprovider`: An abstraction that handles different embedding model providers, such as [[OpenAI]] and [[Google]].

### Key Functionality and Internal Relationships

The `plugin_pineconedatasource` struct exposes several key methods:

*   `dispose`: Handles resource cleanup when the data source is no longer active.
*   `checkhealth`: Performs health checks to ensure the [[Pinecone]] instance is reachable and operational.
*   `querydata`: The primary entry point for Grafana's data query engine. It intelligently dispatches incoming queries to specific handlers based on the query type.
    *   This method can call `plugin_pineconedatasource_handlequery`, `plugin_pineconedatasource_handletextsearch`, `plugin_pineconedatasource_handlefetch`, or `plugin_pineconedatasource_handlelistnamespaces`.
*   `configuredproviders`: Returns a list of configured external AI model providers available for embeddings.
*   `handletextsearch`: Processes text-based search requests. This involves generating vector embeddings for the input text and then querying the [[Pinecone]] vector database for similar vectors. It utilizes `[[pinecone_modelprovider]]` to select the embedding service and calls `[[plugin_pineconedatasource_embed]]`.
*   `embed`: A general-purpose embedding function that delegates to specific embedding implementations like `[[plugin_pineconedatasource_embedopenai]]` or `[[plugin_pineconedatasource_embedgoogle]]`.
*   `embedopenai`: Specifically handles text embedding requests by interacting with the [[OpenAI]] API.
*   `embedgoogle`: Handles text embedding requests by interacting with the [[Google]] AI API.
*   `handlequery`: Executes raw or structured queries directly against the [[Pinecone]] index, ultimately calling `[[plugin_pineconedatasource_dorequest]]`.
*   `handlefetch`: Fetches specific records or vectors from the [[Pinecone]] index, also using `[[plugin_pineconedatasource_dorequest]]`.
*   `handlelistnamespaces`: Retrieves a list of available namespaces within the configured [[Pinecone]] index, relying on `[[plugin_pineconedatasource_dorequest]]`.
*   `dorequest`: A private utility method that standardizes the process of making HTTP requests to the [[Pinecone]] API endpoint.

### External Dependencies

This plugin integrates with several external Go standard library packages and potentially other internal modules:

*   `[[context]]`: Utilized for managing request-scoped data, deadlines, and cancellation signals across API calls.
*   `[[http]]`: The standard library package for handling HTTP requests and responses, crucial for communicating with both [[Pinecone]] and embedding providers.
*   `data`: Likely refers to data structures and interfaces provided by the Grafana Plugin SDK for Go, used to represent and manipulate data within Grafana.
*   `[[ma_741_migrate_mongo_pinecone]]`: Indicates a dependency on or interaction with a migration utility, suggesting this plugin might be part of a larger data migration or synchronization effort from MongoDB to Pinecone within the `maison-agent` project.

## Related

[[maison-agent]],[[Grafana]],[[Pinecone]],[[OpenAI]],[[Google]],[[context]],[[http]],[[ma_741_migrate_mongo_pinecone]]
