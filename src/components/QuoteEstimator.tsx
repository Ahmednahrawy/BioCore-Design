import React, { useState } from 'react';
import { 
  Calculator, 
  UploadCloud, 
  ShieldCheck, 
  Clock, 
  Send, 
  CheckCircle, 
  ArrowRight, 
  FileText,
  Sliders,
  AlertCircle
} from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';
import { QuoteRequest } from '../types';

interface QuoteEstimatorProps {
  initialService?: string;
}

export const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({ initialService }) => {
  const { submitQuoteRequest, trackQuoteStarted, openDashboard } = useAnalytics();

  // Configuration state
  const [serviceCategory, setServiceCategory] = useState<string>(
    initialService || 'Precision CAD & Kinematic Mechanism Design'
  );
  const [projectStage, setProjectStage] = useState<QuoteRequest['projectStage']>(
    'Preliminary 3D CAD'
  );
  const [primaryMaterial, setPrimaryMaterial] = useState<string>(
    'Titanium Ti-6Al-4V'
  );
  const [toleranceGrade, setToleranceGrade] = useState<QuoteRequest['toleranceGrade']>(
    'Precision (±0.01 mm)'
  );
  const [productionVolume, setProductionVolume] = useState<QuoteRequest['productionVolume']>(
    'Pilot Run (10 - 250)'
  );
  const [deliverySpeed, setDeliverySpeed] = useState<QuoteRequest['deliverySpeed']>(
    'Accelerated (2-3 Weeks)'
  );

  // Client info state
  const [clientName, setClientName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ndaRequired, setNdaRequired] = useState(true);
  const [projectDetails, setProjectDetails] = useState('');
  const [fileName, setFileName] = useState('');

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRfq, setSubmittedRfq] = useState<QuoteRequest | null>(null);
  const [validationError, setValidationError] = useState('');

  // Calculate dynamic engineering budget
  const calculateEstimate = () => {
    let baseHours = 60;

    // Service adjustment
    if (serviceCategory.includes('FEA')) baseHours += 30;
    if (serviceCategory.includes('Turnkey') || serviceCategory.includes('Mechatronics')) baseHours += 80;
    if (serviceCategory.includes('Medical')) baseHours += 50;

    // Stage adjustment
    if (projectStage === 'Concept / Sketch') baseHours += 40;
    if (projectStage === 'Full Turnkey Redesign') baseHours += 60;

    // Tolerance adjustment
    if (toleranceGrade.includes('0.002')) baseHours += 25;

    // Material adjustment
    if (primaryMaterial.includes('Titanium') || primaryMaterial.includes('PEEK')) baseHours += 20;

    // Delivery speed multiplier
    let multiplier = 1.0;
    if (deliverySpeed.includes('Accelerated')) multiplier = 1.25;
    if (deliverySpeed.includes('Rapid Sprint')) multiplier = 1.6;

    const totalHours = Math.round(baseHours * (deliverySpeed.includes('Rapid') ? 1.1 : 1.0));
    const ratePerHour = 165;
    const baseCost = totalHours * ratePerHour * multiplier;

    const lowRange = Math.round(baseCost * 0.9 / 500) * 500;
    const highRange = Math.round(baseCost * 1.25 / 500) * 500;

    return {
      hours: totalHours,
      costString: `$${lowRange.toLocaleString()} - $${highRange.toLocaleString()}`
    };
  };

  const estimate = calculateEstimate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    trackQuoteStarted();
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!clientName.trim() || !email.trim() || !company.trim()) {
      setValidationError('Please provide your name, corporate email, and company.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setValidationError('Please provide a valid corporate email address.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const created = submitQuoteRequest({
        clientName: clientName.trim(),
        company: company.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        serviceCategory,
        projectStage,
        primaryMaterial,
        toleranceGrade,
        productionVolume,
        deliverySpeed,
        ndaRequired,
        projectDetails: projectDetails.trim() || 'Custom mechanical scope specified via configuration portal.',
        fileName: fileName || undefined,
        estimatedCostRange: estimate.costString,
        estimatedEngineeringHours: estimate.hours
      });

      setIsSubmitting(false);
      setSubmittedRfq(created);
    }, 450);
  };

  return (
    <section id="quote-estimator" className="py-18 lg:py-24 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-2">
            <span>Engineering Cost Estimator</span>
            <span aria-hidden="true" className="text-amber-500">·</span>
            <span>Instant Scope Modeling</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Configure your technical scope for an instant budgetary quote.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
            Define material grades, tolerancing standards, and delivery deadlines. Receive an immediate engineering hours calculation and dispatch your RFP directly to our lead engineering team under strict NDA.
          </p>
        </div>

        {submittedRfq ? (
          /* Submission Confirmation Card */
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-8 sm:p-10 shadow-xs max-w-3xl animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
              <CheckCircle className="w-6 h-6" />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-1">
              <span>RFP DISPATCHED</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{submittedRfq.id}</span>
            </div>

            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
              Engineering RFP Received, {submittedRfq.clientName}.
            </h3>

            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
              Your mechanical specification for <span className="font-semibold text-neutral-900 dark:text-white">{submittedRfq.company}</span> has been routed to our senior project architects. Under our mutual NDA protocol, our team will review your requirements and respond within 24 business hours.
            </p>

            {/* Scope Summary */}
            <div className="p-5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 space-y-3 mb-6 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <span className="text-neutral-400 block text-[11px]">Primary Alloy</span>
                  <span className="font-mono font-medium text-neutral-900 dark:text-white">{submittedRfq.primaryMaterial}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Tolerance Class</span>
                  <span className="font-mono font-medium text-amber-600 dark:text-amber-400">{submittedRfq.toleranceGrade}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Est. Labor Hours</span>
                  <span className="font-mono font-medium text-neutral-900 dark:text-white">{submittedRfq.estimatedEngineeringHours} hrs</span>
                </div>
                <div>
                  <span className="text-neutral-400 block text-[11px]">Budget Range</span>
                  <span className="font-mono font-bold text-neutral-900 dark:text-white">{submittedRfq.estimatedCostRange}</span>
                </div>
              </div>
              {submittedRfq.fileName && (
                <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 font-mono">
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span>CAD Model Attached: {submittedRfq.fileName}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setSubmittedRfq(null)}
                className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 rounded-md cursor-pointer transition-colors"
              >
                Configure Another Scope
              </button>

              <button
                onClick={openDashboard}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 rounded-md cursor-pointer transition-colors"
              >
                <span>View in Live Analytics Lead Log</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-500" />
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Estimator Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 7 Columns: Interactive Scope Selectors */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
              {/* Step 1: Core Discipline */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  01. Primary Engineering Discipline
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) => {
                    trackQuoteStarted();
                    setServiceCategory(e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                >
                  <option value="Precision CAD & Kinematic Mechanism Design">Precision CAD & Kinematic Mechanism Design</option>
                  <option value="FEA Structural, Modal & Thermal Stress Analysis">FEA Structural, Modal & Thermal Stress Analysis</option>
                  <option value="Design for Manufacturing (DFM) & Assembly (DFA)">Design for Manufacturing (DFM) & Assembly (DFA)</option>
                  <option value="Precision Prototyping & CNC First-Article Machining">Precision Prototyping & CNC First-Article Machining</option>
                  <option value="Medical Device Hardware & ISO 13485 Engineering">Medical Device Hardware & ISO 13485 Engineering</option>
                  <option value="Turnkey Electromechanical Systems Packaging">Turnkey Electromechanical Systems Packaging</option>
                </select>
              </div>

              {/* Step 2: Project Maturity & Materials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                    02. Project Maturity Stage
                  </label>
                  <select
                    value={projectStage}
                    onChange={(e) => {
                      trackQuoteStarted();
                      setProjectStage(e.target.value as QuoteRequest['projectStage']);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <option value="Concept / Sketch">Concept / Hand Sketch</option>
                    <option value="Preliminary 3D CAD">Preliminary 3D CAD Assembly</option>
                    <option value="Ready for DFM / Simulation">Ready for DFM / FEA Verification</option>
                    <option value="Full Turnkey Redesign">Full Turnkey Cost-Down Redesign</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                    03. Primary Alloy / Material
                  </label>
                  <select
                    value={primaryMaterial}
                    onChange={(e) => {
                      trackQuoteStarted();
                      setPrimaryMaterial(e.target.value);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <option value="Titanium Ti-6Al-4V (Grade 5)">Titanium Ti-6Al-4V (Grade 5)</option>
                    <option value="Alloy 7075-T651 Aerospace Aluminum">Alloy 7075-T651 Aerospace Aluminum</option>
                    <option value="6061-T6 Billet Aluminum">6061-T6 Billet Aluminum</option>
                    <option value="316L Surgical Stainless Steel">316L Surgical Stainless Steel</option>
                    <option value="30% Carbon-Filled PEEK Polymer">30% Carbon-Filled PEEK Polymer</option>
                    <option value="Acetal (Delrin) / Engineering Plastics">Acetal (Delrin) / Engineering Plastics</option>
                  </select>
                </div>
              </div>

              {/* Step 3: Tolerancing & Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                    04. Precision Tolerance Class
                  </label>
                  <select
                    value={toleranceGrade}
                    onChange={(e) => {
                      trackQuoteStarted();
                      setToleranceGrade(e.target.value as QuoteRequest['toleranceGrade']);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <option value="Standard (±0.1 mm)">Standard CNC (±0.1 mm / ISO 2768-m)</option>
                    <option value="Precision (±0.01 mm)">Precision GD&T (±0.01 mm / ISO 2768-f)</option>
                    <option value="Ultra-Precision (±0.002 mm)">Ultra-Precision Micron (±0.002 mm)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                    05. Delivery Schedule
                  </label>
                  <select
                    value={deliverySpeed}
                    onChange={(e) => {
                      trackQuoteStarted();
                      setDeliverySpeed(e.target.value as QuoteRequest['deliverySpeed']);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <option value="Standard (4-6 Weeks)">Standard Engagement (4-6 Weeks)</option>
                    <option value="Accelerated (2-3 Weeks)">Accelerated Priority (2-3 Weeks)</option>
                    <option value="Rapid Sprint (7-10 Days)">Rapid Hardware Sprint (7-10 Days)</option>
                  </select>
                </div>
              </div>

              {/* Step 4: Contact & CAD File Upload */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  06. Client Verification & Direct RFP Submission
                </div>

                {validationError && (
                  <div className="flex items-center gap-2 p-3 text-xs text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-md">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Company / Institution *"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Corporate Email Address *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone / Direct Line (Optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Simulated File Attachment */}
                <div className="relative border border-dashed border-neutral-300 dark:border-neutral-700 rounded-md p-4 text-center hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
                  <input
                    type="file"
                    id="cad-upload"
                    accept=".step,.stp,.sldprt,.sldasm,.iges,.igs,.x_t,.pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-1 text-xs text-neutral-600 dark:text-neutral-400">
                    <UploadCloud className="w-5 h-5 text-amber-500" />
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {fileName ? fileName : 'Upload 3D CAD (.STEP, .SLDPRT, .X_T) or Technical PDF'}
                    </span>
                    <span className="text-[11px] text-neutral-400">Max 50MB · Encrypted in transit</span>
                  </div>
                </div>

                {/* Brief Notes */}
                <div>
                  <textarea
                    rows={2}
                    placeholder="Specific functional requirements, payload specs, or thermal envelope..."
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  />
                </div>

                {/* Mutual NDA Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="nda-check"
                    checked={ndaRequired}
                    onChange={(e) => setNdaRequired(e.target.checked)}
                    className="rounded border-neutral-300 text-amber-500 focus:ring-amber-500 w-4 h-4"
                  />
                  <label htmlFor="nda-check" className="text-xs text-neutral-600 dark:text-neutral-300 cursor-pointer">
                    Execute Mutual Non-Disclosure Agreement (NDA) before file inspection
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-md font-semibold text-sm text-white bg-neutral-900 dark:bg-amber-500 dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-amber-400 transition-all cursor-pointer shadow-sm disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Processing Engineering RFP...' : 'Dispatch Engineering Quote Request'}</span>
                </button>
              </div>
            </form>

            {/* Right 5 Columns: Live Dynamic Quote Telemetry Box */}
            <div className="lg:col-span-5 sticky top-24 space-y-6">
              <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 text-xs">
                  <span className="font-mono text-neutral-500 dark:text-neutral-400">ESTIMATED QUOTE RANGE</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">CALCULATED LIVE</span>
                </div>

                {/* Primary Cost Metric (Tabular Figures) */}
                <div className="py-6">
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-neutral-900 dark:text-white">
                    {estimate.costString}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 font-mono">
                    Based on ~{estimate.hours} engineering labor hours @ senior architectural billing
                  </div>
                </div>

                {/* Specifications Checklist */}
                <div className="space-y-3 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 dark:text-neutral-400">Selected Discipline</span>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100 text-right truncate max-w-[200px]">
                      {serviceCategory.split('&')[0]}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 dark:text-neutral-400">Tolerance Class</span>
                    <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">
                      {toleranceGrade.split(' ')[0]}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 dark:text-neutral-400">Target Material</span>
                    <span className="font-mono text-neutral-900 dark:text-neutral-100">
                      {primaryMaterial.split(' ')[0]}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500 dark:text-neutral-400">Lead Time SLA</span>
                    <span className="font-mono text-neutral-900 dark:text-neutral-100">
                      {deliverySpeed.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Guaranteed Deliverables */}
                <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-neutral-800/80 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-200">
                    Included in this engineering engagement
                  </div>
                  <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Full native CAD files & STEP AP242 with PMI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>ASME Y14.5-2018 2D manufacturing prints</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>AS9100D/ISO 13485 compliant design records</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security / Confidentiality Note */}
              <div className="flex items-center gap-2.5 p-4 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/40 text-xs text-neutral-500 dark:text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-neutral-700 dark:text-neutral-300 shrink-0" />
                <span>All submitted geometry and technical descriptions are protected by automatic mutual non-disclosure obligations.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
