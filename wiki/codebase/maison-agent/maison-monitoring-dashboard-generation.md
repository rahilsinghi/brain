---
title: Maison Monitoring Dashboard Generation
author: ai
created_at: 2026-04-15T20:11:37.826Z
last_ai_edit: 2026-04-15T20:11:37.826Z
last_human_edit: null
last_embedded_hash: 139162b08bcf8fea
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-20.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
  - grafana
  - monitoring
  - observability
  - aws
  - prometheus
  - dashboard-automation
  - typescript
aliases:
  - Community 20
---



# Maison Monitoring Dashboard Generation

This code community encapsulates a set of utility functions and a core script for programmatically generating Grafana dashboards within the `maison-agent` repository. Its purpose is to automate the creation of detailed monitoring views, specifically for Maison's AWS infrastructure and metrics derived from Claude code operations, ensuring consistent observability.

## Key Concepts

- Grafana Dashboard Automation,- Monitoring as Code,- AWS CloudWatch Integration,- Prometheus Metrics,- Observability Infrastructure,- Scripted Dashboard Creation

## Details

This community is centered around the `grafana-dashboards.ts` script, which serves as a comprehensive tool for defining and generating Grafana dashboards. It provides a structured way to create various panel types and integrate different data sources, fostering a 'monitoring as code' approach.

The core functionality resides within the `/Users/rahilsinghi/Desktop/maison-agent/scripts/grafana-dashboards.ts` file, which includes multiple sub-functions (identified by their `grafana_dashboards_` prefix in the internal relationships) for specific panel types and dashboard constructions.

Notable files and their roles:
- `/Users/rahilsinghi/Desktop/maison-agent/scripts/grafana-dashboards.ts`: The central script responsible for orchestrating the generation of Grafana dashboards. It contains all the definitions for panels, queries, and dashboard layouts. This script is designed to be highly modular, with specialized functions for different monitoring needs.

Key internal components and their functions:
- `grafana_dashboards_buildmaisonawsdashboard`: A crucial function within the script dedicated to constructing Grafana dashboards specifically tailored for Maison's AWS infrastructure. It likely integrates with [[AWS CodeBuild Project Orchestration]] and other AWS services, utilizing CloudWatch metrics for comprehensive monitoring.
- `grafana_dashboards_buildclaudecodedashboard`: This function is responsible for building dashboards focused on monitoring operations related to [[Claude Code & Cowork Setup for Maison]] or [[Claude Code Vault Integration Documentation]]. It extensively uses Prometheus-based panel definitions.
- `grafana_dashboards_cwmetric`, `grafana_dashboards_cwinsights`, `grafana_dashboards_cwcf`: These utility functions are used to define and configure Grafana panels that source data from AWS CloudWatch, enabling the visualization of AWS-specific metrics and logs.
- `grafana_dashboards_promtspanel`, `grafana_dashboards_promstackedtspanel`, `grafana_dashboards_promstatpanel`, `grafana_dashboards_prompiepanel`, `grafana_dashboards_promquery`, `grafana_dashboards_prominstantquery`: A suite of utility functions designed for creating various types of Grafana panels (time series, stacked time series, stat panels, pie charts, raw queries, instant queries) that consume data from a Prometheus data source.
- `grafana_dashboards_tspanel`, `grafana_dashboards_statpanel`, `grafana_dashboards_rowpanel`: General-purpose utilities for creating common Grafana panel types like time series graphs, single-value statistics, and organizational row panels within a dashboard.

## Related

[[maison-agent]],[[Claude Code & Cowork Setup for Maison]],[[Claude Code Vault Integration Documentation]],[[AWS CodeBuild Project Orchestration]],[[Grafana]],[[Prometheus]],[[CloudWatch]]
