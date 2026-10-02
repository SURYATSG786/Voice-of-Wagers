# SHRAM SAATHI — MASTER BUILD PROMPT FOR CODEX
**Paste this entire document to Codex as your opening instruction. It assumes `SPEC.md` (the full feature spec with real cited data) already exists in the repo root — this prompt is the explicit, step-by-step execution plan on top of it.**

---

## 0. WHO YOU ARE BUILDING THIS FOR, AND UNDER WHAT RULES

You are building **Voice of Wagers**, a real-time web application submitted to **BFWAI/HACK 26**, under **Problem Statement PS-06 (AI for Bharat in Indian Languages)**. This is a live hackathon build — follow these contest rules as hard constraints on every line of code you write:

1. **Built during the challenge only.** Every file in this repo is new work. Open-source libraries and packages are fine to depend on; do not reuse any previously-shipped project's code wholesale.
2. **AI tools are welcome, but must be declared.** Every model, API, and library used (Gemini API, Web Speech API, React, etc.) must be listed in `README.md` under an "AI Tools & APIs Used" section.
3. **No real personal data, anywhere.** Not in test fixtures, not in demo transcripts, not in seed data. The only exception is real *institutional* data (government BOCW registration figures) — those are not personal data and are explicitly allowed; see Step 6.
4. **Numbers must be real and reproducible.** Every statistic shown in the UI must trace back to either (a) a deterministic calculation against `data/wage_table.json`, or (b) a cited real source. The judges will rerun `eval/run_eval_v2.py` — it must reproduce the same numbers shown in the demo, every time, with no randomness in the parts that are supposed to be deterministic.
5. **A human approval line on escalation.** The system never resolves a wage dispute automatically. It only generates a case file and requires explicit worker consent before "sending" it anywhere.
6. **Scoring weights to build toward:** Technical depth & accuracy — 40%. Creativity — 30%. Presentation — 30%. Every step below is written to score on at least one of these three; don't skip the polish steps thinking they're cosmetic — presentation is a third of the grade.

Read `SPEC.md` in full before writing any code. This prompt tells you the order and the explicit detail to build in; `SPEC.md` is the source of truth for every dataset, every number, and every honesty caveat (conflicting wage sources, estimated vs sourced distances, BOCW data gaps for Haryana/Tamil Nadu). Where this prompt and `SPEC.md` ever conflict, `SPEC.md` wins — flag the conflict to me rather than guessing.

---

## 1. THE MASCOT — "SAATHI" — BUILD THIS FIRST, USE IT EVERYWHERE

Before any feature screen, build the guide character that appears throughout the app. This is not decoration — it's your single strongest "creativity + presentation" asset, and it gives the product emotional warmth that a bare utility tool wouldn't have.

**Character brief:**
- **Name:** Saathi (meaning "companion/friend" in Hindi) — the in-app guide character for **Voice of Wagers**. He's a companion mascot, not a restatement of the product name (the same relationship Duolingo has to "Duo") — so the rename doesn't require redesigning him, just keeping his role clear in copy: he's introduced as "Saathi, your Voice of Wagers guide."
- **Visual design:** A simple, warm, flat-vector illustrated character — a friendly construction worker wearing a hard hat and a gentle smile, drawn in the same reduced-color-palette style as a Duolingo-style mascot (2-3 colors max: your existing dark background, gold/`#F4A93B`-style accent reserved exclusively for Saathi and primary CTAs, and off-white linework). Build Saathi as a **hand-coded SVG** (not a raster image) so it's crisp at any size and themeable — reuse the same disciplined approach of "one mascot color reserved only for the mascot and primary buttons" that keeps a design system looking intentional rather than busy.
- **Personality:** Calm, reassuring, direct — never cutesy or childish. He's a peer, not a cartoon sidekick. His tone matches the product's own values: honest, never overpromising, always clear about what's real data vs. an estimate.
- **Where he appears:**
  - **Homepage:** Saathi greets the user with a short spoken (TTS) + written welcome in their selected language, and offers the two entry paths ("Planning to migrate?" / "Already working?").
  - **Every screen's empty/loading state:** Saathi appears with a short contextual line instead of a bare spinner — e.g. on Wage Prediction's loading state: "Saathi is checking the official wage records for you..."
  - **Verdict screens (Proof of Wage Truth):** Saathi's pose/expression changes based on outcome — a reassuring pose for "fair pay," a concerned-but-calm pose for "underpaid" (never alarming or shaming, always steady).
  - **Escalation screen:** Saathi explicitly states the human-approval line in first person: "I'll only send this if you tell me to — and a real person will look at it before anything happens."
  - **Migration Pulse's honest empty state:** Saathi delivers the "not enough data yet" message warmly rather than it reading as a broken feature — e.g. "Not many Saathi users yet — but I'm keeping count, and I'll show you real trends as more workers join."
