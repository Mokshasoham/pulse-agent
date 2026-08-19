import React from 'react';
import { PRICING_TIERS } from '../data/mockTraces';
import { Check, ArrowRight } from 'lucide-react';


export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-zinc-50/50 dark:bg-zinc-900/30 border-t border-zinc-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold">
            Honest Pricing
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Free for local development. Predictable for production.
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            No surprise overages or per-seat lock-in. Scale tracing volume only when your agents go live in production.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier) => {
            return (
              <div
                key={tier.name}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                  tier.highlighted
                    ? 'bg-white dark:bg-zinc-950 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10 lg:-translate-y-2'
                    : 'bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 shadow-sm'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {tier.name}
                    </h3>
                  </div>

                  <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 min-h-[36px]">
                    {tier.description}
                  </p>

                  <div className="mt-6 mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-850">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight font-mono">
                        {tier.price}
                      </span>
                      <span className="ml-2 text-xs font-mono text-zinc-500">
                        /{tier.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs text-zinc-600 dark:text-zinc-300">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-2.5">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href="#sdk"
                    className={`w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                      tier.highlighted
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-md shadow-emerald-500/20'
                        : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            );
          })}
        </div>
      </div>
    </section>
  );
};
