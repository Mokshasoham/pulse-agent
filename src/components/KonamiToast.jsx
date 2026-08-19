import React from 'react';
import { Sparkles, X, RotateCcw } from 'lucide-react';


export const KonamiToast = ({ active, onDismiss }) => {
  if (!active) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className="rounded-2xl bg-zinc-950 text-white p-4 sm:p-5 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/30 flex items-start space-x-3.5 relative overflow-hidden">
        {/* Background emerald scanline shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5 animate-spin" />
        </div>

        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Easter Egg Unlocked!
            </span>
          </div>

          <h4 className="mt-1.5 text-sm font-bold text-zinc-100 flex items-center space-x-1.5">
            <span>Agent achieved 100% uptime. Suspicious.</span>
            <span>🕵️‍♂️</span>
          </h4>

          <p className="mt-1 text-xs text-zinc-400 leading-relaxed font-mono">
            Matrix overdrive activated: all downstream tools returned HTTP 200 and zero tokens were wasted.
          </p>

          <div className="mt-3 flex items-center space-x-2">
            <button
              onClick={onDismiss}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-emerald-400" />
              <span>Reset Mode</span>
            </button>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-zinc-400 hover:text-white p-1 rounded-md"
          aria-label="Close toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
