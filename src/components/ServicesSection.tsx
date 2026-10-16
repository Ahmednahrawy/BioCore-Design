import React from 'react';
import { ArrowUpRight, CheckCircle2, Sliders, Layers, FileSpreadsheet } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';
import { Service } from '../types';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  return (
    <section id="capabilities" className="py-18 lg:py-24 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-2">
            <span>Core Capabilities</span>
            <span aria-hidden="true" className="text-amber-500">·</span>
            <span>Turnkey Engineering</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Engineering disciplines calibrated for high-consequence hardware.
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
            From kinematic concept architecture to GD&T drawing releases and First Article inspection, our engineering disciplines prevent tooling redesigns and maximize production yields.
          </p>
        </div>

        {/* 2-Column Asymmetric Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES_DATA.map((service: Service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div>
                {/* Numbered Header + Code */}
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
                    {service.code}.
                  </span>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    {service.turnaround}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 dark:text-white tracking-tight mb-1">
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-4">
                  {service.subtitle}
                </p>

                <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider">
                    Core Deliverables
                  </div>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer: Tools & Quote Action */}
              <div className="pt-5 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{service.tools.slice(0, 2).join(', ')}</span>
                </div>

                <button
                  onClick={() => onSelectServiceForQuote(service.title)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                >
                  <span>Scope this service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
