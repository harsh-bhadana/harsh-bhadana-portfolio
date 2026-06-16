# Repository Architecture & Technical Design

This document details the architectural decisions, design patterns, and engineering guardrails implemented in the Harsh Bhadana Portfolio application.

---

## 1. Technology Stack & Rationale

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
  - _Why_: Provides file-based routing, server components for optimal initial load, built-in asset optimization, and out-of-the-box support for strict TypeScript compilation.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
  - _Why_: Configured via PostCSS for an HSL-tailored dark color palette and premium modern aesthetics, utilizing CSS variables for theme management.
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
  - _Why_: Enforces fluid transitions, page enter/exit animations, and premium micro-interactions.
- **Data Visualization**: [Recharts](https://recharts.org/)
  - _Why_: Simplifies svg-based interactive telemetry graphing in the simulators.

---

## 2. Directory Layout & Structure

The repository uses a single-page Next.js App Router structure with localized interactive modules:

```text
├── .github/workflows/    # CI/CD pipelines (GitHub Actions)
├── .husky/               # Git pre-commit hooks
├── docs/                 # Engineering & architecture docs
├── src/
│   ├── app/              # Routing, layout, global styles, and page-level errors
│   │   ├── layout.tsx    # Root layout & meta tags
│   │   ├── page.tsx      # Main application page container
│   │   └── error.tsx     # Global page-level crash recovery fallback
│   ├── components/       # Presentation & interactive simulators
│   │   ├── __tests__/    # Vitest unit test suites
│   │   ├── ErrorBoundary # React Class Component for isolated component crashes
│   │   ├── GithubPulse   # Live GitHub event sync + contributions chart
│   │   └── ...           # Telemetry, Bidding, and Security sandboxes
│   └── test/             # Vitest globals setup configuration
```

---

## 3. Interactive Simulation Components

Each component showcases realistic software engineering scenarios under a cohesive dashboard UI:

1. **Bidding Simulator (`BiddingSimulator.tsx`)**:
   - Simulates bid payload signing and verifies payload integrity using client-side SHA-256 hash generation (`crypto.subtle.digest`).
2. **GitHub Pulse (`GithubPulse.tsx`)**:
   - Connects directly to the public GitHub API to fetch live event streams, falling back gracefully to sandbox seed data on failure.
3. **Security Sandbox (`SecuritySandbox.tsx`)**:
   - Visualizes CSP violations, security telemetry events, and malicious payload simulation.
4. **Shipment Tracker (`ShipmentTracker.tsx`)**:
   - Renders a multi-node transit tracker using dynamic SVG path connections.

---

## 4. Engineering Guardrails

To maintain high code quality and prevent regressions, a multi-layer guardrail system is enforced:

### Static Analysis

- **TypeScript**: Enforced in `"strict": true` compilation mode in `tsconfig.json`.
- **ESLint**: Standard rulesets extended with `eslint-config-prettier` to override formatting rules that conflict with Prettier.

### Formatting

- **Prettier**: Centrally configured via `.prettierrc` to enforce trailing commas, single-quotes, and standard print widths.

### Git Hook Pre-Commit Checks

- Configured via **Husky** and **lint-staged**. Every commit automatically runs Prettier and ESLint autofix only on staged files. The commit is rejected if errors remain.

### Automated Testing

- Powered by **Vitest** and **React Testing Library** for fast, local JSDOM rendering and unit testing.

### CI/CD Pipeline

- **GitHub Actions** (`ci.yml`) runs on every push/PR to the `master` branch, verifying:
  - Code formatting checks (`npm run format:check`)
  - Linting validations (`npm run lint`)
  - Unit tests (`npm run test`)
  - Clean Next.js compiler production builds (`npm run build`)
