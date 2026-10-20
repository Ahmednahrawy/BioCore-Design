import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Cpu, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { InteractiveCadViewer } from './InteractiveCadViewer';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [assembliesCount, setAssembliesCount] = useState(0);
  const [massReduction, setMassReduction] = useState(0);
  const [yieldPass, setYieldPass] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1800;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      
      setAssembliesCount(ease * 420);
      setMassReduction(ease * 38.4);
      setYieldPass(ease * 100);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    const frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-neutral-200 dark:border-neutral-800 bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Column 1: Editorial Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Subtle editorial kicker (Clean unboxed text, no pill badges) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
              <span>{t.heroKicker1}</span>
              <span aria-hidden="true" className="text-amber-500">·</span>
              <span>{t.heroKicker2}</span>
              <span aria-hidden="true" className="text-amber-500">·</span>
              <span>{t.heroKicker3}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.12]" style={{ textWrap: 'balance' }}>
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo('quote-estimator')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-neutral-900 dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 rounded-md transition-all shadow-sm cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <span>{t.heroCtaQuote}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo('portfolio')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <span>{t.heroCtaPortfolio}</span>
              </button>
            </div>

            {/* Credibility certifications */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <span>AS9100D & ISO 9001:2015</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <span>ASME Y14.5-2018 GD&T</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                <span>ITAR & EAR Compliant Facility</span>
              </div>
            </div>
          </div>

          {/* Column 2: Dynamic Interactive CAD / FEA Inspection Viewer */}
          <div className="lg:col-span-5">
            <InteractiveCadViewer />
          </div>
        </div>

        {/* Adjacency Proof Row: Tabular Numerical Metrics Strip with Live Telemetry */}
        <div className="mt-14 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="group">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 dark:text-white flex items-baseline gap-1">
              <span>{Math.round(assembliesCount)}</span>
              <span className="text-amber-500">+</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              Production Assemblies Delivered
            </p>
          </div>

          <div className="group">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 dark:text-white">
              ±0.002 mm
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              Sub-Micron Machining Tolerances
            </p>
          </div>

          <div className="group">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 dark:text-white flex items-baseline gap-1">
              <span>-{massReduction.toFixed(1)}%</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              Average Mass Reduction via Topology FEA
            </p>
          </div>

          <div className="group">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 dark:text-white flex items-baseline gap-1">
              <span>{Math.round(yieldPass)}%</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              First-Pass DFM Tooling Yield
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
