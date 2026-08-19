import React, { useState } from 'react';
import { CODE_SNIPPETS } from '../data/mockTraces';
import { Copy, Check, ShieldCheck, Zap, Server } from 'lucide-react';


export const SdkIntegration = () => {
  const [activeLang, setActiveLang] = useState('python');
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeLang]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="sdk" className="py-16 md:py-24 bg-zinc-50/50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Left Column: Explanatory copy & engineering guarantees */}
          <div className="lg:w-5/12 space-y-6">
            <div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold">
                Developer Ergonomics
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Two lines of code. Zero pipeline overhead.
              </h2>
              <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                You don't need to refactor your prompts or rebuild your agent graph. Wrap your compiled LangGraph, CrewAI crew, or raw LLM client and start receiving telemetry in seconds.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Non-Blocking Lock-Free Ingestion</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Spans are written to an in-memory ring buffer and flushed in background threads. Your agent never waits on telemetry network calls.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Client-Side PII Redaction</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Automatic regex and NER token scrubbers strip credit cards, phone numbers, and bearer keys before payloads leave your server.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/20">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">OpenTelemetry Native</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Exports clean standard OTel traces compatible with existing telemetry collectors or self-hosted ClickHouse instances.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code Box */}
          <div className="w-full lg:w-7/12">
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden">
              {/* Code Box Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/60">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1.5">
                    <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
                    <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
                    <span className="w-3 h-3 rounded-full bg-zinc-700"></span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 pl-2">integration_example.{activeLang === 'python' ? 'py' : activeLang === 'typescript' ? 'ts' : 'json'}</span>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Language Selector */}
                  <div className="flex items-center p-0.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-mono">
                    <button
                      onClick={() => setActiveLang('python')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeLang === 'python' ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      Python
                    </button>
                    <button
                      onClick={() => setActiveLang('typescript')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeLang === 'typescript' ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      TypeScript
                    </button>
                    <button
                      onClick={() => setActiveLang('rest')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        activeLang === 'rest' ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      OTel REST
                    </button>
                  </div>


                  {/* Copy Button */}
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                    title="Copy code snippet"
                    aria-label="Copy code snippet"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Code Viewer */}
              <div className="p-4 sm:p-6 overflow-x-auto max-h-[460px]">
                <pre className="font-mono text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  <code>{CODE_SNIPPETS[activeLang]}</code>
                </pre>
              </div>

              {/* Footer status */}
              <div className="px-4 py-2.5 border-t border-zinc-850 bg-zinc-900/40 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span className="flex items-center space-x-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Tested with LangGraph 0.2+, CrewAI 0.32+, LlamaIndex 0.11+</span>
                </span>
                <span>Latency overhead: &lt; 1.2ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
