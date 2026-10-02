# Voice of Wagers v2 — Full Journey Build Plan & Codex Handoff Spec
**BFWAI/HACK 26 · PS-06 (AI for Bharat in Indian Languages) · Final submission: 3 Oct 2026, 6:00 AM IST**

Save this as `SPEC.md` in your repo root. This supersedes the earlier single-feature spec — it keeps everything from it (Proof of Wage Truth, formerly called Wage Verification, is still P0 and unchanged in its internals) and adds the full before/during journey your team scoped out, plus two new additions: a Smart Route Planner and an honestly-built Migration Pulse card. Nothing below has been cut for scope; §3 gives a build **order**, not a cut list, so if you build in that order you always have something demoable, with every subsequent feature adding on top of a working core rather than racing things to the finish line together.

**The pitch, upgraded:**
> "Voice of Wagers is an AI migration companion that helps workers plan migration, understand expected earnings, access essential services, and prove their wages are being paid fairly."

---

## 1. The journey this now covers

```
Before migration → Wage Prediction → Smart Route Planner → Migration Survival Guide
→ Find work → Proof of Wage Truth → Optional Escalation
                                      ↓
                    (feeds back into) Opportunity Map + Government Compliance Signal
                                      +  Migration Pulse (homepage signal)
```

Seven feature pillars, all connected by one shared data backbone (the wage table) and one shared design system:

| Pillar | What it does | Depends on |
|---|---|---|
| **P0 — Proof of Wage Truth** *(formerly "Wage Verification" — same build, sharper name)* | Anonymous check: am I being paid fairly, right now, with the exact official figure it was checked against | Wage table (§4) |
| **P1 — Wage Prediction** | "If I go to Delhi as a mason, what will I earn?" before migrating | Wage table (§4) |
| **P2 — Migration Survival Guide** | Destination-specific essentials: labour office, hospitals, helplines, housing, eShram | Static resource dataset (§4) |
| **P3 — Opportunity Map** | Compare cities on wage, cost of living, and a composite "Opportunity Score" | Wage table + cost-of-living estimates + real BOCW registration data |
| **P4 — Government Compliance Signal** | Real, cited state BOCW (Building & Other Construction Workers) Welfare Board registration data as a trust/formalization indicator | BOCW dataset (§6) — real public institutional data, not personal/sensitive |
| **P5 — Smart Route Planner** | "I'm in Patna — where should I go?" Combines P1 + P2 + real inter-city distance in one answer | P1, P2, distance dataset (§4) |
| **P6 — Migration Pulse** | Homepage card showing real, live search-popularity data from the app itself | Your own app's query logs — see honesty scoping below, this one is easy to get wrong |

**This replaces the earlier synthetic-reviews plan with something stronger: real data.** A worker review is about an identifiable *person's* experience, which stays sensitive even anonymized. A government welfare board's registration figures are about *institutions* — public, non-personal data, same category as a company's factory license. Every state runs a BOCW Welfare Board under the Building and Other Construction Workers Act, 1996, and several publish real aggregate figures: Delhi reports 5,52,843 registered construction workers; UP reports over 97 lakh Aadhaar-verified labourers; Maharashtra has reported 1.02 lakh registered establishments. This is a genuinely real, citable signal of how formalized and established construction employment is in a given state — not a guess, and not anyone's personal story. §6 gives the honest scope of what this can and can't claim.

**P6 needs the same honesty discipline, just aimed at a new trap.** "Most searched destinations this week" is only real if your app has real search traffic — and at judging time, you won't have meaningfully many users. Don't hardcode an impressive-looking number here; that's a fabricated aggregate-usage claim, the same category of problem the review layer was. §7 specifies the honest build: track real counts from your own usage, and show a genuine "not enough data yet" state rather than a fake one.

---

## 2. Non-negotiables (unchanged from v1)

