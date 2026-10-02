<div align="center">

<img src="./assets/hero-banner.svg" width="100%" alt="Voice of Wagers: Your work. Your worth. Your next step."/>

<img src="./assets/divider.svg" width="100%" height="4"/>

<p align="center">
  <img src="https://img.shields.io/github/stars/SURYATSG786/Voice-of-Wagers?color=FFD60A&style=for-the-badge&logo=star&logoColor=white&labelColor=0d1117" alt="stars"/>
  <img src="https://img.shields.io/github/forks/SURYATSG786/Voice-of-Wagers?color=00F5D4&style=for-the-badge&logo=git&logoColor=white&labelColor=0d1117" alt="forks"/>
  <img src="https://img.shields.io/github/last-commit/SURYATSG786/Voice-of-Wagers?color=9B5DE5&style=for-the-badge&logo=github&logoColor=white&labelColor=0d1117" alt="last commit"/>
  <img src="https://img.shields.io/badge/Tests-167%20Passing-FFD60A?style=for-the-badge&logo=checkmarx&logoColor=white&labelColor=0d1117" alt="tests"/>
  <img src="https://img.shields.io/badge/Languages-11-00F5D4?style=for-the-badge&logo=googletranslate&logoColor=white&labelColor=0d1117" alt="languages"/>
</p>
<p align="center">
  <img src="https://komarev.com/ghpvc/?username=SURYATSG786-Voice-of-Wagers&style=for-the-badge&color=9B5DE5&labelColor=0d1117&label=VIEWING%20THIS" alt="live views"/>
</p>

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=18&duration=2200&pause=400&color=FFD60A&center=true&vCenter=true&width=820&lines=%24+npm+run+build;%E2%9C%93+React+19+client+built+with+Vite+7;%24+npm+start;%E2%9C%93+Express+API+live+on+127.0.0.1%3A3001;%E2%9C%93+11+languages+loaded+%7C+Urdu+RTL+ready;%E2%9C%93+Noida+Helper+Rs+300%2Fday+%E2%86%92+Rs+5%2C890+below+benchmark" alt="terminal session" />

</div>

<img src="./assets/divider.svg" width="100%" height="4"/>

<img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&size=22&duration=4000&pause=1500&color=00F5D4&center=true&vCenter=true&multiline=true&width=800&height=70&lines=Check+pay.+Compare+cities.;Plan+travel.+Settle+in." alt="tagline" />

<p align="center">
  <img src="https://img.shields.io/badge/Focus-Migrant%20Workers-FFD60A?style=for-the-badge&logo=hackthebox&logoColor=white&labelColor=0d1117" alt="focus"/>
  <img src="https://img.shields.io/badge/Input-Voice%20%2B%20Typing-00F5D4?style=for-the-badge&logo=googleassistant&logoColor=white&labelColor=0d1117" alt="input"/>
  <img src="https://img.shields.io/badge/Core%20Demo-No%20API%20Key-9B5DE5?style=for-the-badge&logo=github&logoColor=white&labelColor=0d1117" alt="no key"/>
</p>

<img src="./assets/divider.svg" width="100%" height="4"/>

<div align="center">
<img src="./screenshots/arrival-tabs.png" width="90%" alt="Voice of Wagers arrival guide"/>
<br/>
<sub>Arrival offers four sections: Help, Stay, Documents and Local words. City illustrations follow the chosen destination.</sub>
</div>

<img src="./assets/divider.svg" width="100%" height="4"/>

## Our Vision

> Voice of Wagers is a multilingual companion that helps migrant construction workers understand their pay, compare cities and find support after they arrive. Moving for work should not mean making decisions in the dark: wage information, living-cost estimates, road planning and official support come together in one simple, voice-enabled experience.

<table>
<tr>
<td width="50%" align="center">

### Before Voice of Wagers
```yaml
Pay Benchmarks:    scattered across websites
Language:          unfamiliar, hard to follow
Rent / Food Costs: guesswork
Travel Planning:   separate tools
Help on Arrival:   "who do I ask?"
```

