import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  LayoutGrid, 
  SlidersHorizontal, 
  ShieldCheck, 
  Building2,
  Award
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonials';
import { Testimonial } from '../types';

export const ClientTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [layoutMode, setLayoutMode] = useState<'carousel' | 'grid'>('carousel');
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = TESTIMONIALS_DATA.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-advance in carousel mode
  useEffect(() => {
    if (layoutMode === 'carousel' && !isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [layoutMode, isPaused, currentIndex]);

  const activeTestimonial: Testimonial = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="testimonials" className="py-18 lg:py-24 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with View Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-2 font-mono">
              <span>Client Impact</span>
              <span aria-hidden="true" className="text-amber-500">·</span>
              <span>Verified Hardware Outcomes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
              Trusted by leaders in aerospace, robotics & surgical devices.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
              Concrete outcomes from engineering directors and CTOs who partnered with BioCore-Design for mission-critical mechanical systems.
            </p>
          </div>

          {/* Layout Mode Segmented Control (Zero-Pill interactive buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-200/80 dark:bg-neutral-900 border border-neutral-300/80 dark:border-neutral-800 rounded-lg shrink-0">
            <button
              onClick={() => setLayoutMode('carousel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                layoutMode === 'carousel'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
              title="Carousel spotlight view"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Carousel</span>
            </button>
            <button
              onClick={() => setLayoutMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                layoutMode === 'grid'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
              title="Full grid overview"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All Reviews</span>
            </button>
          </div>
        </div>

        {/* Carousel View Mode */}
        {layoutMode === 'carousel' ? (
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-7 sm:p-10 lg:p-12 shadow-sm transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left 8 Columns: Testimonial Narrative */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Scope header & Standard */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">{activeTestimonial.industry}</span>
                    <span aria-hidden="true">·</span>
                    <span>Scope: {activeTestimonial.projectScope}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeTestimonial.year}</span>
                  </div>

                  {/* Primary Quote */}
                  <div className="relative">
                    <Quote className="w-8 h-8 text-neutral-200 dark:text-neutral-800 absolute -top-4 -left-2 -z-0" />
                    <p className="relative text-base sm:text-lg lg:text-xl text-neutral-800 dark:text-neutral-100 font-normal leading-relaxed italic">
                      "{activeTestimonial.quote}"
                    </p>
                  </div>

                  {/* Client Attributions */}
                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-base text-neutral-900 dark:text-white">
                        {activeTestimonial.clientName}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                        {activeTestimonial.role} · <span className="text-neutral-700 dark:text-neutral-300 font-semibold">{activeTestimonial.company}</span>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-mono bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-1 rounded-sm">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                      <span>{activeTestimonial.standardOrCertification}</span>
                    </div>
                  </div>
                </div>

                {/* Right 4 Columns: Concrete Verified Metric Card */}
                <div className="lg:col-span-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/80 p-6 sm:p-7 text-center lg:text-left flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">
                      Verified Hardware Benchmark
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono text-neutral-900 dark:text-white">
                      {activeTestimonial.verifiedMetric}
                    </div>
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-1">
                      {activeTestimonial.metricLabel}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800/80 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Verification Audit:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Passed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Compliance:</span>
                      <span className="text-neutral-700 dark:text-neutral-300">{activeTestimonial.standardOrCertification.split('&')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Toolbar */}
            <div className="mt-6 flex items-center justify-between">
              {/* Pagination indicators */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS_DATA.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 transition-all rounded-full cursor-pointer ${
                      currentIndex === idx 
                        ? 'w-8 bg-amber-500' 
                        : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 ml-2">
                  0{currentIndex + 1} / 0{total}
                </span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Grid View Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
              >
                <div>
                  {/* Category and Year */}
                  <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-3">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">{item.industry.split('&')[0]}</span>
                    <span>{item.year}</span>
                  </div>

                  {/* Benchmark pill metric */}
                  <div className="mb-4 p-3 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60">
                    <div className="text-2xl font-extrabold font-mono text-neutral-900 dark:text-white">
                      {item.verifiedMetric}
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
                      {item.metricLabel}
                    </div>
                  </div>

                  {/* Quote text */}
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed italic mb-6">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author footer */}
                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                  <div className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">
                    {item.clientName}
                  </div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono truncate">
                    {item.role}
                  </div>
                  <div className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 truncate">
                    {item.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
