import { AnalyticsSummary, QuoteRequest } from '../types';

export const INITIAL_LEADS: QuoteRequest[] = [
  {
    id: 'RFQ-8821',
    clientName: 'Julian Sterling',
    company: 'Orbital Aero Systems',
    email: 'j.sterling@orbitalaero.com',
    phone: '+1 (415) 890-2341',
    serviceCategory: 'FEA Structural & Thermal Simulation',
    projectStage: 'Ready for DFM / Simulation',
    primaryMaterial: 'Titanium Ti-6Al-4V',
    toleranceGrade: 'Precision (±0.01 mm)',
    productionVolume: 'Pilot Run (10 - 250)',
    deliverySpeed: 'Accelerated (2-3 Weeks)',
    ndaRequired: true,
    projectDetails: 'Need rapid modal and thermal stress analysis on our satellite gimbal motor mount to ensure survival across launch harmonic resonance envelopes.',
    fileName: 'gimbal_mount_revC.step',
    estimatedCostRange: '$12,500 - $16,800',
    estimatedEngineeringHours: 72,
    submittedAt: '2026-03-28 14:22',
    status: 'In Review'
  },
  {
    id: 'RFQ-8820',
    clientName: 'Dr. Clara Lindqvist',
    company: 'EndoMed Surgical Robotics',
    email: 'clara.lindqvist@endomed-robotics.se',
    phone: '+46 8 502 3901',
    serviceCategory: 'Precision CAD & Kinematic Mechanism Design',
    projectStage: 'Preliminary 3D CAD',
    primaryMaterial: '316L Stainless Steel',
    toleranceGrade: 'Ultra-Precision (±0.002 mm)',
    productionVolume: '1-5 Prototype Units',
    deliverySpeed: 'Rapid Sprint (7-10 Days)',
    ndaRequired: true,
    projectDetails: 'Kinematic optimization for an articulating wrist sub-assembly in our laparoscopy prototype. Need 2D drawings with ASME Y14.5 GD&T.',
    fileName: 'wrist_joint_v4.sldprt',
    estimatedCostRange: '$18,000 - $24,500',
    estimatedEngineeringHours: 110,
    submittedAt: '2026-03-27 09:45',
    status: 'Quoted'
  },
  {
    id: 'RFQ-8819',
    clientName: 'Henrik Bauer',
    company: 'Synapse Mobility GmbH',
    email: 'h.bauer@synapse-ev.de',
    phone: '+49 89 231 990',
    serviceCategory: 'Design for Manufacturing (DFM) & Assembly (DFA)',
    projectStage: 'Full Turnkey Redesign',
    primaryMaterial: 'Alloy 7075-T651 Aerospace Billet',
    toleranceGrade: 'Precision (±0.01 mm)',
    productionVolume: 'Production Run (> 1,000)',
    deliverySpeed: 'Standard (4-6 Weeks)',
    ndaRequired: false,
    projectDetails: 'Cost-down DFM conversion of our machined EV battery tray support linkages into high-pressure die casting geometry with minimal secondary CNC operations.',
    fileName: 'tray_linkages_assembly.x_t',
    estimatedCostRange: '$32,000 - $44,000',
    estimatedEngineeringHours: 180,
    submittedAt: '2026-03-25 16:10',
    status: 'New'
  }
];

export const INITIAL_ANALYTICS: AnalyticsSummary = {
  totalVisitors: 14820,
  pageViews: 41250,
  avgSessionDuration: '3m 48s',
  quoteConversionRate: 8.64,
  totalQuotesReceived: 142,
  pipelineValue: '$1,840,000',
  topChannels: [
    { channel: 'Organic Search (CAD / FEA keywords)', visitors: 6240, share: 42.1 },
    { channel: 'Direct / Existing OEM Network', visitors: 3820, share: 25.8 },
    { channel: 'LinkedIn & Engineering Dispatches', visitors: 2780, share: 18.7 },
    { channel: 'Partner Machining Network Referrals', visitors: 1980, share: 13.4 }
  ],
  dailyTrend: [
    { day: 'Mon', visitors: 2180, pageViews: 6100, quotesStarted: 44, quotesSubmitted: 18 },
    { day: 'Tue', visitors: 2450, pageViews: 6890, quotesStarted: 52, quotesSubmitted: 24 },
    { day: 'Wed', visitors: 2790, pageViews: 7620, quotesStarted: 61, quotesSubmitted: 29 },
    { day: 'Thu', visitors: 2610, pageViews: 7180, quotesStarted: 58, quotesSubmitted: 26 },
    { day: 'Fri', visitors: 2310, pageViews: 6450, quotesStarted: 49, quotesSubmitted: 21 },
    { day: 'Sat', visitors: 1180, pageViews: 3200, quotesStarted: 19, quotesSubmitted: 8 },
    { day: 'Sun', visitors: 1300, pageViews: 3810, quotesStarted: 26, quotesSubmitted: 16 }
  ]
};
