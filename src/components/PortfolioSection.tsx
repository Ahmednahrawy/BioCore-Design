import React, { useState } from 'react';
import { ArrowUpRight, Gauge, Cpu, Check } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import { Project, ProjectCategory } from '../types';
import { useAnalytics } from '../context/AnalyticsContext';

interface PortfolioSectionProps {
  onOpenProject: (project: Project) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Aerospace',
  'Robotics & Automation',
  'Medical Devices',
  'Mobility & Automotive',
];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const { trackProjectView } = useAnalytics();

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const handleCardClick = (project: Project) => {
    trackProjectView(project.id);
    onOpenProject(project);
  };

  return (
    <section id="portfolio" className="py-18 lg:py-24 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-2">
              <span>Engineering Portfolio</span>
              <span aria-hidden="true" className="text-amber-500">·</span>
              <span>Case Studies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
              High-consequence hardware assemblies.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
              Each case study represents real flight qualifications, surgical trial approvals, and production line ramp-ups delivered to engineering clients.
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional segmented controls per Anti-Slop / Zero-Pill rules) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-200/80 dark:bg-neutral-900 border border-neutral-300/80 dark:border-neutral-800 rounded-lg shrink-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => handleCardClick(project)}
              className="group flex flex-col justify-between rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-xs hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                {/* Clean unboxed metadata overlay */}
                <div className="absolute top-3 left-3 bg-neutral-900/85 backdrop-blur-xs text-neutral-200 text-xs px-2.5 py-1 rounded-sm font-mono flex items-center gap-2">
                  <span>{project.category}</span>
                  <span aria-hidden="true" className="text-amber-400">/</span>
                  <span>{project.year}</span>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                    {project.clientIndustry}
                  </p>

                  <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Technical Metric Strip (Tabular Figures) */}
                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
                  <div className="grid grid-cols-3 gap-3 text-xs mb-4">
                    <div>
                      <span className="text-neutral-400 dark:text-neutral-500 block text-[11px]">Material</span>
                      <span className="font-mono font-medium text-neutral-800 dark:text-neutral-200 truncate block">
                        {project.technicalSpecs.primaryMaterial.split('&')[0]}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 dark:text-neutral-500 block text-[11px]">Tolerance</span>
                      <span className="font-mono font-medium text-amber-600 dark:text-amber-400 truncate block">
                        {project.technicalSpecs.gdntTolerance}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 dark:text-neutral-500 block text-[11px]">Mass Impact</span>
                      <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400 truncate block">
                        {project.technicalSpecs.weightReduction}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    <span>View Engineering Dossier</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
