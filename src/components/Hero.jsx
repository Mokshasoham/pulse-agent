import React, { useState } from 'react';
import { ArrowRight, Copy, Check, Terminal } from 'lucide-react';


export const Hero = ({ onExploreTrace }) => {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [pkgManager, setPkgManager] = useState('python');

  const installCommands = {
    python: 'pip install pulseagent',
    npm: 'npm i @pulseagent/sdk'
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommands[pkgManager]);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background radial glow & grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[340px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Release Pill */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-mono mb-6 transition-transform hover:scale-[1.02] cursor-default">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold tracking-wide">PulseAgent 2.4</span>
          <span className="text-zinc-400 dark:text-zinc-600">|</span>
          <span className="text-zinc-600 dark:text-zinc-300">Deterministic LLM Graph & Tool Telemetry</span>
        </div>

        {/* Primary Punchy Value Proposition */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-4xl mx-auto leading-[1.15] sm:leading-[1.12]">
          You wouldn't ship a backend with no logs.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400">
            Why is your agent a black box?
          </span>
        </h1>

        {/* Sharp Supporting Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          PulseAgent reveals exactly what autonomous pipelines do in production: which tool call timed out, which node mutated state unexpectedly, and where runaway token loops are burning capital.
        </p>

        {/* CTAs & Terminal snippet */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto">
          {/* Primary CTA */}
          <a
            href="#sdk"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 text-sm font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start Tracing Free</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Secondary CTA */}
          <button
            onClick={onExploreTrace}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 text-sm font-medium rounded-xl text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>See a Live Failed Trace</span>
          </button>
        </div>

        {/* 1-Click Copy Package Install Snippet */}
        <div className="mt-8 inline-flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 shadow-inner">
          <div className="flex items-center space-x-1 p-0.5 rounded-lg bg-zinc-200 dark:bg-zinc-950">
            <button
              onClick={() => setPkgManager('python')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                pkgManager === 'python'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
            >
              Python
            </button>
            <button
              onClick={() => setPkgManager('npm')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                pkgManager === 'npm'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
              }`}
            >
              Node.js
            </button>

          </div>

          <div className="flex items-center space-x-2 px-3 py-1">
            <Terminal className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-zinc-800 dark:text-zinc-200 select-all">{installCommands[pkgManager]}</span>
            <button
              onClick={handleCopy}
              className="p-1 rounded text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              title="Copy install command"
              aria-label="Copy install command"
            >
              {copiedInstall ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Honest Framing & Social Proof */}
        <div className="mt-12 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-mono text-zinc-500 dark:text-zinc-400 font-semibold mb-4">
            Built for engineering teams running production agent pipelines
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>LangGraph / LangChain</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>CrewAI & AutoGen</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>LlamaIndex Workflows</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Raw Claude & OpenAI APIs</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
