export type ProjectCategory = 
  | 'All' 
  | 'Aerospace' 
  | 'Robotics & Automation' 
  | 'Medical Devices' 
  | 'Mobility & Automotive';

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  industry: string;
  quote: string;
  projectScope: string;
  verifiedMetric: string;
  metricLabel: string;
  standardOrCertification: string;
  year: string;
}

export interface ProjectTechnicalSpecs {
  dimensions: string;
  primaryMaterial: string;
  gdntTolerance: string;
  weightReduction: string;
  stressFactorOfSafety: string;
  thermalEnvelope: string;
}

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  clientIndustry: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string;
  technicalSpecs: ProjectTechnicalSpecs;
  image: string;
  cadSoftware: string[];
  manufacturingProcess: string;
  standards: string[];
}

export interface Service {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  standards: string[];
  tools: string[];
  turnaround: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  summary: string;
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string;
      tableData?: {
        headers: string[];
        rows: string[][];
      };
    }[];
    conclusion: string;
  };
}

export interface QuoteRequest {
  id: string;
  clientName: string;
  company: string;
  email: string;
  phone?: string;
  serviceCategory: string;
  projectStage: 'Concept / Sketch' | 'Preliminary 3D CAD' | 'Ready for DFM / Simulation' | 'Full Turnkey Redesign';
  primaryMaterial: string;
  toleranceGrade: 'Standard (±0.1 mm)' | 'Precision (±0.01 mm)' | 'Ultra-Precision (±0.002 mm)';
  productionVolume: '1-5 Prototype Units' | 'Pilot Run (10 - 250)' | 'Production Run (> 1,000)';
  deliverySpeed: 'Standard (4-6 Weeks)' | 'Accelerated (2-3 Weeks)' | 'Rapid Sprint (7-10 Days)';
  ndaRequired: boolean;
  projectDetails: string;
  fileName?: string;
  estimatedCostRange: string;
  estimatedEngineeringHours: number;
  submittedAt: string;
  status: 'New' | 'In Review' | 'Quoted' | 'Archived';
}

export interface TrafficSource {
  channel: string;
  visitors: number;
  share: number;
}

export interface DailyVisitorData {
  day: string;
  visitors: number;
  pageViews: number;
  quotesStarted: number;
  quotesSubmitted: number;
}

export interface AnalyticsSummary {
  totalVisitors: number;
  pageViews: number;
  avgSessionDuration: string;
  quoteConversionRate: number;
  totalQuotesReceived: number;
  pipelineValue: string;
  topChannels: TrafficSource[];
  dailyTrend: DailyVisitorData[];
}
