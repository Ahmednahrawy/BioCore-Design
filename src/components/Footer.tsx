import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

export const Footer: React.FC = () => {
  const { openDashboard } = useAnalytics();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-neutral-200 dark:border-neutral-800">
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold text-base tracking-tight">
              <div className="w-6 h-6 rounded-xs bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-950 font-mono text-xs font-black">
                BD
              </div>
              <span>BIOCORE-DESIGN</span>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              Precision mechanical engineering, kinematics modeling, FEA simulation, and DFM optimization for aerospace, robotics, and medical device hardware innovators.
            </p>

            <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-500 space-y-1">
              <div>AS9100D & ISO 9001:2015 Registered Facility</div>
              <div>ASME Y14.5M Geometric Dimensioning & Tolerancing</div>
              <div>ITAR / EAR Registered Compliance</div>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Disciplines & Portfolio
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('capabilities')} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer">
                  Precision CAD & Kinematics
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('capabilities')} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer">
                  FEA Structural & Thermal Simulation
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('capabilities')} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer">
                  Design for Manufacturing (DFM)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('portfolio')} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer">
                  Flight Actuators & Robotic Gimbals
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('portfolio')} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer">
                  Medical Device Packaging (ISO 13485)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('materials')} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer text-amber-600 dark:text-amber-400 font-medium">
                  Alloy & FoS Matrix Workbench
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Direct Access (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Client & Engineering Portal
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => scrollTo('quote-estimator')} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer font-medium text-amber-600 dark:text-amber-400">
                  Request Custom Engineering Quote
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('testimonials')} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer">
                  Client Testimonials & Outcomes
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('insights')} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer">
                  Technical Insights & GD&T Dispatches
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer">
                  Munich & Silicon Valley Lab Locations
                </button>
              </li>
              <li>
                <button onClick={openDashboard} className="hover:text-neutral-900 dark:hover:text-white cursor-pointer inline-flex items-center gap-1.5 font-medium">
                  <span>Agency Traffic & Conversion Analytics</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 dark:text-neutral-500 font-mono">
          <div>
            © {new Date().getFullYear()} BioCore-Design Engineering Group. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Confidentiality & NDA Guaranteed</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
