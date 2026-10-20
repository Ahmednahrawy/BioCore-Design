import React, { useState, useRef, useEffect } from 'react';
import { 
  Scan, 
  Flame, 
  Compass, 
  Play, 
  Pause, 
  Maximize2, 
  Sliders, 
  ShieldCheck, 
  Crosshair,
  Layers,
  RotateCw
} from 'lucide-react';
import { HERO_IMAGE_URL } from '../data/projects';

type ViewMode = 'photo' | 'fea' | 'gdt' | 'kinematic';

export const InteractiveCadViewer: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('photo');
  const [isRotating, setIsRotating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [reticlePos, setReticlePos] = useState({ x: 50, y: 50, realX: 124.5, realY: 68.2, stress: 312 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Kinematic rotation animation
  useEffect(() => {
    let animId: number;
    if (viewMode === 'kinematic' || isRotating) {
      const animate = () => {
        setRotationAngle((prev) => (prev + 0.8) % 360);
        animId = requestAnimationFrame(animate);
      };
      animId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animId);
  }, [viewMode, isRotating]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    
    // Map to realistic engineering coordinates
    const realX = Number((xPct * 2.4 - 120).toFixed(2));
    const realY = Number(((100 - yPct) * 1.8 - 90).toFixed(2));
    
    // Mock localized Von Mises stress calculation based on distance from center
    const distFromCenter = Math.hypot(xPct - 50, yPct - 50);
    const stressVal = Math.round(180 + Math.sin(distFromCenter / 8) * 160 + (xPct > 60 ? 120 : 0));

    setReticlePos({
      x: xPct,
      y: yPct,
      realX,
      realY,
      stress: Math.max(85, Math.min(620, stressVal))
    });
  };

  return (
    <div 
      className="relative rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-800 bg-neutral-900 shadow-2xl group select-none"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Top Engineering Inspection HUD Bar */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-3.5 py-2.5 bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 text-[11px] font-mono text-neutral-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-white font-semibold tracking-wider">CAD/FEA LIVE TELEMETRY</span>
          <span className="hidden sm:inline text-neutral-500">|</span>
          <span className="hidden sm:inline text-amber-400">PART: TI-MAM-7439</span>
        </div>

        {/* View Mode Segmented Switcher */}
        <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-0.5 rounded">
          <button
            onClick={() => setViewMode('photo')}
            className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer ${
              viewMode === 'photo' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
            title="Photorealistic 5-Axis CNC Finish"
          >
            Shaded
          </button>
          <button
            onClick={() => setViewMode('fea')}
            className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              viewMode === 'fea' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
            title="FEA Von-Mises Stress Heatmap"
          >
            <Flame className="w-3 h-3 text-rose-400" />
            <span>FEA Stress</span>
          </button>
          <button
            onClick={() => setViewMode('gdt')}
            className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              viewMode === 'gdt' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
            title="ASME Y14.5 GD&T Datums & Tolerances"
          >
            <Compass className="w-3 h-3 text-cyan-400" />
            <span>GD&T</span>
          </button>
          <button
            onClick={() => setViewMode('kinematic')}
            className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
              viewMode === 'kinematic' ? 'bg-amber-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            }`}
            title="Kinematic Motion Simulator"
          >
            <RotateCw className="w-3 h-3 text-emerald-400" />
            <span>Kinematics</span>
          </button>
        </div>
      </div>

      {/* Main Visual Canvas Area */}
      <div className="relative w-full h-84 sm:h-96 lg:h-[430px] overflow-hidden bg-neutral-950 flex items-center justify-center">
        {/* The Base Photo Assembly */}
        <img
          src={HERO_IMAGE_URL}
          alt="Precision multi-axis titanium robotic mechanism"
          className="w-full h-full object-cover transition-transform duration-300"
          style={{
            transform: `scale(${zoomLevel}) rotate(${rotationAngle * (viewMode === 'kinematic' ? 0.25 : 0)}deg)`,
            filter: viewMode === 'fea' 
              ? 'contrast(1.4) saturate(1.8) hue-rotate(185deg) brightness(0.95)' 
              : viewMode === 'gdt' 
                ? 'grayscale(0.9) contrast(1.3) invert(0.1)' 
                : 'none'
          }}
          referrerPolicy="no-referrer"
        />

        {/* FEA Stress Gradient Overlay (Active in FEA mode) */}
        {viewMode === 'fea' && (
          <div className="absolute inset-0 pointer-events-none mix-blend-color-dodge bg-gradient-to-tr from-blue-700/60 via-emerald-600/50 via-amber-500/70 to-rose-600/80 animate-in fade-in duration-300">
            {/* Stress legend banner */}
            <div className="absolute top-14 left-4 p-2.5 rounded bg-neutral-950/85 border border-neutral-800 text-[10px] font-mono text-white space-y-1.5 shadow-lg backdrop-blur-md">
              <div className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3 h-3 text-rose-500" />
                <span>Von-Mises Stress (MPa)</span>
              </div>
              <div className="w-28 h-2.5 rounded-xs bg-gradient-to-r from-blue-600 via-emerald-500 via-yellow-400 to-rose-600" />
              <div className="flex justify-between text-[9px] text-neutral-400">
                <span>0 MPa</span>
                <span>280</span>
                <span className="text-rose-400 font-bold">580 MPa</span>
              </div>
              <div className="pt-1 border-t border-neutral-800 flex justify-between text-[9px]">
                <span className="text-neutral-400">FoS (Yield):</span>
                <span className="text-emerald-400 font-bold">2.42x SAFE</span>
              </div>
            </div>
          </div>
        )}

        {/* ASME Y14.5 Blueprint / GD&T Overlay (Active in GD&T mode) */}
        {viewMode === 'gdt' && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none text-cyan-400 font-mono text-[10px] animate-in fade-in duration-300">
            <defs>
              <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            
            {/* Datum A circle & callout */}
            <circle cx="50%" cy="50%" r="90" fill="none" stroke="rgba(34, 211, 238, 0.8)" strokeWidth="1" strokeDasharray="4 3" />
            <circle cx="50%" cy="50%" r="4" fill="rgb(34, 211, 238)" />
            
            {/* Dimension Lines */}
            <line x1="25%" y1="50%" x2="75%" y2="50%" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="1" />
            <line x1="50%" y1="20%" x2="50%" y2="80%" stroke="rgba(34, 211, 238, 0.6)" strokeWidth="1" />
            
            {/* Feature Control Frame 1 */}
            <g transform="translate(40, 100)">
              <rect width="130" height="24" fill="rgba(15, 23, 42, 0.9)" stroke="rgb(34, 211, 238)" strokeWidth="1" rx="2" />
              <text x="8" y="16" fill="rgb(34, 211, 238)">⌖ Ø0.005 | A | B | C</text>
            </g>

            {/* Feature Control Frame 2 */}
            <g transform="translate(240, 260)">
              <rect width="115" height="24" fill="rgba(15, 23, 42, 0.9)" stroke="rgb(34, 211, 238)" strokeWidth="1" rx="2" />
              <text x="8" y="16" fill="rgb(34, 211, 238)">⏥ 0.002 | A</text>
            </g>

            {/* Surface finish callout */}
            <g transform="translate(50, 240)">
              <text x="0" y="0" fill="rgba(34, 211, 238, 0.9)">Ra 0.4 µm (Granite Inspected)</text>
            </g>
          </svg>
        )}

        {/* Kinematic Oscillating Vector Indicator (Active in Kinematics mode) */}
        {viewMode === 'kinematic' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div 
              className="w-48 h-48 rounded-full border border-dashed border-emerald-400/80 flex items-center justify-center animate-spin"
              style={{ animationDuration: '6s' }}
            >
              <div className="w-32 h-32 rounded-full border border-emerald-500/40 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </div>
            
            <div className="absolute bottom-16 right-4 p-2 rounded bg-neutral-950/85 border border-neutral-800 text-[10px] font-mono text-emerald-400">
              <div>CYCLOIDAL REDUCTION: 39:1</div>
              <div>EFFICIENCY: 94.6% @ 3500 RPM</div>
            </div>
          </div>
        )}

        {/* Dynamic Crosshair Reticle tracking mouse position */}
        <div 
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
          style={{ left: `${reticlePos.x}%`, top: `${reticlePos.y}%` }}
        >
          <div className="relative w-8 h-8 flex items-center justify-center text-amber-400">
            <Crosshair className="w-7 h-7 drop-shadow-md stroke-amber-400" />
            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          </div>

          {/* Floating live inspection chip */}
          <div className="absolute left-6 -top-2 whitespace-nowrap bg-neutral-950/90 text-white border border-amber-500/80 px-2 py-1 rounded shadow-lg text-[9px] font-mono backdrop-blur-sm pointer-events-none">
            <span className="text-amber-400 font-bold">X:{reticlePos.realX} Y:{reticlePos.realY}</span>
            <span className="mx-1 text-neutral-500">|</span>
            <span className="text-emerald-400">{reticlePos.stress} MPa</span>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Readout & Manual Inspection Controls Bar */}
      <div className="px-4 py-3 bg-neutral-950 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-300">
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <div>
            <span className="text-neutral-500">MATERIAL:</span>{' '}
            <span className="text-white font-semibold">Ti-6Al-4V Gr.5</span>
          </div>
          <div>
            <span className="text-neutral-500">TOL:</span>{' '}
            <span className="text-amber-400 font-semibold">±0.005 mm</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-neutral-500">CYCLE:</span>{' '}
            <span className="text-emerald-400 font-semibold">5-Axis Hermle C42</span>
          </div>
        </div>

        {/* Quick Interaction Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-[10px] font-mono text-neutral-300 hover:text-white hover:border-amber-500 transition-colors cursor-pointer"
            title="Toggle Continuous Turntable Rotation"
          >
            {isRotating ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-neutral-400" />}
            <span>Turntable</span>
          </button>

          <button
            onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.35 : 1))}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-[10px] font-mono text-neutral-300 hover:text-white hover:border-amber-500 transition-colors cursor-pointer"
            title="Toggle 1.35x Macro Inspection Zoom"
          >
            <Maximize2 className="w-3 h-3 text-neutral-400" />
            <span>{zoomLevel === 1 ? 'Zoom 1.35x' : 'Reset Zoom'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
