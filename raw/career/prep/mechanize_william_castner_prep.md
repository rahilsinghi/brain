---
status: processed
source_type: career-datacenter
ingested_at: 2026-04-09T21:35:00.000Z
parsed_at: 2026-04-09T21:35:00.000Z
compiled_to: "[[Mechanize — Recruiter Screen Preparation (William Castner, March 2026)]]"
processed_at: 2026-04-10T01:45:48.464Z
retry_count: 0
last_error: null
compile_progress: null
---


# Meeting Prep: William Castner — Mechanize

**Meeting:** Friday, March 27, 2026 · 3:10-3:50 PM ET
**Format:** Video/phone call (Calendly booking)
**Role:** Junior Software Engineer ($300K/yr + equity)
**Your goal:** Pass recruiter screen, advance to take-home project stage.

---

## Section 1: What Mechanize Builds

Mechanize builds **reinforcement learning environments** that frontier AI labs use to train and evaluate their coding models. Each environment is a self-contained software engineering challenge with a prompt, an environment, and an automated grader. The grader scores become reward signals during training.

**Core thesis:** The "GPT-3 moment" for RL is coming. Just as language models scaled on diverse text, RL agents will scale on diverse work environments. Mechanize builds those environments.

**Customers:** Frontier AI labs (OpenAI, Anthropic, Google DeepMind, etc.)

**Why it matters:** AI models handle narrow coding tasks but fail at complex, judgment-heavy software engineering. Mechanize exposes those failures so models can improve.

---

## Section 2: Company Details

- **Team:** ~20 people, San Francisco (on-site)
- **Founded:** 2025, by ex-Epoch AI researchers
- **Funding:** Seed round (undisclosed amount, likely millions)
- **Investors:** Patrick Collison (Stripe CEO), Nat Friedman & Daniel Gross (ex-GitHub CEO), Jeff Dean (Google Chief Scientist), Dwarkesh Patel, Sholto Douglas (DeepMind)
- **Press:** NYT, Hard Fork podcast, Dwarkesh Podcast, TechCrunch, Fortune
- **Compensation:** Jr SWE $300K, SWE $350K, Sr SWE $400K + equity + benefits

### Founders

1. **Tamay Besiroglu** (CEO) — Former Associate Director of Epoch AI (co-founded it). Graduate research at Cambridge (econ) and MIT. Published researcher on economics of computing. Appeared on Dwarkesh Podcast, Hard Fork.
2. **Ege Erdil** — Former Epoch AI researcher. AI capabilities forecasting.
3. **Matthew Barnett** — Former Epoch AI. Co-founder.

All three come from AI research/forecasting backgrounds, not traditional SWE.

---

## Section 3: The Role

### What you'd do:
- Design and build RL tasks (prompt + environment + automated grader)
- Own full lifecycle: ideation, grading infra, model testing, failure analysis, iteration
- Use coding agents heavily: directing them, evaluating output, spotting subtle failures
- Find situations where frontier models fail in interesting ways
- Identify capability gaps that the model itself doesn't see

### What they want:
- Python proficiency (core requirement)
- Strong technical fundamentals
- Intuition for AI model behavior (where models take shortcuts, genuine vs. grader issues)
- Independent, high-ownership work style
- Creative cleverness in task design
- Significant time working with coding agents is a "real head start"

### Explicitly NOT:
- Product engineering for end users
- Highly collaborative/shared ownership
- Extensive structured mentorship

---

## Section 4: Interview Process

**Stage 1 (tomorrow):** Intro call with recruiter William (30-40 min). Discuss background, experience. They decide whether to advance based on this alone.

**Stage 2:** Take-home project (4 hours total)
- 3 hours to build a web app (AI coding tools explicitly allowed and expected)
- 1 hour follow-up code review call
- They assess: can you make rapid progress, and do you understand your own code?

Offers can come immediately. You can start the day after accepting.

---

## Section 5: Your Story Arc

### Opening (when asked "tell me about yourself"):

"I'm finishing my MS in Computer Engineering at NYU in May. For the past year I've been at Kismet, a hospitality tech startup, where I built AI pipelines and integrations. The work that's most relevant to Mechanize: I built a Playwright + LLM pipeline where GPT-4o and Gemini would navigate hotel booking engines, extract structured data, and get graded on accuracy. I designed the prompts, built the evaluation harness, and iterated on where the models failed. I've also been using Claude Code and coding agents daily for the past several months and have a strong intuition for where they excel and where they break."

### Why Mechanize:

"I've spent enough time working with coding agents to know that the bottleneck isn't the models themselves, it's the quality of the environments they train on. The idea of building the challenges that expose where frontier models actually fail is exactly the kind of problem I want to work on. It requires both engineering skill and a deep understanding of model behavior, which is the intersection I've been operating at."

### Bridge (Kismet experience mapped to Mechanize):

| Mechanize Need | Your Experience |
|----------------|----------------|
| Build RL environments with automated graders | Built Playwright + LLM pipeline with automated accuracy scoring (>95% field coverage metric) |
| Direct coding agents, evaluate their output | Daily Claude Code user. Built GPT-4o/Gemini tool-calling pipelines at Kismet. Know where they take shortcuts. |
| Python proficiency | Primary language at Kismet (asyncio, FastAPI, Playwright scripts) |
| Find where frontier models fail | Designed prompts for hotel data extraction. Debugged model failures: hallucinated fields, schema mismatches, partial extractions. Iterated prompt + grading logic. |
| Independent, high-ownership work | Owned entire projects at Kismet: PMS adapter architecture, BigQuery analytics pipeline, booking engine integrations |
| Web app building (take-home) | Full-stack: React/TypeScript + Python/NestJS. Built MCP tools, dashboards, data pipelines. |