1. Build it during the challenge — all new code, open-source libraries fine.
2. No real personal data anywhere — including every test transcript. (The BOCW figures in §6 are real government institutional data, not personal data, and are fine to use as-is.)
3. Numbers must be real and reproducible — your eval script is the source of truth, not a slide.
4. A human approval line on all escalation.
5. Same problem statement (PS-06) as your original idea submission.

---

## 3. Build order (not a cut list — a sequence that always leaves you with something that works)

1. **P0 Proof of Wage Truth** — ships first because it's your most scored-tested, most technically rigorous piece (deterministic math, two-call Gemini split). Everything else is additive on top of it.
2. **P1 Wage Prediction** — reuses the exact same wage table and lookup logic as P0, just queried before a wage is "received" instead of after. Smallest incremental build of the remaining pillars.
3. **P2 Migration Survival Guide** — pure static/structured data + a simple lookup by destination city. No ML needed, fast to build, high "creativity/usefulness" payoff.
4. **P5 Smart Route Planner** — build right after P1+P2, since it's purely a combination of data you already have plus one new static distance dataset (§4). Cheap, high perceived value.
5. **P3 Opportunity Map** — needs P1's wage data plus cost-of-living estimates; build the comparison table and Opportunity Score formula.
6. **P4 Government Compliance Signal** — build next because it's a static data layer that slots cleanly onto the Opportunity Map once that screen already exists, rather than something that needs to be built in parallel with it.
7. **P6 Migration Pulse** — build last, and only as the honest version specified in §7. It's a homepage card, not a core journey step, and it's the easiest pillar to accidentally get wrong (see §1), so it should go in once everything else is stable and you have time to build the honest empty-state version properly rather than rushing a fake number in at the end.

If you somehow run out of time, whatever you've reached in this order is still a coherent, demoable product — that's what the ordering buys you, without declaring anything "out of scope."

---

## 4. Data layer — real, cited wage data across the corridor

### `data/wage_table.json`

Every entry below is sourced from an actual 2026 state labour department notification or a source directly reporting it. **Verify the live number at the official state labour department site before your final demo** — rates are revised on different cycles per state (Haryana: Jan/Jul; UP: Apr/Oct; Tamil Nadu: annual; Maharashtra: Jan/Jul; Delhi: as notified) and some secondary sources disagree with each other.

```json
{
  "last_verified": "2026-09-30",
  "cities": [
    {
      "city": "Delhi",
      "state": "Delhi NCT",
      "sector": "Building and Construction",
      "rates": { "unskilled": 19846, "semi_skilled": null, "skilled": null },
      "unit": "monthly",
      "effective_date": "2026 (current notification)",
      "verification_note": "CONFLICTING SOURCES: some report Rs 18,456/month (Apr-2025 order), others Rs 19,846/month (claimed current 2026 figure). CONFIRM at labour.delhi.gov.in before demo."
    },
    {
      "city": "Gurgaon",
      "state": "Haryana",
      "sector": "All scheduled employments (state-wide, not construction-specific)",
      "rates": { "unskilled": 15220.71, "semi_skilled": 16780.74, "skilled": 18500.81, "highly_skilled": 19425.85 },
      "unit": "monthly",
      "daily_divisor": 26,
      "effective_date": "2026-04-01",
      "source_url": "Haryana Labour Department gazette notification, effective 1 April 2026",
      "verification_note": "Well-corroborated across multiple sources. Haryana revises twice yearly (Jan/Jul) — check for a newer notification before demo."
    },
    {
      "city": "Noida",
      "state": "Uttar Pradesh",
      "sector": "74 Scheduled Employments, Category I (Gautam Buddha Nagar / Ghaziabad)",
      "rates": { "unskilled": 13690, "semi_skilled": 15059, "skilled": 16868 },
      "unit": "monthly",
      "effective_date": "2026-04-01",
      "source_url": "UP Labour Department notification dated 18 Feb 2026, effective 1 Apr-30 Sep 2026",
      "verification_note": "Issued after labour unrest in Noida; UP revises Apr/Oct — check for an Oct-2026 revision before demo."
    },
    {
      "city": "Chennai",
      "state": "Tamil Nadu",
      "sector": "Construction or Maintenance of Roads and Buildings",
      "rates": { "unskilled": null, "semi_skilled": null, "skilled": null, "general_construction_daily": 609.30 },
      "unit": "daily",
      "effective_date": "2026-04-01",
      "verification_note": "Tamil Nadu does not split this scheduled employment into unskilled/semi-skilled/skilled tiers the way other states do — it is a single composite rate (Basic Rs 117 + DA Rs 492.30/day). Reflect this honestly in the UI rather than forcing it into the same 3-tier shape as other cities."
    },
    {
      "city": "Mumbai",
      "state": "Maharashtra",
      "sector": "Zone I (Mumbai metro)",
      "rates": { "unskilled": 14638, "semi_skilled": 16198, "skilled": 17940 },
      "unit": "monthly",
      "effective_date": "2026 (current cycle)",
      "verification_note": "Maharashtra revises Jan/Jul. One source gives a lower unskilled figure (Rs 14,066/month) for an earlier 2026 cycle — confirm which cycle is current before demo."
    }
  ]
}
```

