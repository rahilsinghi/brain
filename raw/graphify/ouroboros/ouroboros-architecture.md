# Graph Report - /Users/rahilsinghi/Desktop/ouroboros  (2026-04-16)

## Corpus Check
- Corpus is ~49,999 words - fits in a single context window. You may not need a graph.

## Summary
- 653 nodes · 1390 edges · 25 communities detected
- Extraction: 49% EXTRACTED · 51% INFERRED · 0% AMBIGUOUS · INFERRED: 711 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `DimensionScore` - 63 edges
2. `ScoreboardSnapshot` - 56 edges
3. `ImprovementLoop` - 49 edges
4. `IterationOutcome` - 48 edges
5. `BaseAgent` - 40 edges
6. `Ledger` - 40 edges
7. `LedgerEntry` - 35 edges
8. `OuroborosConfig` - 33 edges
9. `PromptStore` - 30 edges
10. `SandboxExecutor` - 28 edges

## Surprising Connections (you probably didn't know these)
- `Sandboxed command execution with allowlist enforcement.` --uses--> `OuroborosConfig`  [INFERRED]
  /Users/rahilsinghi/Desktop/ouroboros/ouroboros/sandbox/executor.py → /Users/rahilsinghi/Desktop/ouroboros/ouroboros/config.py
- `Tool selection accuracy benchmark dimension.` --uses--> `DimensionScore`  [INFERRED]
  /Users/rahilsinghi/Desktop/ouroboros/ouroboros/scoreboard/tool_selection.py → /Users/rahilsinghi/Desktop/ouroboros/ouroboros/types.py
- `Tests for PromptStore — versioned prompt files with atomic swap.` --uses--> `PromptStore`  [INFERRED]
  /Users/rahilsinghi/Desktop/ouroboros/tests/ouroboros/test_prompt_store.py → /Users/rahilsinghi/Desktop/ouroboros/ouroboros/meta/prompt_store.py
- `Run benchmark tasks against a prompt and compute aggregate score.` --uses--> `BenchmarkTask`  [INFERRED]
  /Users/rahilsinghi/Desktop/ouroboros/ouroboros/meta/tournament.py → /Users/rahilsinghi/Desktop/ouroboros/ouroboros/meta/benchmark_gen.py