</td>
<td width="50%" align="center">

### After Voice of Wagers
```yaml
Pay Benchmarks:    sourced, beside the numbers
Language:          11 languages + read-aloud
Rent / Food Costs: clear city cards + savings
Travel Planning:   in-app road map + km
Help on Arrival:   Help, Stay, Documents, Words
```

</td>
</tr>
</table>

<img src="./assets/divider.svg" width="100%" height="4"/>

## The Worker Journey

```mermaid
graph LR
    A[Check Pay] --> B[Compare Cities]
    B --> C[Plan Travel]
    C --> D[Settle In]
    D --> E[Prepare Help Note]

    style A fill:#FFD60A,stroke:#fff,stroke-width:2px,color:#000
    style B fill:#00D4AA,stroke:#fff,stroke-width:2px
    style C fill:#3B82F6,stroke:#fff,stroke-width:2px
    style D fill:#8B5CF6,stroke:#fff,stroke-width:2px
    style E fill:#FF6B6B,stroke:#fff,stroke-width:2px
```

<img src="./assets/divider.svg" width="100%" height="4"/>

## Live Architecture

```mermaid
graph TD
    A[React 19 Interface] --> B[Express 5 API]
    B --> C[Shared Calculation Modules]
    C --> D[(Local JSON: wage + cost data)]
    B --> E[Route Data: saved OSRM routes]
    E --> F[Leaflet Map + OpenStreetMap]
    A --> G[Browser Speech APIs]
    B --> H[Local Neural Speech: Malayalam + Odia]
    B -.->|optional| I[Gemini: input extraction and English phrasing]
    A --> J[docx: Word note in browser]
    B --> K[(Consented cases: local runtime storage)]

    style B fill:#00D4AA,stroke:#fff,stroke-width:2px
    style C fill:#FFD60A,stroke:#fff,stroke-width:2px,color:#000
    style I fill:#8B5CF6,stroke:#fff,stroke-width:2px
    style A fill:#3B82F6,stroke:#fff,stroke-width:2px
```

> The core demo runs without an AI key. Gemini is optional and cannot replace the wage calculations or their source data.

<img src="./assets/divider.svg" width="100%" height="4"/>

## Tech Stack

<table align="center">
<tr>
<td width="33%" align="center">

**Interface & Maps**

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=0d1117"/>
<img src="https://img.shields.io/badge/Vite-FFD62E?style=for-the-badge&logo=vite&logoColor=646CFF&labelColor=0d1117"/>
<br/>
<img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white&labelColor=0d1117"/>
<img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=0d1117"/>
<br/>
<img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white&labelColor=0d1117"/>
<img src="https://img.shields.io/badge/OpenStreetMap-7EBC6F?style=for-the-badge&logo=openstreetmap&logoColor=white&labelColor=0d1117"/>

</td>
<td width="33%" align="center">

**Backend & Documents**

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=0d1117"/>
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white&labelColor=0d1117"/>
<br/>
<img src="https://img.shields.io/badge/docx%20(Word)-2B579A?style=for-the-badge&logo=microsoftword&logoColor=white&labelColor=0d1117"/>
<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white&labelColor=0d1117"/>

</td>
<td width="33%" align="center">

**Speech & Optional AI**

<img src="https://img.shields.io/badge/Web%20Speech%20API-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white&labelColor=0d1117"/>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white&labelColor=0d1117"/>
<br/>
<img src="https://img.shields.io/badge/Gemini%20(optional)-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white&labelColor=0d1117"/>

</td>
</tr>
</table>

<img src="./assets/divider.svg" width="100%" height="4"/>

## Core Capabilities

<table>
<tr>
<td width="33%" valign="top">

### My Wage
* Supplied **wage benchmark** by city and work type
* Source and **checking advice** shown beside the number

### Cities
* Compare **pay, shared rent, food and savings**
* Clear city cards with focused detail panels

</td>
<td width="33%" valign="top">

