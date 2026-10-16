import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

export const ContactSection: React.FC = () => {
  const { submitQuoteRequest, openDashboard } = useAnalytics();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [inquiryType, setInquiryType] = useState('New Project Engineering RFP');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('Please fill in your name, work email, and project scope.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMessage('Please provide a valid corporate email.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      submitQuoteRequest({
        clientName: name.trim(),
        company: company.trim() || 'Independent / Confidential Client',
        email: email.trim(),
        serviceCategory: inquiryType,
        projectStage: 'Ready for DFM / Simulation',
        primaryMaterial: 'Alloy 7075-T651 Aerospace Aluminum',
        toleranceGrade: 'Precision (±0.01 mm)',
        productionVolume: '1-5 Prototype Units',
        deliverySpeed: 'Standard (4-6 Weeks)',
        ndaRequired: true,
        projectDetails: message.trim(),
        estimatedCostRange: '$8,000 - $15,000 (Direct Inquiry Estimate)',
        estimatedEngineeringHours: 50
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  return (
    <section id="contact" className="py-18 lg:py-24 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 5 Cols: Contact Information & Facilities */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                <span>Inquiries & RFP</span>
                <span aria-hidden="true" className="text-amber-500">·</span>
                <span>Direct Access</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
                Initiate a direct engineering consultation.
              </h2>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Whether you have complete SolidWorks/NX assemblies or an early concept napkin sketch, our engineering partners evaluate technical feasibility within 24 hours.
              </p>
            </div>

            {/* Direct Contact Channels */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <Mail className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">Engineering Inquiries & RFPs</div>
                  <a href="mailto:inquiries@vektordynamics.com" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-500 font-mono">
                    inquiries@vektordynamics.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                <Phone className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-white">Direct Engineering Line</div>
                  <a href="tel:+14155550198" className="text-neutral-600 dark:text-neutral-300 hover:text-amber-500 font-mono">
                    +1 (415) 555-0198 (Mon - Fri, 8am - 6pm PT)
                  </a>
                </div>
              </div>
            </div>

            {/* Regional Engineering Facilities */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                Engineering Labs & Prototyping Facilities
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">Silicon Valley Lab</div>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    4200 Precision Way, Suite 300<br />
                    Sunnyvale, CA 94086 USA
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">Munich Prototyping Hub</div>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Schleißheimer Str. 182<br />
                    80797 München, Germany
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-neutral-600 dark:text-neutral-300 shrink-0" />
              <span>ITAR Registered · AS9100D Certified · Standard Mutual NDA</span>
            </div>
          </div>

          {/* Right 7 Cols: Lead Capture Contact Form */}
          <div className="lg:col-span-7 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-6 sm:p-8">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
                  Thank you for reaching out. A Senior Mechanical Lead will review your specifications and contact you shortly.
                </p>
                <div className="pt-2 flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                    }}
                    className="px-4 py-2 text-xs font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-md cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                  <button
                    onClick={openDashboard}
                    className="px-4 py-2 text-xs font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 rounded-md cursor-pointer"
                  >
                    View in Analytics Lead Log
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white mb-2">
                  Direct Inbound Inquiry Form
                </div>

                {errorMessage && (
                  <div className="p-3 text-xs text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-md">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dr. Alexander Vance"
                      className="w-full px-3.5 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Lockheed Martin / Autonomous Lab"
                      className="w-full px-3.5 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexander@company.com"
                      className="w-full px-3.5 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                      Primary Topic
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    >
                      <option value="New Project Engineering RFP">New Project Engineering RFP</option>
                      <option value="FEA Simulation & Failure Analysis">FEA Simulation & Failure Analysis</option>
                      <option value="DFM / Tooling Cost Optimization">DFM / Tooling Cost Optimization</option>
                      <option value="Rapid 5-Axis CNC Prototyping">Rapid 5-Axis CNC Prototyping</option>
                      <option value="Long-term Design Retainer">Long-term Design Retainer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Project Overview & Technical Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your mechanical system requirements, operational loads, materials, or target delivery timeframe..."
                    className="w-full px-3.5 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-md font-semibold text-xs uppercase tracking-wider text-white bg-neutral-900 dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Request...' : 'Send Engineering Inquiry'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 text-center">
                  We typically sign client NDAs before exchanging proprietary STEP CAD models.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
