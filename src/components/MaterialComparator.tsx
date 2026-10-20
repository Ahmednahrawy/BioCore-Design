import React, { useState } from 'react';
import { Layers, Flame, Gauge, DollarSign, Shield, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface MaterialSpec {
  id: string;
  name: string;
  standard: string;
  category: 'Aerospace' | 'Medical' | 'Automotive' | 'Robotics';
  yieldStrengthMpa: number; // MPa
  densityGcm3: number; // g/cm³
  maxTempC: number; // °C
  machinabilityPct: number; // % relative to 1212 steel
  costMultiplier: number; // 1x to 6x
  thermalExpansionPpm: number; // µm/m-K
  bestUse: string;
}

const MATERIALS: MaterialSpec[] = [
  {
    id: 'ti-6al-4v',
    name: 'Titanium Ti-6Al-4V (Grade 5)',
    standard: 'AMS 4911 / ASTM B348',
    category: 'Aerospace',
    yieldStrengthMpa: 880,
    densityGcm3: 4.43,
    maxTempC: 400,
    machinabilityPct: 22,
    costMultiplier: 4.2,
    thermalExpansionPpm: 8.6,
    bestUse: 'Flight-critical satellite gimbals, rocket propulsion mounts, and orthopedic implants requiring zero fatigue under cryogenic/thermal cycles.'
  },
  {
    id: 'al-7075-t651',
    name: '7075-T651 Billet Aluminum',
    standard: 'AMS-QQ-A-225/9',
    category: 'Aerospace',
    yieldStrengthMpa: 503,
    densityGcm3: 2.81,
    maxTempC: 120,
    machinabilityPct: 70,
    costMultiplier: 1.8,
    thermalExpansionPpm: 23.4,
    bestUse: 'High-stress racecar suspension knuckles, drone airframes, and structural UAV chassis requiring exceptional stiffness-to-weight.'
  },
  {
    id: 'ss-316l',
    name: '316L Surgical Stainless Steel',
    standard: 'ASTM F138 (Medical Grade)',
    category: 'Medical',
    yieldStrengthMpa: 290,
    densityGcm3: 8.00,
    maxTempC: 800,
    machinabilityPct: 38,
    costMultiplier: 2.4,
    thermalExpansionPpm: 16.0,
    bestUse: 'Autoclave-sterilizable surgical instruments, endoscopy articulators, and bio-compatible fluid manifolds with zero pitting corrosion.'
  },
  {
    id: 'cf-peek',
    name: '30% Carbon-Filled PEEK',
    standard: 'ASTM D6262',
    category: 'Robotics',
    yieldStrengthMpa: 215,
    densityGcm3: 1.44,
    maxTempC: 260,
    machinabilityPct: 45,
    costMultiplier: 5.5,
    thermalExpansionPpm: 15.0,
    bestUse: 'Zero-backlash robotic gearboxes, semiconductor vacuum pick-and-place grippers, and radiation-tolerant avionics enclosures.'
  }
];

export const MaterialComparator: React.FC = () => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('ti-6al-4v');
  const [targetLoadMpa, setTargetLoadMpa] = useState<number>(350);

  const current = MATERIALS.find((m) => m.id === selectedMaterialId) || MATERIALS[0];
  const strengthToWeight = Number((current.yieldStrengthMpa / current.densityGcm3).toFixed(1));
  const factorOfSafety = Number((current.yieldStrengthMpa / targetLoadMpa).toFixed(2));
  const isSafe = factorOfSafety >= 1.5;

  return (
    <section id="materials" className="py-18 lg:py-24 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-2 font-mono">
              <span>Interactive Engineering Workbench</span>
              <span aria-hidden="true" className="text-amber-500">·</span>
              <span>Alloy & DFM Evaluator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight" style={{ textWrap: 'balance' }}>
              Material Science & Yield Strength Matrix.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
              Dynamically evaluate structural factor of safety, density, thermal envelope, and machinability across flight-grade alloys.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 p-2.5 rounded border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <span className="text-amber-500 font-bold">AS9100D Section 8.4</span> · Certified Mill Test Reports
          </div>
        </div>

        {/* Dynamic Workbench Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 4 Cols: Material Selector Buttons & Simulation Sliders */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
              1. Select Candidate Alloy or Polymer
            </span>

            <div className="space-y-2.5">
              {MATERIALS.map((mat) => {
                const isSelected = mat.id === selectedMaterialId;
                return (
                  <button
                    key={mat.id}
                    onClick={() => setSelectedMaterialId(mat.id)}
                    className={`w-full p-4 rounded-lg border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/40 dark:bg-amber-500/10 shadow-xs'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                        <span>{mat.name}</span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                      </div>
                      <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {mat.standard} · {mat.category}
                      </div>
                    </div>

                    <div className="text-right font-mono text-xs">
                      <div className="text-neutral-900 dark:text-white font-bold">{mat.yieldStrengthMpa} MPa</div>
                      <div className="text-neutral-500 text-[11px]">{mat.densityGcm3} g/cm³</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Target Stress Load Slider */}
            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-neutral-700 dark:text-neutral-300">Operational Peak Stress Load:</span>
                <span className="text-amber-600 dark:text-amber-400 font-extrabold text-sm">{targetLoadMpa} MPa</span>
              </div>
              <input
                type="range"
                min={100}
                max={700}
                step={25}
                value={targetLoadMpa}
                onChange={(e) => setTargetLoadMpa(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                <span>100 MPa (Light)</span>
                <span>400 MPa (Nominal Flight)</span>
                <span>700 MPa (Extreme)</span>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Dynamic Telemetry Cards & Comparison Meters */}
          <div className="lg:col-span-7 space-y-6">
            {/* Factor of Safety Hero Banner */}
            <div className={`p-6 rounded-lg border transition-all ${
              isSafe 
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/40 text-emerald-900 dark:text-emerald-200' 
                : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-500/40 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    Calculated Structural Factor of Safety (FoS)
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono mt-1">
                    {factorOfSafety}x {isSafe ? 'SAFE' : 'RISK (FoS < 1.5)'}
                  </div>
                  <p className="text-xs mt-1 opacity-90">
                    {isSafe 
                      ? 'Exceeds standard aerospace & medical structural margin (AS9100D requirement: FoS ≥ 1.50).' 
                      : 'WARNING: Tensile yield margin is insufficient under selected peak load. Redesign or material upgrade required.'}
                  </p>
                </div>

                <div className="shrink-0 p-3 rounded-md bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-center font-mono text-xs">
                  <div className="text-neutral-500 text-[10px]">Specific Strength</div>
                  <div className="text-xl font-bold text-neutral-900 dark:text-white">{strengthToWeight}</div>
                  <div className="text-[10px] text-neutral-400">kN·m / kg</div>
                </div>
              </div>
            </div>

            {/* Visual Telemetry Bars */}
            <div className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                Engineering Property Benchmark Matrix
              </span>

              {/* Bar 1: Yield Strength */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Tensile Yield Strength (Yield Limit)</span>
                  <span className="font-bold text-neutral-900 dark:text-white">{current.yieldStrengthMpa} MPa</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                    style={{ width: `${(current.yieldStrengthMpa / 1000) * 100}%` }}
                  />
                </div>
              </div>

              {/* Bar 2: Max Thermal Operating Temperature */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Continuous Service Temperature</span>
                  <span className="font-bold text-neutral-900 dark:text-white">{current.maxTempC} °C</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div 
                    className="h-full bg-rose-500 transition-all duration-500 rounded-full"
                    style={{ width: `${(current.maxTempC / 850) * 100}%` }}
                  />
                </div>
              </div>

              {/* Bar 3: Machinability Index */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">5-Axis CNC Machinability Speed</span>
                  <span className="font-bold text-neutral-900 dark:text-white">{current.machinabilityPct}% (Rating)</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 transition-all duration-500 rounded-full"
                    style={{ width: `${current.machinabilityPct}%` }}
                  />
                </div>
              </div>

              {/* Bar 4: Raw Material Cost Factor */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-neutral-600 dark:text-neutral-400">Certified Stock Cost Multiplier</span>
                  <span className="font-bold text-neutral-900 dark:text-white">{current.costMultiplier}x Base Index</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div 
                    className="h-full bg-neutral-700 dark:bg-neutral-400 transition-all duration-500 rounded-full"
                    style={{ width: `${(current.costMultiplier / 6) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* DFM Engineering Application Recommendation */}
            <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900 dark:text-white font-mono uppercase mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>BioCore Engineering Application Guidance</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {current.bestUse}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
