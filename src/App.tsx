import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProjectModal } from './components/ProjectModal';
import { ClientTestimonials } from './components/ClientTestimonials';
import { QuoteEstimator } from './components/QuoteEstimator';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ChatFlyButton } from './components/ChatFlyButton';
import { ChatDrawer } from './components/ChatDrawer';
import { Project } from './types';

const MainApp: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [quoteInitialService, setQuoteInitialService] = useState<string | undefined>(undefined);
  const [isChatOpen, setIsChatOpen] = useState(false);

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

        {/* Client Testimonials & Social Proof */}
        <ClientTestimonials />

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

      {/* Live AI Customer Support Chat Fly Button & Slide-over Drawer */}
      <ChatFlyButton 
        onClick={() => setIsChatOpen(true)} 
        isOpen={isChatOpen} 
      />
      <ChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
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
