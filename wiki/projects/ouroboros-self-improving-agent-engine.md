---
title: "Ouroboros: Self-Improving Agent Engine"
author: ai
created_at: 2026-04-10T12:50:02.598Z
last_ai_edit: 2026-04-10T12:50:02.598Z
last_human_edit: null
last_embedded_hash: 79dd524bbd03ee1b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/repo-profiles/ouroboros-project-profile.md]]"
tags:
  - self-improving
  - llm agents
  - meta-learning
  - code quality
  - software engineering
  - automation
  - python
  - anthropic
  - git
  - continuous improvement
  - autonomous
  - feedback loop
  - ai
  - project
---


# Ouroboros: Self-Improving Agent Engine

Ouroboros is an autonomous agent engine designed to improve its own codebase continuously through a closed-loop feedback system. It employs an 'inner loop' of four LLM agents for direct code modifications and an 'outer loop' meta-agent that evolves agent capabilities through prompt mutations and tournament-based scoring. The project is actively developing its meta-learning phase, with its inner loop having already demonstrated autonomous code improvements.

## Key Concepts

Self-improving agent engine,Closed-loop feedback system,Inner loop (4-Agent Improvement Cycle),Outer loop (Meta-Learning),LLM agents (Observer, Strategist, Implementer, Evaluator, MetaAgent),Git worktrees for code isolation,Scoreboard (6-dimension scoring engine),Telemetry for execution traces and performance monitoring,Prompt mutation for agent evolution,Tournament-based scoring for capability evolution,Safety invariants for controlled development,Atomic git merges

## Details

# Ouroboros Project Overview

Ouroboros is a cutting-edge project focused on creating a self-improving agent engine. It autonomously enhances its own codebase by leveraging a sophisticated closed-loop feedback system, operating in distinct inner and outer loops.

## Architecture

The core of Ouroboros's self-improvement mechanism is divided into two primary loops: the **Inner Loop** (Phase 2) for direct code modification and the **Outer Loop** (Phase 3) for meta-learning and agent evolution.

### Inner Loop — 4-Agent Improvement Cycle (Phase 2)

The inner loop executes an **OBSERVE → HYPOTHESIZE → IMPLEMENT → EVALUATE** cycle per iteration, involving four specialized LLM agents:

| Agent       | Model             | Role                                                               | Timeout |
| :---------- | :---------------- | :----------------------------------------------------------------- | :------ |
| Observer    | claude-sonnet-4-6 | Reads scoreboard + execution traces, identifies weakest dimension  | 120s    |
| Strategist  | claude-opus-4-6   | Proposes one hypothesis + change plan targeting that dimension     | 120s    |
| Implementer | claude-opus-4-6   | Writes code changes in isolated git worktree, validates syntax     | 300s    |
| Evaluator   | claude-sonnet-4-6 | Merge gate: compares before/after scoreboards, decides MERGE or ROLLBACK | -     |

**Data Flow:**
1.  The loop begins by reading the baseline scoreboard across all 6 dimensions.
2.  The Observer analyzes execution traces and the ledger history to pinpoint the weakest dimension requiring improvement.
3.  The Strategist, provided with relevant source files, formulates a single hypothesis and a plan for changes.
4.  The Implementer creates an isolated git worktree, applies the proposed changes, and validates them within a sandbox using tools like ruff and pytest.
5.  Crucial safety invariants are checked at this stage (e.g., test count must not decrease, ruff violations must not increase, no unauthorized file creation).
6.  The Evaluator runs the scoreboard on the worktree. It acts as a merge gate, deciding to MERGE the changes if there's no regression, correctness is maintained, and at least one dimension improves beyond a defined noise tolerance. Otherwise, it triggers a ROLLBACK.
7.  Upon MERGE, changes are integrated into the main codebase, and telemetry is logged. In case of ROLLBACK, KILLED, or ABANDONED outcomes, the worktree is destroyed, and the iteration is marked as failed.

### Outer Loop — Meta-Learning (Phase 3)

The outer loop introduces a meta-learning process involving **ANALYZE → REFLECT → MUTATE → TOURNAMENT → EVALUATE → PROMOTE/DISCARD**:

1.  A **MetaAgent** (powered by Opus) reviews the TelemetryReader index to identify the worst-performing agent, typically based on its ABANDONED failure rate.
2.  It retrieves the five most critical execution traces associated with that agent.
3.  The MetaAgent then mutates the identified agent's system prompt to address the root cause of its poor performance, enforcing a 120% bloat gate to prevent excessive prompt length.
4.  A **Tournament** is initiated, featuring three core benchmark tasks and two rotating tasks. Scoring is AST-based, evaluating metrics like `ruff_clean`, `has_docstring`, and `low_complexity`.
5.  The tournament score of the mutated agent is compared against its baseline performance. If improved, the new prompt version is promoted (`v{N} → v{N+1}`); otherwise, it's discarded.

