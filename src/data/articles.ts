import { Article } from '../types';

export const ARTICLES_DATA: Article[] = [
  {
    id: 'gdt-datum-schemes',
    title: 'Geometric Dimensioning & Tolerancing: Why Datum Schemes Dictate Assembly Yields',
    slug: 'gdt-datum-schemes-precision-assembly',
    category: 'Tolerancing & Metrology',
    date: 'February 18, 2026',
    readTime: '6 min read',
    author: {
      name: 'Dr. Marcus Vance, PE',
      role: 'Principal Mechanical Architect'
    },
    summary: 'A deep-dive into establishing functional datum reference frames per ASME Y14.5-2018 to prevent tolerance stack-up disasters during high-volume production.',
    content: {
      introduction: 'In precision mechanical engineering, arbitrary plus-minus coordinate tolerancing is the fastest route to production line stoppages and ballooning scrap rates. While coordinate tolerances assume an idealized Cartesian box, true parts interface along functional surfaces, pins, and planes governed by physical degrees of freedom.',
      sections: [
        {
          heading: 'The 3-2-1 Principle in Real-World Tooling',
          body: 'The primary datum must constrain three degrees of freedom (pitch, roll, and translation along Z). Secondary and tertiary datums constrain the remaining rotations and translations. Specifying a thin, flexible sheet-metal flange as Datum A creates immediate measurement repeatability errors on the CMM because clamping pressure distorts the reference plane before measurement occurs.'
        },
        {
          heading: 'Composite Feature Control Frames vs Two Single-Segment Frames',
          body: 'Engineers frequently confuse composite position tolerances with two individual single-segment callouts. A composite frame governs pattern location relative to the datums in the upper tier, while the lower tier tightly controls hole-to-hole spacing (Feature-Relating Tolerance Zone Framework). This decoupling allows loose mating to the chassis while ensuring pins align with sub-micron precision.',
          tableData: {
            headers: ['Tolerance Type', 'Governs', 'Typical Cost Impact', 'Best Applied To'],
            rows: [
              ['Position w/ MMC', 'Feature axis location relative to datums', 'Low (-30% scrap with bonus tolerance)', 'Fastener holes, clearance pins'],
              ['Profile of a Surface', 'All surface points within boundary envelope', 'Moderate to High', 'Aerodynamic skins, turbine blades, complex housings'],
              ['Runout (Circular/Total)', 'FIM indicator sweep relative to datum axis', 'Moderate', 'Rotating shafts, bearings, gear journals'],
              ['Concentricity', 'Median points of diametrically opposed elements', 'Very High (difficult CMM verification)', 'High-speed balanced flywheels (use Runout instead)']
            ]
          }
        },
        {
          heading: 'Preventing the Zero-Bonus Trap at Maximum Material Condition',
          body: 'When specifying Maximum Material Condition (MMC) with zero tolerance at virtual condition (Position 0 at MMC), machinists gain bonus tolerance as the hole departs from minimum size. However, if your bore sizing tooling suffers high wear, parts at the lower spec limit receive zero allowable deviation, creating an artificial yield drop.'
        }
      ],
      conclusion: 'A disciplined datum reference frame must reflect how the part is physically held during operation—not how it is oriented on the CAD screen. Before releasing drawings to machine shops, always execute a 3D Monte Carlo tolerance stack-up audit.'
    }
  },
  {
    id: 'titanium-vs-peek',
    title: 'Grade 5 Titanium vs. Carbon-PEEK: High-Performance Material Selection Matrix',
    slug: 'grade-5-titanium-vs-carbon-peek-selection',
    category: 'Materials Science',
    date: 'January 24, 2026',
    readTime: '8 min read',
    author: {
      name: 'Elena Rostova, MSc',
      role: 'Senior Materials & Simulation Lead'
    },
    summary: 'Evaluating specific strength, tribological behavior, thermal expansion matching, and autoclave resilience when choosing between Ti-6Al-4V and 30% CF PEEK.',
    content: {
      introduction: 'Aerospace structural brackets and medical robotic instruments share identical demands: extreme specific stiffness, resistance to aggressive sterilization or environmental chemistry, and strict payload mass caps. While titanium has traditionally dominated, carbon-fiber reinforced polyetheretherketone (CF-PEEK) is rapidly displacing metals.',
      sections: [
        {
          heading: 'Specific Strength and Density Considerations',
          body: 'Grade 5 Titanium (Ti-6Al-4V ELI) has a density of 4.43 g/cm³ and a tensile yield strength of approximately 880 MPa. Carbon-filled PEEK (30% chopped fiber) has a density of only 1.44 g/cm³—roughly one-third the mass. For applications where bending stiffness dominates, the cube-root thickness advantage of lower-density composites delivers a significantly lighter structure for identical deflection limits.'
        },
        {
          heading: 'Thermal Expansion & CTE Matching',
          body: 'A critical design pitfall occurs when pressing bearings or optical glass lenses into PEEK housings. Titanium features a low coefficient of thermal expansion (~8.6 µm/m·K), whereas unfilled PEEK expands at 45–50 µm/m·K. Even 30% CF PEEK exhibits anisotropic CTE (15 µm/m·K parallel to flow, 32 µm/m·K perpendicular), risking bore seizure or lens pinch over broad thermal swings.',
          tableData: {
            headers: ['Property', 'Ti-6Al-4V (Grade 5)', '30% Carbon-Filled PEEK', 'Engineering Implication'],
            rows: [
              ['Density', '4.43 g/cm³', '1.44 g/cm³', 'PEEK saves 67% mass at equal solid volume'],
              ['Tensile Yield', '880 - 920 MPa', '215 - 240 MPa', 'Titanium withstands 3.8x higher point stresses'],
              ['Modulus of Elasticity', '114 GPa', '18 - 22 GPa', 'Titanium 5.5x stiffer; PEEK requires thicker cross-sections'],
              ['Radio-translucency', 'Opaque (high X-ray artifact)', 'Transparent (100% artifact-free)', 'PEEK ideal for in-vivo imaging & surgical instruments'],
              ['Machining Tool Wear', 'High heat buildup; requires carbide', 'Abrasive fiber wear; PCD tooling required', 'Titanium requires rigid fixtures; PEEK needs stress relief anneal']
            ]
          }
        },
        {
          heading: 'Sterilization & Autoclave Cycling',
          body: 'In medical applications, repeated autoclave exposure (134°C steam at 2.1 bar) degrades ordinary polycarbonates and polyamides through hydrolysis within 20 cycles. Both Ti-6Al-4V and PEEK easily survive 500+ autoclave cycles without embrittlement or micro-cracking.'
        }
      ],
      conclusion: 'Select Grade 5 Titanium when concentrated bearing loads, threaded shear strengths, or compact spatial envelopes govern the geometry. Transition to CF-PEEK when dynamic inertial mass reduction, electrical isolation, or X-ray transparency is the primary driver.'
    }
  },
  {
    id: 'fea-mesh-convergence',
    title: 'FEA Mesh Convergence: Identifying Artificial Stress Singularities',
    slug: 'fea-mesh-convergence-stress-singularities',
    category: 'Structural FEA',
    date: 'December 12, 2025',
    readTime: '7 min read',
    author: {
      name: 'Dr. Marcus Vance, PE',
      role: 'Principal Mechanical Architect'
    },
    summary: 'Why blindly refining the element mesh at re-entrant corners produces infinite mathematical stresses, and how to properly extract real physical fatigue metrics.',
    content: {
      introduction: 'A classic mistake in FEA simulation reports presented to management or investors is reporting an apparent "structural failure" because a localized Von Mises stress hot-spot exceeds yield by 200%. In 9 out of 10 cases, this hot-spot is not a design flaw—it is a mathematical stress singularity caused by sharp CAD re-entrant corners or concentrated point-load boundary conditions.',
      sections: [
        {
          heading: 'Stress Singularity vs. Stress Concentration',
          body: 'A true stress concentration (such as a hole in a plate governed by Peterson’s Stress Concentration Factors) converges to a definitive finite peak value as element mesh size approaches zero. A stress singularity, on the other hand, possesses infinite theoretical stress in linear elasticity theory; as you refine the mesh, the calculated peak stress grows unbounded without ever converging.'
        },
        {
          heading: 'The 3-Step Mesh Convergence Protocol',
          body: 'To validate any structural FEA study, establish a systematic h-refinement protocol across 3 mesh densities: coarse (h), medium (h/2), and fine (h/4). Calculate the relative percentage delta in strain energy and localized stress in critical non-singular regions. If the variation is below 3%, the mesh has converged.'
        }
      ],
      conclusion: 'Always replace idealized sharp interior vertexes with realistic manufacturing blend radii (minimum 0.5 mm to 1.5 mm matching standard CNC endmill ball radii) before running final mesh convergence sweeps.'
    }
  }
];
