import React, { useState } from 'react';
import { Sun, Moon, BarChart2, Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAnalytics } from '../context/AnalyticsContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { openDashboard, analytics } = useAnalytics();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-neutral-950/90 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-neutral-900 dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
        >
          <div className="w-7 h-7 rounded-sm bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-950 font-mono text-xs font-black tracking-tighter">
            BD
          </div>
          <span className="font-extrabold tracking-tight">BIOCORE<span className="font-light text-neutral-500 dark:text-neutral-400">-DESIGN</span></span>
        </a>

        {/* Zone 2: 4-5 Navigation Links (single-line, clean hover) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <button 
            onClick={() => scrollTo('capabilities')} 
            className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            Capabilities
          </button>
          <button 
            onClick={() => scrollTo('portfolio')} 
            className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            Portfolio
          </button>
          <button 
            onClick={() => scrollTo('quote-estimator')} 
            className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            Engineering Quote
          </button>
          <button 
            onClick={() => scrollTo('insights')} 
            className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            Technical Insights
          </button>
          <button 
            onClick={() => scrollTo('contact')} 
            className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: Primary Action + Utility Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Analytics Dashboard Trigger */}
          <button
            onClick={openDashboard}
            title="View Agency Traffic & Conversion Analytics"
            className="relative p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Open Traffic Analytics Dashboard"
          >
            <BarChart2 className="w-4.5 h-4.5" />
            <span className="sr-only">Analytics</span>
            {analytics.totalQuotesReceived > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-neutral-950 font-mono">
                {analytics.totalQuotesReceived}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4.5 h-4.5 text-amber-400" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-neutral-700" />
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => scrollTo('quote-estimator')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white dark:text-neutral-950 bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-100 rounded-md transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 whitespace-nowrap"
          >
            <span>Request Quote</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-md cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/98 dark:bg-neutral-950/98 px-5 py-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <button
              onClick={() => scrollTo('capabilities')}
              className="text-left py-2 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white"
            >
              Capabilities & Services
            </button>
            <button
              onClick={() => scrollTo('portfolio')}
              className="text-left py-2 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white"
            >
              Portfolio Gallery
            </button>
            <button
              onClick={() => scrollTo('quote-estimator')}
              className="text-left py-2 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white"
            >
              Custom Engineering Quote
            </button>
            <button
              onClick={() => scrollTo('insights')}
              className="text-left py-2 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white"
            >
              Technical Insights & Blog
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left py-2 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white"
            >
              Contact Engineering
            </button>
          </div>
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            <button
              onClick={openDashboard}
              className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 flex items-center gap-1.5"
            >
              <BarChart2 className="w-4 h-4 text-amber-500" />
              Traffic Analytics Dashboard
            </button>
            <button
              onClick={() => scrollTo('quote-estimator')}
              className="px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 rounded-md"
            >
              Request Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
