import type { AgentScenario, PricingTier, FaqItem } from '../types';

export const SCENARIOS: AgentScenario[] = [
  {
    id: 'support-refund-agent',
    title: 'Customer Autonomous Refund Graph',
    category: 'E-Commerce Agent',
    framework: 'LangGraph v0.2.14 · StateGraph',
    traceId: 'tr_8f99e_refund_orchestrator',
    startedAt: '2 min ago (14:32:08 UTC)',
    totalDurationMs: 4890,
    totalCost: 0.0418,
    totalTokens: 3820,
    status: 'degraded',
    rootCause: 'Node 03 tool timeout (Stripe API 429 RateLimit) triggered fallback recovery loop',
    description: 'Autonomous financial agent evaluating return window eligibility, processing customer order context, and dispatching Stripe refund with human-in-the-loop fallback.',
    steps: [
      {
        id: 'step-1',
        stepNumber: '01',
        name: 'RetrieveOrderContext',
        type: 'retrieval',
        engine: 'Qdrant Vector DB + PostgreSQL',
        status: 'success',
        durationMs: 142,
        tokens: { input: 0, output: 0, total: 0 },
        cost: 0.0002,
        summary: 'Queried vector index & SQL order history for user_id usr_99182',
        inputPayload: JSON.stringify({
          query: "refund request for order #ORD-88291 defective item",
          user_id: "usr_99182",
          top_k: 4,
          filter: { status: "DELIVERED", return_window_days_max: 30 }
        }, null, 2),
        outputPayload: JSON.stringify({
          order_id: "ORD-88291",
          purchased_at: "2026-08-04T10:15:00Z",
          amount_cents: 14999,
          currency: "USD",
          items: [{ sku: "ANC-HEADPHONES-PRO", price: 14999, serial: "SN-99812-B" }],
          warranty_status: "ACTIVE_30_DAYS",
          prior_disputes: 0
        }, null, 2),
        waterfall: { inferenceMs: 0, networkMs: 132, overheadMs: 10 }
      },
      {
        id: 'step-2',
        stepNumber: '02',
        name: 'EvaluateRefundPolicy',
        type: 'llm',
        engine: 'Claude 3.7 Sonnet',
        status: 'success',
        durationMs: 680,
        tokens: { input: 1420, output: 290, total: 1710 },
        cost: 0.0125,
        summary: 'Reasoned over return terms; approved full refund authorization',
        inputPayload: JSON.stringify({
          system: "You are the Returns Policy Engine. Validate if order qualifies for immediate automatic refund.",
          messages: [
            { role: "user", content: "Order ORD-88291 arrived 15 days ago with distorted left speaker. Customer requests refund." }
          ],
          tools: ["stripe_refund_tool", "escalate_to_human_agent"]
        }, null, 2),
        outputPayload: JSON.stringify({
          decision: "APPROVE_REFUND",
          reasoning: "Delivered within 30-day window (15 days elapsed). Zero prior dispute flags. Item eligible for immediate refund without mandatory warehouse return.",
          tool_call: {
            name: "stripe_refund_tool",
            arguments: {
              charge_id: "ch_3N8F992eZbkyKo290",
              amount: 14999,
              reason: "defective_product",
              metadata: { order_id: "ORD-88291", agent_decision_id: "dec_8819" }
            }
          }
        }, null, 2),
        waterfall: { inferenceMs: 640, networkMs: 28, overheadMs: 12 }
      },
      {
        id: 'step-3',
        stepNumber: '03',
        name: 'StripeRefundTool',
        type: 'tool',
        engine: 'Stripe Gateway API (v2)',
        status: 'failed',
        durationMs: 3850,
        tokens: { input: 0, output: 0, total: 0 },
        cost: 0.0000,
        retryCount: 3,
        maxRetries: 3,
        summary: 'HTTP 429 Too Many Requests; client retry budget exhausted after 3,850ms',
        errorMessage: 'ToolExecutionTimeoutError: stripe_refund_tool failed after 3 retries (HTTP 429 RateLimitExceeded)',
        stackTrace: "ToolExecutionTimeoutError: stripe_refund_tool [attempt 3/3 failed]\n  at StripeClient.postRefund (node_modules/@stripe/stripe-node/lib/resources/Refunds.js:48:19)\n  at ToolNode.execute (pulse/agent/runtime/tool_node.py:129)\n  at StateGraph.step (langgraph/pregel/main.py:488)\nHTTP Status: 429 Too Many Requests\nHeader: x-stripe-retry-after: 4",
        inputPayload: JSON.stringify({
          endpoint: "POST /v1/refunds",
          idempotency_key: "agent_ref_ORD88291_attempt_3",
          charge: "ch_3N8F992eZbkyKo290",
          amount: 14999,
          reason: "defective_product"
        }, null, 2),
        outputPayload: JSON.stringify({
          error: {
            type: "rate_limit_error",
            code: "rate_limit_exceeded",
            message: "Too many concurrent refund requests against payment provider. Rate limit threshold 100 req/min exceeded.",
            param: null
          }
        }, null, 2),
        waterfall: { inferenceMs: 0, networkMs: 3820, overheadMs: 30 }
      },
      {
        id: 'step-4',
        stepNumber: '04',
        name: 'HumanInTheLoopFallback',
        type: 'route',
        engine: 'LangGraph Conditional Edge + Slack Webhook',
        status: 'recovered',
        durationMs: 95,
        tokens: { input: 320, output: 90, total: 410 },
        cost: 0.0011,
        summary: 'Circuit breaker caught 429 failure -> routed ticket to Zendesk tier-2 queue',
        inputPayload: JSON.stringify({
          trigger: "NODE_03_TOOL_FAILURE",
          order_id: "ORD-88291",
          pending_action: "EXECUTE_STRIPE_REFUND",
          failure_reason: "STRIPE_429_RATE_LIMIT"
        }, null, 2),
        outputPayload: JSON.stringify({
          routed_to: "queue://finance_ops_priority",
          ticket_id: "ZD-992019",
          slack_alert_dispatched: true,
          channel: "#ops-agent-fallbacks",
          status: "RECOVERED_VIA_FALLBACK"
        }, null, 2),
        waterfall: { inferenceMs: 0, networkMs: 82, overheadMs: 13 }
      },
      {
        id: 'step-5',
        stepNumber: '05',
        name: 'DraftCustomerNotification',
        type: 'llm',
        engine: 'GPT-4o-mini',
        status: 'success',
        durationMs: 123,
        tokens: { input: 1210, output: 490, total: 1700 },
        cost: 0.0280,
        summary: 'Composed customer email informing them of approved refund processing',
        inputPayload: JSON.stringify({
          system: "Draft courteous customer update. Inform them refund is approved and will reflect within 2-3 business days.",
          customer_name: "Sarah Jenkins",
          order_id: "ORD-88291",
          ticket_id: "ZD-992019"
        }, null, 2),
        outputPayload: JSON.stringify({
          subject: "Your refund for Order #ORD-88291 has been approved",
          body_text: "Hi Sarah,\n\nGood news! Your return and full refund of $149.99 for the ANC Headphones Pro has been approved. Our operations team is finalizing the bank release (Ref: ZD-992019), and funds should settle in 2-3 business days.\n\nThank you for your patience,\nPulse Customer Care"
        }, null, 2),
        waterfall: { inferenceMs: 105, networkMs: 14, overheadMs: 4 }
      }
    ]
  },
  {
    id: 'market-intel-researcher',
    title: 'Market Intelligence Web Researcher',
    category: 'Autonomous Research',
    framework: 'CrewAI v0.32 · Multi-Agent Tool Chain',
    traceId: 'tr_4a11c_crawler_analyst',
    startedAt: '12 min ago (14:22:15 UTC)',
    totalDurationMs: 6240,
    totalCost: 0.0632,
    totalTokens: 6410,
    status: 'failed',
    rootCause: 'Silent 403 Cloudflare Bot Block on target domain caused hallucinated data extraction',
    description: 'Multi-agent pipeline synthesizing competitor pricing matrices by querying search engines and scraping public SaaS landing pages.',
    steps: [
      {
        id: 'step-m1',
        stepNumber: '01',
        name: 'DecomposeQuery',
        type: 'agent',
        engine: 'Claude 3.7 Sonnet',
        status: 'success',
        durationMs: 410,
        tokens: { input: 890, output: 340, total: 1230 },
        cost: 0.0089,
        summary: 'Deconstructed user request into 3 targeted search vectors',
        inputPayload: JSON.stringify({ prompt: "Synthesize 2026 enterprise pricing for VectorDB providers: Pinecone vs Qdrant vs Weaviate" }, null, 2),
        outputPayload: JSON.stringify({ subqueries: ["pinecone serverless pricing per read unit 2026", "qdrant cloud cluster dedicated pricing", "weaviate cloud serverless SLA cost"] }, null, 2),
        waterfall: { inferenceMs: 380, networkMs: 20, overheadMs: 10 }
      },
      {
        id: 'step-m2',
        stepNumber: '02',
        name: 'SerperSearchTool',
        type: 'tool',
        engine: 'Serper.dev Search API',
        status: 'success',
        durationMs: 780,
        tokens: { input: 0, output: 0, total: 0 },
        cost: 0.0010,
        summary: 'Extracted 12 organic search URLs and rich snippet cards',
        inputPayload: JSON.stringify({ queries: ["pinecone serverless pricing 2026", "qdrant cloud pricing tiers"] }, null, 2),
        outputPayload: JSON.stringify({ total_results: 12, top_url: "https://www.pinecone.io/pricing/" }, null, 2),
        waterfall: { inferenceMs: 0, networkMs: 760, overheadMs: 20 }
      },
      {
        id: 'step-m3',
        stepNumber: '03',
        name: 'ScrapePricingDOM',
        type: 'tool',
        engine: 'Headless Chromium Worker',
        status: 'failed',
        durationMs: 4100,
        tokens: { input: 0, output: 0, total: 0 },
        cost: 0.0000,
        summary: 'Blocked by Cloudflare WAF Challenge (HTTP 403 Forbidden)',
        errorMessage: 'WAFChallengeBlockError: Cloudflare Turnstile challenge intercepted headless browser DOM extraction',
        stackTrace: "WAFChallengeBlockError: GET https://www.pinecone.io/pricing/ returned 403\n  at PlaywrightScraper.extractTable (pulse/tools/browser.py:94)\n  at MultiAgentCrew.delegate (crewai/agent.py:312)\nResponse: <title>Just a moment... Cloudflare Verification</title>",
        inputPayload: JSON.stringify({ url: "https://www.pinecone.io/pricing/", extract: "table.pricing-grid" }, null, 2),
        outputPayload: JSON.stringify({ error: "403_CLOUDFLARE_BLOCKED", html_preview: "<!DOCTYPE html><html><title>Just a moment...</title>..." }, null, 2),
        waterfall: { inferenceMs: 0, networkMs: 4050, overheadMs: 50 }
      },
      {
        id: 'step-m4',
        stepNumber: '04',
        name: 'SynthesizeFallbackSummary',
        type: 'llm',
        engine: 'Claude 3.7 Sonnet',
        status: 'success',
        durationMs: 950,
        tokens: { input: 3890, output: 1290, total: 5180 },
        cost: 0.0533,
        summary: 'Generated report highlighting missing provider data due to scrape block',
        inputPayload: JSON.stringify({ warning: "Target DOM failed to load. Synthesize available snippet cache with disclaimer." }, null, 2),
        outputPayload: JSON.stringify({ status: "PARTIAL_COMPLETION", confidence: 0.62, memo: "Pricing matrix synthesized with cached snippet data. Pinecone pricing flagged for manual re-validation." }, null, 2),
        waterfall: { inferenceMs: 920, networkMs: 20, overheadMs: 10 }
      }
    ]
  },
  {
    id: 'code-refactor-agent',
    title: 'Autonomous Code Refactoring & Testing Loop',
    category: 'Developer Tooling',
    framework: 'Custom Python Async Graph (AsyncIO)',
    traceId: 'tr_1b99f_code_eval_loop',
    startedAt: '28 min ago (14:06:40 UTC)',
    totalDurationMs: 3120,
    totalCost: 0.0210,
    totalTokens: 4950,
    status: 'healthy',
    rootCause: 'Self-reflection loop caught syntax error in initial diff and auto-corrected',
    description: 'Deterministic code patcher scanning repository ASTs, generating TypeScript diffs, and executing sandbox Jest tests with automatic rollback loops.',
    steps: [
      {
        id: 'step-c1',
        stepNumber: '01',
        name: 'ParseASTAndLocateSymbols',
        type: 'retrieval',
        engine: 'Tree-Sitter Rust Engine',
        status: 'success',
        durationMs: 48,
        tokens: { input: 0, output: 0, total: 0 },
        cost: 0.0001,
        summary: 'Identified 3 call sites for deprecated auth method verifyJwtToken',
        inputPayload: JSON.stringify({ file: "src/auth/session.ts", target_symbol: "verifyJwtToken" }, null, 2),
        outputPayload: JSON.stringify({ matches: [{ line: 42, col: 14 }, { line: 89, col: 8 }, { line: 154, col: 20 }] }, null, 2),
        waterfall: { inferenceMs: 0, networkMs: 0, overheadMs: 48 }
      },
      {
        id: 'step-c2',
        stepNumber: '02',
        name: 'GenerateUnifiedDiff',
        type: 'llm',
        engine: 'DeepSeek V3 / Qwen 2.5 Coder',
        status: 'success',
        durationMs: 1420,
        tokens: { input: 3200, output: 780, total: 3980 },
        cost: 0.0142,
        summary: 'Produced unified diff replacing legacy verifyJwt with jose RS256 verifier',
        inputPayload: JSON.stringify({ task: "Migrate verifyJwtToken to jose.jwtVerify with key rotation" }, null, 2),
        outputPayload: JSON.stringify({ diff: "- await verifyJwtToken(token)\n+ await jwtVerify(token, JWKS_KEY_STORE, { algorithms: ['RS256'] })" }, null, 2),
        waterfall: { inferenceMs: 1390, networkMs: 20, overheadMs: 10 }
      },
      {
        id: 'step-c3',
        stepNumber: '03',
        name: 'ExecuteSandboxJestEval',
        type: 'tool',
        engine: 'Isolated Docker / gVisor MicroVM',
        status: 'success',
        durationMs: 1652,
        tokens: { input: 0, output: 0, total: 0 },
        cost: 0.0067,
        summary: '28 test suites passed in 1.4s with 100% assertion coverage',
        inputPayload: JSON.stringify({ test_command: "npm test -- src/auth/session.test.ts" }, null, 2),
        outputPayload: JSON.stringify({ test_suites: "1 passed, 1 total", tests: "28 passed, 28 total", time_s: 1.42 }, null, 2),
        waterfall: { inferenceMs: 0, networkMs: 0, overheadMs: 1652 }
      }
    ]
  }
];