**Key Subsystems:**
*   **PromptStore**: Manages versioned prompts, enabling atomic swaps between versions.
*   **BenchmarkGenerator**: Creates tournament tasks from the codebase, including core and rotating benchmarks.
*   **Tournament**: Executes benchmarks with deterministic, AST-based scoring.
*   **TelemetryReader**: Queries execution failures, filters by agent and prompt version, and calculates win rates.

## Tech Stack

*   **Programming Language**: Python 3.11+ (targeting 3.14)
*   **LLM SDK**: Anthropic SDK (utilizing `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku` models)
*   **Dependencies**: PyYAML, mypy, ruff, radon, pytest
*   **Development Environment**: `venv` for isolation, `pytest` with importlib mode, `mypy` strict mode.
*   **Configuration**: YAML-based (`ouroboros.yaml`) converted to a flat dataclass (`config.py`).
*   **Isolation**: Git worktrees for sandboxed implementation, ensuring atomic git merges.
*   **Telemetry**: YAML-frontmatter markdown + JSONL indexing (`.ouroboros/archive`).

## Key Components

### BaseAgent (`ouroboros/agents/base.py`)
Serves as a wrapper for the Anthropic SDK, handling LLM calls, robust JSON parsing with retries, markdown fence removal, and truncated JSON repair. It tracks cumulative input/output tokens and associated costs per agent.

### ImprovementLoop (`ouroboros/loop.py`)
The central orchestrator, initializing agents, worktree manager, and sandbox executor. It runs the `_run_iteration()` loop, logs to the ledger, and writes telemetry after each iteration. The loop respects time and token budgets and implements cooldown periods.

### ScoreboardSnapshot & Runners (`ouroboros/scoreboard/`)
A frozen dataclass encapsulating 6 `DimensionScore` entries. `run_scoreboard()` orchestrates the execution of six independent scoring modules (code_quality, correctness, efficiency, regression, tool_selection, real_world). Each module reads the target directory, executes commands (pytest, ruff, radon), parses output, and returns a normalized float score [0.0, 1.0].

### MergeGate (`ouroboros/scoreboard/runner.py`)
The decision logic for merging changes. It enforces hard floors for regression (1.0) and correctness (no drop), requires at least one dimension to improve beyond a `noise_tolerance` (0.02), and prohibits any dimension from regressing beyond this noise threshold.

### WorktreeManager & SandboxExecutor (`ouroboros/sandbox/`)
The `WorktreeManager` handles the creation, merging, and rollback of isolated git worktrees for each iteration. The `SandboxExecutor` runs subprocess commands with timeouts, a whitelist of allowed commands, and output capture. All code changes occur within a worktree and are only merged to the main branch upon a `MERGE` decision.

### MetaAgent & PromptStore (`ouroboros/meta/`)
The `MetaAgent` analyzes TelemetryReader data to identify the worst-performing agent, retrieves relevant traces, and uses `claude-opus-4-6` to mutate the agent's system prompt. The `PromptStore` manages versioned prompts, allowing atomic swaps between versions and enforcing a 120% bloat gate during mutations.

### TelemetryRecord & Writer (`ouroboros/telemetry/`)
A frozen dataclass capturing comprehensive iteration metadata, including run ID, timestamp, prompt versions, agent outputs, token usage per agent, file changes, git diffs, evaluation score, outcome, and failure reason. The `Writer` serializes these records to YAML-frontmatter markdown files and a JSONL index, stored at `.ouroboros/archive/`. The `Reader` facilitates querying failures, filtering by agent/prompt version, and calculating win rates.

### Ledger (`ouroboros/history/ledger.py`)
A permanent, append-only log located at `.ouroboros/ledger/`. Each `LedgerEntry` records iteration details, observation summaries, hypotheses, files changed, before/after scoreboards, outcome, and reason. It can be queried by iteration or outcome type.

## APIs & Integrations

**Anthropic SDK**:
*   **Models Used**: `claude-opus-4-6` (Implementer, Strategist, MetaAgent), `claude-sonnet-4-6` (Observer, Evaluator).
*   **Calls**: `Anthropic().messages.create(...)` wrapped by `BaseAgent.call()`.
*   **Cost Tracking**: Token counts from `response.usage` are used with a `MODEL_PRICING` dictionary.

**External Tools** (via SandboxExecutor):
*   **pytest**: For correctness scoring (`python -m pytest tests/ -v`).
*   **ruff**: For linting (60% weight in `code_quality` dimension).
*   **radon**: For cyclomatic complexity (40% weight in `code_quality` dimension).
*   **mypy**: Optional strict type checking.
*   **git**: For worktree operations (create, merge, log) and diffs.

**Configuration**:
*   `ouroboros.yaml`: Main YAML configuration file for paths, model selections, and budgets.
*   **Environment**: `ANTHROPIC_API_KEY` for SDK authentication.

## Current State

