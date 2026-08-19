export type StepType = 'retrieval' | 'llm' | 'tool' | 'guardrail' | 'route' | 'agent';
export type StepStatus = 'success' | 'failed' | 'recovered' | 'running';

export interface TokenMetrics {
  input: number;
  output: number;
  total: number;
}

export interface WaterfallBreakdown {
  inferenceMs: number;
  networkMs: number;
  overheadMs: number;
}

export interface TraceStep {
  id: string;
  stepNumber: string;
  name: string;
  type: StepType;
  engine: string;
  status: StepStatus;
  durationMs: number;
  tokens: TokenMetrics;
  cost: number;
  inputPayload: string;
  outputPayload: string;
  errorMessage?: string;
  stackTrace?: string;
  retryCount?: number;
  maxRetries?: number;
  waterfall: WaterfallBreakdown;
  summary: string;
}

export interface AgentScenario {
  id: string;
  title: string;
  category: string;
  framework: string;
  traceId: string;
  startedAt: string;
  totalDurationMs: number;
  totalCost: number;
  totalTokens: number;
  status: 'healthy' | 'degraded' | 'failed';
  rootCause: string;
  description: string;
  steps: TraceStep[];
}

export interface MetricCard {
  label: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down' | 'neutral';
  helper: string;
}

export interface PricingTier {
  name: string;
  description: string;
  price: string;
  period: string;
  highlighted?: boolean;
  badge?: string;
  ctaText: string;
  features: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}