export const CORE_PAIN_POINTS = [
  {
    icon: 'AlertTriangle',
    title: 'Silent Tool Interceptions',
    highlight: 'Catch 0-token failures',
    description: 'When an external API returns 429, 403 WAF blocks, or malformed JSON, standard LLM wrappers do not throw - they feed garbage context to the model, triggering expensive hallucinated retries.',
    solution: 'PulseAgent records raw HTTP headers, payload sizes, and status codes for every tool invocation with zero code wrapping.'
  },
  {
    icon: 'GitBranch',
    title: 'State Graph & DAG Diffing',
    highlight: 'See what mutated at Node 4',
    description: 'Debugging multi-agent frameworks (LangGraph, CrewAI, AutoGen) in text logs is impossible. State changes between nodes get lost in thousands of lines of stdout.',
    solution: 'Visual state diffs show every key added, mutated, or deleted across agent node boundaries in chronological sequence.'
  },
  {
    icon: 'Flame',
    title: 'Runaway Token Burn Circuit Breakers',
    highlight: 'Halt infinite retry loops',
    description: 'A minor schema mismatch can cause an agent to retry in a tight loop, burning $50+ of Claude 3.7 / GPT-4o tokens in minutes before human intervention.',
    solution: 'Declare per-pipeline token and dollar limits. PulseAgent terminates runaway executions in-flight before credit drain.'
  },
  {
    icon: 'PlayCircle',
    title: 'Deterministic In-Browser Replay',
    highlight: 'Time-travel debug edge cases',
    description: 'Re-running production failures locally is painful when upstream tool responses are dynamic or expired.',
    solution: 'Re-execute any historic trace step with frozen mock payloads or modify prompts live in-browser to verify fixes instantly.'
  }
];

