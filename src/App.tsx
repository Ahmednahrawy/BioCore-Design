import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AnalyticsProvider, useAnalytics } from './context/AnalyticsContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProjectModal } from './components/ProjectModal';
import { QuoteEstimator } from './components/QuoteEstimator';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Project } from './types';
import { BarChart3 } from 'lucide-react';

const MainApp: React.FC = () => {
  const { openDashboard, analytics } = useAnalytics();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [quoteInitialService, setQuoteInitialService] = useState<string | undefined>(undefined);

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setQuoteInitialService(serviceTitle);
    const element = document.getElementById('quote-estimator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInitiateQuoteFromProject = (project: Project) => {
    setQuoteInitialService(
      project.category === 'Aerospace' 
        ? 'FEA Structural, Modal & Thermal Stress Analysis' 
        : project.category === 'Medical Devices' 
          ? 'Medical Device Hardware & ISO 13485 Engineering' 
          : 'Precision CAD & Kinematic Mechanism Design'
    );
    const element = document.getElementById('quote-estimator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors selection:bg-amber-500/20 selection:text-amber-600 dark:selection:text-amber-400">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Services & Core Capabilities Breakdown */}
        <ServicesSection onSelectServiceForQuote={handleSelectServiceForQuote} />

        {/* Portfolio Gallery */}
        <PortfolioSection onOpenProject={setSelectedProject} />

        {/* Interactive Custom Engineering Quote Estimator & Lead Capture */}
        <QuoteEstimator initialService={quoteInitialService} />

        {/* Blog & Engineering Dispatches */}
        <BlogSection />

        {/* Direct Contact & Labs */}
        <ContactSection />
      </main>

      <Footer />

      {/* Project Dossier Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInitiateQuoteFromProject={handleInitiateQuoteFromProject}
      />

      {/* Traffic Analytics & Lead Conversion CRM Modal */}
      <AnalyticsDashboard />

      {/* Floating Analytics HUD Button */}
      <aside aria-label="Quick Actions" className="fixed bottom-5 right-5 z-30">
        <button
          onClick={openDashboard}
          title="Open Traffic Analytics & Conversion Console"
          className="group flex items-center gap-2.5 px-3.5 py-2.5 bg-neutral-900/90 dark:bg-neutral-800/90 text-white rounded-full shadow-lg border border-neutral-700/60 hover:bg-neutral-950 dark:hover:bg-neutral-700 transition-all cursor-pointer backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        >
          <div className="relative">
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
          </div>
          <span className="text-xs font-semibold tracking-wide pr-1">
            Analytics Portal
          </span>
          <span className="text-[10px] font-mono font-bold bg-amber-500 text-neutral-950 px-1.5 py-0.5 rounded-full">
            {analytics.totalQuotesReceived} RFQs
          </span>
        </button>
      </aside>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AnalyticsProvider>
        <MainApp />
      </AnalyticsProvider>
    </ThemeProvider>
  );
}