### My Route
* Choose start and destination from **6 cities**
* **Road map and kilometres** inside the app

### Arrival
* Four tabs: **Help, Stay, Documents, Local words**
* First-day checklist kept close at hand

</td>
<td width="33%" valign="top">

### Fair Pay
* Enter **daily, weekly or monthly** pay
* Transparent comparison with the supplied benchmark

### Get Help
* With **consent**, prepare a local pay note
* Download a readable **Word document** in the chosen language

</td>
</tr>
</table>

<img src="./assets/divider.svg" width="100%" height="4"/>

## Designed For People First

<table align="center">
<tr>
<th>Feature</th>
<th>Details</th>
<th>Result</th>
</tr>
<tr>
<td><strong>11 Languages</strong></td>
<td>English, Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Urdu, Kannada, Odia, Malayalam</td>
<td>Workers read in their own language</td>
</tr>
<tr>
<td><strong>Right-to-Left</strong></td>
<td>Urdu uses a right-to-left layout</td>
<td>Natural reading direction</td>
</tr>
<tr>
<td><strong>Read-Aloud</strong></td>
<td>Prefers a matching browser voice; local neural fallback for Malayalam and Odia</td>
<td>Usable without strong reading skills</td>
</tr>
<tr>
<td><strong>Voice Input</strong></td>
<td>Depends on browser, device and mic permission; typing always works</td>
<td>Never blocked</td>
</tr>
<tr>
<td><strong>Interface</strong></td>
<td>Light glass UI, clear yellow action buttons, destination illustrations, responsive layouts</td>
<td>Easy to recognise each step</td>
</tr>
</table>

<img src="./assets/divider.svg" width="100%" height="4"/>

## City Coverage

| Feature | Patna | Noida | Chennai | Delhi | Gurgaon | Mumbai |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Route planning | Yes | Yes | Yes | Yes | Yes | Yes |
| Wage information | No | Yes | Yes | Yes | Yes | Yes |
| Arrival information | No | Yes | Yes | Yes | Yes | Yes |

> Patna is included for travel planning only. The app does not invent missing wage or arrival information.

<img src="./assets/divider.svg" width="100%" height="4"/>

## Setup & Installation

**Prerequisites:** Node.js 22+, npm and Git. Python 3.9 to 3.12 is needed only for local neural speech and the evaluation runner. Internet is needed for dependency/model downloads and map tiles.

```bash
# 1. Clone and install
git clone https://github.com/SURYATSG786/Voice-of-Wagers.git
cd Voice-of-Wagers
npm ci

# 2. Build and run
npm run build
npm start
```

Open **http://127.0.0.1:3001** for the landing page. Choose **Start with Saathi** to reach the dashboard at `/home`. No API key is required for the core demo.

<details>
<summary><strong>Optional: local speech for Malayalam and Odia</strong></summary>

```bash
npm run setup:speech
```

Creates an isolated Python environment and downloads pinned model files (about 1 GB). Models are excluded from Git. Review `licenses/README.md` before commercial use. Restart the app after setup if it was already running.

</details>

<details>
<summary><strong>Development mode</strong></summary>

```bash
npm run dev
```

Open **http://127.0.0.1:5173**. Starts Vite and the Express API together.

</details>

<details>
<summary><strong>Configuration and troubleshooting</strong></summary>

| Issue | Fix |
|---|---|
| Port 3001 busy | `PORT=3002 npm start` (or set `PORT` in a local `.env`) |
| Want Gemini | Copy `.env.example` to `.env` and set your own `GEMINI_API_KEY`. Keep it on the server and out of Git |
| Speech recognition unavailable | Type the same details instead |
| Map not loading | Check your internet connection (OpenStreetMap tiles) |

</details>

<img src="./assets/divider.svg" width="100%" height="4"/>

## Two-Minute Demo For Judges

