import React, { useState } from 'react';
import { Activity, Sun, Moon, Menu, X, ArrowRight, Cpu } from 'lucide-react';


export const Navbar = ({ darkMode, setDarkMode, onExploreTrace }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Trace Inspector', href: '#trace-inspector' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'SDK & API', href: '#sdk' },
    { label: 'ROI Simulator', href: '#simulator' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800/80 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <a href="#" className="flex items-center space-x-2.5 group">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 text-emerald-400 group-hover:border-emerald-500/50 transition-colors shadow-sm">
                <Activity className="w-5 h-5 transition-transform group-hover:scale-110 duration-200" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-50">
                    Pulse<span className="text-emerald-500 dark:text-emerald-400">Agent</span>
                  </span>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    v2.4
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono tracking-tight hidden sm:block">
                  LLM Pipeline Observability
                </span>
              </div>
            </a>

            {/* Live Heartbeat Badge */}
            <div className="hidden xl:flex items-center space-x-1.5 pl-4 border-l border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Ingestion: <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">&lt;1.2ms p99</strong></span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-1.5 rounded-md hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center space-x-2.5">
            {/* Dark / Light Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
              aria-label="Toggle color theme"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-600" />}
            </button>

            {/* Inspect Trace CTA Button */}
            <button
              onClick={onExploreTrace}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 transition-colors"
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-500" />
              <span>Live Trace</span>
            </button>

            {/* Primary Action Button */}
            <a
              href="#sdk"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#sdk');
              }}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-sm transition-all hover:shadow hover:shadow-emerald-500/20 active:scale-[0.98]"
            >
              <span>Start Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg lg:hidden text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2 rounded-md text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExploreTrace();
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-xs font-mono font-medium rounded-lg text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-750"
            >
              <Cpu className="w-4 h-4 text-emerald-500" />
              <span>Inspect Live Agent Trace</span>
            </button>
            <a
              href="#sdk"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#sdk');
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-500 text-zinc-950"
            >
              <span>Install SDK & Get Free API Key</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
