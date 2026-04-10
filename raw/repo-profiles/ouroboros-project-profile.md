---
status: processed
source_type: file_drop
source_id: null
ingested_at: 2026-04-10T12:30:00Z
parsed_at: 2026-04-10T12:30:00Z
compiled_to: "[[Ouroboros: Self-Improving Agent Engine]]"
processed_at: 2026-04-10T12:50:02.598Z
retry_count: 1
last_error: "[GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent: [429 Too Many Requests] Your prepayment credits are depleted. Please go to AI Studio at https://ai.studio/projects to manage your project and billing."
compile_progress: null
---





# Ouroboros Project Profile

## 1. Project Summary

Ouroboros is a self-improving agent engine that autonomously improves its own codebase through a closed-loop feedback system. Four LLM agents (Observer, Strategist, Implementer, Evaluator) form the **inner loop** (Phase 2): they analyze code quality metrics, propose improvements, implement changes in isolated git worktrees, and merge only when scores improve. An **outer loop** (Phase 3, Meta-Learning) runs a Meta-Agent that analyzes execution telemetry, mutates agent system prompts to fix cognitive bottlenecks, and evolves agent capabilities via tournament-based scoring.

**Status**: Phase 3 in active development. Phase 2 completed 4 autonomous merges with docstring coverage improving from 0.35 → 0.51. Phase 3 evolved the Strategist agent's prompt, improving win rate from 0% → 40% and real_world score 0.51 → 0.67. All safety invariants operational (146 tests passing, 0 ruff violations).

## 2. Tech Stack

- **Python 3.11+** (target 3.14)
- **Anthropic SDK** (claude-opus-4-6, claude-sonnet-4-6, claude-haiku models)
- **Dependencies**: PyYAML, mypy, ruff, radon, pytest
- **Dev Environment**: venv (.venv/), pytest with importlib mode, mypy strict mode
- **Configuration**: YAML-based (ouroboros.yaml) → flat dataclass in config.py
- **Isolation**: Git worktrees for sandboxed implementation, atomic git merges
- **Telemetry**: YAML-frontmatter markdown + JSONL indexing (.ouroboros/archive)

## 3. Architecture

### Inner Loop — 4-Agent Improvement Cycle (Phase 2)

The core loop executes **OBSERVE → HYPOTHESIZE → IMPLEMENT → EVALUATE** per iteration:

| Agent | Model | Role | Timeout |
|-------|-------|------|---------|
| Observer | claude-sonnet-4-6 | Reads scoreboard + execution traces, identifies weakest dimension | 120s |
| Strategist | claude-opus-4-6 | Proposes one hypothesis + change plan targeting that dimension | 120s |
| Implementer | claude-opus-4-6 | Writes code changes in isolated git worktree, validates syntax | 300s |
| Evaluator | claude-sonnet-4-6 | Merge gate: compares before/after scoreboards, decides MERGE or ROLLBACK | - |

**Data Flow**:
1. Loop reads baseline scoreboard (all 6 dimensions)
2. Observer analyzes traces and ledger history, identifies weakest dimension
3. Strategist reads relevant source files (~20), proposes single hypothesis + file changes
4. Implementer creates git worktree, applies changes, validates via ruff/pytest in sandbox
5. Safety invariants checked (test count never decreases, ruff violations never increase, no conftest/config created)
6. Evaluator runs scoreboard on worktree, checks merge gate (no regression, correctness floor, at least one dimension improves beyond noise tolerance)
7. On MERGE: changes integrated to main, telemetry logged. On ROLLBACK/KILLED/ABANDONED: worktree destroyed, iteration marked failed.

### Outer Loop — Meta-Learning (Phase 3)

Adds **ANALYZE → REFLECT → MUTATE → TOURNAMENT → EVALUATE → PROMOTE/DISCARD**:

