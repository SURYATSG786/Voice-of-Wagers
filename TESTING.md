# Verification record

## Automated

Run `npm test`, `npm run eval` and `npm run build`. Final output is retained alongside the evaluation scripts. Tests use separate temporary runtime stores and do not seed the app's Migration Pulse.

## Browser checks performed

- Desktop homepage and navigation rendered with glass/shimmer styling and Saathi SVG.
- Noida helper wage outlook: monthly benchmark 13,690; rent 2,800; food 4,000; estimated remainder 6,890.
- Delhi skilled prediction returned unavailable without substituting the helper rate.
- Typed English pay statement populated Noida/helper/daily/400.
- Pay check returned monthly equivalent 10,400 and difference 3,290, with provisional source caveats.
- Case preparation was disabled until consent. The submitted case was visibly labelled local/mock. The downloaded JSON was checked for consent, human review, mock delivery and the same 3,290 gap.
- City comparison rendered five cities, historical metric/date detail and missing records. Wage sorting changed the order correctly; Gurgaon detail preserved unavailable registration data.
- Patna–Noida plan returned approximately 830 km, explicitly unverified, and composed the wage and arrival essentials correctly.
- Survival guide rendered official documentation links, emergency link and working checklist controls.
- Hindi navigation and a Hindi statement with Devanagari digits populated the form and returned a Hindi verdict.
- Ambiguous cities/amounts left required fields blank rather than guessing.
- At 390 × 844, home and wage-check layout had no document-level horizontal overflow. Mobile menu navigated correctly.
- Read-aloud started its speaking state; stop/cancellation was exercised. Actual speech quality and all installed language voices were not independently assessed.
- Microphone pending and stop controls were tested. No microphone permission was granted; real spoken recognition is not certified by this test session. Typed fallback stayed available.

## External limits

No live Gemini key was supplied. Real model requests were not exercised; mocked model responses test extraction validation and fixed-number phrasing. No NGO delivery exists by design. Supplied wage, cost, distance and historical registration datasets are not claimed to be authenticated current legal information.

The browser's download-event wait timed out, but the actual case file downloaded successfully and its JSON was verified from disk. This was a testing-tool timeout, not a failed case download.

## Final rerun

After restarting the session, localhost sockets initially required renewed network permission. With access restored, all 100 tests and the evaluation passed again, and the production build completed. The production server serves the UI, health endpoint and direct `/check` route at port 3001.

The final production browser check also verified the exact monthly boundary (13,690 shows at-benchmark without an escalation button), above-benchmark pay (20,000), and the real Migration Pulse transition after genuine browser test searches crossed ten. The production tab reported no console errors. A final screenshot is saved in `screenshots/desktop.jpg`.

## Ten-language expansion — 2 October 2026

All 100 automated tests pass. Each requested language has complete 315-key catalog coverage, native-script verdict checks, placeholder validation, native digits, helper/semi-skilled/skilled matching, displayed sample-sentence parsing, daily/monthly periods, unchanged rupee calculations, localized API output and consent enforcement. Missing-rate results were tested in every language and corrected to avoid formatting a null benchmark.

In-app browser checks passed separately for Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Urdu, Kannada, Odia and Malayalam:

- Desktop (1280 × 900): switch language, parse native terms, fill the pay form, calculate the ₹3,290 monthly difference, and verify script/direction.
- Wage outlook, Patna route, city essentials and comparison rendered in every language; functional submit/result controls were exercised for outlook, route and essentials.
- Mobile (390 × 844): home, pay check, outlook, route, city essentials and comparison had no document-level horizontal overflow. A Tamil long-text grid-width defect was found and fixed.
- Language preference survived route reloads. Each language successfully created a local case after explicit consent.
- Each language accepted its own native digits for 400 and returned the same ₹3,290 difference. Urdu displayed right-to-left.
- No browser console errors were reported. Ten mobile home screenshots are retained in `screenshots/languages/`; structured evidence is in `eval/language-browser-results.json`.

Read-aloud playback entered the speaking state in Tamil with an installed matching voice. Speech locale configuration and missing-voice fallback are implemented for every locale, but actual audio quality and microphone recognition in all ten languages were not verified. Translation coverage and working flows are verified; native-speaker linguistic certification is not claimed.

## Malayalam and Odia read-aloud repair — 2 October 2026