### `data/cost_of_living.json` — explicitly estimates, never treated as legal fact

```json
{
  "disclaimer": "These are rough, non-official estimates for illustrative comparison only — unlike wage_table.json, these are NOT government-verified figures. Label them as such in the UI.",
  "cities": [
    { "city": "Delhi",    "typical_shared_rent_monthly": 3500, "typical_food_monthly": 4500 },
    { "city": "Gurgaon",  "typical_shared_rent_monthly": 3000, "typical_food_monthly": 4200 },
    { "city": "Noida",    "typical_shared_rent_monthly": 2800, "typical_food_monthly": 4000 },
    { "city": "Chennai",  "typical_shared_rent_monthly": 2200, "typical_food_monthly": 3800 },
    { "city": "Mumbai",   "typical_shared_rent_monthly": 4500, "typical_food_monthly": 5000 }
  ]
}
```

Your team should sanity-check these against any cost-of-living index you can find in the time you have; if you can't verify them, keep the disclaimer loud and visible rather than removing it.

### `data/survival_guide.json`

```json
{
  "cities": [
    {
      "city": "Noida",
      "labour_office": { "name": "Assistant Labour Commissioner Office, Noida", "distance_note": "example: 4.2 km from a typical construction site — replace with real geocoding if time allows" },
      "government_hospital": "District Hospital, Noida",
      "worker_helpline": "1800-XXX-XXXX (placeholder — insert the real UP labour helpline number)",
      "emergency": "112",
      "housing": ["Worker hostels near industrial areas — list 2-3 real ones if you can find them, else label as 'typical options'"],
      "documentation": ["eShram registration (eshram.gov.in)", "Opening a basic/Jan Dhan bank account", "State labour welfare board registration"],
      "useful_phrases": [{ "hindi": "Mera paisa kab milega?", "meaning": "When will I get my payment?" }]
    }
  ]
}
```

Build 3-5 cities deep (Delhi, Gurgaon, Noida, Chennai, Mumbai) — do not try to cover all of India. Placeholder helpline numbers must be clearly marked as placeholders in code comments so nobody accidentally presents a fake number as real in the demo.

### `data/distances.json` — for the Smart Route Planner (P5)

Road-distance sources disagree with each other more than wage sources do (one Patna-Delhi query returned figures from 851 km to 1,142 km depending on route/source), so pick one consistent source and cite it rather than averaging conflicting numbers into a false-precision figure.

