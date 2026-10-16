import React from 'react';
import { X, CheckCircle, ArrowRight, Shield, Layers, Wrench } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInitiateQuoteFromProject: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInitiateQuoteFromProject,
}) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <span>PROJECT DOSSIER</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-md transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-8">
          {/* Main Title & Hero Media */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
              {project.title}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 font-mono">
              Client Domain: {project.clientIndustry}
            </p>

            <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-72 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Technical Specs Matrix (Tabular Figures) */}
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 p-5">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-4">
              Verified Engineering Specifications & Metrology
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Primary Envelope</span>
                <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">{project.technicalSpecs.dimensions}</span>
              </div>
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Alloy / Material</span>
                <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">{project.technicalSpecs.primaryMaterial}</span>
              </div>
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">GD&T True Position</span>
                <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">{project.technicalSpecs.gdntTolerance}</span>
              </div>
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Mass Delta</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">{project.technicalSpecs.weightReduction}</span>
              </div>
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Factor of Safety (Yield)</span>
                <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">{project.technicalSpecs.stressFactorOfSafety}</span>
              </div>
              <div>
                <span className="text-neutral-500 dark:text-neutral-400 block mb-0.5">Operating Temp Window</span>
                <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">{project.technicalSpecs.thermalEnvelope}</span>
              </div>
            </div>
          </div>

          {/* Narrative: Challenge, Solution, Outcome */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                  <span className="text-amber-500">01.</span> The Engineering Challenge
                </h4>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-xs sm:text-sm">
                  {project.challenge}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                  <span className="text-amber-500">02.</span> CAD & Simulation Solution
                </h4>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-xs sm:text-sm">
                  {project.solution}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-neutral-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                  <span className="text-amber-500">03.</span> Verified Production Results
                </h4>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-xs sm:text-sm">
                  {project.results}
                </p>
              </div>

              <div className="p-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-800/40 space-y-2 text-xs">
                <div className="font-semibold text-neutral-900 dark:text-white">Manufacturing & Compliance Stack</div>
                <div className="flex flex-wrap gap-2 text-neutral-600 dark:text-neutral-300">
                  <span className="font-mono">Process: {project.manufacturingProcess}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-neutral-500 dark:text-neutral-400">
                  <span>Standards: {project.standards.join(' · ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Have a similar hardware requirement?
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onInitiateQuoteFromProject(project);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 rounded-md transition-colors cursor-pointer shadow-xs"
            >
              <span>Request Quote for Similar Scope</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
