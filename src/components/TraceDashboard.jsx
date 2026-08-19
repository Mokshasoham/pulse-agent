import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Coins, 
  Play, 
  RefreshCw, 
  Check, 
  Copy, 
  Layers, 
  Bug, 
  Activity, 
  Zap 
} from 'lucide-react';
import { SCENARIOS } from '../data/mockTraces';

export const TraceDashboard = ({ konamiActive = false }) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const currentScenario = SCENARIOS[selectedScenarioIndex];
  
  const [selectedStepId, setSelectedStepId] = useState(currentScenario.steps[2]?.id || currentScenario.steps[0].id);
  const [activeTab, setActiveTab] = useState('diagnostics');
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);
  const [replayedSteps, setReplayedSteps] = useState({});
  const [hoveredStepId, setHoveredStepId] = useState(null);

  
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const defaultFailStep = currentScenario.steps.find(s => s.status === 'failed') || currentScenario.steps[0];
    setSelectedStepId(defaultFailStep.id);
    setReplayedSteps({});
  }, [selectedScenarioIndex, currentScenario]);

  const activeStep = currentScenario.steps.find((s) => s.id === selectedStepId) || currentScenario.steps[0];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleSimulateReplay = () => {
    if (isReplaying) return;
    setIsReplaying(true);
    
    setTimeout(() => {
      setReplayedSteps((prev) => ({
        ...prev,
        [activeStep.id]: true
      }));
      setIsReplaying(false);
    }, 950);
  };

  const isStepFixed = (stepId) => Boolean(replayedSteps[stepId]) || konamiActive;

  return (
    <section id="trace-inspector" ref={containerRef} className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold mb-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Product In Action · Real Pipeline Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
              Live Agent Execution Inspector
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
              Inspect multi-node agent graphs down to raw HTTP headers, prompt token consumption, and failure root causes in real time.
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium">
            {SCENARIOS.map((scenario, idx) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedScenarioIndex === idx
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold shadow-xs border border-zinc-200/50 dark:border-zinc-700'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {scenario.category}
              </button>
            ))}
          </div>
        </div>

        {/* Realistic Mock Dashboard Container */}
        <div className={`rounded-2xl border transition-all duration-500 overflow-hidden shadow-2xl ${
          konamiActive 
            ? 'bg-zinc-950 border-emerald-500/80 shadow-emerald-500/20 animate-matrix-flash' 
            : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-zinc-900/10 dark:shadow-black/60'
        }`}>
          {/* Dashboard Header Bar */}
          <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
            {/* Left metadata */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/20 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  {currentScenario.traceId}
                </span>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700 font-mono">|</span>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 hidden sm:inline">
                {currentScenario.framework}
              </span>
            </div>

            {/* Right Telemetry KPI Badges */}
            <div className="flex items-center space-x-3 sm:space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-1.5 text-zinc-600 dark:text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>
                  <strong>{currentScenario.totalDurationMs}ms</strong> total
                </span>
              </div>

              <div className="flex items-center space-x-1.5 text-zinc-600 dark:text-zinc-300">
                <Coins className="w-3.5 h-3.5 text-amber-500" />
                <span>
                  <strong>${currentScenario.totalCost.toFixed(4)}</strong>
                </span>
              </div>

              <div className="flex items-center space-x-1.5 text-zinc-600 dark:text-zinc-300 hidden md:flex">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>
                  <strong>{currentScenario.totalTokens.toLocaleString()}</strong> tokens
                </span>
              </div>

              {/* Status Badge */}
              <div className="pl-2 border-l border-zinc-200 dark:border-zinc-800">
                {konamiActive ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold">
                    100% OPTIMAL
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-[11px] font-semibold flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                    <span>1 NODE FAILED</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Root cause callout banner */}
          <div className="bg-rose-50/60 dark:bg-rose-950/20 border-b border-rose-200/60 dark:border-rose-900/40 px-4 sm:px-6 py-2 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-rose-800 dark:text-rose-300">
              <Bug className="w-4 h-4 text-rose-500 shrink-0" />
              <span>
                <strong className="font-semibold">Root Cause Intercepted:</strong> {konamiActive ? 'All nodes verified healthy by PulseAgent matrix engine.' : currentScenario.rootCause}
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 hidden lg:inline">
              Started {currentScenario.startedAt}
            </span>
          </div>

          {/* Horizontal Step Timeline */}
          <div className="p-4 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-950/40">
            <div className="text-[11px] uppercase tracking-wider font-mono text-zinc-500 dark:text-zinc-400 font-semibold mb-3 flex items-center justify-between">
              <span>Pipeline Step Execution Sequence (Click node to inspect)</span>
              <span className="text-zinc-400 dark:text-zinc-600 text-[10px] hidden sm:inline">Hover failed node for diagnostic preview</span>
            </div>

            <div className="overflow-x-auto pb-3 pt-1">
              <div className="flex items-center min-w-[720px] lg:min-w-full relative">
                <div className="absolute top-1/2 left-6 right-6 h-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 z-0" />

                {currentScenario.steps.map((step, idx) => {
                  const isSelected = step.id === activeStep.id;
                  const isFailed = step.status === 'failed' && !isStepFixed(step.id);
                  const isRecovered = step.status === 'recovered' || isStepFixed(step.id);
                  
                  const delayStyle = isVisible 
                    ? { transitionDelay: `${idx * 120}ms`, opacity: 1, transform: 'translateY(0)' } 
                    : { opacity: 0, transform: 'translateY(16px)' };

                  return (
                    <div 
                      key={step.id} 
                      className="flex-1 px-1.5 relative z-10"
                      style={{
                        transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        ...delayStyle
                      }}
                      onMouseEnter={() => setHoveredStepId(step.id)}
                      onMouseLeave={() => setHoveredStepId(null)}
                    >
                      <button
                        onClick={() => setSelectedStepId(step.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all duration-200 group relative ${
                          isSelected
                            ? 'bg-white dark:bg-zinc-900 border-emerald-500 dark:border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                            : isFailed
                            ? 'bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/40 hover:border-rose-500 animate-failure-pulse'
                            : 'bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-850'
                        }`}
                      >
                        {/* Step Header */}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono text-[10px] font-bold text-zinc-400 dark:text-zinc-500">
                            {step.stepNumber}
                          </span>
                          
                          {isFailed ? (
                            <span className="flex items-center space-x-1 text-rose-500 text-[10px] font-mono font-bold">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>FAIL</span>
                            </span>
                          ) : isRecovered && step.status === 'recovered' ? (
                            <span className="flex items-center space-x-1 text-amber-500 text-[10px] font-mono font-bold">
                              <Zap className="w-3 h-3" />
                              <span>RETRY</span>
                            </span>
                          ) : (
                            <span className="flex items-center text-emerald-500 text-[10px] font-mono font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>

                        {/* Step Name */}
                        <div className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 truncate mb-1">
                          {step.name}
                        </div>

                        {/* Step Engine */}
                        <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 truncate mb-2">
                          {step.engine}
                        </div>

                        {/* Step Metrics Footer */}
                        <div className="pt-1.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[10px] font-mono">
                          <span className={isFailed ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-zinc-600 dark:text-zinc-400'}>
                            {step.durationMs}ms
                          </span>
                          <span className="text-zinc-400 dark:text-zinc-500">
                            {step.tokens.total > 0 ? `${step.tokens.total}t` : '$0.00'}
                          </span>
                        </div>

                        {/* Rich Hover Diagnostic Tooltip for Failed Node */}
                        {isFailed && hoveredStepId === step.id && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 rounded-lg bg-zinc-900 text-zinc-100 text-[11px] shadow-xl border border-rose-500/50 z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                            <div className="flex items-center space-x-1.5 text-rose-400 font-bold font-mono mb-1">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>Diagnostic Summary</span>
                            </div>
                            <p className="text-zinc-300 line-clamp-2 text-[10px] leading-tight">
                              {step.errorMessage || 'Silent tool timeout intercepted after 3 retries.'}
                            </p>
                            <div className="mt-1.5 pt-1 border-t border-zinc-800 text-[9px] font-mono text-emerald-400 flex items-center justify-between">
                              <span>Click to inspect stack trace</span>
                              <span>Enter</span>
                            </div>
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Deep Inspector View */}
          <div className="p-4 sm:p-6 bg-white dark:bg-zinc-950">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 gap-3">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                  Node {activeStep.stepNumber}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                  {activeStep.name}
                </h3>
                <span className="text-xs text-zinc-500 font-mono">({activeStep.engine})</span>
              </div>

              {/* Inspector Tabs */}
              <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setActiveTab('diagnostics')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'diagnostics'
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Diagnostics
                </button>
                <button
                  onClick={() => setActiveTab('input')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'input'
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Prompt / Inputs
                </button>
                <button
                  onClick={() => setActiveTab('output')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'output'
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Outputs / Stack
                </button>
                <button
                  onClick={() => setActiveTab('waterfall')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'waterfall'
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                  }`}
                >
                  Waterfall
                </button>
              </div>
            </div>

            {/* Tab Panes */}
            <div className="pt-4">
              {activeTab === 'diagnostics' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                      <div className="text-[11px] font-mono text-zinc-500">Execution Status</div>
                      <div className="mt-1 flex items-center space-x-2">
                        {activeStep.status === 'failed' && !isStepFixed(activeStep.id) ? (
                          <span className="text-sm font-bold font-mono text-rose-500 flex items-center space-x-1">
                            <AlertTriangle className="w-4 h-4" />
                            <span>FAILED (Timeout)</span>
                          </span>
                        ) : (
                          <span className="text-sm font-bold font-mono text-emerald-500 flex items-center space-x-1">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>SUCCESS {isStepFixed(activeStep.id) && '(Replayed)'}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                      <div className="text-[11px] font-mono text-zinc-500">Step Latency Breakdown</div>
                      <div className="mt-1 text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100">
                        {activeStep.durationMs}ms <span className="text-xs font-normal text-zinc-500">(Network: {activeStep.waterfall.networkMs}ms)</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                      <div className="text-[11px] font-mono text-zinc-500">Token Cost Attribution</div>
                      <div className="mt-1 text-sm font-bold font-mono text-zinc-900 dark:text-zinc-100">
                        {activeStep.tokens.total} tokens <span className="text-xs font-normal text-zinc-500">(${activeStep.cost.toFixed(4)})</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
                    <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Telemetry Memo: </strong>
                    {activeStep.summary}
                  </div>

                  {activeStep.status === 'failed' && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1.5 text-rose-600 dark:text-rose-400 font-bold text-xs font-mono">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Tool Failure Intercepted: {activeStep.retryCount || 3} of {activeStep.maxRetries || 3} Retries Exhausted</span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-300">
                          PulseAgent caught downstream API rate-limiting before the LLM initiated hallucinated recovery loops.
                        </p>
                      </div>

                      <button
                        onClick={handleSimulateReplay}
                        disabled={isReplaying}
                        className={`inline-flex items-center space-x-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                          isStepFixed(activeStep.id)
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                            : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md active:scale-95'
                        }`}
                      >
                        {isReplaying ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Simulating Replay...</span>
                          </>
                        ) : isStepFixed(activeStep.id) ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Step Recovered (Mock Fixed)</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Simulate Deterministic Replay</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'input' && (
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-zinc-500">Node Ingestion Arguments & System Messages:</span>
                    <button
                      onClick={() => handleCopy(activeStep.inputPayload)}
                      className="inline-flex items-center space-x-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[11px] font-mono text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    >
                      {copiedPayload ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPayload ? 'Copied' : 'Copy JSON'}</span>
                    </button>
                  </div>
                  <pre className="p-3.5 rounded-xl bg-zinc-900 text-zinc-100 text-xs font-mono overflow-x-auto max-h-72 border border-zinc-800">
                    {activeStep.inputPayload}
                  </pre>
                </div>
              )}

              {activeTab === 'output' && (
                <div className="relative space-y-3">
                  {activeStep.stackTrace ? (
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono text-rose-500 font-bold">Captured Tool Error Stack Trace:</span>
                        <button
                          onClick={() => handleCopy(activeStep.stackTrace || '')}
                          className="inline-flex items-center space-x-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[11px] font-mono text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy Stack</span>
                        </button>
                      </div>
                      <pre className="p-3.5 rounded-xl bg-rose-950/40 text-rose-300 text-xs font-mono overflow-x-auto max-h-48 border border-rose-900/60 leading-relaxed">
                        {activeStep.stackTrace}
                      </pre>
                    </div>
                  ) : null}

                  <div>
                    <div className="text-xs font-mono text-zinc-500 mb-1.5">Normalized Node Output Payload:</div>
                    <pre className="p-3.5 rounded-xl bg-zinc-900 text-zinc-100 text-xs font-mono overflow-x-auto max-h-60 border border-zinc-800">
                      {activeStep.outputPayload}
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'waterfall' && (
                <div className="space-y-4">
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    Sub-millisecond latency distribution across inference, network roundtrip, and client orchestration overhead:
                  </div>

                  <div className="space-y-2">
                    <div className="h-6 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800 flex overflow-hidden font-mono text-[10px] text-white">
                      {activeStep.waterfall.inferenceMs > 0 && (
                        <div 
                          style={{ width: `${Math.max(15, (activeStep.waterfall.inferenceMs / activeStep.durationMs) * 100)}%` }}
                          className="bg-indigo-500 flex items-center justify-center font-bold"
                        >
                          Inference {activeStep.waterfall.inferenceMs}ms
                        </div>
                      )}
                      {activeStep.waterfall.networkMs > 0 && (
                        <div 
                          style={{ width: `${Math.max(15, (activeStep.waterfall.networkMs / activeStep.durationMs) * 100)}%` }}
                          className="bg-amber-500 flex items-center justify-center font-bold"
                        >
                          Network {activeStep.waterfall.networkMs}ms
                        </div>
                      )}
                      {activeStep.waterfall.overheadMs > 0 && (
                        <div 
                          style={{ width: `${Math.max(8, (activeStep.waterfall.overheadMs / activeStep.durationMs) * 100)}%` }}
                          className="bg-emerald-500 flex items-center justify-center font-bold"
                        >
                          {activeStep.waterfall.overheadMs}ms
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <span className="w-2.5 h-2.5 rounded-xs bg-indigo-500"></span>
                          <span>LLM Inference: {activeStep.waterfall.inferenceMs}ms</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="w-2.5 h-2.5 rounded-xs bg-amber-500"></span>
                          <span>API Network I/O: {activeStep.waterfall.networkMs}ms</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500"></span>
                          <span>Pulse SDK Overhead: {activeStep.waterfall.overheadMs}ms</span>
                        </span>
                      </div>
                      <span className="font-bold text-zinc-700 dark:text-zinc-300">Total: {activeStep.durationMs}ms</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

