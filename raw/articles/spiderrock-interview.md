---
status: pending
source_type: file_drop
source_id: career-datacenter/prep/spiderrock_interview_prep.md
ingested_at: 2026-04-08T14:25:52.477Z
parsed_at: 2026-04-08T14:25:52.477Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# SpiderRock Interview Prep -- Junior Quantitative Developer

Prepared for Rahil Singhi | March 2026
Referral: Gautham (uncle's friend) | Role: Quantitative Developer I | Location: Chicago, IL | Comp: $110K-$150K

---

## 1. Company Deep Dive

### What SpiderRock Does

SpiderRock is a **Chicago-based financial technology firm** that builds high-performance algorithmic trading, execution, risk management, and market data infrastructure for the US equity, futures, and options markets. They are NOT a hedge fund or prop trading shop in the traditional sense. They are a **technology provider** whose clients include hedge funds, bank trading desks, and proprietary trading firms globally.

Their platform handles approximately **$250 billion in notional annually**.

Think of SpiderRock as the infrastructure layer that enables other firms to trade options at scale. They build the plumbing: the execution engines, the risk servers, the volatility surface computation, the analytics feeds, and the APIs that institutional traders plug into.

### History and Founding

- **Founded: 2006** in Chicago
- **Founder/CEO: George Papa** -- previously held executive roles at Peak6 (major Chicago options market maker) and Cantor Fitzgerald (New York). He is described as "the visionary and chief architect behind SpiderRock, crafting its philosophy and leading technological innovation." Caltech educated.
- **Co-Founder/COO: Craig Iseli** -- University of Chicago background in business and technology consulting. Leads new business activities and operational/risk management efforts. Has been with SpiderRock since inception.

### Leadership Team

| Name | Title | Background |
|------|-------|------------|
| George Papa | CEO & Founder | Caltech, Peak6, Cantor Fitzgerald |
| Craig Iseli | COO & Co-Founder | University of Chicago, consulting |
| Alexander Esselstein | CIO | Technology leadership |
| Annabelle Baldwin | CRO | Exchange, global bank, brokerage experience |
| Aron (last name not public) | Head of Software Dev/IT | 30+ years in tech, client strategy |
| Kevin Holbert | Head of ATS/Off-Screen Trading | Joined 2020, built ATS from scratch |
| Kasia (last name not public) | Head of Data & Analytics BD | Joined 2017, created data business in 2019 |
| Patrick Read | Director of Sales & BD | Denison University |
| Erik Raschke | Director of Customer Support | American University |

### Business Model -- How They Make Money

SpiderRock has **multiple revenue streams** across distinct business entities:

1. **SpiderRock Platform Services** (core business): SaaS trading platform subscriptions. Institutional clients pay for access to the execution, risk management, and analytics platform. Cloud-based, proximity-located to exchange matching engines.

2. **SpiderRock Gateway Technologies** (data subsidiary): Market data and analytics services. Sells raw and normalized US equity, options, and futures data feeds. Low-latency analytics feeds with implied volatility, theoretical surface prices, Greeks, and trade prints.

3. **SpiderRock EXS**: Agency broker-dealer regulated by FINRA and NFA. Provides electronic execution and market access services. This is how they make money on the execution/order routing side.

4. **SpiderRock ATS** (Alternative Trading System): Launched November 2024. An equity options ATS that runs block auctions, matching institutional initiators with liquidity providers. Revenue from transaction fees.

5. **SpiderRock Advisors** (IMPORTANT: separate entity, acquired by BlackRock): This was an options overlay asset manager that ran customized option overlay strategies as SMAs. Managed ~$4.8B. BlackRock made a minority investment in 2021 and completed full acquisition in Q2 2024. SpiderRock Advisors is now part of BlackRock. The technology platform entity (SpiderRock Platform Services) remains independent.

### Key Products

**SpiderRock Connect** -- The flagship platform (latest major version). A cloud-based trading system empowering institutional clients with tools to construct, manage, and scale equity, futures, and option strategies. Runs in next-generation data centers proximity-located to exchange matching engines. Includes:
- Advanced GUI tools with options montage and live analytics
- Client-uploadable theoretical valuation models (full skew curves or ATM-only)
- Live volatility surface computation and Greeks
- Risk management engine
- Order execution across multiple venues

**SpiderRock ATS** -- Launched November 2024. An equity options Alternative Trading System. Runs block auctions (lasting up to a few minutes) inviting institutional initiators and liquidity providers to transact electronically. Mimics how large orders are manually handled today but automates the process. This is a big deal because options have historically been much less automated than equities.

**MLink API** -- WebSocket/REST API for live data streaming. Supports JSON, Framed JSON, and Google Protocol Buffers. Can push 500,000+ messages/second per stream in Protobuf. Sub-millisecond encode/decode latency.

**SpiderStream over MLink** -- Real-time data streaming and querying API for the Data & Analytics business.

**SRSE** -- MySQL-compatible API for querying analytics data. Available in NY4 and CH2 data centers.

**Options Pricing Tool** -- Web-based tool for pricing options using SpiderRock's live volatility surfaces.

### Size, Offices, Culture

- **Offices**: Chicago (HQ), Belfast (new, announced Jan 2025)
- **Belfast expansion**: Investing over 2M GBP, creating 20 engineering roles (hybrid), average salary 55K GBP. Already filled about half the positions. Purpose: support trading platform, operational coverage during non-US hours, European market expansion.
- **Data centers**: NY4 (equidistant from majority of options exchange matching engines), CH2
- **Size**: Not publicly disclosed, but H1B data shows a lean operation. Glassdoor shows limited reviews (~7 for Platform entity). This is a mid-size fintech, not a megacorp.
- **Culture (Glassdoor, 4.1/5 overall)**: Good work/life balance (4.2/5). Compensation rated 3.8/5. Some reviews mention cultural issues with specific managers but note "not every team suffered from this." Recent reviews (March 2025) highlight flexibility and good balance.

### Recent News (2024-2026)

- **Nov 2024**: SpiderRock Connect major platform upgrade + SpiderRock ATS launch
- **Jan 2025**: Belfast office announced, 2M GBP investment, 20 engineering jobs
- **Feb 2025**: SpiderRock Data & Analytics partnership with Nations Indexes (volatility analytics)
- **Sep 2025**: Orion added SpiderRock Advisors (now BlackRock) option overlay SMAs to its Wealth Advisory platform
- **2024**: BlackRock completed full acquisition of SpiderRock Advisors

### Competitors and Market Position

SpiderRock occupies a unique niche. They are not a traditional competitor to options market makers (Citadel Securities, Wolverine, IMC, Susquehanna, Jane Street). Instead, they are the **technology infrastructure** that some of these firms and other institutional players use. Their competitive set is more like:

- **Trading technology providers**: Fidessa (ION), Eze Software, FlexTrade, Trading Technologies (TT)
- **Options-specific analytics**: Bloomberg OVML, Refinitiv, OptionMetrics (historical data)
- **ATS competitors**: Other dark pools and ATSs, though SpiderRock ATS is specifically options-focused (rare)
- **Market data vendors**: CBOE LiveVol, Nasdaq Global Data Services

SpiderRock's differentiation: purpose-built for options (not bolted onto an equity platform), handles the full stack from market data to analytics to execution to risk management, and now has its own ATS.

---

## 2. Technology Stack

### Languages

- **Python**: Primary language for quantitative development. Used extensively with pandas, NumPy, PyTorch/TensorFlow, scikit-learn. The quant team role is heavily Python.
- **C++**: Core platform infrastructure, low-latency systems, matching engines. H1B data shows "Senior Programming Market Data Analyst" roles (likely C++ market data work).
- **C#**: Supported in their SDK/API libraries
- **JavaScript**: MLink API client support
- **SQL/MySQL**: SRSE analytics API is MySQL-compatible. SQL is heavily used for data extraction and analysis.

### Infrastructure

- **Message Bus Architecture**: Internal high-throughput message bus. Individual processes consume market data at sustained rates exceeding **1 million messages/second/core** with binary encode/decode latency under 1 microsecond.
- **Protocol Buffers (Protobuf)**: Primary high-performance serialization format. Binary format with 14-byte header. MLink API can push 500K+ msgs/sec per stream.
- **WebSocket + REST APIs**: MLink provides both. WebSocket for live subscriptions (1-2ms latency). REST for point-in-time queries.
- **Data Centers**: NY4 (proximity to options exchange matching engines), CH2 (Chicago). Belfast for European coverage.
- **Cloud-Based**: Platform is described as cloud-based SaaS, but with proximity-located hardware near exchanges (so hybrid cloud + colocation).
- **Multicast Feeds**: Raw and normalized market data delivered via multicast channels.
- **FIX Protocol**: Standard financial protocol support for order execution.

### Analytics Engine

- **Volatility Surface Computation**: Runs continuously. Two-step process:
  1. Curve fitting (~every 45 seconds for equities, 10 seconds for high-priority indices): Cubic spline fitting on a 29-point moneyness grid
  2. ATM calibration (2-10 times per second): Live ATM volatility and forward price updates
- **Moneyness Functions**: Three types -- LogStd (equities/futures), NormStd (interest rate products), PctStd
- **Surface Representation**: "SRCubic" cubic spline on volatility multiples. 29 spline coefficients + 14 IV adjustment columns + 8 call-put adjustment columns
- **Fixed-Term Interpolation**: Standard tenors at 5d, 10d, 21d, 42d, 63d, 84d, 126d, 252d, 512d
- **Greeks**: Live computation driven by volatility surfaces. Adjusted delta incorporates volatility surface slope dynamics (sticky-delta behavior)
- **Earnings Decomposition**: Variance-based model separating earnings event volatility from baseline ("censored") volatility

### Data Schema

MLink messages organized by tokens:
- EqtMktData: Stock quotes and prints
- OptMktData: Options quotes and prints
- OptSurface: Options surfaces and volatility
- OptAnalytics: Implied quotes and risk slides
- RiskCalc: Volatility and price calculations
- ClientTrading: Orders and executions

### Open Source

SpiderRock has a **public GitHub**: `github.com/SpiderRock/SpiderRock-Connect-SDK` with MLink SDK examples in multiple languages.

### Key Technical Takeaway for Interview

SpiderRock's quant team builds the mathematical models that power the platform's volatility surfaces, pricing, and Greeks. The role is NOT about building the low-latency C++ infrastructure (that's the software engineering team). The quant dev role is about translating mathematical/statistical models into Python code for option pricing, vol surface fitting, and numerical computations.

---

## 3. The Junior Quantitative Developer Role

### Official Job Details (Quantitative Developer I)

**Reports to**: Head of Quant
**Location**: Chicago office (in-person)
**Level**: Junior

**Responsibilities**:
- Develop and maintain code libraries for numerical computations, option pricing, volatility surface fitting, and other tools
- Translate mathematical and statistical models into functional code for trading, risk management, and data analysis
- Collaborate with the quant team to troubleshoot issues, design solutions, and thoroughly test changes
- Write clear internal and external documentation on existing and new products

**Requirements**:
- 4-year degree in CS, Math, Statistics, Physics, or related discipline
- Expert-level Python (pandas, NumPy, PyTorch/TensorFlow, scikit-learn)
- Solid SQL knowledge
- C++ knowledge helpful

### Day-to-Day Reality

Based on the role description and SpiderRock's products, the day-to-day likely involves:

1. **Morning**: Review overnight surface fits and analytics outputs. Check for anomalies in vol surface calibration. Review any production issues flagged by support or trading desks.

2. **Core work**: Write Python code implementing mathematical models. This could be:
   - Improving the cubic spline fitting algorithm for volatility surfaces
   - Building new numerical computation libraries (Monte Carlo, finite difference)
   - Implementing or refining option pricing models
   - Building tools for earnings event volatility decomposition
   - Creating data analysis pipelines for backtesting pricing models

3. **Collaboration**: Work with the broader quant team and potentially software engineers who build the C++ infrastructure. The quant team prototypes in Python; the platform team may port performance-critical pieces to C++.

4. **Testing and documentation**: Thoroughly test numerical methods. Write documentation so that clients and internal teams understand the analytics products.

### What Skills Are Most Critical

In priority order:
1. **Python proficiency** -- This is a Python-first quant shop for the quant team
2. **Numerical methods** -- You need to implement math in code cleanly and efficiently
3. **Options pricing theory** -- Black-Scholes, Greeks, vol surfaces are the product itself
4. **Statistical modeling** -- Time-series, regression, distribution fitting
5. **SQL** -- For data extraction and analysis
6. **Communication** -- They emphasize documentation and collaboration

---

## 4. How Rahil's Experience Maps to SpiderRock

### Direct Mappings

| SpiderRock Needs | Rahil's Experience | Talking Points |
|---|---|---|
| Expert Python (pandas, NumPy, scikit-learn) | Extensive Python: ETL pipelines, ML models, FastAPI services | "I live in Python. My Wind Energy Forecasting project, SuperPlay pipeline, and all my Kismet work were Python-native." |
| Time-series analysis | Wind Energy Forecasting (LSTM, Random Forest, XGBoost on temporal data) | "My wind energy project was pure time-series forecasting, dealing with the same challenges you see in financial data: non-stationarity, regime changes, and noisy signals." |
| Numerical methods + statistical modeling | Regression analysis, neural networks, grid-search CV, feature engineering | "I've implemented regression models, neural network architectures, and hyperparameter optimization from scratch. The Wind Energy project specifically applied statistical and numerical methods to forecast real-world time-series data." |
| ML frameworks (PyTorch, scikit-learn, XGBoost) | All three used across projects. Adversarial Attacks (PyTorch/ResNet-34), SuperPlay (XGBoost), Wind Energy (multiple) | "PyTorch is my deep learning framework of choice. I've used it for everything from adversarial robustness research to building classification models." |
| SQL / data manipulation | BigQuery, PostgreSQL, AlloyDB at Kismet. SQL-heavy analytics work. | "At Kismet, I wrote complex analytical queries against BigQuery for session stitching and attribution modeling, working with large-scale time-series event data." |
| C++ knowledge (helpful, not required) | C++ coursework in undergrad and grad school | "I have solid C++ fundamentals from coursework. I understand memory management, pointers, and performance optimization, which helps me write more efficient Python and understand the platform infrastructure." |
| Data pipeline development | GA4 export patterns, ETL pipelines, asyncio parallelization, Redis caching | "I built production data pipelines at Kismet that processed heterogeneous data sources, implemented validation layers, and ensured data quality, which maps directly to ensuring analytics quality in a trading platform." |
| Quantitative analysis mindset | Adversarial attacks paper (systematic parameter sweeps, quantitative benchmarking), Wind Energy (statistical rigor) | "My adversarial attacks research was highly quantitative: we systematically varied perturbation budgets, measured accuracy degradation curves, and benchmarked transfer attack effectiveness across architectures." |
| Documentation and collaboration | Led 4-person team at Krushal, wrote PRDs and API specs | "At Krushal, I led a small engineering team and wrote detailed technical documentation and API specifications, which is exactly the kind of clear internal/external documentation SpiderRock expects." |

### Narrative Bridges (Weaker Connections to Strengthen)

**The "I don't have direct finance experience" bridge:**
"My background is in building ML models on time-series data, writing numerical computation code, and engineering data pipelines. The domain at SpiderRock is finance, but the core technical work, fitting curves to data, implementing statistical models in Python, ensuring numerical stability, and processing high-throughput data streams, maps directly to what I've been doing. Time-series forecasting of wind energy output uses the same mathematical toolkit as modeling volatility term structure: you're fitting models to noisy temporal data and making probabilistic forecasts."

**The "Why SpiderRock specifically" bridge:**
"SpiderRock sits at a fascinating intersection. You're not just running a trading desk; you're building the quantitative infrastructure that the entire options market relies on. The fact that your platform handles $250 billion in notional annually means the models have to be right. That kind of quantitative rigor, building code libraries for numerical computations that real institutions depend on, is exactly where I want to apply my skills. And the quant team is growing, which means I'd get to contribute to the foundation."

---

## 5. Questions Rahil Should Ask

### Technology and Architecture

1. **"How does the quant team's Python work integrate with the C++ platform infrastructure? Is there a handoff process where Python prototypes get ported to C++ for production, or does the Python code run in production directly?"**
   Why this is good: Shows you understand the multi-language architecture and care about how your code actually gets used.

2. **"I read about the two-step volatility surface fitting process, the spline calibration every 45 seconds and the ATM recalibration 2-10 times per second. What are the biggest numerical challenges in keeping those surfaces accurate, especially around earnings events or during high-volatility regimes?"**
   Why this is good: Demonstrates you read the technical documentation. Shows genuine curiosity about the hard problems. Directly relevant to the job.

3. **"SpiderRock's MLink API supports Protobuf at 500K+ messages per second. How does the quant team think about the latency budget for analytics computations that feed into that pipeline? Is there a target for how fast a volatility surface update needs to propagate?"**
   Why this is good: Shows you think about performance constraints on the quant side, not just correctness.

### Quant Development Workflow

4. **"What does the development and testing cycle look like for a new pricing model or a change to the surface fitting algorithm? How do you validate against historical data before going live?"**
   Why this is good: Shows you think about model validation and production safety. Practical question about day-to-day workflow.

5. **"The job description mentions translating mathematical models into functional code. How much of the mathematical research originates within the quant team versus being driven by client needs or academic literature? Do quant developers get involved in the research side, or is it more implementation-focused at the junior level?"**
   Why this is good: Shows you want to understand your growth path. Clarifies the balance between research and engineering.

### Options Domain

6. **"SpiderRock's research mentions a nonparametric approach to options pricing using transacted prices rather than theoretical models. How does that philosophy influence the quant team's work? Are you building hybrid models that blend market data with theoretical frameworks?"**
   Why this is good: Shows you read their research white paper. Demonstrates you think about modeling philosophy, not just technique.

7. **"With the SpiderRock ATS launching in late 2024, has that created new quantitative challenges for the team, like modeling liquidity in the block auction process or analyzing execution quality?"**
   Why this is good: Shows awareness of their newest product and curiosity about how it creates quant problems.

### Team and Growth

8. **"How large is the quant team currently, and what's the planned growth trajectory? The role reports to the Head of Quant; what does mentorship look like for a junior developer joining the team?"**
   Why this is good: Practical question about support structure. Shows you're thinking about learning and growth.

9. **"What does a successful first year look like for someone in this role? Is there a ramp-up project, or would I be contributing to the core surface fitting and pricing code from early on?"**
   Why this is good: Shows eagerness to contribute and interest in understanding expectations.

10. **"George Papa came from Peak6 and Cantor Fitzgerald. How has that trading floor experience influenced SpiderRock's approach to building quant tools, especially the balance between automation and giving traders tactile control?"**
    Why this is good: Shows you researched the founder's background. Links it to product philosophy.

---

## 6. Key Concepts to Review

### Tier 1: Must Know Cold (Will Almost Certainly Come Up)

#### Black-Scholes Model
- The formula: C = S*N(d1) - K*e^(-rT)*N(d2), where d1 = [ln(S/K) + (r + sigma^2/2)*T] / (sigma*sqrt(T)), d2 = d1 - sigma*sqrt(T)
- **Assumptions**: Constant volatility, log-normal returns, no dividends, continuous trading, no transaction costs, constant risk-free rate
- **Why it matters at SpiderRock**: It's the baseline model. SpiderRock computes implied volatility BY inverting Black-Scholes: given the market price, solve for sigma. Their entire vol surface is built on implied vol from BS.
- **Key limitation**: Assumes constant volatility, but real markets show volatility smile/skew. This is WHY SpiderRock builds volatility surfaces.

#### The Greeks
- **Delta**: dC/dS. Rate of change of option price with respect to underlying price. SpiderRock computes "adjusted delta" that incorporates vol surface slope dynamics.
- **Gamma**: d^2C/dS^2. Rate of change of delta. Important for risk management.
- **Theta**: dC/dT. Time decay. Options lose value as expiration approaches.
- **Vega**: dC/d(sigma). Sensitivity to volatility changes. Central to SpiderRock's business since they compute live vol surfaces.
- **Rho**: dC/dr. Sensitivity to interest rate changes.
- Know how each Greek behaves: ATM vs OTM, short-dated vs long-dated.
- **SpiderRock-specific**: They compute an "adjusted delta" that adds VegaSlope * Vega to the standard delta, capturing how vol surface changes as the underlying moves ("sticky delta" behavior).

#### Implied Volatility
- Definition: The volatility that, when plugged into Black-Scholes, reproduces the observed market price
- It's solved numerically (Newton-Raphson or bisection) because BS cannot be analytically inverted for sigma
- **Be ready to code**: "Write a function that computes implied volatility given a market price using Newton-Raphson iteration"

#### Volatility Surface
- A 3D surface: implied vol as a function of strike (or moneyness) and time-to-expiration
- **Volatility smile**: IV is higher for OTM puts and OTM calls than ATM. Empirically observed.
- **Volatility skew**: In equity markets, OTM puts have higher IV than OTM calls (crash protection premium)
- **Volatility term structure**: IV varies across expirations
- **SpiderRock-specific**: They use a 29-point moneyness grid with cubic spline interpolation. They normalize using "vol multiples" (sigma_K / sigma_ATM). They use LogStd moneyness = ln(K/F) / (sigma_ATM * sqrt(T)).

#### Put-Call Parity
- C - P = S - K*e^(-rT)
- **SpiderRock-specific**: They use this to calibrate the "sdiv" parameter, minimizing ATM call-put implied volatility misalignment. If put-call parity is violated, it implies an incorrect forward price or dividend assumption.

### Tier 2: Should Know Well (Likely to Come Up)

#### Numerical Methods for Option Pricing
- **Monte Carlo simulation**: Generate many random paths for the underlying, compute option payoff at expiration, average and discount back. Good for path-dependent options.
- **Finite difference methods**: Discretize the Black-Scholes PDE on a grid. Three types:
  - Explicit: Simple but conditionally stable (small time steps needed)
  - Implicit: Unconditionally stable but need to solve linear system each step
  - Crank-Nicolson: Second-order accurate, most commonly used
- **Binomial trees**: Discrete model, good for American options (early exercise). Cox-Ross-Rubinstein parameterization.
- **Newton-Raphson**: Root-finding algorithm used for implied vol computation. Know the iteration formula: x_{n+1} = x_n - f(x_n)/f'(x_n). For implied vol, f(sigma) = BS(sigma) - market_price, and f'(sigma) = vega.

#### Spline Interpolation
- SpiderRock uses cubic splines extensively for vol surface fitting
- Know what a cubic spline is: piecewise cubic polynomial that passes through data points, with continuous first and second derivatives at knot points
- Natural spline: second derivative is zero at endpoints
- Clamped spline: first derivative specified at endpoints
- **Why splines for vol surfaces**: Smooth interpolation between observed implied vols at discrete strikes, avoids the oscillation problems of high-degree polynomial interpolation

#### Forward Pricing and Carry
- Forward price for stock: F = S * e^(rT) - PV(dividends)
- Forward price for futures: F = spot price
- **SpiderRock-specific**: They compute fUPrc = uPrc * e^(rT) - ddiv for equities, and use "sdiv" (continuous dividend yield adjustment) as a calibration parameter

#### Option Moneyness
- In-the-money (ITM), at-the-money (ATM), out-of-the-money (OTM)
- **Log moneyness**: ln(K/S) or ln(K/F)
- **Standardized moneyness**: ln(K/F) / (sigma * sqrt(T)) -- this is what SpiderRock uses for their grid

### Tier 3: Good to Know (May Come Up, Shows Depth)

#### Stochastic Volatility Models
- **Heston model**: dS = mu*S*dt + sqrt(V)*S*dW1, dV = kappa*(theta - V)*dt + xi*sqrt(V)*dW2. Volatility itself is a stochastic process. Produces vol smile naturally.
- **SABR model**: Popular for interest rate options. Closed-form approximation for implied vol.
- **SVI (Stochastic Volatility Inspired)**: Parametric model for vol smile fitting. 5 parameters.
- Know these exist and what problems they solve. You likely won't need to derive them.

#### Earnings Event Modeling
- **SpiderRock-specific**: They decompose total variance into earnings variance and baseline variance: sigma^2_T = sigma^2_E * n + sigma^2_C * T, where sigma_E is single-earnings event vol, sigma_C is "censored" baseline vol, n is number of upcoming earnings before expiration.
- This matters because options spanning an earnings date have discontinuously higher IV.

#### Market Microstructure Basics
- Bid-ask spread: cost of immediacy
- Market makers quote both sides and profit from the spread
- Order book: limit orders at various price levels
- NBBO: National Best Bid and Offer
- Options are traded on multiple exchanges (CBOE, ISE, PHLX, etc.) simultaneously

#### American vs European Options
- American: can exercise early. Most equity options are American.
- European: exercise only at expiration. Index options (SPX) are typically European.
- Early exercise is optimal for deep ITM puts (time value of money) or before ex-dividend dates for calls
- American options cannot be priced by Black-Scholes alone; need binomial trees or finite difference

#### Risk-Neutral Pricing
- In a risk-neutral world, all assets earn the risk-free rate
- Option prices are the discounted expected payoff under the risk-neutral measure
- This is WHY Black-Scholes uses the risk-free rate r and not the expected return mu

### Tier 4: Coding Questions to Practice

These are representative of what SpiderRock or similar firms might ask:

1. **Implement Black-Scholes pricing in Python** (call and put). Use scipy.stats.norm for N(d1), N(d2).

2. **Implement implied volatility solver using Newton-Raphson**. Start with initial guess, iterate using vega as derivative, handle edge cases (vega near zero, convergence failure).

3. **Implement a simple binomial tree** for European and American options. CRR parameterization: u = e^(sigma*sqrt(dt)), d = 1/u, p = (e^(r*dt) - d)/(u - d).

4. **Compute Greeks numerically** using finite differences. Delta = (C(S+h) - C(S-h))/(2h). Same for gamma, vega, theta.

5. **Fit a cubic spline** to a set of implied volatility data points across strikes. Use scipy.interpolate.CubicSpline.

6. **Monte Carlo option pricer**: Generate GBM paths, compute payoffs, estimate price and standard error. Implement variance reduction (antithetic variates, control variates).

7. **Data manipulation**: Given a DataFrame of option quotes (strike, expiry, bid, ask, type), compute mid implied vols, plot the volatility smile for a given expiry, identify any put-call parity violations.

8. **Time-series analysis**: Given historical underlying prices, compute realized volatility (close-to-close, or using Garman-Klass estimator), compare to implied volatility, analyze the volatility risk premium.

### Probability and Brain Teasers (Common at Quant Firms)

Practice these types:
- Expected value problems: "What's the expected number of coin flips to get heads?"
- Conditional probability: "You have two coins, one fair and one double-headed. You pick one at random and flip heads. What's the probability it's the fair coin?"
- Combinatorics: Card probability problems
- Mental math: Quick estimation, order-of-magnitude calculations
- Fermi estimation: "How many piano tuners are in Chicago?"
- Dice/card games: "You roll two dice. What's the probability the sum is 7?"

### SpiderRock-Specific Terminology to Know

| Term | Meaning |
|------|---------|
| sdiv | Continuous dividend yield adjustment parameter |
| fUPrc | Forward underlying price |
| eMove | Single earnings event implied move |
| Censored volatility | Baseline vol with earnings events stripped out |
| Vol multiple | sigma_K / sigma_ATM (normalized vol representation) |
| LogStd moneyness | ln(K/F) / (sigma_ATM * sqrt(T)) |
| SRCubic | SpiderRock's cubic spline interpolation method |
| MLink | SpiderRock's WebSocket/REST API |
| SRSE | SpiderRock's MySQL-compatible analytics API |
| SpiderRock Connect | The current-generation platform |
| ATS | Alternative Trading System (SpiderRock's block auction venue) |
| Protobuf | Google Protocol Buffers; SpiderRock's high-perf serialization format |

---

## 7. Interview Strategy

### Opening (Establish the Referral)
"Gautham connected me with the opportunity, and after researching SpiderRock, I got genuinely excited about the role. Building quantitative infrastructure that the institutional options market depends on is a unique kind of challenge."

### Positioning Statement
"My background is in building ML models on time-series data, implementing statistical methods in Python, and engineering data pipelines that handle real-world noisy data at scale. I'm coming from an ML/data engineering background rather than a pure quant finance background, but the core skills, numerical methods, statistical modeling, Python proficiency, data pipeline engineering, are exactly what the quant team needs. And I'm hungry to apply these skills in the options domain."

### Handling "Why Quant Finance?"
"I've been drawn to problems where mathematical models meet real-world data. My wind energy forecasting research was about building probabilistic models for noisy time-series data, fitting curves, managing uncertainty, and measuring model performance rigorously. Options pricing is the same fundamental challenge at a much faster timescale and with much higher stakes. The mathematical depth of volatility surface modeling, the interplay between theoretical models and observed market behavior, that's the kind of problem I want to spend my career on."

### Handling "You Don't Have Finance Experience"
"You're right, I haven't worked in finance. But looking at what the quant developer role actually involves, translating mathematical models into Python code, building numerical computation libraries, working with time-series data, ensuring statistical rigor, those are skills I've been building for years. The finance domain knowledge, options theory, Black-Scholes, Greeks, I've been studying independently and I'm confident I can ramp up quickly. And frankly, coming from outside finance means I bring fresh perspectives on ML techniques, data pipeline architecture, and software engineering practices that can complement the team's domain expertise."

### Key Numbers to Drop Casually
- SpiderRock handles ~$250B in notional annually
- Their MLink API can push 500K+ Protobuf messages/second
- Live vol surface ATM calibration runs 2-10 times per second
- Curve fitting on a 29-point moneyness grid with cubic splines
- Platform processes 1M+ msgs/sec/core on the message bus
- Founded 2006, just opened Belfast office (20 new engineering roles)
- SpiderRock ATS launched November 2024

### Red Flags to Avoid
- Don't confuse SpiderRock (platform/tech) with SpiderRock Advisors (now owned by BlackRock)
- Don't pretend to have deep options trading experience you don't have
- Don't be vague about Python skills; be specific about libraries and use cases
- Don't trash-talk Black-Scholes; acknowledge its limitations but respect that it's the foundation
- Don't ask about remote work; this is an in-office Chicago role

---

## Sources

- [SpiderRock Main Site](https://spiderrock.net/)
- [SpiderRock About Us & Leadership](https://spiderrock.net/about-us/)
- [SpiderRock Connect Launch Press Release (BusinessWire)](https://www.businesswire.com/news/home/20241114023691/en/SpiderRock-Connect-Launches-a-Modern-and-Powerful-Trading-System-and-an-Options-ATS-Designed-to-Bring-Increased-Automation-Competition-and-Transparency-to-Global-Institutional-Options-Trading)
- [SpiderRock Options Analytics](https://spiderrock.net/data/options-analytics/)
- [SpiderRock Options Pricing Research](https://spiderrock.net/options-pricing-research/)
- [SpiderRock Live Volatility Surfaces Documentation](https://docs.spiderrockconnect.com/docs/next/Documentation/PlatformFeatures/Analytics/LiveVolSurfaces/)
- [SpiderRock MLink API Documentation](https://docs.spiderrockconnect.com/docs/next/Documentation/PlatformAPIs/MLink/)
- [SpiderRock Connect SDK (GitHub)](https://github.com/SpiderRock/SpiderRock-Connect-SDK/blob/main/MLink/README.md)
- [SpiderRock Belfast Expansion (Silicon Republic)](https://www.siliconrepublic.com/jobs-news/us-firm-spiderrock-20-jobs-northern-ireland-belfast-engineering)
- [BlackRock Acquires SpiderRock Advisors](https://ir.blackrock.com/news-and-events/press-releases/press-releases-details/2024/BlackRock-to-Acquire-SpiderRock-Advisors/default.aspx)
- [SpiderRock Quantitative Developer I Job Posting (Indeed)](https://www.indeed.com/viewjob?jk=0ab33b3557ae2cf5)
- [SpiderRock H1B Salary Data](https://h1bdata.info/index.php?em=spiderrock+platform+services+llc)
- [SpiderRock Glassdoor Reviews](https://www.glassdoor.com/Reviews/SpiderRock-Platform-Reviews-E2042852.htm)
- [SpiderRock Software Engineer Salary (Levels.fyi)](https://www.levels.fyi/companies/spiderrock/salaries/software-engineer)
- [Trifork Case Study: SpiderRock ATS](https://trifork.com/?cases=revolutionizing-options-trading-via-an-alternative-trading-system)
- [Nations Indexes + SpiderRock Volatility Analytics Partnership](https://spiderrock.net/data/updates/)
- [Orion + SpiderRock Advisors SMAs](https://www.businesswire.com/news/home/20250915413558/en/Orion-Expands-Investment-Solutions-Lineup-with-Addition-of-SpiderRock-Option-Overlay-SMAs)