```json
{
  "origin": "Patna",
  "source_note": "Figures below use distancefromto.net's Patna city-distance table where available, for internal consistency across cities from the same source. Gurgaon and Noida are not listed separately by that source and are estimated by offsetting from the Delhi figure (Gurgaon ~+30km south-west, Noida ~-20km, both approximate). Verify via Google Maps Distance Matrix API if time allows before demo — do not present the estimated two as equally precise as the sourced three.",
  "routes": [
    { "destination": "Delhi",   "road_km": 851,  "confidence": "sourced" },
    { "destination": "Noida",   "road_km": 830,  "confidence": "estimated_from_delhi" },
    { "destination": "Gurgaon", "road_km": 880,  "confidence": "estimated_from_delhi" },
    { "destination": "Chennai", "road_km": 1481, "confidence": "sourced" },
    { "destination": "Mumbai",  "road_km": 1452, "confidence": "sourced" }
  ]
}
```

Keep `origin` as a single fixed value (Patna) for the MVP — a full any-origin route planner is out of reach in your remaining time; a Patna-anchored one is a real, honest, demoable slice of the idea, not a cut-down version pretending to be the whole thing.

---

## 5. Backend spec

### Endpoints (P0 unchanged from v1 — see that section there; new ones below)

```
POST /api/predict-wage
  body: { destination_city, job_category }
  → { expected_daily_range, expected_monthly_range, typical_rent, typical_food,
      estimated_monthly_savings_range, data_confidence: "verified_wage" | "estimated_col" }
  (Pure lookup against wage_table.json for wage figures — deterministic.
   Cost-of-living figures pulled from cost_of_living.json, clearly flagged
   as estimates in the response object, not just the UI.)

GET /api/survival-guide?city={city}
  → survival_guide.json entry for that city

GET /api/route-planner?origin=Patna&destination={city}
  → { destination, road_km, distance_confidence: "sourced" | "estimated_from_delhi",
      expected_wage (reuses /api/predict-wage's output for this destination),
      survival_essentials (reuses /api/survival-guide's output for this destination) }
  (Pure composition of P1 + P2 + distances.json — no new logic, no new LLM call
   needed. This endpoint's whole job is combining three things you've already
   built correctly into one answer.)

POST /api/pulse/log-search
  body: { destination_city }
  → { logged: true }
  (Fires every time a real user — including your own team during testing —
   searches a destination anywhere in the app. Appends to a simple counter
   store, e.g. pulse_counts.json or an in-memory map. This is the ONLY source
   `/api/pulse/top` is allowed to read from — never a hardcoded list.)

GET /api/pulse/top
  → { has_sufficient_data: boolean, top_destinations: [...],
      total_logged_searches: int, data_source: "live_app_usage" }
  (If total_logged_searches is below a small threshold you define, e.g. 10,
   return has_sufficient_data: false and an empty top_destinations array —
   the frontend must render an honest "not enough activity yet" state in that
   case, per §7. Never backfill this with a seeded or invented list.)

GET /api/opportunity-map
  → array of { city, avg_wage, cost_of_living_index, govt_compliance_score,
      opportunity_score }
  (opportunity_score computed server-side per the formula in §7 —
   never hardcoded per city, always derived from the other fields)

GET /api/bocw-status?state={state}
  → bocw_registration.json entry for that state, including figure, metric_type,
    as_of_date, and source_url verbatim (never paraphrase away the date or metric
    type — see §6 on why these two fields are load-bearing, not decoration)
```

### Opportunity Score formula (deterministic, explainable — good technical-depth talking point)

```
opportunity_score =
    (normalized_wage * 0.35)
  + (govt_compliance_score * 0.30)
  + (safety_proxy_score * 0.15)
  + (savings_potential * 0.20)

where:
  normalized_wage      = city's avg wage ÷ highest avg wage across all cities (0-1)
  savings_potential     = (avg_wage - typical_rent - typical_food) ÷ avg_wage, floored at 0
  govt_compliance_score = that state's BOCW figure ÷ highest BOCW figure among states
                          with a confirmed figure (0-1) — see §6 for what this does
                          and does not measure
  safety_proxy_score    = placeholder constant (0.7 for all cities) unless you have
                          time to source a real proxy (e.g. published labour dispute
                          counts) — label clearly as a placeholder if left as a constant
```