1. **MetaAgent** (Opus) reads TelemetryReader index, identifies worst-performing agent (by ABANDONED failure rate)
2. Retrieves 5 worst execution traces for that agent
3. Mutates agent's system prompt to fix root cause (120% bloat gate enforced)
4. Runs **Tournament**: 3 core benchmark tasks + 2 rotating tasks (AST-based scoring: ruff_clean, has_docstring, low_complexity)
5. Compares tournament score vs baseline; if improved, promotes new version and bumps v{N} → v{N+1}; else discards

**Key Subsystems**:
- **PromptStore** (ouroboros/meta/prompt_store.py): Versioned prompts at `.ouroboros/prompts/<agent>/v{N}.md`, atomic swap via os.replace()
- **BenchmarkGenerator** (ouroboros/meta/benchmark_gen.py): 3 core tasks (code_quality, correctness, real_world) + 2 rotating (generated from undocumented public functions)
- **Tournament** (ouroboros/meta/tournament.py): AST walker, deterministic scoring, no randomness
- **TelemetryReader** (ouroboros/telemetry/reader.py): Queries failures by agent + prompt version, win rate summaries

## 4. Directory Structure

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

## 5. Key Components

### BaseAgent (ouroboros/agents/base.py)
Wrapper around Anthropic SDK. Handles LLM calls, JSON parsing with retries, markdown fence removal, truncated JSON repair. Tracks cumulative input/output tokens and cost per agent. Token pricing: Opus (15, 75)/M, Sonnet (3, 15)/M.

### ImprovementLoop (ouroboros/loop.py)
Main orchestrator. Creates agents, worktree manager, sandbox executor. Runs _run_iteration() in a loop: OBSERVE → HYPOTHESIZE → IMPLEMENT → EVALUATE. Logs to ledger, writes telemetry after each iteration. Respects time budget, cooldown, token budgets.

### ScoreboardSnapshot & Runners (ouroboros/scoreboard/)
Frozen dataclass with 6 DimensionScore entries. `run_scoreboard()` executes all 6 scorers in sequence, returns snapshot. Each scorer is independent module (code_quality, correctness, efficiency, regression, tool_selection, real_world). Runners read target directory, execute commands (pytest, ruff, radon), parse output, return float [0.0, 1.0].

### MergeGate (ouroboros/scoreboard/runner.py)
Decision logic: hard floors on regression_floor (1.0) and correctness (no drop), requires at least one dimension improvement beyond noise_tolerance (0.02), forbids any dimension regression beyond noise.

### WorktreeManager & SandboxExecutor (ouroboros/sandbox/)
WorktreeManager creates isolated git worktrees per iteration, tracks checkout/merge/rollback. SandboxExecutor runs subprocess commands with timeout, allowed-command list, output capture. All implementation changes happen in worktree; only merged to main on MERGE decision.

### MetaAgent & PromptStore (ouroboros/meta/)
MetaAgent identifies worst agent by analyzing TelemetryReader, retrieves 5 worst traces, calls Opus to mutate system prompt. PromptStore manages versioned prompts at `.ouroboros/prompts/<agent>/v{N}.md`, tracks current active version. Mutations checked against 120% bloat gate before promotion.

### TelemetryRecord & Writer (ouroboros/telemetry/)
Frozen dataclass capturing iteration metadata: run_id, iteration number, timestamp, prompt versions used, agent outputs, per-agent token usage (AgentTokens), files changed, git diff, eval_score, outcome, failure_reason. Writer serializes to YAML-frontmatter markdown files + JSONL index at `.ouroboros/archive/`. Reader queries by agent, by prompt version, computes win rates.

### Ledger (ouroboros/history/ledger.py)
Permanent append-only log at `.ouroboros/ledger/`. Each LedgerEntry stores: iteration, timestamp, observation_summary, hypothesis, files_changed, before/after scoreboards, outcome, reason. Read via `ledger.read_all()`, queried by iteration or outcome type.

## 6. APIs & Integrations

