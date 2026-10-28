import { GoogleGenAI } from '@google/genai';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const SYSTEM_INSTRUCTION = `
You are the official Senior Engineering Consultant and AI Customer Support Agent for BioCore-Design, a premier mechanical design and turnkey engineering agency.

Core Agency Capabilities:
1. Precision CAD & Kinematic Mechanism Design (Siemens NX, SolidWorks, PTC Creo, ASME Y14.5-2018 GD&T).
2. FEA Structural, Modal & Thermal Stress Analysis (ANSYS Mechanical, Abaqus, Altair HyperMesh, dynamic vibration and random fatigue life prediction).
3. Design for Manufacturing (DFM) & Assembly (DFA) (Tooling cost-down, high-pressure die casting, injection mold flow, CNC machining clearance audits).
4. Precision Prototyping & First-Article Machining (5-Axis Hermle CNC milling, Swiss turning, DMLS metal 3D printing in Titanium Ti-6Al-4V, Inconel 718, and 316L stainless steel).
5. Certifications & Standards: AS9100D, ISO 9001:2015, ISO 13485:2016 (Medical Devices), ITAR & EAR compliant operations.

Key Flagship Projects in Portfolio:
- 5-Axis Titanium Cycloidal Actuator & Satellite Gimbal (Aerospace, Ti-6Al-4V, 46.2% mass reduction, zero backlash).
- 7-DOF Micro-Articulated Laparoscopic End-Effector (Medical Devices, 316L Stainless & PEEK, 500 autoclave cycles, sub-2 µm repeatability).
- Heavy-Payload Omnidirectional AMR Chassis & Active Suspension (Robotics & Automation, 7075-T651 billet, 1,200 kg payload).
- Cryogenic Liquid Methane Turbopump Volute & Diffuser (Energy Systems, 3D printed Inconel 718, 42,000 RPM proof).
- Carbon-Fiber Active Exoskeleton Hip & Knee Joint Mechanism (Consumer Tech, polycentric anatomical instant center of rotation).
- 6,000m Deep-Submergence Titanium Electronics Enclosure (Energy Systems, 600 bar hydrostatic proof).

Tone & Guidelines:
- Professional, technically rigorous, concise, and helpful.
- When prospective clients ask for project cost estimates, encourage them to configure their parameters in the on-page "Engineering Cost Estimator" or offer typical budgetary guidelines ($8,000 - $45,000 depending on stage, tolerance grade, and FEA scope).
- When asked about materials, provide realistic engineering trade-offs (e.g. Ti-6Al-4V vs. 7075-T6 vs. Carbon-PEEK).
- Under strict NDA protocols, client proprietary IP is kept secure.
`;

let aiInstance: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (aiInstance) return aiInstance;
  try {
    // In Vite / AI Studio environments, the key may be in import.meta.env or process.env
    const apiKey = 
      (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) ||
      (typeof process !== 'undefined' && (process.env?.GEMINI_API_KEY || process.env?.VITE_GEMINI_API_KEY)) ||
      '';

    aiInstance = new GoogleGenAI(apiKey ? { apiKey } : {});
    return aiInstance;
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI client:', err);
    return null;
  }
}

// Built-in intelligent fallback engine for high reliability
function generateFallbackResponse(userPrompt: string): string {
  const p = userPrompt.toLowerCase();

  if (p.includes('cost') || p.includes('estimate') || p.includes('price') || p.includes('rate') || p.includes('quote')) {
    return `At BioCore-Design, our engineering engagements are scoped at a transparent senior architectural billing rate of **$165/hour**.\n\n• **Prototype Engagements**: Typically range between **$8,000 and $18,000** for preliminary CAD and FEA verification.\n• **Turnkey Systems & Tooling**: Comprehensive multi-axis assemblies range from **$18,000 to $45,000+** depending on tolerance grades and flight qualifications.\n\nYou can use our interactive **Custom Quote Estimator** right on this page to configure your alloy, tolerance class (down to ±0.002 mm), and delivery speed for an instant budgetary estimate.`;
  }

  if (p.includes('material') || p.includes('titanium') || p.includes('peek') || p.includes('aluminum')) {
    return `BioCore-Design specializes in high-consequence alloy and polymer selection:\n\n• **Aerospace & Flight Systems**: Titanium Ti-6Al-4V (Grade 5) for optimum strength-to-weight and cryogenic stability; 7075-T651 billet aluminum for high-stress airframes.\n• **Surgical & Medical Devices**: 316L electropolished surgical steel and 30% carbon-filled PEEK polymer for autoclave steam sterilization (ISO 10993 compliant).\n• **Robotics & Cleanrooms**: Hard-anodized 6061-T6 and zero-shedding engineering plastics like Delrin and Torlon.\n\nWould you like guidance on thermal expansion matching or galvanic corrosion protection for a specific assembly?`;
  }

  if (p.includes('dfm') || p.includes('gd&t') || p.includes('tolerance') || p.includes('machin')) {
    return `Our Design for Manufacturing (DFM) process eliminates production risk before metal is cut:\n\n• **Standard CNC**: ±0.1 mm (ISO 2768-m) for cost-effective structural elements.\n• **Precision GD&T**: ±0.01 mm (ISO 2768-f) with ASME Y14.5-2018 true position datums for kinematic gear trains and bearing bores.\n• **Sub-Micron Machining**: Down to ±0.002 mm with Swiss turning, wire EDM, and CMM metrology verification.\n\nWe provide 3D CAD models in STEP AP242 with embedded Product and Manufacturing Information (PMI).`;
  }

  if (p.includes('human') || p.includes('contact') || p.includes('call') || p.includes('email') || p.includes('location') || p.includes('office')) {
    return `You can reach our engineering team directly through several channels:\n\n• **Inquiries & RFPs**: inquiries@biocoredesign.com\n• **Direct Engineering Line**: +1 (415) 555-0198 (Mon–Fri, 8am–6pm PT)\n• **Silicon Valley Lab**: 4200 Precision Way, Suite 300, Sunnyvale, CA 94086 USA\n• **Munich Prototyping Hub**: Schleißheimer Str. 182, 80797 München, Germany\n\nYou can also submit an inquiry through our **Contact Form** on the homepage under mutual NDA.`;
  }

  return `Thank you for reaching out to BioCore-Design Customer Support. We provide turnkey mechanical engineering, FEA simulation, and DFM optimization for aerospace, surgical devices, and robotic systems.\n\nHow can we assist you today? You can ask about:\n1. **Project Cost & Turnaround Estimates**\n2. **Alloy & Composite Material Selection**\n3. **DFM & GD&T Precision Tolerancing**\n4. **AS9100D & ISO 13485 Compliance**`;
}

export async function sendChatMessage(
  history: ChatMessage[],
  newMessage: string
): Promise<string> {
  const ai = getGenAI();

  if (!ai) {
    return generateFallbackResponse(newMessage);
  }

  try {
    // Format conversation history for @google/genai
    const formattedContents = [
      ...history.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
      {
        role: 'user',
        parts: [{ text: newMessage }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    });

    const reply = response.text?.trim();
    if (reply) {
      return reply;
    }
    return generateFallbackResponse(newMessage);
  } catch (error) {
    console.warn('Gemini chat API error, utilizing intelligent fallback:', error);
    return generateFallbackResponse(newMessage);
  }
}
