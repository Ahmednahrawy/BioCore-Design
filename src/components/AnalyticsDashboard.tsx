import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Filter, 
  Download, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  FileSpreadsheet,
  ArrowUpRight,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';
import { QuoteRequest } from '../types';

export const AnalyticsDashboard: React.FC = () => {
  const { 
    analytics, 
    leads, 
    isDashboardOpen, 
    closeDashboard, 
    updateLeadStatus, 
    deleteLead,
    resetAnalyticsData 
  } = useAnalytics();

  const [leadFilter, setLeadFilter] = useState<'All' | QuoteRequest['status']>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isDashboardOpen) return null;

  const filteredLeads = leadFilter === 'All' 
    ? leads 
    : leads.filter((l) => l.status === leadFilter);

  const exportCsv = () => {
    const headers = ['RFQ ID', 'Client Name', 'Company', 'Email', 'Service', 'Material', 'Tolerance', 'Estimated Budget', 'Status', 'Submitted At'];
    const rows = leads.map(l => [
      l.id,
      `"${l.clientName}"`,
      `"${l.company}"`,
      l.email,
      `"${l.serviceCategory}"`,
      `"${l.primaryMaterial}"`,
      `"${l.toleranceGrade}"`,
      `"${l.estimatedCostRange}"`,
      l.status,
      l.submittedAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vektor_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyLeadSummary = (lead: QuoteRequest) => {
    const text = `RFQ: ${lead.id}\nClient: ${lead.clientName} (${lead.company})\nEmail: ${lead.email}\nService: ${lead.serviceCategory}\nBudget: ${lead.estimatedCostRange}\nDetails: ${lead.projectDetails}`;
    navigator.clipboard.writeText(text);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-neutral-950/80 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={closeDashboard}
    >
      <div 
        className="relative w-full max-w-6xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-2xl overflow-hidden my-4 sm:my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <BarChart3 className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                  Agency Traffic & Conversion Analytics
                </h2>
                <span className="text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm">
                  LIVE TELEMETRY
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                Data-driven content insights & inbound engineering RFP funnel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCsv}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white border border-neutral-300 dark:border-neutral-700 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Export all leads to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={closeDashboard}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-md transition-colors cursor-pointer"
              aria-label="Close analytics modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Analytics Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Key Traffic KPIs Strip (Tabular Figures) */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Total Visitors</span>
              <div className="text-2xl font-extrabold font-mono text-neutral-900 dark:text-white">
                {analytics.totalVisitors.toLocaleString()}
              </div>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                +14.2% vs last month
              </span>
            </div>

            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Page Views</span>
              <div className="text-2xl font-extrabold font-mono text-neutral-900 dark:text-white">
                {analytics.pageViews.toLocaleString()}
              </div>
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                2.78 views / visitor
              </span>
            </div>

            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Avg Dwell Time</span>
              <div className="text-2xl font-extrabold font-mono text-neutral-900 dark:text-white">
                {analytics.avgSessionDuration}
              </div>
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                High technical intent
              </span>
            </div>

            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Quote Conversion</span>
              <div className="text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-400">
                {analytics.quoteConversionRate}%
              </div>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                Top decile agency
              </span>
            </div>

            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-950/60 col-span-2 lg:col-span-1">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">Active Pipeline</span>
              <div className="text-2xl font-extrabold font-mono text-neutral-900 dark:text-white">
                {analytics.pipelineValue}
              </div>
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                {leads.length} active proposals
              </span>
            </div>
          </div>

          {/* Traffic Trend & Acquisition Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 7 Columns: Weekly Traffic & Quote Trend Chart */}
            <div className="lg:col-span-7 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-950/40">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  7-Day Traffic & Conversion Velocity
                </span>
                <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                  Daily Visitor Volume
                </span>
              </div>

              {/* Bar Visualization */}
              <div className="h-44 flex items-end justify-between gap-3 pt-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
                {analytics.dailyTrend.map((item, idx) => {
                  const maxV = 3000;
                  const heightPercent = Math.min(100, Math.round((item.visitors / maxV) * 100));
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      {/* Quote indicator badge */}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-amber-500">
                        {item.quotesSubmitted} RFQs
                      </span>
                      <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-xs flex items-end h-32 overflow-hidden">
                        <div 
                          className="w-full bg-neutral-800 dark:bg-amber-500 hover:bg-neutral-900 dark:hover:bg-amber-400 transition-all rounded-xs"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 font-medium">
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                <span>Peak Traffic: Wednesday (2,790 unique visitors)</span>
                <span>Conversion Peak: 29 quote requests</span>
              </div>
            </div>

            {/* 5 Columns: Traffic Sources & Content Suggestions */}
            <div className="lg:col-span-5 p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-950/40 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white block mb-4">
                  Inbound Traffic Acquisition Breakdown
                </span>

                <div className="space-y-3.5">
                  {analytics.topChannels.map((ch, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-700 dark:text-neutral-300 font-medium truncate max-w-[220px]">
                          {ch.channel}
                        </span>
                        <span className="font-mono text-neutral-900 dark:text-white font-semibold">
                          {ch.share}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${ch.share}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data-Driven Content Optimization Callout */}
              <div className="mt-6 p-3.5 rounded-md border border-amber-500/20 bg-amber-500/5 text-xs space-y-1">
                <div className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  <span>Data-Driven Content Optimization Action</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Organic search for "Titanium Rotary Actuator" has a 12.4% RFQ conversion rate. Publishing a case study on Harmonic Drive Backlash will drive an estimated +18 monthly RFPs.
                </p>
              </div>
            </div>
          </div>

          {/* Inbound Engineering RFQ CRM / Leads Management */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  Live Client RFQs & Inbound Engineering Inquiries ({leads.length})
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Real-time pipeline synced from the custom quote estimator and contact form
                </p>
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800/80 rounded-md border border-neutral-200 dark:border-neutral-700 text-xs">
                {(['All', 'New', 'In Review', 'Quoted', 'Archived'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setLeadFilter(st)}
                    className={`px-2.5 py-1 rounded-sm font-medium transition-colors cursor-pointer ${
                      leadFilter === st
                        ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-neutral-50 dark:bg-neutral-950 font-mono text-neutral-700 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-800">
                  <tr>
                    <th className="p-3 font-semibold">RFQ ID</th>
                    <th className="p-3 font-semibold">Client & Company</th>
                    <th className="p-3 font-semibold">Discipline & Material</th>
                    <th className="p-3 font-semibold">Estimated Budget</th>
                    <th className="p-3 font-semibold">Status</th>
                    <th className="p-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 font-sans">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-neutral-50/70 dark:hover:bg-neutral-800/30 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap">
                        {lead.id}
                      </td>

                      <td className="p-3">
                        <div className="font-semibold text-neutral-900 dark:text-white">{lead.clientName}</div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                          {lead.company} · {lead.email}
                        </div>
                      </td>

                      <td className="p-3">
                        <div className="text-neutral-800 dark:text-neutral-200 font-medium truncate max-w-[200px]">
                          {lead.serviceCategory}
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
                          {lead.primaryMaterial} · {lead.toleranceGrade}
                        </div>
                      </td>

                      <td className="p-3 font-mono font-medium text-neutral-900 dark:text-white whitespace-nowrap">
                        {lead.estimatedCostRange}
                      </td>

                      <td className="p-3 whitespace-nowrap">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as QuoteRequest['status'])}
                          className="px-2 py-1 text-xs rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono cursor-pointer"
                        >
                          <option value="New">New</option>
                          <option value="In Review">In Review</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Archived">Archived</option>
                        </select>
                      </td>

                      <td className="p-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => copyLeadSummary(lead)}
                            title="Copy lead brief to clipboard"
                            className="p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded cursor-pointer"
                          >
                            {copiedId === lead.id ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <FileSpreadsheet className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            title="Remove lead"
                            className="p-1 text-neutral-400 hover:text-rose-500 rounded cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-neutral-500 dark:text-neutral-400 text-xs">
                        No inquiries matching status filter "{leadFilter}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="px-6 py-3.5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 shrink-0">
          <span>Synced locally with browser storage for live telemetry evaluation</span>
          <div className="flex items-center gap-3">
            <button
              onClick={resetAnalyticsData}
              className="hover:text-neutral-900 dark:hover:text-white underline cursor-pointer"
            >
              Reset Seed Data
            </button>
            <button
              onClick={closeDashboard}
              className="px-3 py-1 font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 rounded-md cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
