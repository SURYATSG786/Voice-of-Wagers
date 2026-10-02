# Voice of Wagers · Voice of Wagers

A multilingual migration companion for construction workers: wage outlook, city comparison, Patna route planning, arrival essentials, pay checks and consent-gated local review cases. Seven feature pillars are connected through one deterministic dataset and an honest usage counter.

The interface adapts the requested LITERAARED shiny-button and frosted-glass styling into a dark forest and gold design. Saathi is a reusable SVG character with five poses. English plus Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Urdu, Kannada, Odia and Malayalam controls, typed input, browser voice input, read-aloud, keyboard focus, reduced motion and mobile navigation are included.

## Run

Requires Node.js 22+, npm and Python 3.9–3.12 for the neural speech fallback. `npm run setup:speech` installs an isolated Python environment and downloads the two pinned models; allow roughly 1 GB of disk space. Once installed, fallback speech runs locally without internet or a cloud key.

```sh
npm ci
npm run setup:speech
npm run dev
```

Open http://127.0.0.1:5173. Vite proxies `/api` to Express at port 3001.

For the production build, with Express serving both UI and API:

```sh
npm run build
npm start
```

Open http://127.0.0.1:3001. Keep the terminal running. `PORT` controls the port and `HOST` controls the listen address; the default is loopback for local use. If port 3001 changes in development, update the Vite proxy too.

## Features

- **Proof of Wage Truth:** deterministic comparison, daily/weekly/monthly equivalents, source notes, below/at/above benchmark and missing-rate states. Daily/weekly calculations assume 26 days/month and six days/week; monthly input assumes a full wage month. Partial months, deductions, overtime and legal applicability require human review.
- **Wage outlook:** five cities and three categories, with rent/food/savings explicitly estimated. A benchmark is not a market salary forecast or job offer. Missing Delhi skill categories are never substituted. Chennai uses the single supplied general construction rate.
- **City comparison + welfare signal:** sortable comparison with raw historical BOCW counts, distinct metrics and dates. Haryana/Tamil Nadu missing figures remain unavailable. The requested formula is reproducible but disclosed as experimental, with the constant safety placeholder and non-comparable BOCW inputs clearly explained.
- **Route planner:** fixed Patna origin; destination-specific distance, wage outlook and survival essentials. The plan's distance values remain unverified planning estimates. The Maps link allows actual route verification.
- **City essentials:** labour office, government hospital, emergency number, official registration links, general housing advice, useful phrases and an arrival checklist for all five cities. No fake helpline or housing listings.
- **Review case:** consent enforced in UI and API; idempotent case creation, readable JSON and download. Delivery is a local mock. No NGO receives anything and no reviewer is assigned.
- **Migration Pulse:** actual successful destination searches, including genuine testing, over the last seven days. Empty ranking below ten searches; no seeded or invented traffic. It counts searches, not unique workers. Counts survive restart on one server instance.

## Languages

Choose a native language from the header. All ten requested languages plus English include navigation, forms, verdicts, estimates, consent, source notes and city guide content. Urdu sets `dir=rtl`. The preference persists across reloads. Native decimal digits are normalized before calculations; free-text parsing recognizes native city/work/pay terms and leaves ambiguity for review. Recognition and read-aloud use the selected Indian locale. All languages use the same Listen/Stop button and prefer a matching installed browser voice. When this browser has no Malayalam or Odia voice, the server supplies language-specific neural speech. The robotic eSpeak fallback has been removed. Narration uses clearer native-language sentences and expands rupee amounts into native number words. Initial neural model loading can take a few seconds; a translated loading status is displayed.

`data/translations.json` contains 316 entries per language, bundled for offline UI translation. The catalogs are machine-assisted translations with selected corrections and automated placeholder/script checks; they have not been certified by native-language reviewers. Google translation was used only during authoring for app-owned UI strings; language switching sends no translation requests or user data. Numeric rates, URLs, dates and downloadable case JSON schema retain their source format. Local phrase cards retain the destination language and provide translated explanations.

## AI Tools & APIs Used