**Anthropic SDK**:
- **Models Used**: claude-opus-4-6 (Implementer, Strategist, MetaAgent), claude-sonnet-4-6 (Observer, Evaluator)
- **Calls**: `Anthropic().messages.create(model, max_tokens, system, messages)` wrapped in BaseAgent.call()
- **Cost Tracking**: Token counts from response.usage, pricing baked into MODEL_PRICING dict

**External Tools** (via SandboxExecutor):
- **pytest**: `python -m pytest tests/ -v` for correctness scoring
- **ruff**: `ruff check <path>` for linting (code_quality dimension, 60% weight)
- **radon**: `radon mi <path>` for cyclomatic complexity (code_quality dimension, 40% weight)
- **mypy**: optional strict type checking (allowed command, not in scoreboard)
- **git**: worktree create/merge/log, diff operations

**Configuration**:
- **ouroboros.yaml**: YAML config file (target paths, model selections, budgets)
- **Environment**: ANTHROPIC_API_KEY for SDK auth

## 7. Development Setup

```bash
# Clone and setup
cd /Users/rahilsinghi/Desktop/ouroboros
python -m venv .venv
source .venv/bin/activate

# Install
pip install -e ".[dev]"

# Set API key
export ANTHROPIC_API_KEY="sk-..."

# Run tests
python -m pytest tests/ouroboros/ -v          # 146+ tests

# Run improvement loop
python -m ouroboros run --iterations 5        # 5 iterations of inner loop
python -m ouroboros run --time-budget 30m     # 30-minute budget

# Meta-learning
python -m ouroboros meta --status             # Show prompt version win rates
python -m ouroboros meta                      # Run one meta-cycle
python -m ouroboros meta --agent strategist   # Target specific agent

# View results
python -m ouroboros scoreboard                # Current scores (from ledger)
python -m ouroboros ledger                    # Full iteration history
python -m ouroboros ledger --merged-only      # Only merged iterations

# Linting
ruff check ouroboros/                         # Should be 0 violations
```

## 8. Current State

**What's Working**:
- Phase 2 inner loop: fully autonomous. 4/5 iterations merged. Observer, Strategist, Implementer, Evaluator agents all operational.
- Phase 3 meta-learning: MetaAgent identifies worst-performing agent, mutates prompts, tournaments execute deterministically.
- Scoreboard: all 6 dimensions scoring correctly. code_quality (1.00), correctness (1.00, 146 tests), efficiency (1.00), regression (1.00), tool_selection (1.00 placeholder), real_world (0.67, improved via meta-learning).
- Safety invariants: blocked paths enforcement, pre-merge kill switch, prompt bloat gate.
- Telemetry engine: records all iterations with per-agent tokens, outputs, outcomes. TelemetryReader queries failures and computes win rates per agent + prompt version.
- Git isolation: worktrees created/merged/rolled back cleanly. No dangling refs.
- Config: YAML loading, overrides via CLI, all required fields initialized.

**What's Incomplete / Known Limitations**:
- tool_selection dimension is placeholder (score always 1.0, measures routing accuracy but no actual routing system)
- efficiency dimension uses self-referential baseline (baseline=0, so score normalizes to 1.0 always)
- Meta-learning tournament runs only when TelemetryReader has ≥2 records; requires running inner loop first
- Dashboard (CLI visual) exists but web dashboard (--web flag) not fully implemented
- Traces subsystem exists but event recording not fully wired into all agent calls
- Some type hints may be incomplete (mypy strict not fully enforced on all files)
- No persistent state for agent conversation history (each iteration is fresh)
- Cost tracking wired but actual budget enforcement (max_usd_per_run, max_usd_per_iteration) not yet enforced in loop

**Next Steps** (inferred from CLAUDE.md):
- Phase 3b: Implement multi-agent tournament (compare evolved prompts against baseline in parallel)
- Auto-calibrate efficiency baseline (measure main branch, use as reference)
- Implement true tool_selection scorer (e.g., CLI argument routing accuracy)
- Enforce cost budgets in loop.py before iteration exceeds max_usd_per_iteration
- Extend traces with structured event types (agent.start, agent.output, merge.decision)
