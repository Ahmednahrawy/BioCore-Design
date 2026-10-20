import React from 'react';
import { ArrowRight, ShieldCheck, Cpu, Compass } from 'lucide-react';
import { HERO_IMAGE_URL } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
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

          {/* Column 2: High-Fidelity Engineering Visual Carrier */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shadow-xl group">
              <img
                src={HERO_IMAGE_URL}
                alt="Precision multi-axis titanium robotic mechanism inspected on granite surface plate"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              {/* Engineering overlay watermark badge */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/50 to-transparent p-4 sm:p-5 text-white">
                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <span className="font-mono text-amber-400 font-medium">TI-MAM-7439 / AS9100D</span>
                  <span className="font-mono">TOL: ±0.005 mm</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-neutral-100 mt-1">
                  5-Axis CNC Machined Titanium Cycloidal Actuator Assembly
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Adjacency Proof Row: Tabular Numerical Metrics Strip */}
        <div className="mt-14 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 dark:text-white">
              420+
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              Production Assemblies Delivered
            </p>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 dark:text-white">
              ±0.002 mm
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              Sub-Micron Machining Tolerances
            </p>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 dark:text-white">
              -38.4%
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
              Average Mass Reduction via Topology FEA
            </p>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-neutral-900 dark:text-white">
              100%
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