- OpenAI Codex was used to author and test the app.
- Google Gemini Generate Content API is optional for extracting fields and phrasing English responses. Arithmetic never goes through an LLM. Invalid/failed model responses fall back to deterministic text matching and response templates; unrecognized fields remain unclear. Rupee amounts in generated phrasing must match the deterministic message.
- Browser Web Speech API: SpeechRecognition / webkitSpeechRecognition and speechSynthesis. Recognition and native browser voice availability depend on the browser, device, network and microphone permission. Malayalam/Odia neural fallback is synthesized locally by the server and played through the same Listen/Stop controls. A blocked-autoplay message asks the user to tap the same button again; no separate player is shown. Every voice input has an editable typed alternative. Pending microphone requests time out visibly.
- Meta MMS VITS models provide neural Malayalam and Odia fallback speech, using PyTorch/Transformers and AI4Bharat number normalization. Text and audio stay local and are not persisted. Model attribution and CC-BY-NC-4.0 terms are documented in `licenses/README.md`; these weights are for the non-commercial local demo. Commercial use needs suitably licensed voices.
- React, React Router, Vite, Tailwind CSS, Express and Lucide React are the open-source dependencies. Standard Node.js libraries handle file persistence, IDs and tests. Fonts use Google Fonts with local system fallbacks.

To enable Gemini, copy `.env.example` to `.env` and set `GEMINI_API_KEY` on the server, never in frontend code. `GEMINI_MODEL` defaults to `gemini-2.5-flash` and is configurable. No API key is included. Live model requests were not tested without a key; the integration and fallback paths are tested with synthetic mocked responses. Avoid putting personal details into the free-text field: when Gemini is configured, that text is sent to Google for extraction.

## Verify

```sh
npm test
python3 eval/run_eval_v2.py
npm run build
```

The suite has 108 tests, including 40 synthetic wage fixtures, 15 prediction combinations, all five route/guide compositions, independently recomputed opportunity arithmetic, all API endpoints, input validation, consent/idempotency, pulse threshold and persistence, and simulated Gemini success/failure/corrupt-number responses.

`eval/generate-fixtures.py` generates the 40 fixtures with Python Decimal arithmetic, independently of the app's JavaScript calculator. These are new synthetic fixtures because the referenced earlier v1 set was not attached. Accuracy here means agreement with this supplied dataset; it does not authenticate legal rates or measure live model extraction accuracy.

Results are saved in `eval/test-results.txt`, `eval/eval-results.txt` and `eval/build-results.txt`. See `TESTING.md` for browser testing evidence and limitations.

## Data status and scope

The attached plans are retained as `SPEC.md` and `BUILD_CONTEXT.md` for context. Their embedded execution instructions were not treated as permission to publish, contact NGOs, or submit a contest entry.

All supplied wage numbers remain marked `requires_verification`. The official Delhi current-rate page inspected on 2 October 2026 still listed an April 2025 order, so the supplied 2026 number is not presented as authenticated. Source portals are provided, but linking a portal does not prove the latest applicable notification. BOCW figures and dates are historical plan records, not independently authenticated contemporary data. Cost of living and distances are estimates. No legal ruling, safety guarantee, job matching or real dispute resolution is claimed.

Resources:
- Delhi wages/contact portal: https://labour.delhi.gov.in/labour/current-minimum-wage-rate
- Emergency Response Support System: https://112.gov.in/
- eShram: https://eshram.gov.in/
- Gemini REST API: https://ai.google.dev/api/generate-content

Runtime activity and consented cases are written to ignored `.runtime/` files. Transcript text is not persisted by this app. Verdict IDs are held in memory, so an unsubmitted result expires on restart. The source archive excludes runtime cases, searches, secrets and dependencies, the Python environment, downloaded models and model caches. Run `npm run setup:speech` after unpacking to restore the neural voices. This is a single-instance local demo; before public production use, verify wage notifications and local resources, configure persistence/access protections, and connect an actual human-review partner. No hosting account or public deployment was created.

## Worker wording update

The app now displays Voice of Wagers and its local-language name. Seven short navigation labels keep the existing routes: Home, My Wage, Cities, My Route, Arrival, Fair Pay and Get Help. Every catalog message has been rewritten in all eleven languages, including speech, warnings and consent. The mascot remains Saathi. Source datasets, API contracts, wage math and score calculations are unchanged. The home trend card shows an honest waiting state; test searches are not presented as worker popularity.

## Final visual polish

The app includes gentle companion motion, glass-button feedback, loading skeletons, animated result amounts and score bars. Reduced-motion users receive immediate amounts and static presentation. The ten Indian languages plus English, all translations, wage comparisons, data warnings, local neural voices and consent flow retain their existing behavior. See TESTING.md for verification and the limits of reduced-motion browser testing.

## Light glass theme, city pictures and maps