The original failure was reproduced: Malayalam displayed a missing-browser-voice message. Both languages now use a bundled eSpeak-NG synthesizer on the local server and return audio/wav through `/api/speech`; no browser voice installation or cloud API key is required. The speech is synthetic and can sound more robotic than installed system voices. Other languages retain browser speech. The player exposes native audio controls and a translated play prompt if autoplay permission is denied.

All **108 tests pass** and the production build passes. Added tests generate real PCM for both languages (welcome and rupee-value verdict), check substantial non-silent audio, validate WAV headers, test API output and no persisted speech files, reject invalid input, exercise concurrent language requests, and verify playback coordination and locale matching.

Browser playback was exercised on welcome, wage outlook, pay verdict and city guide for both languages: the WAV decoded, duration was finite, `paused` was false, and `currentTime` advanced. Welcome Stop tests paused audio, hid the player and released its source. Malayalam welcome also reached natural completion during testing. Switching from Odia to Malayalam stopped/released the prior audio. Tamil browser read-aloud still starts and stops. At 390 × 844, both built-in players played with no document horizontal overflow. No console errors were reported. Evidence is saved in `eval/speech-browser-results.json`, with two speech screenshots alongside the language screenshots.

This verifies generated audio and browser playback. It does not certify pronunciation or microphone recognition quality. Earlier missing-voice limitations in this report apply to the original implementation; Malayalam and Odia now have the built-in playback path described above.

## Neural replacement and matching read-aloud format — 2 October 2026

The user rejected the formant voice pronunciation. The eSpeak dependency and fallback are removed. Malayalam and Odia now prefer installed browser voices through the same path as English/Tamil; absent those voices, local Meta MMS language-specific VITS models provide neural speech. Only the original Listen/Stop button is visible. Speech sentences were revised for clearer narration, money is expanded to native number words, and emergency 112 is read as individual digits.

All 108 automated tests and the production build pass with the new engine. Speech tests validate the actual neural voice identity, 16 kHz PCM, non-silent generated speech, rupee narration, API output, isolation, concurrent language requests and playback coordination.

Browser checks verified neural welcome, wage-result, outlook and city-guide playback in both languages, with finite duration and progressing audio. Listen/Stop works without an extra player; English and Tamil still enter and leave their original browser-speaking state. The final Odia guide reached natural completion. Hidden media inspection produced one locator-tool timeout during the guide check; the same loaded audio was observed progressing and completing. No console errors were reported. Evidence is in `eval/neural-speech-browser-results.json`.

These are neural voices rather than the earlier robotic synthesizer. Playback and text normalization are verified; native-speaker pronunciation review remains subjective. The model cards and non-commercial license are recorded in `licenses/README.md`. The source archive excludes model weights and the Python environment; `npm run setup:speech` installs them.

## Voice of Wagers wording update — 2 October 2026

All 108 automated tests, the production build and the existing evaluation pass. All 77 desktop page/language combinations were checked at 1280 × 900, including navigation and page headings: no broken pages, old brand, technical English in primary page text or document overflow were found. Malayalam Fair Pay was also inspected at 390 × 844. The broader mobile batch hit the browser-tool timeout, so it is not recorded as a completed mobile check. Existing catalog tests exercise native digits, typed extraction, deterministic localized wage results and consent in all ten Indian languages; neural PCM tests pass for Malayalam and Odia. The optional AI test fixture was updated for the new narration, preserving the unchanged server validation.

SHA-256 comparisons confirm every source dataset, server API implementation and wage/score calculation file is unchanged. Evidence: `eval/worker-copy-integrity.json` and `eval/worker-copy-browser-results.json`. All catalog entries were manually rewritten, including malformed Odia names and phrases, script-local names, source explanations and cost warnings. This is not an independent native-speaker certification.

## Final visual polish — 2 October 2026

Added gentle hero breathing and blinking, greeting entrance, warm glow, button/card/table feedback, 600 ms decorative money count-up, result entrance, fair-pay celebration stars, a single gold attention pulse, loading skeletons, muted header mosaic, heading accents and experimental score bars. Missing records remain dashed with the existing labels. The score stays inside its existing explanatory disclosure. A Tamil heading overflow found on phones was corrected with word wrapping.