export const CODE_SNIPPETS = {
  python: `# 1. Install SDK
# pip install pulseagent

from pulseagent import PulseTracker, instrument_langgraph
from langgraph.graph import StateGraph

# Zero-overhead initialization
pulse = PulseTracker(api_key="pls_live_9921", sample_rate=1.0)

# Automatic Graph Instrumentation
builder = StateGraph(AgentState)
# ... define your nodes & edges
app = builder.compile()

# Wrap your compiled agent in 1 line
observed_agent = instrument_langgraph(app, tracker=pulse)

# Execute as normal - sub-millisecond trace telemetry is automatically streamed
result = await observed_agent.ainvoke({"query": "Process refund for ORD-88291"})`,

  typescript: `// 1. Install SDK
// npm i @pulseagent/sdk

import { PulseAgent } from '@pulseagent/sdk';
import { OpenAI } from 'openai';

const pulse = new PulseAgent({
  apiKey: process.env.PULSE_API_KEY!,
  environment: 'production',
  maskSensitiveData: true // Auto-redacts credit cards & API keys
});

// Wrap any LLM client, LangChain runnable, or custom tool
const openai = pulse.wrap(new OpenAI());

// Or trace custom multi-step graph nodes manually
async function executeAgentChain(userInput: string) {
  return await pulse.trace('support_agent_chain', async (span) => {
    span.setTag('user_tier', 'enterprise');
    
    const context = await span.step('vector_retrieve', () => qdrant.query(userInput));
    const response = await span.step('llm_reasoning', () => openai.chat.completions.create({...}));
    
    return response;
  });
}`,

  rest: `// OpenTelemetry & REST Ingestion API
// POST https://api.pulseagent.dev/v1/traces/ingest
// Content-Type: application/json
// Authorization: Bearer pls_live_9921

{
  "trace_id": "tr_8f99e_refund_orchestrator",
  "framework": "langgraph",
  "nodes": [
    {
      "node_id": "retrieve_context",
      "type": "retrieval",
      "duration_ms": 142,
      "status": "SUCCESS",
      "metadata": { "vector_db": "qdrant", "top_k": 4 }
    },
    {
      "node_id": "stripe_refund_tool",
      "type": "tool",
      "duration_ms": 3850,
      "status": "FAILED",
      "error": { "code": 429, "name": "RateLimitExceeded" }
    }
  ]
}`
};

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Developer Community',
    description: 'For engineers building and testing autonomous agents locally and in staging.',
    price: '$0',
    period: 'forever',
    ctaText: 'Start Tracing Free',
    features: [
      '10,000 trace executions / month',
      '7-day retention for debugging',
      'LangGraph, CrewAI & OpenAI integrations',
      'Silent tool failure interception',
      'Local dev dashboard & CLI',
      'Community Discord support'
    ]
  },
  {
    name: 'Production Team',
    description: 'For engineering teams running customer-facing LLM agents in production.',
    price: '$49',
    period: 'per engineer / month',
    highlighted: true,
    badge: 'Most Defensible Choice',
    ctaText: 'Deploy Production Tracing',
    features: [
      '500,000 trace executions / month',
      '90-day retention & historic search',
      'Automated Token Circuit Breakers',
      'Deterministic In-Browser Step Replay',
      'Slack & PagerDuty incident alerting',
      'PII masking & SOC-2 compliance mode',
      'Sub-millisecond async ingestion SLA'
    ]
  },
  {
    name: 'Enterprise Self-Hosted',
    description: 'For organizations with strict zero-data-retention or VPC compliance requirements.',
    price: 'Custom',
    period: 'air-gapped or VPC',
    ctaText: 'Schedule VPC Architecture Review',
    features: [
      'Unlimited trace volume',
      'Deploy on your AWS / GCP Kubernetes cluster',
      'Zero Prompt Retention guarantee (Zero-Data Mode)',
      'Custom SSO / SAML & RBAC permissions',
      'Custom LLM framework adapters',
      'Dedicated Slack channel with core maintainers'
    ]
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How much latency does PulseAgent introduce into our production agent loop?',
    answer: 'Less than 1.2ms p99 overhead. Telemetry spans are enqueued into a lock-free ring buffer and shipped asynchronously in batched background threads. Your agent never blocks on network I/O to PulseAgent.',
    category: 'Performance'
  },
  {
    question: 'What happens to sensitive customer data and proprietary prompt templates?',
    answer: 'PulseAgent includes client-side PII redactors that automatically scrub credit cards, emails, authorization tokens, and phone numbers before payloads leave your server. You can also enable Zero-Prompt Mode to store only token counts, status codes, and latency graphs with zero raw text.',
    category: 'Privacy & Security'
  },
  {
    question: 'Why not just use standard APMs like Datadog, Grafana, or Sentry?',
    answer: 'Standard APMs are built for microservices, not non-deterministic agentic graphs. They do not understand LLM token economies, multi-step agent reflection loops, conditional DAG branches, or tool schema mutations. PulseAgent is purpose-built for the agentic execution model.',
    category: 'Comparison'
  },
  {
    question: 'Can we self-host PulseAgent inside our own AWS/GCP VPC?',
    answer: 'Yes. PulseAgent provides official Helm charts and Docker Compose manifests for self-hosting on top of ClickHouse and PostgreSQL. You retain 100% control over all telemetry data.',
    category: 'Infrastructure'
  },
  {
    question: 'Does this work with custom agent loops that do not use LangChain or LangGraph?',
    answer: 'Absolutely. We support simple decorator syntax (@pulse.trace) and standard OpenTelemetry spans. If your agent is raw Python or TypeScript async functions, you can instrument it with 2 lines of code.',
    category: 'Integration'
  }
];