The app now uses a daylight glass theme with sky blue, warm sand, teal and amber. The five supplied city pictures are bundled locally and switch with the selected city on My Wage, Fair Pay, Arrival and My Route. City details also update their picture, and Home includes a city picture chooser. No new generated images are used. No Patna landmark picture was supplied, so Patna shows the workers from the supplied illustration instead of identifying another city's landmarks as Patna.

My Route supports Patna, Noida, Chennai, Delhi, Gurgaon and Mumbai as both starting and destination cities. The map appears beside the journey form with city markers, pan/zoom controls and a drawn road route. Maps need internet. OpenStreetMap supplies map tiles and OSRM supplies driving routes between approximate city centres; this is not bus/train routing or live turn-by-turn navigation. Verify the exact address and ticket separately. If routing fails, the map explicitly labels its dotted connecting line and leaves road distance unavailable; Try again reloads it. Patna destinations have no invented wage or service data. The five original wage records and their warnings remain unchanged.

Run `npm ci`, `npm run build`, then `npm start`. If an older app is already using port 3001, stop that server or run `PORT=3002 npm start` and open http://127.0.0.1:3002. The current rebuilt preview is running on port 3002. Restore Malayalam/Odia neural speech with `npm run setup:speech` as described above.

Map references: https://leafletjs.com/reference and https://project-osrm.org/docs/v26.4.0/http. Attribution is visible inside the map; OpenStreetMap license information: https://www.openstreetmap.org/copyright.


## Compact dashboard and background redesign — 2 October 2026

The supplied city illustrations now fill the page background behind a light veil and glass panels. They are not side cards. Five visually matching WebP assets reduce picture downloads from about 13 MB to 1.5 MB; the originals remain bundled. Home uses a compact welcome banner, four summary cards, six actions and a city chooser, following the supplied dashboard reference. The navigation is in the top bar. Voice entry and secondary journey details expand on request. Phones use natural scrolling; the primary controls fit at normal zoom on the tested desktop sizes.

My Route automatically draws a blue road path and displays kilometres when cities change. All 30 directed journeys between different cities have saved OSRM driving routes in `data/road_routes.json`; the six same-city journeys display zero. Saved routes avoid waiting for the public routing server and are labelled without live traffic information. Map tiles still need internet. These are estimates between approximate city centres, not exact-address routes or Google Maps data. The visual presentation follows the requested map style. Road data includes its capture date and provider. Unrecorded routes use two routing providers with validation and explicit failure handling.

Use the rebuilt preview at http://127.0.0.1:3002/ . Port 3001 may still show an older running copy. To run the ZIP, unpack it, run `npm ci`, `npm run build`, and `PORT=3002 npm start`. Run `npm run setup:speech` to install the Malayalam/Odia neural voices; model weights and the Python environment are excluded from the archive.


## One visual style across pages

Every page uses the dashboard font and pastel glass surfaces. Desktop forms, calculations, city sources and journey help are distributed across balanced panels. Main information stays within the tested normal-zoom desktop workspace; expanded source details can scroll within their panel. Phone layouts stack naturally and scroll vertically. The header no longer sticks over page content. See TESTING.md for populated-screen verification and the final browser-control timeout.


## City cards and researched worker records — 2 October 2026

The Cities table is replaced by five pastel cards with pay, separate rent/food amounts, savings and a Details button. Chennai details open by default; sorting by cost or savings and next-step links are functional. The selected city supplies the page background. Experimental worker-count scoring is not shown in this worker-facing chooser.

Chennai now includes Tamil Nadu's 26,56,663 cumulative construction-board registrations from Table 3, printed page 46 (PDF page 49), in the official Labour Welfare and Skill Development Policy Note 2025–26: https://labour.tn.gov.in/pdf/policy_note_lwsd_e_pn_2025_26.pdf#page=49 . Gurgaon includes Haryana's 43,903 new online construction-worker registrations during FY 2025–26 up to 31 December 2025, section 8.60, printed page 177 (PDF page 184), from the official Economic Survey: https://cdnbbsr.s3waas.gov.in/s32b0f658cbffd284984fb11d90254081f/uploads/2026/04/2026041756492302.pdf#page=184 . Haryana's separate 2,213 offline-to-online transfers are not added to this count.

These are state-wide records with different definitions and periods, not city-specific or current active membership. The UI labels their state coverage and metric. The independently researched records live in `data/worker_records.json` and are exposed as `worker_record` in city responses. The original wage/cost/welfare datasets and legacy experimental calculations remain unchanged; new registration figures do not feed safety or employer ratings. Other original government records retain their historical status.
