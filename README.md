# PulseAgent — The Observability Standard for Autonomous LLM Agent Pipelines

> "You wouldn't ship a backend with no logs. Why is your agent a black box?"

PulseAgent is an engineering-grade observability platform designed specifically for multi-step LLM agent pipelines, multi-agent frameworks (LangGraph, CrewAI, AutoGen, LlamaIndex), and autonomous tool loops.

---

## Live Demo & Repository
- **Live Deployed URL**: [https://acdyon-project-sooty.vercel.app/](https://acdyon-project-sooty.vercel.app/)
- **Repository**: [https://github.com/Mokshasoham/Acdyon-project](https://github.com/Mokshasoham/Acdyon-project)
- **Engineering Decisions**: See [`DECISIONS.md`](./DECISIONS.md)

---

## Key Features Built
1. **Interactive Trace Inspector**:
   - Live step timeline (`Retrieve -> Reason -> Tool Call -> Fallback -> Respond`)
   - Real-time diagnostic overlays capturing HTTP 429 rate limits, Cloudflare bot challenges, and schema mismatches
   - Latency waterfalls (LLM Inference vs API Network I/O vs SDK Overhead)
   - Token cost attribution per prompt and model
   - Interactive **Deterministic Step Replay** simulation in-browser
2. **Multi-Agent Scenario Switcher**:
   - Support Refund Agent (LangGraph conditional edge recovery)
   - Market Intel Web Researcher (CrewAI scrape blocking)
   - Code Refactoring & Testing Loop (Self-reflection cycle)
3. **Restrained Micro-interactions**:
   - Staggered on-scroll timeline reveal
   - Soft pulsing failure node highlighting with instant diagnostic tooltip
4. **Interactive Economics & ROI Simulator**:
   - Dynamic calculator estimating monthly runaway token waste prevention and on-call debugging time saved
5. **Two-Line Zero-Overhead SDK Integration**:
   - Non-blocking lock-free ingestion ring buffer (< 1.2ms p99 overhead)
   - Client-side PII scrubbing
   - OpenTelemetry native export
6. **Dark & Light Mode**:
   - Comprehensive theme system with smooth CSS variable transitions and persistent state
7. **Easter Egg (Konami Code)**:
   - Enter `↑ ↑ ↓ ↓ ← → ← → B A` anywhere to trigger matrix overdrive and 100% simulated uptime celebration

---

## Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Typography**: Plus Jakarta Sans & JetBrains Mono (Google Fonts)
- **Icons**: Lucide React
- **Motion**: Pure CSS Transitions and `@keyframes` for all core UI motion — no animation library used for the primary micro-interactions. `canvas-confetti` is used only for the optional Konami-code easter egg.

---

## Local Development
```bash
# 1. Clone repository
git clone https://github.com/Mokshasoham/Acdyon-project.git
cd Acdyon-project

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build production bundle
npm run build
```

