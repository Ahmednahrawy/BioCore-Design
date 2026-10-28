import { Project } from '../types';
import heroImg from '../assets/images/hero_mechanical_engineering_1791788020719.jpg';
import aerospaceActuatorImg from '../assets/images/portfolio_aerospace_actuator_1791788040248.jpg';
import medicalSurgicalImg from '../assets/images/portfolio_medical_surgical_1791788055768.jpg';
import roboticsChassisImg from '../assets/images/portfolio_robotics_chassis_1791788074419.jpg';

export const HERO_IMAGE_URL = heroImg;

export const PROJECTS_DATA: Project[] = [
  {
    id: 'ti-cycloidal-actuator',
    title: '5-Axis Titanium Cycloidal Actuator & Satellite Gimbal',
    category: 'Aerospace',
    clientIndustry: 'Orbital Satellite & Deep Space Exploration',
    year: '2025',
    summary: 'Ultra-compact zero-backlash cycloidal speed reducer and 2-axis solar array drive mechanism (SADM) engineered from Ti-6Al-4V Grade 5 for flight qualification under extreme launch acoustic envelopes.',
    challenge: 'Conventional harmonic drives suffered premature fatigue and localized gear tooth brinelling under 28.4 G RMS launch vibration loads, while thermal cycling in vacuum (-160°C to +130°C) caused binding.',
    solution: 'Designed an eccentric dual-disc cycloidal mechanism with custom needle pin rollers and integrated duplex angular contact ceramic hybrid bearings. Executed high-fidelity transient thermal FEA and random vibration simulation in ANSYS Mechanical. Applied Diamond-Like Carbon (DLC) coating to contact pin surfaces and specified dry-film molybdenum disulfide lubricant for vacuum survivability.',
    results: 'Achieved zero backlash (< 1 arcsec hysteresis), passed NASA GEVS random vibration testing without mass penalty, and reduced total drive mass by 46.2% compared to the incumbent flight mechanism.',
    technicalSpecs: {
      dimensions: 'Ø112 mm × 68 mm Envelope',
      primaryMaterial: 'Titanium Ti-6Al-4V (AMS 4911) & DLC Pins',
      gdntTolerance: 'ISO 286 js4 / ±0.003 mm on pin pitch circle',
      weightReduction: '-46.2% vs. Inconel Legacy Reducer',
      stressFactorOfSafety: '2.45x at 32 G Quasi-Static Launch Load',
      thermalEnvelope: '-160°C to +135°C Vacuum Rated'
    },
    image: aerospaceActuatorImg,
    cadSoftware: ['Siemens NX 2312', 'ANSYS Mechanical 2024', 'Altair HyperMesh'],
    manufacturingProcess: '5-Axis CNC Milling (Hermle C42), Wire EDM, DLC Vapor Deposition',
    standards: ['AS9100D', 'NASA-STD-5001B', 'ECSS-E-ST-32-10C']
  },
  {
    id: 'surgical-end-effector',
    title: '7-DOF Micro-Articulated Laparoscopic End-Effector',
    category: 'Medical Devices',
    clientIndustry: 'Minimally Invasive Robotic Surgery (MIRS)',
    year: '2025',
    summary: 'Sub-millimeter multi-cable articulating surgical wrist mechanism designed for robotic laparoscopic procedures requiring 500+ autoclave sterilization cycles and sub-2 µm trajectory tracking.',
    challenge: 'Tendon friction in serpentine joints created non-linear hysteresis and cable fraying within 50 autoclave cleaning cycles, leading to unpredictable surgeon haptic feedback.',
    solution: 'Engineered an overlapping rolling-contact hinge system using Medical Grade 316L Stainless Steel and biocompatible PEEK guide inserts. Integrated micro-pulleys with laser-welded Tungsten wire ropes and silicone fluid labyrinth seals preventing fluid ingress. Generated 100% verified ASME Y14.5-2018 drawings with optical CMM inspection criteria.',
    results: 'Passed 500 autoclave cycles (134°C steam @ 2.2 bar) without joint degradation, achieved ±90° pitch/yaw deflection in a Ø8 mm cannula envelope, and maintained < 2 µm tip position repeatability.',
    technicalSpecs: {
      dimensions: 'Ø8 mm Outer Cannula × 32 mm Articulating Zone',
      primaryMaterial: 'Bio-Grade 316L Stainless (ASTM F138) & PEEK-OPTIMA',
      gdntTolerance: 'Cylindrical Runout < 0.002 mm across pin bores',
      weightReduction: 'Sub-35g Total Tip Mass',
      stressFactorOfSafety: '3.10x under 45 N Peak Tissue Grasping Force',
      thermalEnvelope: 'Steam Autoclave Resilient up to 143°C'
    },
    image: medicalSurgicalImg,
    cadSoftware: ['SolidWorks 2025', 'COMSOL Multiphysics', 'DFMPro'],
    manufacturingProcess: 'Swiss CNC Turning (Citizen L20), Micro-Wire EDM, Laser Micro-Welding',
    standards: ['ISO 13485:2016', 'FDA 21 CFR 820', 'ISO 10993 Biocompatibility']
  },
  {
    id: 'autonomous-amr-chassis',
    title: 'Heavy-Payload Omnidirectional AMR Chassis & Suspension',
    category: 'Robotics & Automation',
    clientIndustry: 'Automated Guided Vehicles & Cleanroom Semiconductor Intralogistics',
    year: '2024',
    summary: 'Turnkey structural architecture, active rocker-bogie independent suspension, and IP67 sealed drive modules for a 1,200 kg payload autonomous mobile robot operating on factory floors.',
    challenge: 'High payload cornering produced severe torsional chassis deflection that misaligned onboard LiDAR safety scanners, causing emergency stop triggers over floor expansion joints.',
    solution: 'Engineered a hydroformed 7075-T651 aluminum spaceframe with triangulated gusset nodes optimized via topology generative design. Formulated an active dual-rate elastomeric suspension that absorbs 15 mm vertical ground steps while restricting pitch/roll tilt to under 0.3°. Incorporated integrated cable routing conduits and quick-swap battery lockouts.',
    results: 'Torsional rigidity increased by 58% while reducing chassis empty mass by 38 kg. Vehicle achieved continuous 24/7 navigation over uneven warehouse floor seams at 2.2 m/s with zero LiDAR false-positive trips.',
    technicalSpecs: {
      dimensions: '1,420 mm × 880 mm × 340 mm Structural Base',
      primaryMaterial: 'Aerospace Billet 7075-T651 (AMS-QQ-A-225/9)',
      gdntTolerance: 'Chassis Datum Flatness 0.015 mm over 1.4 m',
      weightReduction: '-26.5% vs. Welded Steel Tubing Benchmark',
      stressFactorOfSafety: '2.80x under 1,500 kg Shock Drop Load',
      thermalEnvelope: '-20°C to +55°C Industrial Operating Range'
    },
    image: roboticsChassisImg,
    cadSoftware: ['Siemens NX 2312', 'Altair OptiStruct', 'SolidWorks Simulation'],
    manufacturingProcess: '5-Axis CNC Gantry Milling, Hydroforming, Structural TIG Welding',
    standards: ['ISO 3691-4', 'ANSI/RIA R15.08', 'CE Machinery Directive 2006/42/EC']
  },
  {
    id: 'cryo-turbopump-housing',
    title: 'Cryogenic Liquid Methane Turbopump Volute & Diffuser',
    category: 'Energy Systems',
    clientIndustry: 'Launch Vehicle Propulsion & Clean Cryogenic Energy',
    year: '2025',
    summary: 'Single-piece 3D printed Inconel 718 volute casing featuring complex conformal internal cooling channels and hydrodynamic diffuser vanes engineered for 42,000 RPM cryogenic shaft speeds.',
    challenge: 'Sub-zero liquid methane (-161°C) combined with localized 650°C gas generator exhaust created catastrophic thermal gradient stress spikes exceeding yield limits on traditional forged volutes.',
    solution: 'Re-architected the pump volute for Direct Metal Laser Sintering (DMLS) in Inconel 718 with conformal internal bleed channels. Validated conjugate heat transfer (CHT) and fluid-structure interaction (FSI) using ANSYS Fluent and Mechanical. Applied Hot Isostatic Pressing (HIP) followed by chemical slurry surface polishing to eliminate internal channel roughness.',
    results: 'Eliminated 14 bolted joints and dynamic cryogenic seals, reduced housing pressure drop by 18.4%, and verified zero structural crack initiation across 25 hot-fire cycle tests.',
    technicalSpecs: {
      dimensions: 'Ø340 mm × 220 mm Internal Volute Casing',
      primaryMaterial: 'Inconel 718 (AMS 5662 / ASTM B637)',
      gdntTolerance: 'True Position 0.010 mm on Impeller Bearing Bore',
      weightReduction: '-34% Part Count (14 components unified into 1)',
      stressFactorOfSafety: '1.92x at 42,000 RPM & 180 bar Proof Pressure',
      thermalEnvelope: '-196°C Cryogenic to +720°C Turbine Exhaust'
    },
    image: aerospaceActuatorImg,
    cadSoftware: ['Siemens NX Unigraphics', 'ANSYS Fluent & Mechanical', 'Magics DMLS'],
    manufacturingProcess: 'Direct Metal Laser Sintering (DMLS), Hot Isostatic Pressing (HIP), 5-Axis Milling',
    standards: ['AIAA S-080A', 'ASME Section VIII Div 2', 'ASTM F3055 DMLS']
  },
  {
    id: 'carbon-exoskeleton-joint',
    title: 'Carbon-Fiber Active Exoskeleton Hip & Knee Joint Mechanism',
    category: 'Consumer Tech',
    clientIndustry: 'Industrial Ergonomics & Human Physical Augmentation',
    year: '2024',
    summary: 'Bio-mimetic multi-axis motorized hip and knee exoskeleton joint assembly utilizing high-modulus forged carbon fiber and a brushless frameless torque motor for factory worker fatigue relief.',
    challenge: 'Wearable exoskeletons often force unnatural gait kinematics, causing knee hyperextension risks and unacceptable wearer discomfort when joint rotational centers do not track human femoral motion.',
    solution: 'Designed a polycentric 4-bar linkage mechanism that mimics the anatomical instant center of rotation of the human knee. Executed compression molding analysis for chopped carbon fiber uprights to maximize structural stiffness while keeping total weight per leg under 1.8 kg. Implemented quick-release safety clutches that disengage in under 12 milliseconds.',
    results: 'Reduced lumbar spine compression loads by 42% in automotive assembly workers during 25 kg lifting tasks, with user acceptance rate exceeding 94% across multi-shift trials.',
    technicalSpecs: {
      dimensions: '480 mm Modular Ergonomic Leg Assembly',
      primaryMaterial: 'Forged Carbon Fiber + AL 7075-T6 Linkages',
      gdntTolerance: '±0.012 mm on Pivot Bushing Centers',
      weightReduction: '1.74 kg Total System Mass per Leg Module',
      stressFactorOfSafety: '3.20x under 120 kg Dynamic Impact Step',
      thermalEnvelope: '-10°C to +45°C Wearable Ambient Range'
    },
    image: roboticsChassisImg,
    cadSoftware: ['PTC Creo 10', 'SolidWorks Simulation', 'Autodesk Moldflow'],
    manufacturingProcess: 'Forged Carbon Compression Molding, CNC Turning, Anodizing',
    standards: ['ISO 13482 Safety for Personal Care Robots', 'ASTM F48 Exoskeleton Standards']
  },
  {
    id: 'subsea-pressure-vessel',
    title: '6,000m Deep-Submergence Titanium Electronics Enclosure',
    category: 'Energy Systems',
    clientIndustry: 'Oceanographic Autonomous Underwater Vehicles (AUVs)',
    year: '2024',
    summary: 'Hydrostatically verified Grade 5 titanium pressure housing engineered to protect hyperspectral sensors, navigation computers, and lithium-polymer power banks at 600 bar hydrostatic pressure.',
    challenge: 'Buckling instability under external hydrostatic pressure at 6,000-meter ocean depths frequently destroys deep-sea housings before material yield strength is reached.',
    solution: 'Synthesized non-linear Buckling FEA in Abaqus with initial geometric imperfection modeling. Designed precision dual O-ring piston seals with redundant fluorosilicone face gaskets. Developed a specialized heat pipe thermal strap dissipating 120 Watts of internal electronics heat directly through the titanium hull without thermal throttling.',
    results: 'Survived 1.5x proof pressure testing (900 bar / 90 MPa external pressure) at the Woods Hole hydrostatic test facility with zero water ingress and stable 42°C internal compute temps.',
    technicalSpecs: {
      dimensions: 'Ø260 mm × 780 mm Deep-Ocean Pressure Cylinder',
      primaryMaterial: 'Titanium Ti-6Al-4V ELI (ASTM B348 Grade 23)',
      gdntTolerance: 'Bore Cylindricity within 0.008 mm across 700 mm',
      weightReduction: '-18.5% vs. Stainless 316 Deep-Sea Housings',
      stressFactorOfSafety: '1.65x Buckling Safety Margin @ 600 bar',
      thermalEnvelope: 'External 2°C Abyssal Seawater / Internal 45°C'
    },
    image: medicalSurgicalImg,
    cadSoftware: ['Abaqus Unified FEA', 'SolidWorks 2025', 'Mathcad Structural Calc'],
    manufacturingProcess: 'Deep Hole Gun Drilling, CNC Lathe Turning, Hydrostatic Proof Chamber',
    standards: ['ASME PVHO-1', 'ABS Deep Submergence Rules', 'MIL-STD-810H']
  }
];