Commit this formula as actual code (`lib/opportunityScore.js` or `.py`), not just a slide — judges rerunning your eval should be able to see exactly how the ranking was produced.

---

## 6. Government compliance data layer (`data/bocw_registration.json`)

This replaces the synthetic review layer with real, public, government-sourced data — but it needs the same honest scoping you've applied everywhere else, because the numbers below measure something specific, not "this state treats workers well."

**What `govt_compliance_score` actually measures:** the scale of registered BOCW Welfare Board activity in a state — how many workers or establishments are formally enrolled in the statutory welfare system. This is a real proxy for *formalization* of the construction labour market in that state. It is **not** a direct measure of payment reliability, site safety, or whether any specific contractor pays on time — don't let the pitch or the UI imply otherwise. Say what it is: "a real, government-sourced signal of how formalized the construction workforce is in this state," not "how good the contractors are here."

**Known data quality issue to handle honestly — state figures aren't directly comparable:** the numbers below come from different years and different metrics per state (some count registered *workers*, some count registered *establishments*, and "as of" dates range from 2015 to 2022). Do not normalize across states as if they were snapshots from the same date measuring the same thing. Each entry carries its own `metric_type` and `as_of_date` — surface both in the UI, not just the number, so the comparison stays honest rather than implying false precision.

```json
{
  "last_verified": "2026-10-01",
  "states": [
    {
      "state": "Delhi NCT",
      "cities_covered": ["Delhi"],
      "figure": 552843,
      "metric_type": "registered_construction_workers",
      "as_of_date": "2022-11-10",
      "source_url": "bocw.delhi.gov.in — Delhi Building and Other Construction Workers Welfare Board public notice",
      "verification_note": "Confirmed, dated figure from the Board's own public notice. Check the portal for a more recent published list before demo."
    },
    {
      "state": "Uttar Pradesh",
      "cities_covered": ["Noida"],
      "figure": 9701000,
      "metric_type": "aadhaar_verified_registered_labourers_cumulative",
      "as_of_date": "2022-23 (portal dashboard, year as published)",
      "source_url": "upbocw.in — UP Building and Other Construction Workers Welfare Board dashboard",
      "verification_note": "This is a cumulative/dashboard figure, not a single-date snapshot like Delhi's — different metric shape, flag this in the UI rather than placing it in a column that implies equivalence."
    },
    {
      "state": "Maharashtra",
      "cities_covered": ["Mumbai"],
      "figure": 102000,
      "metric_type": "registered_establishments",
      "as_of_date": "2015-16 (Economic Survey of Maharashtra)",
      "source_url": "mahabocw.in — cited via Economic Survey of Maharashtra 2015-16",
      "verification_note": "This is an ESTABLISHMENT count, not a worker count like Delhi/UP — do not compare this figure directly against the other two without converting to the same metric_type or clearly labelling the mismatch. Also the oldest figure in this set — try to find a more recent mahabocw.in figure before demo."
    },
    {
      "state": "Haryana",
      "cities_covered": ["Gurgaon"],
      "figure": null,
      "metric_type": null,
      "as_of_date": null,
      "source_url": "hrylabour.gov.in — Haryana BOCW Welfare Board",
      "verification_note": "NOT FOUND in research for this spec. The Board exists and runs 23 welfare schemes, but no public aggregate registration figure was located. Check the portal directly — if nothing is found before demo, show Haryana as 'registration data not publicly available' rather than inventing a number or silently omitting the state."
    },
    {
      "state": "Tamil Nadu",
      "cities_covered": ["Chennai"],
      "figure": null,
      "metric_type": null,
      "as_of_date": null,
      "source_url": null,
      "verification_note": "NOT FOUND in research for this spec. Search the Tamil Nadu Construction Workers Welfare Board directly — if nothing is found before demo, show Tamil Nadu as 'registration data not publicly available' rather than inventing a number or silently omitting the state."
    }
  ]
}
```

