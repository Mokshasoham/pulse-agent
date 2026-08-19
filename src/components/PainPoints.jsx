import React from 'react';
import { CORE_PAIN_POINTS } from '../data/mockTraces';
import { AlertTriangle, GitBranch, Flame, PlayCircle } from 'lucide-react';

const iconMap = {
  AlertTriangle,
  GitBranch,
  Flame,
  PlayCircle
};

export const PainPoints = () => {
  return (
    <section id="capabilities" className="py-16 md:py-24 bg-zinc-50/50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold">
            Architectural Guardrails
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Engineered specifically for the chaos of production agents.
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Standard APMs monitor microservices. Autonomous agents fail in completely new ways: silent tool degradation, prompt loops, and runaway context inflation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CORE_PAIN_POINTS.map((item) => {

            const IconComponent = iconMap[item.icon ] || AlertTriangle;

            return (
              <div
                key={item.title}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-emerald-500 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-850/80">
                  <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400 flex items-start space-x-1.5">
                    <span className="font-bold shrink-0 font-mono">Solution:</span>
                    <span>{item.solution}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
