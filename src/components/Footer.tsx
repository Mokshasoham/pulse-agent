import React from 'react';
import { Activity, Sparkles } from 'lucide-react';

interface FooterProps {
  onTriggerKonami?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTriggerKonami }) => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-950/60 py-12 text-zinc-600 dark:text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                Pulse<span className="text-emerald-500">Agent</span>
              </span>
            </div>
            <span className="hidden sm:inline text-zinc-400 dark:text-zinc-600">•</span>
            <span className="text-xs text-zinc-500 font-mono">
              The Observability Standard for Autonomous LLM Graph Pipelines
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <a href="#trace-inspector" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Trace Inspector
            </a>
            <a href="#capabilities" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Capabilities
            </a>
            <a href="#sdk" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              SDK & Docs
            </a>
            <a href="#pricing" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Pricing
            </a>
            <a 
              href="https://github.com/Mokshasoham/Acdyon-project" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-mono"
            >

              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>


        {/* Bottom Sub-bar with Easter Egg Trigger Pill */}
        <div className="mt-8 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} PulseAgent Technologies. Built with craft & honesty for Acdyon Technologies Frontend Challenge.
          </div>

          {/* Konami Easter Egg Trigger Hint */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onTriggerKonami}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-zinc-200/80 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/30 border border-zinc-300/50 dark:border-zinc-800 transition-colors font-mono text-[10px]"
              title="Click to trigger secret easter egg or enter Konami code on keyboard"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Easter Egg: <kbd className="px-1 py-0.5 rounded bg-zinc-300 dark:bg-zinc-800 text-[9px]">↑↑↓↓←→←→BA</kbd></span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