**What to build, concretely:**
1. Load this file at startup; compute `govt_compliance_score` only for states with a non-null `figure`, normalized against the highest confirmed figure.
2. For Haryana and Tamil Nadu, your team has two honest options given the time left: (a) spend 20-30 minutes trying each state portal directly for a public aggregate figure and fill it in with its own citation if found, or (b) ship with those two states showing "registration data not publicly available" in the UI — which is itself a legitimate, honest data point, not a gap to hide.
3. Never let the opportunity map silently drop a state with a null figure from the table — show it with the real reason, so the table's completeness matches reality.
4. This is static data (no script needed, unlike the old synthetic generator) — one JSON file, loaded once, with exact source URLs preserved so anyone can verify it in under a minute.

---

## 7. Frontend spec — homepage + six journey screens, one design system

Reuse your dark + gold Instrument Serif aesthetic from the idea deck throughout, for a consistent presentation score. Homepage order follows the full worker journey, not the order features were built in:

0. **Home** — journey entry points in this order: Wage Prediction → Opportunity Map → Smart Route Planner → Migration Survival Guide → Proof of Wage Truth → Escalation. Two homepage cards sit above the journey list:
   - **Migration Pulse card** — see the honest build spec below. This is the easiest pillar on this list to get wrong, so read this carefully before building it.
   - A short "Planning to migrate?" vs "Already working?" split, same as before, now just reframed as an entry point into the fuller journey rather than the whole homepage.
1. **Wage Prediction screen** — destination + job category in, expected range + savings estimate out, cost-of-living figures visibly tagged "estimated."
2. **Opportunity Map screen** — sortable table of cities (wage / cost of living / govt compliance signal / opportunity score), with a small "ℹ data sources" expandable note that honestly states: wage data is from official 2026 notifications (cite them), cost-of-living is estimated, and the compliance signal is real BOCW Welfare Board data (cite the state portal and the `as_of_date` for each), with Haryana/Tamil Nadu shown as "not publicly available" if your team couldn't locate a figure. The compliance column should show the raw figure + metric type + date on hover/expand, not just a bare normalized score, so the honesty is visible in the product, not just in this spec.
3. **Smart Route Planner screen** — single input ("Where are you starting from?" — fixed to Patna for MVP, say so rather than implying any origin works), output combines distance (with its `confidence` field surfaced, not hidden), expected wage, and top 2-3 survival essentials for the chosen destination, in one card.
4. **Survival Guide screen** — destination-specific card grid: Essentials / Housing / Documentation / Language Support, per §4's data.
5. **Proof of Wage Truth screen** *(the renamed Wage Verification + Verdict screen — unchanged internals from v1 spec)*.
6. **Escalate screen** — unchanged from v1 spec (consent + human-review statement).

### Migration Pulse — the honest build

This card must never show an invented number. Build it exactly like this:
- Every time any screen above successfully returns a destination-specific result (prediction, route plan, survival guide, map row clicked), fire `POST /api/pulse/log-search` for that city.
- The homepage card calls `GET /api/pulse/top`. If `has_sufficient_data` is false (which it will be for most of your build-and-test period, and quite possibly at judging time too), render: *"Migration Pulse — will populate once more workers start using Voice of Wagers. [X] searches logged so far."* — showing your real, small, honest count is more credible than hiding the feature, and far safer than a fake one.
- Only if your own testing and demo-day usage genuinely crosses your defined threshold does the card switch to showing a real ranked list — and if it does, it's real because you built the counting pipeline correctly, not because you wrote a number into a slide.
- If asked in Q&A, the honest answer is: "this is wired to real usage data and will become meaningful once the app has more users — here's the pipeline that proves it's real, not a mockup." That answer is a feature, not an apology.

---

## 8. Eval harness extensions

Beyond the v1 wage-verification eval (§8 of the original spec, unchanged), add:

