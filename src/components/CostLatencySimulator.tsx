import React, { useState } from 'react';
import { ShieldAlert, Clock, Coins } from 'lucide-react';


export const CostLatencySimulator: React.FC = () => {
  const [dailyRuns, setDailyRuns] = useState<number>(10000);
  const [stepsPerRun, setStepsPerRun] = useState<number>(5);
  const [modelType, setModelType] = useState<'sonnet' | 'gpt4o' | 'mini' | 'deepseek'>('sonnet');

  // Pricing constants (per 1k tokens combined avg)
  const modelRates = {
    sonnet: 0.009, // ~ per 1M tokens
    gpt4o: 0.0075,
    mini: 0.0004,
    deepseek: 0.0012
  };

  const modelLabels = {
    sonnet: 'Claude 3.7 Sonnet',
    gpt4o: 'GPT-4o',
    mini: 'GPT-4o-mini',
    deepseek: 'DeepSeek V3'
  };

  // Calculations
  const monthlyRuns = dailyRuns * 30;
  const avgTokensPerStep = 850;
  const totalTokensPerRun = stepsPerRun * avgTokensPerStep;
  const monthlyTotalTokens = (monthlyRuns * totalTokensPerRun) / 1000; // in thousands
  const estimatedMonthlyLlmSpend = monthlyTotalTokens * modelRates[modelType];

  // Industry average: ~4.2% of multi-step agent runs hit silent tool retry storms or loops without circuit breakers
  const estimatedWastePercentage = 0.052;
  const estimatedSavedWaste = estimatedMonthlyLlmSpend * estimatedWastePercentage;
  const estimatedSilentFailuresCaught = Math.round(monthlyRuns * 0.038);
  const estimatedEngineeringHoursSaved = Math.min(180, Math.round(estimatedSilentFailuresCaught * 0.15));

  return (
    <section id="simulator" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-semibold">
            Pipeline Economics
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Estimate your runaway token burn savings.
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Simulate the operational impact of catching silent tool failures and killing infinite retry loops before they inflate your monthly provider invoice.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Input Controls */}
            <div className="space-y-6">
              {/* Daily Agent Executions Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="daily-runs-slider" className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
                    Daily Agent Executions
                  </label>
                  <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {dailyRuns.toLocaleString()} runs/day
                  </span>
                </div>
                <input
                  id="daily-runs-slider"
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={dailyRuns}
                  onChange={(e) => setDailyRuns(Number(e.target.value))}
                  aria-label="Daily Agent Executions"
                  className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                  <span>1,000</span>
                  <span>50,000</span>
                  <span>100,000</span>
                </div>
              </div>

              {/* Steps / Nodes per Agent Run */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="steps-depth-slider" className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono">
                    Average Graph Depth (Nodes per Run)
                  </label>
                  <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                    {stepsPerRun} steps
                  </span>
                </div>
                <input
                  id="steps-depth-slider"
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={stepsPerRun}
                  onChange={(e) => setStepsPerRun(Number(e.target.value))}
                  aria-label="Average Graph Depth (Nodes per Run)"
                  className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                  <span>2 nodes (Simple)</span>
                  <span>6 nodes (Standard)</span>
                  <span>12 nodes (Complex Graph)</span>
                </div>
              </div>

              {/* Primary LLM Model Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-mono mb-2">
                  Primary Model In Loop
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(modelLabels) as Array<keyof typeof modelLabels>).map((key) => (
                    <button
                      key={key}
                      onClick={() => setModelType(key)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium text-left border transition-all ${
                        modelType === key
                          ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold border-zinc-900 dark:border-zinc-100'
                          : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                      }`}
                    >
                      {modelLabels[key]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Calculation Cards */}
            <div className="rounded-xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-semibold pb-2 border-b border-zinc-200 dark:border-zinc-800">
                Estimated Monthly Observability ROI
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850">
                  <div className="flex items-center space-x-1.5 text-xs text-zinc-500 font-mono">
                    <Coins className="w-3.5 h-3.5 text-amber-500" />
                    <span>Runaway Spend Saved</span>
                  </div>
                  <div className="mt-1 text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                    ${Math.round(estimatedSavedWaste).toLocaleString()}/mo
                  </div>

                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Via circuit breaker kill-switches</div>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850">
                  <div className="flex items-center space-x-1.5 text-xs text-zinc-500 font-mono">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                    <span>Silent Failures Caught</span>
                  </div>
                  <div className="mt-1 text-2xl font-extrabold font-mono text-zinc-900 dark:text-zinc-100">
                    {estimatedSilentFailuresCaught.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">429s, WAF blocks & schema breaks</div>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs text-zinc-500 font-mono">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>On-Call Debugging Time Saved</span>
                  </div>
                  <div className="text-xl font-bold font-mono text-zinc-900 dark:text-zinc-100 mt-0.5">
                    ~{estimatedEngineeringHoursSaved} hours / month
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                  Zero Log Grepping
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