- **Voice integration:** When TTS speaks a response (wage verdict, prediction, survival guide read-aloud), it is explicitly framed as *Saathi speaking*, not a generic system voice — this ties your existing Web Speech API work directly to the character, making the AI feel like one consistent guide across the whole journey rather than a disconnected set of tools.

**Build deliverable:** `src/components/Saathi.jsx` — a single reusable component accepting a `pose` prop (`"welcome" | "thinking" | "reassuring" | "concerned" | "celebrating"`) and a `message` prop (text shown in a speech-bubble next to the SVG). Build 4-5 poses as distinct SVG paths/color states within this one component — do not build five separate image files.

---

## 2. TECH STACK (final — do not relitigate mid-build)

- **Frontend:** React + Vite + Tailwind CSS. Single-page app with client-side routing (React Router) across the screens in Step 4 onward.
- **Backend:** Node.js + Express (or FastAPI if your team is stronger in Python — pick one now and commit).
- **AI:** Gemini API — used only for (a) extracting structured fields from speech/text, (b) phrasing final responses in vernacular, (c) nothing else. It never computes a number itself — see Step 5.
- **Speech:** Browser-native Web Speech API (`SpeechRecognition` for STT, `speechSynthesis` for TTS), `hi-IN` and `en-IN` language tags, with a visible, editable typed-text fallback on every voice input — never a voice-only gate.
- **Data:** Flat JSON files in `/data`, loaded at server startup. No database needed at this scale — don't add one.
- **Real-time behavior:** "Real-time" here means a fully live, responsive, interactive app — not websockets. Migration Pulse (Step 10) updates via a simple polling fetch (every 30s) on the homepage, which is sufficient and far lower-risk than a websocket layer with days left on the clock.
- **Hosting:** Vercel (frontend) + Render/Railway (backend), with a fully working local-run fallback (`npm run dev` for both) as your demo-day backup if live hosting has issues.

---

## 3. DESIGN SYSTEM (lock this before Step 4)

Reuse the dark + gold aesthetic from the idea deck and SPEC.md, for presentation-score consistency between your pitch materials and the actual product:

