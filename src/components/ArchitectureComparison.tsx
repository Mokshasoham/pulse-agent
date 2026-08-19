import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

export const ArchitectureComparison: React.FC = () => {


  return (
    <section id="architecture" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold">
            Telemetry Paradigm
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Stop grepping through raw stdout dumps.
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Microservice logs tell you a function was called. Agent pipelines require graph state awareness, token attribution, and tool lifecycle inspection.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Legacy CloudWatch / Datadog stdout Logs Card */}
          <div className="rounded-2xl p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-rose-500 mb-3 font-mono text-xs font-bold uppercase tracking-wider">
                <XCircle className="w-4 h-4" />
                <span>The Status Quo: Unstructured Log Soup</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Raw console.log / CloudWatch Logs
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                When an agent loops 5 times due to a bad tool response, you get thousands of lines of mixed JSON strings with no causal linking.
              </p>

              {/* Code/Log Mock */}
              <div className="rounded-xl bg-zinc-950 p-4 font-mono text-[11px] text-zinc-400 border border-zinc-800 space-y-1 overflow-x-auto max-h-64 opacity-80 select-none">
                <div className="text-amber-500/80">[2026-08-19 14:32:09.110] WARN: Tool call retried. Response: &#123;"status": 429&#125;</div>
                <div className="text-zinc-600">[2026-08-19 14:32:10.420] DEBUG: Invoking LLM reflection node...</div>
                <div className="text-amber-500/80">[2026-08-19 14:32:12.890] WARN: Tool call retried again. Timeout.</div>
                <div className="text-rose-400 font-bold">[2026-08-19 14:32:14.010] ERROR: MaxRetriesExceededException at line 894</div>
                <div className="text-zinc-500">Traceback (most recent call last): File "agent.py", line 42...</div>
                <div className="text-zinc-600">[2026-08-19 14:32:14.050] INFO: Worker thread killed. Tokens unknown.</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2 text-xs font-mono text-zinc-500">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>Zero token cost attribution per prompt</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>No visibility into agent state graph diffs</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>Impossible to reproduce failures with frozen mocks</span>
              </div>
            </div>
          </div>

          {/* PulseAgent Telemetry Card */}
          <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-zinc-950 border-2 border-emerald-500/40 dark:border-emerald-500/50 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-zinc-950 font-mono text-[10px] font-bold rounded-bl-xl">
              PULSE TELEMETRY
            </div>

            <div>
              <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 mb-3 font-mono text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>The PulseAgent Standard: Structured Graph Spans</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Deterministic Graph Spans & State Diffs
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                Every node transition is recorded with exact model pricing, latency waterfalls, tool schemas, and one-click replay capability.
              </p>

              {/* Pulse UI Card Preview */}
              <div className="rounded-xl bg-zinc-900/90 p-4 font-mono text-xs text-zinc-200 border border-zinc-800 space-y-2.5 shadow-inner">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-[11px]">
                  <span className="text-emerald-400 font-bold">● Span tr_8f99e (5 nodes)</span>
                  <span className="text-amber-400 font-bold">$0.0418 · 4,890ms</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-emerald-400">✓ 01. VectorRetrieve</span>
                    <span>142ms · 0 tokens</span>
                  </div>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span className="text-emerald-400">✓ 02. PolicyReasoning (Claude 3.7)</span>
                    <span>680ms · 1,710 tokens ($0.0125)</span>
                  </div>
                  <div className="flex items-center justify-between text-rose-400 font-semibold bg-rose-950/40 px-2 py-1 rounded border border-rose-900/50">
                    <span>✗ 03. StripeTool (429 RateLimit)</span>
                    <span>3,850ms · 3/3 retries</span>
                  </div>

                  <div className="flex items-center justify-between text-amber-400">
                    <span>⚡ 04. FallbackRoute (Zendesk Escalation)</span>
                    <span>95ms · Ticket #ZD-992019</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-850 space-y-2 text-xs font-mono text-emerald-700 dark:text-emerald-400">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Exact dollar cost down to the individual token</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Full causal graph topology & state mutation diffs</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>1-click time-travel replay with mock fixtures</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
