import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, BarChart2, Menu, X, ArrowUpRight, Globe, Check, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAnalytics } from '../context/AnalyticsContext';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { openDashboard, analytics } = useAnalytics();
  const { language, setLanguage, t, currentOption } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  // Close language menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            BK
          </div>
          <span className="font-extrabold tracking-tight">BIO<span className="font-light text-neutral-500 dark:text-neutral-400">CORE</span></span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <button 
            onClick={() => scrollTo('portfolio')} 
            className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {t.navPortfolio}
          </button>
          <button 
            onClick={() => scrollTo('capabilities')} 
            className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {t.navCapabilities}
          </button>
          <button 
            onClick={() => scrollTo('quote-estimator')} 
            className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {t.navQuote}
          </button>
          <button 
            onClick={() => scrollTo('contact')} 
            className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {t.navContact}
          </button>
        </nav>

        {/* Zone 3: Primary Action + Utility Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Selector Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors cursor-pointer border border-neutral-200/80 dark:border-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              title={`Change Language (${currentOption.label})`}
              aria-label="Change Language"
              aria-expanded={langMenuOpen}
            >
              <Globe className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
              <span className="text-xs font-mono font-bold tracking-tight">
                {currentOption.code}
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 opacity-60 ${langMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-1.5 z-50 w-44 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl py-1 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 border-b border-neutral-100 dark:border-neutral-800">
                  Select Language
                </div>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800/80 transition-colors cursor-pointer ${
                      language === lang.code 
                        ? 'font-bold text-amber-600 dark:text-amber-400 bg-neutral-50 dark:bg-neutral-800/40' 
                        : 'text-neutral-700 dark:text-neutral-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </span>
                    {language === lang.code && <Check className="w-3.5 h-3.5 text-amber-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

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
            <span>{t.requestQuoteBtn}</span>
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
          {/* Mobile Language Selector */}
          <div className="pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-2">
              Language
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                  }}
                  className={`flex items-center gap-2 p-2 rounded border text-xs font-medium cursor-pointer transition-colors ${
                    language === lang.code
                      ? 'border-amber-500 bg-amber-500/10 text-neutral-950 dark:text-white font-bold'
                      : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-3 text-sm font-medium">
            <button
              onClick={() => scrollTo('portfolio')}
              className="text-left py-2 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white"
            >
              {t.navPortfolio}
            </button>
            <button
              onClick={() => scrollTo('quote-estimator')}
              className="text-left py-2 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white"
            >
              {t.navQuote}
            </button>
            <button
              onClick={() => scrollTo('testimonials')}
              className="text-left py-2 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white"
            >
              {t.navTestimonials}
            </button>
            <button
              onClick={() => scrollTo('insights')}
              className="text-left py-2 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white"
            >
              {t.navInsights}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left py-2 text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white"
            >
              {t.navContact}
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
              {t.requestQuoteBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