| Step | Action |
|---|---|
| 1 | **Explore:** choose a language on Home, compare city cards and open their sources |
| 2 | **Travel:** plan Patna to Chennai, show the road map and kilometres, then explore the Arrival tabs |
| 3 | **Check pay:** choose Noida, Helper and Rs 300 per day. Result: **Rs 7,800 a month vs Rs 13,690, a difference of Rs 5,890** |
| 4 | **Get a copy:** choose Ask for Help, give consent and download the Word note. Nothing is sent to an organisation; a person must review it |

<img src="./assets/divider.svg" width="100%" height="4"/>

## Verification

```bash
npm run setup:speech   # needed for the full speech tests
npm test
npm run eval
npm run build
```

<p align="center">
  <img src="https://img.shields.io/badge/Automated%20Tests-167%20Passed-00F5D4?style=for-the-badge&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/Production%20Build-Passed-FFD60A?style=for-the-badge&labelColor=0d1117"/>
  <img src="https://img.shields.io/badge/Word%20Export-11%20Languages-9B5DE5?style=for-the-badge&labelColor=0d1117"/>
</p>

Tests cover calculations, APIs, routes, languages and Word content in all eleven languages. GitHub Actions repeats tests, evaluation and build. See [`TESTING.md`](./TESTING.md) for evidence and known limits, including desktop/phone checks and visual review of the English Word export.

<img src="./assets/divider.svg" width="100%" height="4"/>

## Repository Structure

```text
client/       React interface and assets
server/       Express API and local speech service
lib/          Calculations, parsing, routes and Word exports
data/         Translations, wage/cost data and saved routes
eval/         Tests, evaluation and verification reports
scripts/      Local speech setup
licenses/     Speech model attribution and terms
screenshots/  Interface previews
docs/         Project context
TESTING.md    Verification evidence and known limits
```

<img src="./assets/divider.svg" width="100%" height="4"/>

## Q&A

<details>
<summary><strong>Click to expand</strong></summary>

**Q1: Are the wage numbers legally binding?**
> No. Wage figures are supplied benchmarks that require confirmation with the labour office. They are not legal rulings or job offers.

**Q2: Does it need an AI key to work?**
> No. The core demo is deterministic and runs without a key. Optional server-side Gemini only helps with input extraction and limited English phrasing; it cannot replace the calculations or source data.

**Q3: What happens to a worker's consented help note?**
> It is saved locally in ignored runtime storage, and the Word copy is generated in the browser on request. Nothing is sent to an NGO or government body; a person must review it.

**Q4: What if voice input or read-aloud is unavailable?**
> Users can always type. Read-aloud prefers a matching browser voice, with a local neural fallback for Malayalam and Odia once the models are installed.

</details>

<img src="./assets/divider.svg" width="100%" height="4"/>

## Responsible Scope

* Wage figures need confirmation with the labour office; they are not legal rulings or job offers.
* Living costs and savings are **estimates**. Routes join approximate city centres and give **no live traffic or train/bus schedules**.
* State-wide worker records are not city counts or employer safety ratings.
* No NGO or government submission is connected. Searches and consented cases stay in ignored local runtime storage.
* Optional Gemini may send entered text to an external service. Keep personal details out of free text when it is enabled.
* Translation and pronunciation quality have **not** been certified by native-language reviewers.
* Public hosting and real case review require further setup.

<img src="./assets/divider.svg" width="100%" height="4"/>

## Roadmap

1. **Native-language review** of translations and pronunciation
2. **Regularly verified wage notifications** from official sources
3. **Secure deployment** for public hosting
4. **Consent-based partnerships** for real human support

<img src="./assets/divider.svg" width="100%" height="4"/>

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&size=16&duration=3000&pause=1000&color=FFD60A&center=true&vCenter=true&width=700&lines=Status%3A+Working+Demo%2C+Open+to+Collaboration;From+the+first+pay+question+to+the+first+day+in+a+new+city;Star+this+repo+if+Voice+of+Wagers+made+a+decision+clearer" alt="status" />

<sub>Repo: <a href="https://github.com/SURYATSG786/Voice-of-Wagers">SURYATSG786/Voice-of-Wagers</a></sub>

</div>
