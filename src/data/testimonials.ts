import { Testimonial } from '../types';

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Dr. Keith Holbrook',
    role: 'VP of Mechanism Engineering',
    company: 'Orbital Vector Avionics',
    industry: 'Commercial Avionics & Space Systems',
    quote: 'BioCore-Design delivered our titanium rotary actuator assembly ahead of schedule and with higher torsional rigidity than our legacy vendor could achieve. Their FEA thermal analysis accurately predicted vibration resonance behavior under launch loads, enabling us to pass MIL-STD-810H qualification on the very first physical run.',
    projectScope: '5-Axis Titanium Cycloidal Actuator & Gearbox',
    verifiedMetric: '-46.2%',
    metricLabel: 'Mass Reduction vs OEM Spec',
    standardOrCertification: 'AS9100D & MIL-STD-810H',
    year: '2025'
  },
  {
    id: 'test-2',
    clientName: 'Dr. Claire Dumont',
    role: 'Chief Technology Officer',
    company: 'EndoPrecision Robotics',
    industry: 'Minimally Invasive Surgical Systems',
    quote: 'In surgical robotics, sub-micron repeatability and sterile durability are non-negotiable. BioCore-Design engineered an articulating wrist mechanism with zero cable slippage that withstood over 500 autoclave thermal cycles without joint degradation. Their ASME Y14.5 drawing packages were flawless.',
    projectScope: '7-DOF Micro-Articulated Surgical End-Effector',
    verifiedMetric: '< 2 µm',
    metricLabel: 'Cylindrical Tip Runout Tolerance',
    standardOrCertification: 'ISO 13485:2016 & FDA 21 CFR 820',
    year: '2025'
  },
  {
    id: 'test-3',
    clientName: 'Markus Weber',
    role: 'Head of Powertrain Structures',
    company: 'Voltaic Performance Motors',
    industry: 'High-Performance Electric Mobility',
    quote: 'We were staring at a 24-week casting delay that would have halted our vehicle development timeline. BioCore-Design redesigned our transmission housing into a 7075-T6 multi-piece billet assembly in just 10 days, increasing torsional stiffness by 34% while shaving nearly 20 kilograms of mass from the front axle.',
    projectScope: 'Billet EV Transmission Housing & Uprights',
    verifiedMetric: '21 Days',
    metricLabel: 'CAD Concept to Track Dyno Test',
    standardOrCertification: 'VDA 6.3 & ISO 9001:2015',
    year: '2026'
  },
  {
    id: 'test-4',
    clientName: 'Dr. Sarah Lindgren',
    role: 'Principal Systems Architect',
    company: 'NanoFab Semiconductor Metrology',
    industry: 'Cleanroom Inspection Robotics',
    quote: 'Designing a 6-axis inspection robotic arm for an ISO Class 3 cleanroom required zero particulate release under continuous 24/7 duty. BioCore-Design engineered custom ferrofluid labyrinth seals that passed rigorous airborne optical particle counters with zero particulate emissions.',
    projectScope: 'Sealed IP67 Cleanroom 6-Axis Robot Joint',
    verifiedMetric: '0.018 mm',
    metricLabel: 'Spatial Repeatability Across 1.2m',
    standardOrCertification: 'ISO 14644-1 Class 3 Cleanroom',
    year: '2025'
  },
  {
    id: 'test-5',
    clientName: 'Julian Vance',
    role: 'Lead Flight Structures Architect',
    company: 'Stratos Launch Dynamics',
    industry: 'Sub-Orbital Launch Hardware',
    quote: 'The level of engineering rigor BioCore-Design brings to DFM and tolerance stack-up analysis is unparalleled. They caught three critical thermal expansion interference risks during simulation that would have cost us six figures in scrapped tooling on the factory floor.',
    projectScope: 'Cryogenic Valve Manifold & Quick-Disconnect Mount',
    verifiedMetric: '100%',
    metricLabel: 'First-Article Tooling Pass Rate',
    standardOrCertification: 'AIAA Standards & AS9102 FAI',
    year: '2026'
  }
];