- **Background:** near-black (`#0A0A0A` to `#1A1408` gradient, matching the idea deck's dark-to-gold glow).
- **Accent (reserved for Saathi + primary CTAs only):** gold (`#F4A93B`-style).
- **Headings:** Instrument Serif (or closest available serif), italic for emphasis words — matches your existing deck typography.
- **Body text:** a clean sans-serif, off-white (`#F5F0E8`-style) on the dark background.
- **Cards:** subtle border, slightly lighter than background fill, rounded corners — matches the bordered-card look from the idea deck's problem/solution slides.
- Build this as a Tailwind config + a small set of reusable components (`<Card>`, `<PrimaryButton>`, `<StatRow>`, `<SourceNote>`) before building individual screens, so every screen is visually consistent without rebuilding styling each time.

---

## 4. BUILD ORDER — EXPLICIT, STEP BY STEP, EACH FEATURE FULLY SPEC'D

### STEP 1 — Repo scaffold
```
/client          → React + Vite + Tailwind app
/server          → Express (or FastAPI) backend
/data            → all JSON datasets (wage_table.json, cost_of_living.json,
                    survival_guide.json, distances.json, bocw_registration.json,
                    pulse_counts.json)
/eval            → run_eval.py, run_eval_v2.py, synthetic_scenarios.json
/lib             → opportunityScore.js (shared deterministic logic)
SPEC.md
README.md        → must include "AI Tools & APIs Used" section (contest rule #2)
```
Initialize git, commit after every step below — a clean commit history is itself evidence to judges that this was genuinely built during the challenge window.

### STEP 2 — P0: Proof of Wage Truth (build this first, fully, before anything else)

**Backend — exact endpoints:**
```
POST /api/parse-input
  body: { transcript: string, mode: "voice" | "text" }
  → { state, job_category, wage_amount, wage_period, confidence }
  Gemini call, temperature 0, extraction-only prompt (see SPEC.md §5).
  Must return "unclear" for any field it can't confidently extract — never guess.

POST /api/verdict
  body: { state, job_category, wage_amount, wage_period }
  → { legal_minimum, actual_wage_monthly_equivalent, gap, status, spoken_response_text }
  The legal_minimum/gap/status fields come from PURE DETERMINISTIC CODE in
  /lib/wageVerdict.js reading data/wage_table.json — zero LLM involvement in
  the arithmetic. Only spoken_response_text is generated by a second Gemini
  call that RESTATES the pre-computed numbers in the worker's language —
  it must not recalculate anything.

POST /api/escalate
  body: { verdict_id, consent: true }
  → { case_file: {...}, webhook_status: "sent (mocked)" }
  Only callable with explicit consent. Generates the case-file JSON per
  SPEC.md's schema. Logs a mocked webhook call (console.log or a local
  escalations.json append) standing in for a real NGO intake system.
```

**Frontend — exact screen flow:**
1. Input screen: mic button (primary, gold), "or type instead" link always visible below it, state dropdown + job category dropdown + wage amount/period fields, Saathi in "thinking" pose with a short instructional line.
2. Verdict screen: large status word (Underpaid / Fair / Above Minimum), spoken-response text displayed, legal minimum vs actual wage shown side-by-side in a two-column stat card, Saathi's pose matches the outcome, "Escalate this" button only rendered if status is "underpaid."
3. Escalate screen: explicit consent checkbox, Saathi states the human-review line in first person (see Step 1), case file shown read-only after confirmation, "sent (mocked)" confirmation banner.

**Build and pass this before moving on:** `eval/run_eval.py` against the 40 synthetic scenarios in SPEC.md §8, printing ground-truth accuracy. Do not proceed to Step 3 until this is green.

### STEP 3 — P1: Wage Prediction

**Backend:**
```
POST /api/predict-wage
  body: { destination_city, job_category }
  → { expected_daily_range, expected_monthly_range, typical_rent, typical_food,
      estimated_monthly_savings_range, data_confidence: "verified_wage" | "estimated_col" }
  Wage figures: deterministic lookup against data/wage_table.json.
  Cost-of-living figures: deterministic lookup against data/cost_of_living.json,
  with data_confidence explicitly flagged in the response object itself,
  not just styled differently in the UI.
```

**Frontend:** destination dropdown + job category dropdown in; result card out showing expected range, savings estimate, and a visible "estimated" tag directly on the cost-of-living figures (not just a tooltip). Saathi appears in "thinking" then "reassuring" pose as the result loads.

### STEP 4 — P2: Migration Survival Guide

**Backend:**
```
GET /api/survival-guide?city={city}
  → data/survival_guide.json entry for that city: labour_office, government_hospital,
    worker_helpline, emergency, housing, documentation, useful_phrases
```

**Frontend:** destination-specific card grid — Essentials / Housing / Documentation / Language Support — for all 5 cities (Delhi, Gurgaon, Noida, Chennai, Mumbai) per SPEC.md §4. Any placeholder helpline number must render with a visible "verify locally" tag rather than looking authoritative — don't let a placeholder look like a real number in the shipped UI.

### STEP 5 — P5: Smart Route Planner

**Backend:**
```
GET /api/route-planner?origin=Patna&destination={city}
  → { destination, road_km, distance_confidence: "sourced" | "estimated_from_delhi",
      expected_wage: <reuse /api/predict-wage output>,
      survival_essentials: <reuse /api/survival-guide output> }
  Pure composition — no new Gemini call, no invented numbers. Read
  data/distances.json exactly as specified in SPEC.md §4.
```

**Frontend:** single screen, origin fixed to "Patna" and labelled as such (don't imply any origin works), destination dropdown, single result card combining distance (with its confidence field visibly shown, e.g. a small "estimated" badge on Gurgaon/Noida), expected wage, and the top 2-3 survival essentials. This is your cheapest high-value screen — it's assembling data you've already built correctly, so keep the UI simple and let the combination itself be the impressive part.

### STEP 6 — P3: Opportunity Map + P4: Government Compliance Signal (build together — they share one screen)

**Backend:**
```
GET /api/opportunity-map
  → array of { city, avg_wage, cost_of_living_index, govt_compliance_score,
      opportunity_score }

GET /api/bocw-status?state={state}
  → data/bocw_registration.json entry: figure, metric_type, as_of_date, source_url
```

**Opportunity score — implement as real code in `/lib/opportunityScore.js`:**
```js
opportunity_score =
    (normalized_wage * 0.35)
  + (govt_compliance_score * 0.30)
  + (safety_proxy_score * 0.15)
  + (savings_potential * 0.20)
```
Exact definitions for each term are in SPEC.md §5 — implement them exactly, with `govt_compliance_score` computed only for states with a non-null BOCW figure, normalized against the highest confirmed figure. States with a null figure (Haryana, Tamil Nadu, unless your team finds real figures before this step) must render as **"not publicly available"** — never as 0, and never silently dropped from the table.

**Frontend:** sortable table — columns: City, Wage, Cost of Living, Govt Compliance Signal, Opportunity Score. An "ℹ data sources" expandable note stating plainly: wage data is from official 2026 state notifications (list them), cost-of-living is an estimate, and the compliance signal is real BOCW data with each state's actual figure/metric/date shown on expand — this is where your honesty work becomes a visible, judge-facing feature rather than just spec text.

### STEP 7 — P6: Migration Pulse (build last among the data features — read this carefully, easiest step to get wrong)

**Backend:**
```
POST /api/pulse/log-search
  body: { destination_city }
  → { logged: true }
  Fire this from EVERY screen above whenever a user successfully gets a
  destination-specific result. Append to data/pulse_counts.json or an
  in-memory counter — this is the ONLY source /api/pulse/top may read from.

GET /api/pulse/top
  → { has_sufficient_data: boolean, top_destinations: [...],
      total_logged_searches: int, data_source: "live_app_usage" }
  Define a threshold (e.g. 10 total logged searches). Below it, return
  has_sufficient_data: false and an EMPTY top_destinations array.
```

**Frontend:** homepage card. If `has_sufficient_data` is false, render Saathi with the honest empty-state message from Step 1 plus the real (small) count — e.g. "7 searches logged so far." Never hardcode a destination list here under any circumstance, even "just for the demo" — this is the single biggest risk of accidentally reintroducing a fabricated-data problem into an otherwise fully honest build.

### STEP 8 — Eval harness

Build `eval/run_eval_v2.py` producing exactly this output shape (see SPEC.md §8 for full detail):
```
[Wage Verification]     40/40 ground-truth accuracy
[Wage Prediction]       15/15 scenarios against wage_table.json
[Opportunity Score]     Deterministic — identical output across repeated runs
[Survival Guide]        5/5 cities complete
[Route Planner]         5/5 destinations correct road_km + composed data
[Migration Pulse]       Confirms no hardcoded top_destinations below threshold
[BOCW Data Integrity]   Every state's figure/metric_type/as_of_date matches
                         bocw_registration.json exactly; nulls render correctly
```
This script must run standalone with one command and reproduce every number you plan to say out loud in the demo.

### STEP 9 — Full design + mascot polish pass

Go back through every screen built in Steps 2-7 and confirm: the design system from Step 3 is applied consistently, Saathi appears at every specified touchpoint from Step 1, every "estimated" or "not publicly available" label is visibly styled (not buried in a tooltip), and the whole app reads as one coherent product rather than five features bolted together. This step is where your 30% presentation score is actually earned — budget real time for it, don't treat it as an afterthought.

### STEP 10 — README, AI tools declaration, and submission packaging

- Write `README.md` with: project overview, the "AI Tools & APIs Used" section (contest rule #2), setup/run instructions, and a link to your eval output.
- Confirm every item in SPEC.md §12's final checklist.
- Record 2-3 backup screen-capture clips of a full successful voice-driven journey (Wage Prediction → Route Planner → Proof of Wage Truth → Escalate) in case live mic/wifi fails at judging.

---

## 5. FULL API SUMMARY (for your own reference while building)

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/parse-input` | POST | Extract structured fields from speech/text (Gemini, extraction-only) |
| `/api/verdict` | POST | Deterministic wage verdict + Gemini-phrased response |
| `/api/escalate` | POST | Consent-gated case file generation |
| `/api/predict-wage` | POST | Deterministic wage + cost-of-living prediction |
| `/api/survival-guide` | GET | Static destination resource lookup |
| `/api/route-planner` | GET | Composition of predict-wage + survival-guide + distances |
| `/api/opportunity-map` | GET | Per-city comparison + opportunity score |
| `/api/bocw-status` | GET | Real BOCW registration data per state |
| `/api/pulse/log-search` | POST | Real usage logging |
| `/api/pulse/top` | GET | Honest, threshold-gated usage ranking |

---

## 6. INSTRUCTIONS TO CODEX — HOW TO EXECUTE THIS PROMPT

- Build in the exact order of Steps 1-10. Do not start a later step before the previous one's eval/acceptance criteria pass.
- Never let any LLM call touch a number that should come from deterministic code — the wage arithmetic, the opportunity score, and the BOCW figures are all pure code, never Gemini output.
- Never hardcode, seed, or simulate the Migration Pulse destination list under any framing, including "temporary" or "for demo purposes."
- Never invent a BOCW figure for Haryana or Tamil Nadu — render "not publicly available" if §6's research doesn't turn one up.
- Ask before adding any dependency not already implied by this prompt or SPEC.md.
- Commit after every step with a clear message describing what was built — this commit history is part of your evidence that this was built during the challenge window.
- If anything in this prompt is ambiguous or conflicts with SPEC.md, stop and ask rather than guessing.
