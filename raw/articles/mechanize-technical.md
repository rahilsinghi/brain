---
status: processed
source_type: file_drop
source_id: career-datacenter/prep/mechanize_technical_prep.md
ingested_at: 2026-04-08T14:25:52.477Z
parsed_at: 2026-04-08T14:25:52.477Z
compiled_to: "[[Mechanize — RL Environment Company for Frontier AI Labs]]"
processed_at: 2026-04-08T15:34:49.199Z
retry_count: 0
last_error: null
compile_progress: null
---



# Mechanize Technical Prep — Call at 3:10 PM

## What They Build
RL environments for training coding models at frontier AI labs.
- **Prompt** — natural language task
- **Environment** — Docker container with real codebase
- **Automated Grader** — runs tests, score = reward signal for RL

## Key Concept: RLVR
RL from Verifiable Rewards. Run the code. Tests pass? Binary reward. No human judges. DeepSeek-R1 used this for math. Mechanize does it for code. **The grader IS the reward function.**

## Their Thesis
- Bottleneck for general agents is NOT compute — it's diverse, high-quality environments
- Cheap tasks waste compute ("putting cheap tires on a Ferrari")
- $500-$2,400 per task justified at current compute costs

## Good RL Task
- 2-3% pass rate (RL needs variance via GRPO)
- Robust grader resistant to reward hacking
- Multi-step, long-horizon, "guessproof"

## Your Experience Mapped
- **Playwright + LLM pipeline** = prompt + env + grader (mini RL environment)
- **Reward hacking**: models hallucinated fields passing schema validation. Hardened grader.
- **Where models fail**: multi-step flows, inconsistent DOM, business logic edges
- **RLVR**: your grader was deterministic. >95% field coverage.
- **Daily Claude Code user**: over-abstraction, wrong data assumptions, confident wrong edges
- **MCP tools**: searchHotels, getHotelRates = structured envs with defined I/O

## Key Answers

**"What do you know about us?"**
"RL environments for frontier labs. Prompt + containerized codebase + automated grader. Reward signal for training. Your thesis: bottleneck is environment quality, not compute."

**"Where have models failed?"**
(1) Edge cases needing business context (rate fallback logic). (2) Pass shallow validation but semantically wrong. (3) Lose context in multi-step flows.

**"Design an RL task?"**
Find frontier model failure. Containerize it. Write robust grader. Check ~2-3% pass rate. Harden against reward hacking.

**"RL experience?"**
"No direct RL training. JD says not required. My experience is environment + evaluation side."

**"Hospitality background?"**
"Domain was hospitality. Work was AI eval pipelines, automated grading, model failure debugging across 7-8 booking engines."

## Questions for William
1. Typical week for junior engineer?
2. How do you evaluate env quality?
3. Team structure — who would I work with?
4. Take-home advice?
5. Timeline if I advance?
6. SF relocation flexibility while finishing degree?

## Interview Process
Today: recruiter (30-40 min) → Take-home: 3hr web app (AI tools OK) + 1hr code review → Offer

## Don'ts
- Don't over-explain hospitality
- Don't undersell coding agent experience (biggest edge)
- Don't ask about WLB first
- Keep answers 60-90 sec
- Drop "verifiable rewards." Don't say "RLHF."

---

## Deeper Technical Context

### SWE-bench (know this)
- 2,294 real GitHub issues from 12 Python repos (Django, Flask, scikit-learn)
- Model gets issue text + codebase, generates patch
- Graded by applying patch + running test suite in Docker
- **SWE-bench Verified**: 500-task subset built by Epoch AI (Mechanize founders)

### RL Basics
- **Policy**: model's strategy for choosing actions
- **Reward signal**: feedback from environment (tests pass?)
- **Episode**: one complete attempt
- **GRPO**: compares multiple attempts, reinforces better ones. Needs variance.

### Market Context
- Anthropic: >$1B on RL environments
- Task costs: $200-$2,000 each
- Complex envs (Slack clone): ~$300K
- Exclusive arrangements: 4-5x premium

### Their Essays
- "GPT-3 Moment for RL": same paradigm shift — diverse environments → general agent
- "Cheap RL Tasks Will Waste Compute": $2,400/task justified. Domain experts > cheap contractors.
- "How to Fully Automate SWE": current gaps in envs (no internet sim, no VM-in-VM). Goal: "drop-in remote worker"

### Founders (from Epoch AI, EA/rationalist community)
- Tamay Besiroglu (CEO) — Epoch AI co-founder, Cambridge/MIT econ
- Ege Erdil — math/stats, conservative AGI timelines (~2045)
- Matthew Barnett — most aggressive timelines, self-identifies EA but accelerationist

### Controversy
- Left AI safety nonprofit to build capabilities company. PauseAI called it "betrayal."
- NYT Kevin Roose: "strangely devoid of empathy"
- TechCrunch: "startup to replace all human workers everywhere"
- TAM is literally "all human wages" ($60T globally)
- Essays ("Life after work") argue automation = abundance, UBI, no concrete transition plan

### The $300K is Real
- Jr SWE: $300K + equity. SWE: $350K. Sr: $400K. Up to $600K total comp on levels.fyi.
- Competing with frontier lab salaries (OpenAI, Anthropic, DeepMind)