**What's Working**:
*   **Phase 2 Inner Loop**: Fully autonomous, demonstrating successful merges. All four agents (Observer, Strategist, Implementer, Evaluator) are operational.
*   **Phase 3 Meta-Learning**: The MetaAgent successfully identifies underperforming agents, mutates prompts, and conducts deterministic tournaments.
*   **Scoreboard**: All six dimensions provide accurate scoring. Significant improvements in `real_world` (docstring coverage) achieved via meta-learning.
*   **Safety Invariants**: Enforced blocked paths, pre-merge kill switches, and prompt bloat gates.
*   **Telemetry Engine**: Comprehensive recording of iteration metadata, token usage, outputs, and outcomes, with robust query capabilities.
*   **Git Isolation**: Clean creation, merging, and rollback of worktrees without dangling references.
*   **Configuration**: Robust YAML loading with CLI overrides and proper field initialization.

**What's Incomplete / Known Limitations**:
*   The `tool_selection` dimension is a placeholder (always scores 1.0) and lacks an actual routing system.
*   The `efficiency` dimension uses a self-referential baseline, leading to a constant score of 1.0.
*   Meta-learning tournaments require at least two records in the `TelemetryReader` before execution.
*   The CLI dashboard is functional, but a web-based dashboard is not fully implemented.
*   The traces subsystem exists, but event recording is not fully integrated across all agent calls.
*   Some type hints may be incomplete, preventing full `mypy` strict enforcement.
*   Agent conversation history is not persistently maintained per iteration.
*   Cost budget enforcement (`max_usd_per_run`, `max_usd_per_iteration`) is wired but not actively enforced in the loop.

**Next Steps**:
*   Implement multi-agent tournaments in Phase 3b for parallel prompt comparison.
*   Auto-calibrate the `efficiency` baseline using the main branch as a reference.
*   Develop a true `tool_selection` scorer (e.g., measuring CLI argument routing accuracy).
*   Enforce cost budgets in `loop.py` to prevent exceeding limits.
*   Extend traces with structured event types (e.g., `agent.start`, `agent.output`, `merge.decision`).

## Directory Structure

```
ouroboros/
├── agents/                      # Inner loop agents
│   ├── base.py                 # BaseAgent: LLM call wrapper, JSON parsing, token tracking
│   ├── observer.py             # Observes scoreboard, identifies weakest dimension
│   ├── strategist.py           # Proposes hypothesis + change plan
│   ├── implementer.py          # Writes code, runs sandbox executor
│   └── evaluator.py            # Merge gate decision logic (MERGE vs ROLLBACK)
│
├── meta/                        # Outer loop (Phase 3 meta-learning)
│   ├── agent.py                # MetaAgent: analyzes telemetry, mutates prompts
│   ├── prompt_store.py         # Versioned prompt file manager
│   ├── benchmark_gen.py        # Generates tournament tasks from codebase
│   └── tournament.py           # AST-based scoring + benchmarking
│
├── scoreboard/                  # 6-dimension scoring engine
│   ├── runner.py               # Orchestrates all 6 dimensions, returns ScoreboardSnapshot
│   ├── code_quality.py         # ruff (60%) + radon complexity (40%)
│   ├── correctness.py          # pytest pass rate (number of tests passing)
│   ├── efficiency.py           # source char count vs baseline
│   ├── regression.py           # previously-passing tests still pass
│   ├── tool_selection.py       # routing accuracy (placeholder, score 1.0)
│   ├── real_world.py           # public callable docstring coverage
│   └── invariants.py           # Safety checks: test count, ruff violations, file creation
│
├── sandbox/                     # Worktree isolation + execution
│   ├── worktree.py             # Create/merge/rollback git worktrees
│   ├── executor.py             # Run arbitrary commands (pytest, ruff, mypy) in subprocess
│   └── rollback.py             # Cleanup on failure
│
├── telemetry/                   # Execution trace recording (Phase 3)
│   ├── types.py                # TelemetryRecord: frozen dataclass with per-agent token breakdown
│   ├── writer.py               # Serializes records to YAML-frontmatter markdown + JSONL index
│   └── reader.py               # Queries failures, filters by prompt version, win rate summaries
│
├── history/                     # Ledger + dashboard
│   ├── ledger.py               # LedgerEntry: permanent record of each iteration attempt
│   └── dashboard.py            # CLI dashboard showing scoreboard trajectory
│
├── traces/                      # Execution trace storage (events from agent runs)
│   └── store.py                # TraceStore: read/write execution events
│
├── benchmarks/                  # Benchmark targets for meta-learning
│   └── routing/                # Tool routing benchmark (unused in Phase 3)
│
├── loop.py                      # ImprovementLoop: orchestrates 4-agent inner loop
├── types.py                     # Shared types: IterationOutcome, ScoreboardSnapshot, etc.
├── config.py                    # OuroborosConfig: dataclass + YAML loader
├── cli.py                       # CLI entry point (run, meta, scoreboard, ledger, etc.)
├── __main__.py                  # Module entry (python -m ouroboros)
└── __init__.py
```

## Related

[[LLM Agents]],[[Self-Modifying Code]],[[Meta-Learning]],[[Software Development Automation]],[[Code Quality Metrics]],[[Git Worktrees]],[[Autonomous Agents]]
