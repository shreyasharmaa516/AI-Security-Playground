# Sentra

**AI Prompt Security Platform** — analyzes prompts before they reach an LLM and flags security risks in real time.

Sentra is not a chatbot. It's a security console for teams running LLM applications in production: paste or route a prompt through it and it screens for prompt injection, jailbreak attempts, sensitive information disclosure, role manipulation, and unsafe instructions before that prompt ever reaches a model.

This repository contains the frontend — a production-styled React/Vite application built to feel like an enterprise security console (in the spirit of Linear, Vercel, Stripe Dashboard, and CrowdStrike Falcon) rather than an "AI app." The detection logic currently runs on a mocked API layer shaped to match a future FastAPI backend; see [Future Improvements](#future-improvements).

---

## Table of Contents

- [Overview](#sentra)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Screenshots](#screenshots)
- [Folder Structure](#folder-structure)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Features

**Dashboard** — security score, critical threat count, detection timeline, threat distribution, recent analyses, security insights, and quick actions.

**Analysis** — a live prompt scanner with a monospace prompt editor, context selector (System Prompt / User Input / Agent Tool Output), a sequential engine-by-engine detection panel, and a result summary with export / add-to-report / re-run actions.

**History** — a searchable, filterable, sortable, paginated event log of every past analysis, with a detail drawer reusing the same detection breakdown and result summary components from Analysis.

**Reports** — executive-facing security summaries: risk posture grade, risk trend over time, threat breakdown, top risk sources, and a report generation flow with status tracking (generating / ready / failed).

**Settings** — profile, appearance (theme), notification preferences, security (API key management, two-factor, session timeout, active sessions), and application info.

Every page ships with proper **loading, empty, and error states** — no page silently shows fake data or a blank screen.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite |
| Routing | React Router |
| Styling | Plain CSS with CSS custom properties (no Tailwind, no CSS-in-JS) |
| Icons | Lucide React |
| Charts | Chart.js via react-chartjs-2 |
| Linting | oxlint |

No UI framework or component library is used — every interactive element (buttons, tables, modals, drawers, dropdowns) is a hand-built component under `src/components/ui`, styled entirely from the design tokens in `src/styles/tokens.css`.

---

## Architecture

The codebase follows a **feature-based architecture**:

- **`src/components/`** — shared, reusable building blocks with no domain knowledge of any single page. Split into `layout/` (the app shell: sidebar, top bar, command palette) and `ui/` (Button, Card, Table, Modal, Drawer, Badge, etc.). A component only lives here if more than one feature uses it, or is clearly designed to be reused.
- **`src/features/`** — one folder per product area (`analysis`, `dashboard`, `history`, `reports`, `settings`). Each feature owns its own page component, its own sub-components, and its own `api.js` — the mock data layer shaped to match its future backend endpoint.
- **`src/pages/`** — thin route-level wrappers. Each one does nothing but render its matching feature's page component, keeping `App.jsx`'s route table decoupled from feature internals.
- **`src/constants/`** and **`src/utils/`** — small, dependency-free values and helpers shared across features (e.g. the detection category list, relative-time formatting).
- **`src/styles/`** — design tokens (`tokens.css`), the global reset (`global.css`), and typography utility classes (`typography.css`). Every color, spacing value, radius, and font size used anywhere in the app traces back to a variable defined here.

**The mock API pattern:** every feature's `api.js` is written to mirror the exact shape and call signature its real FastAPI endpoint will eventually have (e.g. `POST /api/v1/analyze`, `GET /api/v1/analyses`, `GET /api/v1/reports/overview`). This means swapping mock data for real network calls later is a change confined entirely to `api.js` files — no component should need to change.

---

## Installation

**Requirements:** Node.js 18+ and npm.

```bash
# Clone the repository
git clone https://github.com/<your-org>/sentra.git
cd sentra

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Other commands

```bash
npm run build     # Production build to /dist
npm run preview   # Preview the production build locally
npm run lint      # Run oxlint across the project
```

---

## Screenshots

> Add screenshots or a short screen recording of the Dashboard, Analysis, History, and Reports pages here before publishing. Suggested path: `docs/screenshots/`.

| Dashboard | Analysis |
|---|---|
| _add screenshot_ | _add screenshot_ |

| History | Reports |
|---|---|
| _add screenshot_ | _add screenshot_ |

---

## Folder Structure

```
sentra/
├── index.html
├── package.json
├── vite.config.js
├── .oxlintrc.json
├── public/
└── src/
    ├── main.jsx                     # Entry point, imports global styles
    ├── App.jsx                      # Route table
    │
    ├── styles/
    │   ├── tokens.css               # Design tokens (colors, spacing, type scale)
    │   ├── global.css               # Reset + base element styles
    │   └── typography.css           # Type scale utility classes
    │
    ├── constants/
    │   └── detection.js             # Shared detection category / context contract
    │
    ├── utils/
    │   ├── getCssVar.js             # Resolves CSS variables for Chart.js (canvas can't read them)
    │   └── formatRelativeTime.js    # "2m ago" style timestamp formatting
    │
    ├── components/
    │   ├── layout/                  # App shell: Sidebar, TopBar, AppShell, CommandPalette
    │   └── ui/                      # Shared design-system components (Button, Card, Table,
    │                                 # Modal, Drawer, Badge, Input, Switch, etc.)
    │
    ├── features/
    │   ├── analysis/                # Live prompt scanning
    │   ├── dashboard/                # Security overview
    │   ├── history/                  # Past analysis log
    │   ├── reports/                  # Executive reporting
    │   └── settings/                 # Profile, appearance, notifications, security, about
    │       ├── api.js               # Mock data layer, shaped for the future backend
    │       ├── XPage.jsx            # Feature composition root
    │       └── components/          # Feature-only components (not shared elsewhere)
    │
    └── pages/                       # Thin route-level wrappers around each feature's page
```

---

## Future Improvements

- **Backend integration** — replace each feature's `api.js` mock implementation with real `fetch`/API calls. The function signatures and return shapes are already documented in code comments to match the intended FastAPI contract.
- **Authentication** — no auth flow currently exists; Settings assumes a single logged-in user.
- **Real PDF export** — Reports' "Download PDF" and Analysis/History's "Export" actions currently download JSON as a placeholder; wire these to a real PDF rendering service once the backend exists.
- **Light theme** — the Appearance tab already reflects that Light mode is planned but not yet implemented, rather than faking a toggle that does nothing.
- **WebSocket / SSE streaming** — Analysis's engine-by-engine scan animation is designed to map directly onto a streaming backend response instead of the current simulated delay.
- **Automated tests** — no test suite exists yet; component-level and integration tests would be a natural next step.

---

## License

This project is provided as-is for demonstration and portfolio purposes. Add a license (e.g. MIT) before public distribution if you intend for others to reuse the code.