---

## Section 6: Talking Points (Pick 3-4)

### 1. Playwright + LLM Evaluation Pipeline
"At Kismet I built a pipeline where LLMs (GPT-4o, Gemini) navigated hotel websites via Playwright, extracted structured data using tool-calling, and results were scored against known schemas. I designed the evaluation criteria, built the automated grader, and iterated on prompts when models failed. The interesting part was finding *why* they failed: some booking engines had inconsistent DOM structures that made models hallucinate field values, others had rate displays that looked different from what the schema expected. Debugging model behavior at that level is what got me interested in Mechanize."

### 2. Where Models Actually Fail (Your Intuition)
"From building LLM pipelines, I've noticed models fail most on: (a) multi-step reasoning where intermediate state matters, (b) tasks where the 'obvious' approach works 90% of the time but the edge cases require understanding system design, (c) anything involving implicit context that isn't in the prompt. A model can write a booking engine adapter that passes basic tests but mishandle rate fallback logic because it doesn't understand the business constraint behind why you need a fallback."

### 3. Daily Coding Agent Usage
"I use Claude Code for almost everything now. I've developed an intuition for when to trust its output and when to intervene. The subtlest failures aren't syntax errors. They're architectural decisions that look correct but create problems downstream: over-abstraction, incorrect assumptions about data shape, or edge cases the agent confidently handles wrong. That pattern recognition is what I'd bring to designing RL environments."

### 4. MCP Tools as Structured Environments
"I built MCP tools at Kismet: searchHotels, getHotelRates, bookHotelOffer. Each tool has a defined schema, expected inputs/outputs, and error states. That's structurally similar to RL environment design: a prompt, a defined action space, and a way to grade whether the agent succeeded. I think about evaluation and failure modes naturally because that's how I built those tools."

---

## Section 7: Questions to Ask William

### Tier 1 (Always ask):
1. "What does a typical week look like for a junior engineer? How many tasks are you working on at once?"
2. "How do you evaluate whether an RL environment is 'good enough'? What's the bar for rigor?"
3. "What's the team structure? Who would I be working closest with?"
4. "What does the take-home project look like at a high level? Any advice for approaching it?"

### Tier 2 (If time):
5. "How many frontier labs are you working with currently?"
6. "What's the growth plan for the engineering team this year?"
7. "What's the timeline for the rest of the process if I advance?"
8. "Is relocation to SF required, or is there flexibility during the first few months while I finish my degree in May?"

---

## Section 8: Potential Concerns & Responses

**"This role is in San Francisco. Are you willing to relocate?"**
"Yes. I'm finishing my MS at NYU in May and can relocate to SF immediately after graduation. I'm open to starting remotely in the interim if that works."

**"What's your experience with RL specifically?"**
"I haven't trained RL models directly, but the job description says no prior ML/AI experience is required. My relevant experience is on the environment and evaluation side: building structured tasks with automated grading, designing prompts for AI agents, and debugging model failures. That's the core of what this role does."

**"Why Mechanize over a traditional SWE role?"**
"I've been building with AI agents for the past year and I've seen firsthand how much room there is for improvement. The idea that I could help build the environments that make those improvements happen is more compelling to me than shipping product features. I want to work at the frontier of what models can do."

**"Your background is in hospitality tech. How does that transfer?"**
"The domain was hospitality, but the work was building AI pipelines, automated evaluation systems, and debugging model behavior at scale. The technical patterns transfer directly: prompt design, tool-calling evaluation, automated grading, and understanding where models fail. I've also seen real-world software engineering complexity (7-8 different booking engine architectures, rate fallback logic, multi-system integration) which is exactly the kind of nuanced work that RL environments need to capture."

---

## Section 9: What NOT to Do

1. **Don't over-explain hospitality.** They don't care about hotels. They care about your AI pipeline and evaluation experience. Frame everything in terms of model behavior, automated grading, and failure analysis.
2. **Don't undersell your coding agent experience.** This is your biggest edge. Most candidates will not have built production LLM pipelines with automated evaluation.
3. **Don't ask about work-life balance or remote work as first questions.** This is a high-intensity startup paying $300K for junior engineers. Read the room.
4. **Don't pretend you have RL experience.** Be honest. The JD says no ML/AI experience required. Your strength is on the environment/evaluation side.
5. **Don't ramble.** Keep answers to 60-90 seconds. William is a recruiter, not an engineer. Be concise and let him guide.

---

## Section 10: Quick Reference Card

**Company:** Mechanize — RL environments for training coding models
**Role:** Junior SWE, $300K + equity, SF (on-site)
**Call:** Fri Mar 27, 3:10 PM ET, with William Castner (recruiter)
**Investors:** Patrick Collison, Nat Friedman, Jeff Dean, Dwarkesh Patel
**Team:** ~20 people, ex-Epoch AI founders
**Your edge:** Playwright + LLM pipeline with automated grading, daily coding agent user, MCP tool design
**Key message:** "I've been building AI evaluation pipelines and working with coding agents daily. I understand where models fail and how to design tasks that expose those failures."
**Next step if you pass:** 3-hour take-home web app (AI tools allowed) + 1-hour code review