All six stages separately passed 108 automated tests and `python3 eval/run_eval_v2.py`. Stage six was repeated after the Tamil wrapping correction. The final production build passed. SHA-256 checks confirm all 22 protected source/data/server/API/dependency files are byte-identical, including every translation catalog. No dependency was added. Existing action labels and heading wording were retained under the scope lock. This folder has no Git repository, so section commits could not be created.

Final browser layout verification covered 154 combinations: all seven pages in English and all ten Indian languages at 1280 × 900 and 390 × 844, with populated headings and no document overflow. Prediction settled to ₹13,690.00, above-benchmark Fair Pay displayed ₹15,600.00 and celebration stars, and underpaid Fair Pay displayed ₹10,400.00 with a ₹3,290.00 gap and the gold pulse. Planner and arrival-guide submissions also produced their existing results, and the checklist remained interactive.

Reduced motion: 11 isolated hook checks verify exact final amounts, immediate values when the preference is active, and cancellation when the preference changes during animation. Browser-rendered CSS fixture checks activate the exact reduced-motion declarations through an always-matching test media query; all sampled animations and transitions become none/0s. This is not system-preference emulation: the available browser control does not expose it. Evidence is in `eval/polish-motion-checks.json`, `eval/polish-reduced-css-check.json`, `eval/polish-browser-checks.json` and `eval/polish-stage-checks.json`.

## Light theme and six-city maps — 2 October 2026

All 149 automated tests pass, including 36 start/destination combinations, supported place aliases, rejection of unknown places, same-city routes, malformed/offline provider handling, caching, shared concurrent requests and expanded API validation. The existing data evaluation and production build pass. Wage calculation, parser, speech engine/playback and all original wage/cost/welfare/guide/distance datasets are unchanged by SHA-256 comparison (`eval/light-data-integrity.json`). The new map labels and zoom controls are translated in all eleven languages.

Browser checks verified 154 page/language/layout combinations at 1280 × 900 and 390 × 844: all pages have an illustration and light theme, valid headings and no document overflow. Fifteen selection checks confirm matching image files/captions for each of the five supplied cities across My Wage, Fair Pay and Arrival. All six starting cities were exercised with live road-route requests to Delhi (Delhi to Delhi is the zero-distance case). A live Noida–Delhi route loaded map tiles, drew the road geometry and displayed 27.7 km; zoom worked. Distances are provider results for approximate city centres and may change.

A browser fixture failed the first routing request and verified the unavailable-distance/dotted-line warning and Try again recovery using the live provider. No console errors were observed in the route interaction check. Evidence: `eval/light-layout-checks.json`, `eval/light-image-match-checks.json`, `eval/light-map-live-checks.json`, `eval/light-map-recovery-check.json`. The latest test/build/evaluation logs are also included. This update supersedes older descriptions of a fixed Patna origin, external route links and dark theme.


## Dashboard, backgrounds and saved road routes — 2 October 2026

All 152 automated tests pass, the wage-data evaluation passes, and the production build succeeds. New tests verify the complete 30-route snapshot, metre-to-kilometre conversion, matching endpoint coordinates, all 36 combinations including same-city zero, and second-provider recovery. All 36 pairs were also exercised in the browser with a finite kilometre display. Local route API timings were at most 31 ms in the recorded check; this is a local measurement, not a production latency guarantee.

Browser layout checks covered 231 combinations: seven pages, eleven languages and 1366 × 768, 1280 × 900 and 390 × 844 viewports. Headings rendered, backgrounds were present and there was no horizontal document overflow. Main actions fit on the tested 1366 × 768 desktop at normal zoom; long results and opened optional sections can scroll. The populated Chennai arrival contacts and checklist also fit after spacing changes. Final dashboard and route screenshots show the normal-zoom desktop layout. Typed voice-entry parsing filled Noida/helper/₹400/day, and Fair Pay returned ₹10,400 monthly pay and a ₹3,290 difference. Speech logic remains unchanged; earlier audio-quality limitations still apply.

Evidence: `eval/dashboard-layout-checks.json`, `eval/dashboard-city-pair-checks.json`, `eval/dashboard-route-timings.json`, `eval/dashboard-data-integrity.json`, and dashboard test/build/evaluation logs. This update supersedes earlier descriptions of boxed heading pictures and dependence on a successful live routing request. Saved routes have no live traffic; the map is not a Google Maps service.