```
$ python eval/run_eval_v2.py

[Wage Verification]       40/40 ground-truth accuracy (unchanged)
[Wage Prediction]         5 cities × 3 job categories = 15 scenarios,
                           checked against wage_table.json directly: 15/15
[Opportunity Score]       Deterministic — re-running produces identical
                           scores given the same input data (no randomness,
                           confirmed by running twice and diffing output)
[Survival Guide]          5/5 cities return a complete, non-null record
[Route Planner]           5/5 destinations return correct road_km (matching
                           distances.json exactly) + correctly composed
                           wage/survival data for that destination
[Migration Pulse]         Confirms /api/pulse/top never returns
                           has_sufficient_data: true below your defined
                           threshold, and that top_destinations is only ever
                           populated from real logged counts, never a constant
[BOCW Data Integrity]     Every state entry's figure, metric_type, and as_of_date
                           in the opportunity-map API response matches
                           bocw_registration.json exactly (deterministic retrieval
                           check — confirms nothing was altered in transit).
                           States with a null figure correctly render as
                           "not publicly available" rather than 0 or being dropped.
```

---

## 9. Demo / pitch script (full journey version)

Open with the upgraded pitch line from §0, then walk the journey in order:

1. **"Before you even migrate"** — show Wage Prediction: "Mason going to Delhi, here's your expected range and savings potential." *(Baseline: today, this decision is made on rumour and a contractor's promise.)*
2. **"Say they're starting in Patna"** — show the Smart Route Planner: distance, expected wage, and top survival essentials for a chosen destination, in one answer. *"Today this takes asking around for weeks. Here it's one query."*
3. **"Once they've picked a city"** — show Survival Guide for that city: labour office, hospital, helpline, eShram.
4. **"Once they're working"** — show Proof of Wage Truth live, same as v1 demo, now under its sharper name.
5. **"If something's wrong"** — show the consent-gated Escalation screen, human-review line visible.
6. **"And across the whole corridor"** — show the Opportunity Map, say clearly: *"Wage figures here are from official 2026 state notifications — we'll show you the citations. Cost-of-living is a clearly labelled estimate. And this compliance signal isn't a guess or a simulation — it's real data from each state's own BOCW Welfare Board: Delhi has 5.5 lakh registered construction workers as of their 2022 public notice, UP's board reports over 97 lakh Aadhaar-verified labourers. Where a state hasn't published a public figure — like Haryana and Tamil Nadu here — we say so honestly instead of hiding the gap."*
7. **"And one more thing"** — show the Migration Pulse card on the homepage, and say so plainly: *"This is wired to real usage, not a seeded number — right now it shows [X] real logged searches, and it'll populate into a ranked list as real workers use it."* This line is a credibility asset, not an apology — it shows judges you understand the difference between real and simulated data everywhere in this product, not just where it's convenient.
8. Close with the five-things-you-must-show checklist from the ground rules (baseline vs result, your own eval set, human approval line, a trace with failures included, one paragraph of context) — all five are now demonstrated across the journey, not crammed into one screen.

---

## 10. Build schedule — today through 3 Oct, 6:00 AM IST

Adjust start time to when you're actually reading this.

**Day 1:**
- [ ] Lock stack (same as v1 §3).
- [ ] Scaffold repo, build `wage_table.json` with the cited data from §4 above, verify the Delhi figure live.
- [ ] Build P0 Proof of Wage Truth end-to-end (deterministic logic + both Gemini calls), per v1 spec §5.
- [ ] Build `eval/run_eval.py` for P0, confirm numbers.

**Day 2:**
- [ ] Build P1 Wage Prediction (reuses P0's lookup logic — should be fast).
- [ ] Build `cost_of_living.json` (verify or clearly flag as estimate) and the savings calculation.
- [ ] Build P2 Survival Guide data + screen for all 5 cities.
- [ ] Build `distances.json` and the P5 Smart Route Planner endpoint + screen (pure composition — should be quick given P1/P2 already work).
- [ ] Style screens so far with the shared design system.

**Day 3:**
- [ ] Build P3 Opportunity Map: opportunity score formula as real code, sortable table UI.
- [ ] Build P4: finalize `bocw_registration.json` — spend 20-30 min trying to find real Haryana/Tamil Nadu figures directly on their state portals; wire the `/api/bocw-status` endpoint and the compliance column in the Opportunity Map UI with figure/metric/date visible.
- [ ] Build P6 Migration Pulse: `/api/pulse/log-search` wired into every other screen's successful queries, `/api/pulse/top` with the honest threshold logic, and the homepage card with its honest empty state.
- [ ] Wire voice (STT/TTS) across Wage Prediction and Proof of Wage Truth screens, with typed fallback always visible (per v1 §6).
- [ ] Run the full `eval_v2` suite, fix anything scoring unexpectedly.

**Day 4 (final stretch before 6:00 AM on 3 Oct):**
- [ ] Full dry-run demo at least twice, timed.
- [ ] Record 2-3 backup screen-capture clips of successful voice flows.
- [ ] Code freeze — bug fixes only after this point.
- [ ] Prepare submission package, submit with buffer before 6:00 AM — not at 5:58 AM.

---

## 11. Copy-paste kickoff prompt for Codex

```
Read SPEC.md in this repo fully before writing any code. Build Voice of Wagers v2
exactly as specified: a React + Vite + Tailwind frontend with a homepage plus
six journey screens (Wage Prediction, Opportunity Map, Smart Route Planner,
Survival Guide, Proof of Wage Truth, Escalate) and a backend implementing every
endpoint in section 5. Build in the order given in section 3 — Proof of Wage
Truth first and fully working before touching any other pillar. All wage
figures come from data/wage_table.json exactly as given in section 4 — do not
let any LLM call invent, alter, or recompute a wage number; LLM calls are for
extraction and phrasing only. Cost-of-living figures must be visibly flagged
as estimates wherever shown. The government compliance signal must be loaded
only from data/bocw_registration.json exactly as specified in section 6 — never
invent a figure for Haryana or Tamil Nadu if none is found; render those states
as "not publicly available" instead. The Smart Route Planner must be a pure
composition of the wage prediction, survival guide, and distances.json data —
no new LLM call, no invented distances; surface the "sourced" vs
"estimated_from_delhi" confidence field from distances.json rather than hiding
it. Migration Pulse must only ever display counts from real logged searches via
/api/pulse/log-search — never hardcode or seed /api/pulse/top's destination
list, and the frontend must render the honest "not enough activity yet" state
whenever has_sufficient_data is false. Every opportunity-map API response must
pass through the figure, metric_type, and as_of_date fields for each state
unchanged — never collapse them into a bare score without the underlying real
data alongside it. Implement the opportunity score as real, deterministic code
per the formula in section 5, not a hardcoded per-city number. Build
eval/run_eval_v2.py per section 8 before considering any pillar done. Ask me
before adding any dependency not already implied by this spec.
```

---

## 12. Final submission checklist

- [ ] No real personal/worker data anywhere — including every test transcript (BOCW figures are institutional, not personal, and are fine as-is).
- [ ] `eval/run_eval_v2.py` runs standalone and reproduces every number in your pitch.
- [ ] Wage table figures verified against live official notifications where possible; conflicting-source notes left in place honestly where not fully resolved.
- [ ] Cost-of-living figures visibly flagged as estimates everywhere they appear.
- [ ] Distance figures in the Route Planner show their `confidence` field; estimated ones aren't presented as precisely as sourced ones.
- [ ] Migration Pulse never shows an invented destination list or count — verified against the real logging pipeline, honest empty state confirmed working.
- [ ] BOCW compliance figures shown with their real metric_type and as_of_date, not as a bare score; Haryana/Tamil Nadu shown honestly as "not publicly available" if no figure was found.
- [ ] Escalation screen states a human reviews every case.
- [ ] Same problem statement (PS-06) as your original idea submission — confirmed.
- [ ] Submitted with time to spare before 3 Oct, 6:00 AM IST.
