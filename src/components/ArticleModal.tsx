import React from 'react';
import { X, Calendar, Clock, User, Share2, BookOpen } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-neutral-950/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <article
        className="relative w-full max-w-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <span>PRECISION DISPATCH</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-600 dark:text-amber-400 font-semibold">{article.category}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-md transition-colors cursor-pointer"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-3">
              {article.title}
            </h1>

            {/* Unboxed metadata line with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 pb-4 border-b border-neutral-200 dark:border-neutral-800 font-mono">
              <span>{article.author.name} ({article.author.role})</span>
              <span aria-hidden="true">·</span>
              <span>{article.date}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Lead Summary */}
          <p className="text-base font-medium text-neutral-700 dark:text-neutral-200 leading-relaxed italic border-l-2 border-amber-500 pl-4 py-1">
            {article.summary}
          </p>

          {/* Introduction */}
          <div className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed space-y-4">
            <p>{article.content.introduction}</p>

            {/* Sections */}
            {article.content.sections.map((section, idx) => (
              <div key={idx} className="pt-4 space-y-3">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">
                  {section.heading}
                </h3>
                <p className="leading-relaxed">{section.body}</p>

                {/* Optional Technical Table */}
                {section.tableData && (
                  <div className="my-4 overflow-x-auto rounded-md border border-neutral-200 dark:border-neutral-800">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-neutral-100 dark:bg-neutral-800/80 font-mono text-neutral-900 dark:text-neutral-100">
                        <tr>
                          {section.tableData.headers.map((h, i) => (
                            <th key={i} className="p-2.5 font-semibold border-b border-neutral-200 dark:border-neutral-700">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {section.tableData.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-2.5 font-mono text-neutral-700 dark:text-neutral-300">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}

            {/* Conclusion */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <h4 className="font-bold text-neutral-900 dark:text-white mb-2">Key Engineering Takeaway</h4>
              <p className="leading-relaxed">{article.content.conclusion}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Published by Vektor Dynamics Engineering Editorial
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 rounded-md cursor-pointer"
          >
            Close Article
          </button>
        </div>
      </article>
    </div>
  );
};