- `CommandBlocked` --uses--> `OuroborosConfig`  [INFERRED]
  /Users/rahilsinghi/Desktop/ouroboros/ouroboros/sandbox/executor.py → /Users/rahilsinghi/Desktop/ouroboros/ouroboros/config.py

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (52): BaseAgent, load_config(), OuroborosConfig, Configuration loading and validation for Ouroboros., EvalDecision, EvaluatorAgent, Evaluator agent — runs scoreboard and makes merge/rollback decisions., Compare before/after scoreboard snapshots and decide merge or rollback. (+44 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (49): Terminal dashboard for scoreboard and ledger visualization., Render a compact summary of ledger entries., Render a scoreboard snapshot as an ASCII bar chart., render_ledger_summary(), render_scoreboard_ascii(), Enum, Ledger, Persistent append-only record of every improvement iteration. (+41 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (44): CodeQualityScorer, Resolve tool binary, preferring venv over system PATH., Run static analysis and compute a composite quality score., Return human-readable ruff violations and complexity info., Score based on lint violations. 0 violations = 1.0., Score based on cyclomatic complexity. Average CC < 5 = 1.0., _tool_path(), CorrectnessScorer (+36 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (51): _check_bloat(), MetaAgent, MetaResult, Meta-Agent — outer loop that evolves agent prompts., Result of a meta-agent cycle., Select the agent that causes the most failures based on telemetry., Check if mutation exceeds the bloat limit., Outer loop that evolves agent prompts based on telemetry. (+43 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (17): Trace analysis — pattern detection across runs., Produce aggregate statistics from trace events., TraceAnalyzer, TraceSummary, Collect trace events from claw-code CLI runs., TraceCollector, Observer agent — reads traces and scoreboard to identify weaknesses., Analyze scoreboard and traces, return an ObservationReport. (+9 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (22): BenchmarkTask, load_benchmark_tasks(), Benchmark task definitions and rotating task generation., A single benchmark task for tournament evaluation., Load benchmark tasks from YAML files in a directory., Find undocumented public functions and generate add-docstring tasks., Tests for benchmark task loading and rotating task generation., TestBenchmarkGenerator (+14 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (9): AgentResponse, Call the LLM with system and user prompts., Call LLM and parse JSON response, retrying once on failure., Parse JSON from LLM response, handling markdown fences and truncation., TestBaseAgent, Tests for BaseAgent JSON parsing and retry logic., TestCallWithJsonRetry, TestParseJson (+1 more)

### Community 7 - "Community 7"
Cohesion: 0.08
Nodes (1): PortingWorkspaceTests

### Community 8 - "Community 8"
Cohesion: 0.1
Nodes (7): Safe rollback — clean up worktree and branch, never crash., Attempt to remove a worktree and its branch. Never raises., safe_rollback(), TestSafeRollback, TestWorktreeManager, Git worktree management for isolated improvement attempts., WorktreeInfo

### Community 9 - "Community 9"
Cohesion: 0.11
Nodes (9): CostTracker, Base agent class with LLM call wrapper., Calculate USD cost from token counts and model name., Accumulates API costs across calls., Record a call's token usage. Returns the cost of this call., tokens_to_usd(), Tests for cost tracking., TestCostTracker (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (6): InvariantResult, Pre-merge safety invariants — kill switch before the merge gate., Result of safety invariant check., Run all invariant checks. Returns first violation found, or passed., Tests for pre-merge safety invariants., TestSafetyInvariants

### Community 11 - "Community 11"
Cohesion: 0.16
Nodes (4): TestToolSelectionScorer, Tool selection accuracy benchmark dimension., RoutingChallenge, ToolSelectionScorer

### Community 12 - "Community 12"
Cohesion: 0.15
Nodes (5): Exception, CommandBlocked, ExecutionResult, Sandboxed command execution with allowlist enforcement., TestSandboxExecutor

### Community 13 - "Community 13"
Cohesion: 0.17
Nodes (6): python_project(), Tests for the full scoreboard runner (all 6 dimensions)., Create a minimal Python project with a test., _run_tests must invoke the provided test_command, not a hardcoded one., When a real test file exists and passes, correctness > 0., TestRunScoreboard

### Community 14 - "Community 14"
Cohesion: 0.2
Nodes (2): Tests for PromptStore — versioned prompt files with atomic swap., TestPromptStore

### Community 15 - "Community 15"
Cohesion: 0.22
Nodes (3): _make_record(), populated_archive(), TestTelemetryReader

### Community 16 - "Community 16"
Cohesion: 0.33
Nodes (1): TestLedger

### Community 17 - "Community 17"
Cohesion: 0.39
Nodes (1): TestMergeGate

### Community 18 - "Community 18"
Cohesion: 0.22
Nodes (2): TestDefaultConfig, TestLoadConfig

### Community 19 - "Community 19"
Cohesion: 0.33
Nodes (1): TestCLI

### Community 20 - "Community 20"
Cohesion: 0.53
Nodes (2): _make_record(), TestTelemetryWriter

### Community 21 - "Community 21"
Cohesion: 0.53
Nodes (1): TestEvaluatorAgent

### Community 22 - "Community 22"
Cohesion: 0.4
Nodes (1): TestImplementerAgent

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (1): Entry point for python -m ouroboros.

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (1): Ouroboros: Self-improving agent engine for claw-code.

## Knowledge Gaps
- **54 isolated node(s):** `Configuration loading and validation for Ouroboros.`, `Ouroboros: Self-improving agent engine for claw-code.`, `Telemetry record dataclass for iteration archive.`, `Outcome of a single improvement iteration attempt.`, `A scored dimension with name and normalized value between 0.0 and 1.0.` (+49 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 23`** (2 nodes): `__main__.py`, `Entry point for python -m ouroboros.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `__init__.py`, `Ouroboros: Self-improving agent engine for claw-code.`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DimensionScore` connect `Community 2` to `Community 1`, `Community 4`, `Community 11`, `Community 16`, `Community 17`, `Community 21`?**
  _High betweenness centrality (0.198) - this node is a cross-community bridge._
- **Why does `BaseAgent` connect `Community 0` to `Community 1`, `Community 3`, `Community 4`, `Community 6`, `Community 9`?**
  _High betweenness centrality (0.191) - this node is a cross-community bridge._
- **Why does `ImprovementLoop` connect `Community 0` to `Community 1`, `Community 3`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Are the 60 inferred relationships involving `DimensionScore` (e.g. with `EfficiencyScorer` and `Efficiency benchmark dimension — token usage compared to baseline.`) actually correct?**
  _`DimensionScore` has 60 INFERRED edges - model-reasoned connections that need verification._
- **Are the 52 inferred relationships involving `ScoreboardSnapshot` (e.g. with `LoopResult` and `ImprovementLoop`) actually correct?**
  _`ScoreboardSnapshot` has 52 INFERRED edges - model-reasoned connections that need verification._
- **Are the 36 inferred relationships involving `ImprovementLoop` (e.g. with `CLI entry point for Ouroboros.` and `Build and return the argument parser for the ouroboros CLI.`) actually correct?**
  _`ImprovementLoop` has 36 INFERRED edges - model-reasoned connections that need verification._
- **Are the 44 inferred relationships involving `IterationOutcome` (e.g. with `CLI entry point for Ouroboros.` and `Build and return the argument parser for the ouroboros CLI.`) actually correct?**
  _`IterationOutcome` has 44 INFERRED edges - model-reasoned connections that need verification._