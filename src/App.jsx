import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TraceDashboard } from './components/TraceDashboard';
import { PainPoints } from './components/PainPoints';
import { ArchitectureComparison } from './components/ArchitectureComparison';
import { SdkIntegration } from './components/SdkIntegration';
import { CostLatencySimulator } from './components/CostLatencySimulator';
import { Pricing } from './components/Pricing';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { KonamiToast } from './components/KonamiToast';
import { useKonamiCode } from './hooks/useKonamiCode';

export function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pulseagent_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  const { isTriggered, triggerCelebration, resetKonami } = useKonamiCode();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pulseagent_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pulseagent_theme', 'light');
    }
  }, [darkMode]);

  const handleExploreTrace = () => {
    const el = document.getElementById('trace-inspector');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 transition-colors duration-200 selection:bg-emerald-500/30 selection:text-emerald-200 ${
      isTriggered ? 'matrix-overdrive' : ''
    }`}>
      {/* Konami celebration toast */}
      <KonamiToast active={isTriggered} onDismiss={resetKonami} />

      {/* Main App Navigation */}
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        onExploreTrace={handleExploreTrace} 
      />

      <main>
        {/* 1. Hero Section with Value Prop & CTAs */}
        <Hero onExploreTrace={handleExploreTrace} />

        {/* 2. Product-In-Action: Live Trace Dashboard & Micro-interaction */}
        <TraceDashboard konamiActive={isTriggered} />

        {/* 3. Real Pain Points & Architectural Capabilities */}
        <PainPoints />

        {/* 4. Telemetry Paradigm: Log Soup vs Structured DAG */}
        <ArchitectureComparison />

        {/* 5. Zero-Overhead SDK Integration & OTel */}
        <SdkIntegration />

        {/* 6. Runaway Token Spend & Latency ROI Simulator */}
        <CostLatencySimulator />

        {/* 7. Honest, Defensible Pricing */}
        <Pricing />

        {/* 8. Technical FAQ */}
        <FaqSection />
      </main>

      {/* Footer with Easter Egg trigger */}
      <Footer onTriggerKonami={triggerCelebration} />
    </div>
  );
}

export default App;

