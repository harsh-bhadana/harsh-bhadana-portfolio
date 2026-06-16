# Harsh Bhadana Portfolio

An interactive, production-grade Next.js developer portfolio highlighting real-time simulators, telemetry components, cryptographic verification widgets, and live integrations.

---

## 🚀 Key Features

- **Cryptographic Bidding Simulator**: Live SHA-256 payload integrity validation using Web Crypto APIs.
- **GitHub Pulse Calendar**: Live integration with the GitHub API to render real-time user contributions and activity feeds.
- **Security Sandbox Simulator**: Visual CSP violation telemetry tracker demonstrating frontend security principles.
- **Shipment Route Visualizer**: Dynamic multi-stage transit tracker utilizing SVG routes.

---

## 🛠️ Tech Stack

- **Core**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, PostCSS
- **Animations**: Framer Motion
- **Testing**: Vitest, React Testing Library, JSDOM
- **Quality**: ESLint, Prettier, Husky, lint-staged
- **CI/CD**: GitHub Actions

---

## 📦 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Scripts

Execute development and validation tasks locally:

```bash
# Run the local development server on http://localhost:3000
npm run dev

# Run ESLint validation
npm run lint

# Format code files using Prettier
npm run format

# Verify code files formatting without rewriting
npm run format:check

# Run unit tests via Vitest
npm run test

# Run Vitest in watch mode
npm run test:watch

# Compile Next.js production build
npm run build
```

---

## ⚙️ Engineering Guardrails

- **Git Hooks**: Pre-commit hooks run ESLint and Prettier automatically on all staged changes using `husky` and `lint-staged`.
- **CI Pipeline**: Every push or Pull Request to the `master` branch runs automated formatting checks, linting, tests, and builds in GitHub Actions.
- **Error Boundaries**: Component-level error catch bounds are isolated via `<ErrorBoundary />`, and app crashes are captured by `src/app/error.tsx`.

For a deeper dive into the folder structure and architectural design, see [ARCHITECTURE.md](docs/ARCHITECTURE.md).
