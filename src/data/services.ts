import { Service } from '../types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'cad-modeling',
    code: '01',
    title: 'Precision CAD & Kinematic Mechanism Design',
    subtitle: 'Parametric solid modeling, advanced surfacing, and linkage dynamics',
    description: 'We develop production-grade parametric 3D CAD assemblies engineered for zero interference and smooth kinematic actuation. Every model is built with strict feature-tree discipline, parametric equations, and comprehensive 2D drafting adhering to ASME Y14.5-2018 GD&T standards.',
    deliverables: [
      'Native CAD (Siemens NX, SolidWorks, Creo, STEP AP242)',
      'Fully dimensioned 2D shop drawings with GD&T datums',
      'Kinematic motion study & dynamic velocity curves',
      'Bills of Materials (BOM) with commercial off-the-shelf (COTS) specs'
    ],
    standards: ['ASME Y14.5-2018', 'ISO 1101', 'ISO 286 Limits & Fits'],
    tools: ['Siemens NX 2312', 'SolidWorks 2025', 'PTC Creo 10', 'Autodesk Inventor'],
    turnaround: '1 - 3 Weeks typical scope'
  },
  {
    id: 'fea-simulation',
    code: '02',
    title: 'FEA Structural, Modal & Thermal Stress Analysis',
    subtitle: 'Virtual validation preventing costly field failures before cutting metal',
    description: 'Before committing capital to expensive tooling or multi-axis machining, our simulation engineers subject your geometry to multi-physics stress, fatigue life prediction, harmonic vibration, and transient thermal modeling using verified meshing practices.',
    deliverables: [
      'Von Mises stress, strain & displacement contour plots',
      'Fatigue life prediction (S-N curve high/low cycle)',
      'Modal natural frequency & resonance avoidance reports',
      'Thermal gradient & heat sink junction temperature calculations'
    ],
    standards: ['ASME Boiler & Pressure Vessel', 'AIAA Simulation Verification', 'ASTM E8/E8M'],
    tools: ['ANSYS Mechanical', 'Abaqus Unified FEA', 'Altair HyperMesh', 'COMSOL Multiphysics'],
    turnaround: '3 - 10 Business Days'
  },
  {
    id: 'dfm-dfa',
    code: '03',
    title: 'Design for Manufacturing (DFM) & Assembly (DFA)',
    subtitle: 'Cost-down engineering and manufacturing yield optimization',
    description: 'Great ideas often fail on the factory floor. We audit part geometries for CNC tool access, draft angles for high-pressure die casting and injection molding, minimum wall thickness, gate placement, and assembly line ergonomics to eliminate secondary operations.',
    deliverables: [
      'Comprehensive DFM report with Red/Yellow/Green clearance maps',
      '1D & 3D Monte Carlo tolerance stack-up analysis spreadsheets',
      'Tooling complexity reduction & side-action elimination advice',
      'Unit economics breakdown across prototype, pilot, and mass production'
    ],
    standards: ['VDA 6.3 Standards', 'ISO 9001:2015 DFM protocols'],
    tools: ['Moldflow Simulation', 'DFMPro', 'VisiMock 3D', 'Crystal Ball Statistical Stack'],
    turnaround: '5 - 7 Business Days'
  },
  {
    id: 'prototyping-machining',
    code: '04',
    title: 'Precision Prototyping & CNC First-Article Machining',
    subtitle: 'From virtual CAD to micron-accurate functional hardware in days',
    description: 'We partner directly with tier-1 machine shops equipped with Hermle 5-axis CNC mills, Swiss lathes, and metal binder jetting. Every prototype undergoes CMM (coordinate measuring machine) laser scanning to confirm micron tolerances before shipping to your test bench.',
    deliverables: [
      'Functional 5-axis CNC milled metal & engineering plastic parts',
      'Direct Metal Laser Sintering (DMLS) 3D printed components',
      'CMM inspection reports with AS9102 First Article Inspection (FAI)',
      'Surface finish options: bead blast, Type III hard anodize, nickel plate'
    ],
    standards: ['AS9102 FAI', 'ISO 17025 Metrology', 'MIL-A-8625 Anodizing'],
    tools: ['Zeiss Prismo CMM', 'Keyence Optical Metrology', 'Mastercam 5X'],
    turnaround: '5 - 12 Calendar Days'
  },
  {
    id: 'medical-devices',
    code: '05',
    title: 'Medical Device Hardware & ISO 13485 Engineering',
    subtitle: 'Rigorous design controls, sterile packaging, and surgical ergonomics',
    description: 'Developing medical instruments requires more than mechanical skill—it requires an ironclad audit trail. We design surgical tools, diagnostic fluidics, and wearable enclosures that withstand hundreds of autoclave cycles while complying with FDA 21 CFR 820 design controls.',
    deliverables: [
      'Design History File (DHF) compliant CAD documentation',
      'ISO 14971 Risk Management & failure mode effect analysis (DFMEA)',
      'Biocompatibility material qualification dossiers (USP Class VI / ISO 10993)',
      'Ingress protection sealing (IP68 hermetic O-ring & laser weld designs)'
    ],
    standards: ['ISO 13485:2016', 'ISO 14971:2019', 'FDA 21 CFR Part 820', 'IEC 60601-1'],
    tools: ['SolidWorks Medical', 'Creo Parametric', 'PTC Windchill PLM'],
    turnaround: 'Custom Engagement Scope'
  },
  {
    id: 'turnkey-mechatronics',
    code: '06',
    title: 'Turnkey Electromechanical Systems Packaging',
    subtitle: 'Seamless convergence of mechanics, electronics, and thermal design',
    description: 'High-density embedded computing, brushless DC motors, and high-voltage power electronics require tight mechanical envelopes. We design custom ruggedized chassis, heat pipe thermal sinks, flex PCB routing brackets, and IP-rated connector penetrations.',
    deliverables: [
      'ECAD-MCAD collaborative packaging (IDF/IDX synchronization)',
      'Custom liquid cooling blocks and extruded skived-fin heat sinks',
      'Harness routing with strain relief and anti-vibration damping',
      'Turnkey physical proof-of-concept functional assemblies'
    ],
    standards: ['IPC-2221 Mechanical', 'MIL-STD-810H Shock/Vibe', 'NEMA / IP Enclosures'],
    tools: ['Altium-NX CoDesigner', 'ANSYS Icepak Thermal', 'SolidWorks Electrical'],
    turnaround: '2 - 6 Weeks'
  }
];