## Consistent fonts and balanced screen workspaces — 2 October 2026

All pages now use the dashboard's DM Sans headings and rounded pastel glass cards. Compact page titles sit beside their description, with balanced full-height form/result columns on desktop. Journey income and source information are below the form; arrival contacts are directly below the map. Wage outlook guidance is below its inputs. Fair Pay uses two-column input rows and splits the explanation, numbers and source information across both panels. City comparison and selected-city information sit beside each other. Main desktop workspaces stay within the viewport. Expanded source notes and long language text scroll inside the relevant panel; phones use natural page scrolling instead of shrinking text or hiding information.

All 152 automated tests and the wage evaluation pass; the final production build passes. The completed 231-case browser pass covered populated screens for all seven pages in all eleven languages at 1366 × 768, 1280 × 900 and 390 × 844. No horizontal overflow was found, and desktop documents fit their viewports. Evidence is in `eval/screen-fit-checks.json`. Final Fair Pay spacing was subsequently checked in English at 1366 × 768 with both panels requiring no scrolling, and rechecked across both desktop sizes in all eleven languages. The follow-up phone batch reached Kannada before browser navigation/control timed out; its last Odia/Malayalam rechecks were not completed. The earlier complete phone pass includes both languages. The final screenshot refresh was also interrupted by that browser-control failure; the route preview records the completed design before the last input-spacing refinement. This limitation concerns browser verification, not the passing build/test results.

A missing Delhi skill-category rate was exercised after the redesign: it displays missing information without substituting another work category, with a single source disclosure. An expanded journey source panel was checked: the page stayed 768 pixels high while the longer source text scrolled within the left panel. Source datasets, parser, wage math and speech behavior remain unchanged.


## City cards and researched worker records — 2 October 2026

The Cities table is replaced by five pastel cards with pay, separate rent/food amounts, savings and a Details button. Chennai details open by default; sorting by cost or savings and next-step links are functional. The selected city supplies the page background. Experimental worker-count scoring is not shown in this worker-facing chooser.

Chennai now includes Tamil Nadu's 26,56,663 cumulative construction-board registrations from Table 3, printed page 46 (PDF page 49), in the official Labour Welfare and Skill Development Policy Note 2025–26: https://labour.tn.gov.in/pdf/policy_note_lwsd_e_pn_2025_26.pdf#page=49 . Gurgaon includes Haryana's 43,903 new online construction-worker registrations during FY 2025–26 up to 31 December 2025, section 8.60, printed page 177 (PDF page 184), from the official Economic Survey: https://cdnbbsr.s3waas.gov.in/s32b0f658cbffd284984fb11d90254081f/uploads/2026/04/2026041756492302.pdf#page=184 . Haryana's separate 2,213 offline-to-online transfers are not added to this count.

These are state-wide records with different definitions and periods, not city-specific or current active membership. The UI labels their state coverage and metric. The independently researched records live in `data/worker_records.json` and are exposed as `worker_record` in city responses. The original wage/cost/welfare datasets and legacy experimental calculations remain unchanged; new registration figures do not feed safety or employer ratings. Other original government records retain their historical status.

All 155 automated tests pass, including three new tests for metric/scope/source provenance, separate cumulative versus period registrations and unchanged original math. The evaluation and final production build pass. The live API returned both new figures. Sixty-six browser checks exercised both city records in eleven languages at 1366 × 768, 1280 × 900 and 390 × 844. There were five cards and no table, no horizontal overflow, and no desktop page overflow. After the final spacing correction the desktop detail panels and all three action links fit; phone layouts scroll naturally. Cost/savings sort orders were verified. Evidence: `eval/city-cards-browser-checks.json`, `eval/city-records-api-check.json`, and city-card test/build/evaluation logs. The completed screenshot refresh supersedes the browser timeout reported in the previous layout update.


## Selected-city panel redesign

155 automated tests pass and the production build succeeds. `eval/city-detail-redesign-checks.json` records 66 Chennai/Gurgaon checks across all eleven languages at 1366×768, 1280×900 and 390×844: no horizontal overflow or desktop detail-panel clipping. Tamil source/worker-record disclosures opened and closed correctly; the journey tile navigated to `/route?city=Chennai`. Primary actions precede compact source disclosures; expanded information can scroll naturally. Screenshot: `screenshots/city-details.png`.
