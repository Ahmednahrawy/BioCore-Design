import { Project } from '../types';
import heroImg from '../assets/images/hero_mechanical_engineering_1791788020719.jpg';
import actuatorImg from '../assets/images/portfolio_aerospace_actuator_1791788040248.jpg';
import surgicalImg from '../assets/images/portfolio_medical_surgical_1791788055768.jpg';
import chassisImg from '../assets/images/portfolio_robotics_chassis_1791788074419.jpg';

export const HERO_IMAGE_URL = heroImg;

export const PROJECTS_DATA: Project[] = [
  {
    id: 'aero-actuator-90',
    title: 'High-Torque Aerospace Rotary Actuator Assembly',
    category: 'Aerospace',
    clientIndustry: 'Commercial Avionics & Flight Control Systems',
    year: '2025',
    summary: 'A weight-optimized 5-axis titanium planetary drive actuator engineered for extreme vibrational load envelopes and flight-critical gimbal positioning.',
    challenge: 'The client required a 42% reduction in unladen mass while maintaining 185 Nm continuous torque without exceeding a maximum thermal rise of 65°C in sub-ambient rarefied atmosphere.',
    solution: 'Designed an integrated cycloidal-planetary dual-stage reduction gearbox machined from Ti-6Al-4V Grade 5 titanium, featuring optimized internal conformal cooling passages and FEA-validated rib geometry.',
    results: 'Exceeded all MIL-STD-810H vibration qualification tests. Achieved a verified 46% mass reduction (920g total) with zero backlash across 2.5 million test cycles.',
    technicalSpecs: {
      dimensions: '142 mm × 118 mm × 104 mm',
      primaryMaterial: 'Titanium Ti-6Al-4V (Grade 5) & 17-4 PH H900',
      gdntTolerance: '±0.005 mm (ISO Class f)',
      weightReduction: '-46.2% vs. Legacy Gen 2',
      stressFactorOfSafety: '2.85x Yield under Max G-Load',
      thermalEnvelope: '-55°C to +125°C Operational'
    },
    image: actuatorImg,
    cadSoftware: ['Siemens NX', 'ANSYS Mechanical', 'KISSsoft Gear Engine'],
    manufacturingProcess: '5-Axis Simultaneous CNC Milling + Wire EDM',
    standards: ['AS9100D', 'ASME Y14.5M-2018', 'MIL-STD-810H']
  },
  {
    id: 'surgical-micro-gripper',
    title: 'EndoWrist Micro-Articulated Surgical Tool Mechanism',
    category: 'Medical Devices',
    clientIndustry: 'Minimally Invasive Robotic Surgery',
    year: '2025',
    summary: 'Sub-millimeter multi-degree-of-freedom surgical end-effector with wire-driven kinematics, biocompatible materials, and autoclave sterilization durability.',
    challenge: 'Achieving 7 degrees of freedom in an 8.5 mm outer diameter cannula while resisting 45 N tip gripping force without cable fatigue or backlash slippage.',
    solution: 'Engineered a nested micro-clevis kinematics train with electropolished 316L surgical stainless steel pivot links, diamond-like carbon (DLC) dry lubrication, and carbon-fiber composite structural torque shaft.',
    results: 'Passed ISO 13485 bio-compatibility evaluation and completed 500 autoclave thermal cycles without joint degradation. Successfully integrated into live surgical robotic trials.',
    technicalSpecs: {
      dimensions: 'Ø 8.5 mm cannula × 380 mm working length',
      primaryMaterial: '316L Stainless Steel (Electropolished) + Toray T700 Carbon',
      gdntTolerance: '±0.003 mm (Cylindrical Runout < 2 µm)',
      weightReduction: '-28% End-Effector Inertia',
      stressFactorOfSafety: '3.2x Peak Clamping Strain',
      thermalEnvelope: 'Autoclave 134°C @ 2.1 bar steam resistant'
    },
    image: surgicalImg,
    cadSoftware: ['PTC Creo', 'SolidWorks Medical Edition', 'Abaqus Non-linear FEA'],
    manufacturingProcess: 'Swiss Micro-Turning + Laser Micro-Welding',
    standards: ['ISO 13485:2016', 'ISO 10993 Biocompatibility', 'FDA 21 CFR 820']
  },
  {
    id: 'billet-powertrain-chassis',
    title: 'Billet EV Transmission & Multi-Link Suspension Knuckle',
    category: 'Mobility & Automotive',
    clientIndustry: 'High-Performance Electric Mobility & Autonomous Platforms',
    year: '2026',
    summary: 'Topology-optimized integrated transmission housing and 7075-T6 aluminum uprights engineered to handle 850 Nm instantaneous electric powertrain torque.',
    challenge: 'Eliminating casting lead times (24 weeks down to 3 weeks) while increasing torsional rigidity across front suspension hardpoints under cornering loads.',
    solution: 'Performed generative topology optimization with Altair OptiStruct, converting cast iron housing into a modular multi-piece 7075-T6 billet architecture with integrated oil channels and O-ring sealing grooves.',
    results: 'Torsional rigidity improved by 34% with a 19.5 kg total mass savings across the driveline assembly. First article machined and dyno-tested in under 21 calendar days.',
    technicalSpecs: {
      dimensions: '480 mm × 360 mm × 290 mm',
      primaryMaterial: 'Alloy 7075-T651 Aerospace Billet',
      gdntTolerance: '±0.012 mm Bearing Bores',
      weightReduction: '-31.8% vs. OEM Cast Assembly',
      stressFactorOfSafety: '2.4x under 3G Bump + Cornering',
      thermalEnvelope: '-40°C to +110°C Fluid Temp'
    },
    image: chassisImg,
    cadSoftware: ['Autodesk Fusion Generative', 'Altair OptiStruct', 'Siemens NX CAM'],
    manufacturingProcess: 'Hermle 5-Axis CNC High-Speed Machining',
    standards: ['ISO 9001:2015', 'DIN 740 Drivetrain', 'VDA 6.3 Automotive']
  },
  {
    id: 'precision-cinematic-gimbal',
    title: 'Autonomous Mobile Inspection Robot Arm & Turret',
    category: 'Robotics & Automation',
    clientIndustry: 'Nuclear Facility & Semiconductor Cleanroom Metrology',
    year: '2025',
    summary: 'Sealed IP67 harmonically geared 6-axis manipulator joint architecture with internal slip rings and absolute magnetic encoder integration.',
    challenge: 'Designing an arm capable of zero particulate shedding for ISO Class 3 cleanrooms, with sub-50 micron repeatable positioning accuracy under 12 kg payload.',
    solution: 'Engineered hard-anodized 6061-T6 aluminum joint enclosures with labyrinth seals and magnetic ferrofluid barriers, paired with hollow-shaft strain-wave gearing.',
    results: 'Zero particle release verified across 1,000 cleanroom operational hours. Achieved 0.018 mm spatial repeatability across the entire 1.2 m reach envelope.',
    technicalSpecs: {
      dimensions: '1,200 mm reach, Ø 92 mm base knuckle',
      primaryMaterial: '6061-T6 Aluminum (Type III Hardcoat) + PEEK Isolators',
      gdntTolerance: '±0.008 mm on Bearing Registrations',
      weightReduction: '-22% Robot Dynamic Mass',
      stressFactorOfSafety: '3.1x Static Tip Load',
      thermalEnvelope: '10°C to 45°C Precision Ambient'
    },
    image: heroImg,
    cadSoftware: ['SolidWorks 2025', 'ANSYS Mechanical', 'Adams Multibody Dynamics'],
    manufacturingProcess: 'CNC Turning & 4-Axis Milling + Anodizing',
    standards: ['ISO 14644-1 Cleanroom', 'IEC 60529 IP67', 'ANSI/RIA R15.06']
  }
];
