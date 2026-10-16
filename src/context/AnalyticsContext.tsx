import React, { createContext, useContext, useEffect, useState } from 'react';
import { AnalyticsSummary, QuoteRequest } from '../types';
import { INITIAL_ANALYTICS, INITIAL_LEADS } from '../data/analytics';

interface AnalyticsContextType {
  analytics: AnalyticsSummary;
  leads: QuoteRequest[];
  isDashboardOpen: boolean;
  openDashboard: () => void;
  closeDashboard: () => void;
  toggleDashboard: () => void;
  trackProjectView: (projectId: string) => void;
  trackQuoteStarted: () => void;
  submitQuoteRequest: (quote: Omit<QuoteRequest, 'id' | 'submittedAt' | 'status'>) => QuoteRequest;
  updateLeadStatus: (id: string, status: QuoteRequest['status']) => void;
  deleteLead: (id: string) => void;
  resetAnalyticsData: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

const ANALYTICS_STORAGE_KEY = 'vektor_analytics_state_v1';
const LEADS_STORAGE_KEY = 'vektor_leads_state_v1';

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const [analytics, setAnalytics] = useState<AnalyticsSummary>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    return INITIAL_ANALYTICS;
  });

  const [leads, setLeads] = useState<QuoteRequest[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(LEADS_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    return INITIAL_LEADS;
  });

  // Track page view once per session
  useEffect(() => {
    setAnalytics((prev) => {
      const updated = {
        ...prev,
        totalVisitors: prev.totalVisitors + 1,
        pageViews: prev.pageViews + 1,
      };
      try {
        localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Storage fail safe
      }
      return updated;
    });
  }, []);

  // Save leads
  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch {
      // Storage fail safe
    }
  }, [leads]);

  const openDashboard = () => setIsDashboardOpen(true);
  const closeDashboard = () => setIsDashboardOpen(false);
  const toggleDashboard = () => setIsDashboardOpen((prev) => !prev);

  const trackProjectView = (_projectId: string) => {
    setAnalytics((prev) => {
      const updated = {
        ...prev,
        pageViews: prev.pageViews + 1,
      };
      try {
        localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const trackQuoteStarted = () => {
    setAnalytics((prev) => {
      const updatedDaily = [...prev.dailyTrend];
      const todayIdx = updatedDaily.length - 1;
      if (todayIdx >= 0) {
        updatedDaily[todayIdx] = {
          ...updatedDaily[todayIdx],
          quotesStarted: updatedDaily[todayIdx].quotesStarted + 1,
        };
      }
      const updated = {
        ...prev,
        dailyTrend: updatedDaily,
      };
      try {
        localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const submitQuoteRequest = (quoteData: Omit<QuoteRequest, 'id' | 'submittedAt' | 'status'>): QuoteRequest => {
    const randomIdSuffix = Math.floor(1000 + Math.random() * 9000);
    const newQuote: QuoteRequest = {
      ...quoteData,
      id: `RFQ-${randomIdSuffix}`,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New'
    };

    setLeads((prev) => [newQuote, ...prev]);

    // Update analytics conversion counter
    setAnalytics((prev) => {
      const newQuotesCount = prev.totalQuotesReceived + 1;
      const newConversionRate = Number(((newQuotesCount / prev.totalVisitors) * 100).toFixed(2));
      const updatedDaily = [...prev.dailyTrend];
      const todayIdx = updatedDaily.length - 1;
      if (todayIdx >= 0) {
        updatedDaily[todayIdx] = {
          ...updatedDaily[todayIdx],
          quotesSubmitted: updatedDaily[todayIdx].quotesSubmitted + 1,
        };
      }

      const updated: AnalyticsSummary = {
        ...prev,
        totalQuotesReceived: newQuotesCount,
        quoteConversionRate: newConversionRate,
        dailyTrend: updatedDaily,
      };

      try {
        localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(updated));
      } catch {}

      return updated;
    });

    return newQuote;
  };

  const updateLeadStatus = (id: string, status: QuoteRequest['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const resetAnalyticsData = () => {
    setAnalytics(INITIAL_ANALYTICS);
    setLeads(INITIAL_LEADS);
    localStorage.removeItem(ANALYTICS_STORAGE_KEY);
    localStorage.removeItem(LEADS_STORAGE_KEY);
  };

  return (
    <AnalyticsContext.Provider
      value={{
        analytics,
        leads,
        isDashboardOpen,
        openDashboard,
        closeDashboard,
        toggleDashboard,
        trackProjectView,
        trackQuoteStarted,
        submitQuoteRequest,
        updateLeadStatus,
        deleteLead,
        resetAnalyticsData,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
