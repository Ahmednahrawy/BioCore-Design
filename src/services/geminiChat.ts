import { GoogleGenAI } from '@google/genai';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const SYSTEM_INSTRUCTION = `
You are the official Customer Support & Solutions AI for "BioCore-Design" (formerly Vektor Dynamics), a world-class mechanical engineering and precision hardware design agency.

Your persona:
- Courteous, professional, crisp, and technically articulate customer support agent and engineering intake specialist.
- You represent BioCore-Design with authority on precision engineering, DFM, FEA, kinematics, and materials science.

Company Overview:
- Name: BioCore-Design Engineering Group
- Core Disciplines:
  1. Precision CAD & Kinematic Mechanism Design (Siemens NX, SolidWorks, PTC Creo)
  2. FEA Structural, Modal & Thermal Stress Analysis (ANSYS Mechanical, Abaqus)
  3. Design for Manufacturing (DFM) & Assembly (DFA) (ASME Y14.5M GD&T)
  4. Precision Prototyping & 5-Axis CNC Machining (Hermle 5-axis, Wire EDM)
  5. Medical Device Hardware & ISO 13485 Engineering (FDA 21 CFR 820)
  6. Turnkey Electromechanical Systems Packaging & Robotics
- Facilities & Prototyping Labs:
  - Silicon Valley Lab: 4200 Precision Way, Suite 300, Sunnyvale, CA 94086 USA
  - Munich Prototyping Hub: Schleißheimer Str. 182, 80797 München, Germany
- Contact: inquiries@biocoredesign.com | +1 (415) 555-0198
- Compliance: AS9100D, ISO 9001:2015, ISO 13485:2016, ITAR & EAR Registered Facility, ASME Y14.5-2018 GD&T standards.
- Confidentiality: All geometry and inquiries protected by automatic mutual NDA.
- Commercial model:
  - Senior architectural engineering billing: ~$165/hr.
  - Typical prototype project range: $8,000 - $35,000 depending on complexity, volume, and material alloys.
  - Standard turnaround: 4-6 weeks (accelerated: 2-3 weeks; rapid sprint: 7-10 days).

Guidelines for your responses:
- Keep answers concise, factual, and helpful (typically 2-4 short paragraphs or clear bullet points).
- When a user asks about pricing, explain our typical estimate calculation ($165/hr base rate, average projects between $8k-$35k) and encourage them to use the interactive Custom Quote Estimator on the page or submit an RFP.
- When asked about materials, provide engineering specifics:
  - Aerospace: Titanium Ti-6Al-4V Grade 5, 7075-T651 Billet Aluminum, 17-4 PH Stainless.
  - Medical: 316L Electropolished Stainless, Carbon-fiber T700, 30% carbon-filled PEEK.
  - Polymers: Delrin (Acetal), PEEK, Torlon.
- When users want to speak with human engineers or submit drawings, point them to the direct contact form or email inquiries@biocoredesign.com.
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
