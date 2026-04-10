---
status: pending
source_type: file_drop
source_id: null
ingested_at: 2026-04-10T12:30:00Z
parsed_at: 2026-04-10T12:30:00Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Claw Code: Project Profile

## Project Summary

**Ouroboros** is a self-improving AI agent engine forked from the exposed Claude Code source (March 31, 2026). The project started as an emergency clean-room Python rewrite when Claude Code's source was leaked. Instead of simply archiving the exposed code, the author ported core harness patterns to Python and designed a novel autonomous improvement loop. Current status: functional Python MVP with active test suite; Rust rewrite in progress on `dev/rust` branch. The system autonomously observes performance dimensions, hypothesizes improvements, implements changes in sandboxed worktrees, evaluates outcomes, and merges successful iterations.

## Tech Stack

- **Language:** Python 3.11+ (primary); Rust (in-progress rewrite)
- **Core Dependencies:** `anthropic>=0.49.0`, `pyyaml>=6.0`
- **Dev Tools:** `mypy` (strict mode), `ruff` (linting), `radon` (complexity), `pytest>=8.0`
- **Runtime:** CLI via argparse; YAML-based configuration
- **Analysis Tools:** subprocess-based execution of ruff, radon for scoring

## Architecture

The system implements a **four-phase improvement loop**: **OBSERVE** → **HYPOTHESIZE** → **IMPLEMENT** → **EVALUATE**. Agent roles are distinct LLM-backed modules that call the Anthropic API. Each iteration manages isolated git worktrees, captures traces, maintains a ledger of outcomes, and stores scoreboard snapshots. Sandboxing enforces command allowlists and blocks unsafe paths. Configuration is externalized to `ouroboros.yaml` with sensible defaults.

```
┌─────────────────────────────────────┐
│    ImprovementLoop (loop.py)        │ orchestrates phases
├─────────────────────────────────────┤
│ ObserverAgent    | reads traces     │ identifies weak dimension
│ StrategistAgent  | reads source     │ proposes change plan
│ ImplementerAgent | modifies files   │ writes code
│ EvaluatorAgent   | scores before/after │ decides merge gate
├─────────────────────────────────────┤
│ WorktreeManager  | git isolation    │ per-iteration safety
│ SandboxExecutor  | allowlist checks │ command restriction
│ Ledger           | JSONL log        │ iteration history
│ TraceStore       | event stream     │ execution traces
│ Scoreboards      | composite scores │ multi-dimension metrics
└─────────────────────────────────────┘
```

## Directory Structure

```
claw-code/
├── ouroboros/                    # Active Python engine
│   ├── agents/                   # Four agent roles (base, observer, strategist, implementer, evaluator)
│   ├── loop.py                   # OBSERVE→HYPOTHESIZE→IMPLEMENT→EVALUATE cycle
│   ├── config.py                 # OuroborosConfig (frozen dataclass)
│   ├── cli.py                    # argparse CLI: run, scoreboard, ledger, dashboard, config
│   ├── types.py                  # DimensionScore, ScoreboardSnapshot, LedgerEntry, etc.
│   ├── sandbox/                  # executor.py (allowlist), worktree.py (git isolation), rollback.py
│   ├── scoreboard/               # code_quality.py, correctness.py, efficiency.py, regression.py, tool_selection.py
│   ├── traces/                   # collector.py, analyzer.py, store.py (JSONL event logs)
│   ├── history/                  # ledger.py (iteration log), dashboard.py
│   └── benchmarks/               # benchmark suite holders
├── src/                          # Original Python porting workspace (legacy)
├── tests/ouroboros/              # 20+ unit tests (agents, sandbox, scoreboard, traces, CLI)
├── rust/                         # Rust rewrite in progress (dev/rust branch)
├── pyproject.toml                # Project metadata; entry: `ouroboros = "ouroboros.cli:main"`
├── ouroboros.yaml                # Configuration example (target_path, models, loop params, sandbox rules)
└── README.md                      # Historical context, backstory, porting status
```

## Key Components

**Agents** (all call Anthropic API via `BaseAgent`):
- `ObserverAgent`: Reads current scoreboard + recent traces + ledger summary → returns `ObservationReport` (weakest dimension, failure examples, patterns)
- `StrategistAgent`: Takes observation + relevant source code → returns `ChangePlan` (hypothesis, file edits, expected impact)
- `ImplementerAgent`: Executes change plan via `SandboxExecutor` in isolated worktree
- `EvaluatorAgent`: Compares before/after scoreboards → `EvalDecision.MERGE` or rollback

**Sandbox & Safety**:
- `WorktreeManager`: Creates per-iteration git worktrees, merges or rolls back based on evaluation
- `SandboxExecutor`: Command allowlist enforcement; subprocess execution with timeouts
- `Ledger`: Appends `LedgerEntry` (iteration metadata, outcome, diff, reason) as JSONL

**Scoring**:
- `CodeQualityScorer`: Composite score = `ruff_violations` (60%) + `radon_complexity` (40%)
- Multi-dimension support: code_quality, correctness, efficiency, regression, tool_selection (framework ready)

**Configuration**:
- `OuroborosConfig` frozen dataclass with 20+ parameters (models per role, iteration limits, time budget, sandbox rules, cost caps)
- YAML loading with sensible defaults; command-line overrides in CLI

## Current State

**Working**:
- Full OBSERVE→HYPOTHESIZE→IMPLEMENT→EVALUATE loop with LLM orchestration
- Git worktree isolation and rollback on failed evaluations
- Ledger tracking of all iterations with outcomes and diffs
- Scoreboard snapshots with multiple dimensions (code_quality primary)
- CLI with subcommands: `run`, `scoreboard`, `ledger`, `benchmark`, `dashboard`, `config`
- Comprehensive test suite (20+ tests covering agents, sandbox, scoreboard, traces, integration)
- Cost and time budgeting, token tracking
- Trace collection and analysis framework

**Incomplete/Stubbed**:
- Benchmark suite runner (scaffolded but not wired)
- Web dashboard (terminal dashboard works; web mode stubbed)
- Multi-dimension scoreboard runner (code_quality scored; others stubbed)
- Config persistence via `config set` command
- Rust rewrite (active on `dev/rust`; not yet merged to main)
- Original `src/` porting workspace (legacy; main effort moved to `ouroboros/`)

**Architecture Notes**:
- Model assignments: observer=`claude-sonnet-4-6`, strategist=`claude-opus-4-6`, implementer=`claude-opus-4-6`, evaluator=`claude-sonnet-4-6`
- Default max 10 iterations, 180m time budget, 300s command timeout
- Merge gate uses regression floor (1.0) and noise tolerance (0.02) to prevent false positives
- Cost caps: $10/run, $2/iteration
