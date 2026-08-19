# Engineering & Design Decisions — PulseAgent Landing Page

## 1. Visual & Motion Approach vs. The Obvious Alternatives

### Why hand-rolled CSS transitions/keyframes & React state over Framer Motion or Hero Videos?
- **Zero Runtime Overhead & Predictable JS Bundle**: Autonomous agent observability is all about sub-millisecond precision and low latency. Handcrafting UI motion using CSS transforms, `will-change`, and native `IntersectionObserver` avoids shipping 40kB+ of runtime animation bundle overhead (e.g. Framer Motion, GSAP).
- **Interactive Authenticity Over Static Pre-rendered Video**: Hero videos are static, uninteractive, and bloat initial page weight by 5–15MB. Building the **Product-in-Action Trace Inspector** directly in DOM elements allows developers to click through nodes, inspect real JSON payloads, switch between multi-agent pipeline scenarios (LangGraph vs. CrewAI), and simulate deterministic step replays live in the browser.
- **Defensibility in Code Review**: Every keyframe (`@keyframes subtle-glow`, `@keyframes failure-pulse`, `@keyframes matrix-flash`) is implemented in pure CSS variables and utility classes, making the code 100% auditable and defendable line-by-line without proprietary black-box animation abstraction layers.

### What was given up?
- Complex physics-based spring physics and drag-and-drop node graph rearrangers that Framer Motion provides out of the box. Instead, we focused on crisp, restrained, staggered timeline reveals with subtle cubic-bezier easing (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## 2. Trade-offs Made Under Time Constraint & "With a Real Week"

### What was prioritized:
- **Depth and Realism in the Centerpiece**: The Trace Inspector features authentic LLM agent telemetry (e.g., Stripe HTTP 429 rate-limit timeouts, LangGraph conditional fallback routing, Cloudflare Turnstile bot blocks, latency waterfalls, token cost attribution per model).
- **Comprehensive Dark Mode & Clean Typography**: Real CSS variable-based dark/light mode across every section, paired with JetBrains Mono for code/trace IDs and Plus Jakarta Sans for crisp developer ergonomics.
- **Responsive down to 390px**: Ensured horizontal timelines scroll smoothly on mobile without page-level horizontal overflow or broken layouts.

### What I would build with a full week:
1. **Interactive Node Graph Visualizer (DAG Canvas)**: Expand the linear step timeline into a 2D interactive topological DAG canvas (using Canvas/SVG) supporting branching parallel agent loops and conditional cyclical edges.
2. **Deep Keyboard Accessibility (WCAG AAA)**: Full keyboard roving tabindex across the timeline nodes and inspector tabs with ARIA live regions announcing step status transitions.
3. **Live Streaming WebSocket Telemetry Sandbox**: Connect the mock inspector to a live lightweight backend emulator that streams simulated trace spans in real time with adjustable error injection rates.

---

## 3. AI Usage & Verification Log (Prepared for Interview Defense)

### Where AI was utilized:
- Initial scaffolding of TypeScript interfaces (`AgentScenario`, `TraceStep`, `TokenMetrics`) and boilerplate mock JSON schemas.
- Accelerating Tailwind utility class layout composition for secondary sections (FAQ accordion, comparison cards, footer).
- Writing the Konami code listener hook template with `canvas-confetti` trigger.

### What was personally verified, debugged, and refined:
- **Strict Verbatim Module Syntax & Type Safety**: Audited and fixed all TypeScript imports to ensure `import type` compliance with strict `tsc -b` compilation.
- **Micro-interaction & CSS Keyframe Calibration**: Refined the failure pulse animation (`animate-failure-pulse`) to be restrained and subtle (0–6px soft glow) rather than aggressive/jarring.
- **Honest Positioning & Copy Integrity**: Explicitly rejected fabricated social proof, fake user counts, and synthetic logos. Grounded all copy in genuine LLM pipeline pain points: unhandled tool exceptions, opaque token burn, and silent fallback degradation.
- **Responsive Viewport Verification**: Verified zero horizontal scroll overflow at 390px (mobile) and 1440px (desktop) viewports.
